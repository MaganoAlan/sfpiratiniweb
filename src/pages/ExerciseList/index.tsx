import { useEffect, useState } from "react";
import { Body, Card, Container, Label } from "./styles";
import {
  query,
  getDocs,
  getFirestore,
  collection,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import DefaultButton from "../../components/DefaultButton";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { ExerciseCard } from "../../components/ExerciseCard";
import { AerobicCard } from "../../components/AerobicCard";
import Swal from "sweetalert2";

export function ExerciseList() {
  const [userData, setUserData] = useState<any>([]);
  const [trains, setTrains] = useState<any>([]);
  const [aerobics, setAerobics] = useState<any>([]);
  const [trainType, setTrainType] = useState<any>("a");
  const [uid, setUid] = useState<any>("");
  const firestore = getFirestore();
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const trainRef = collection(firestore, "lista_treinos");
    if (userData.length === 0) {
      return;
    }
    const t = query(trainRef, where("matricula", "==", userData[0]?.matricula));
    let response: any = [];
    async function e() {
      const res = await getDocs(t);
      res.forEach((doc) => {
        const data = doc.data();
        response.push(data);
      });
      setTrains(response);
    }
    e();
  }, [userData]);

  useEffect(() => {
    const aerobicRef = collection(firestore, "lista_aerobicos");
    if (userData.length === 0) {
      return;
    }
    const t = query(
      aerobicRef,
      where("matricula", "==", userData[0]?.matricula)
    );
    let response: any = [];
    async function e() {
      const res = await getDocs(t);
      res.forEach((doc) => {
        const data = doc.data();
        response.push(data);
      });
      setAerobics(response);
    }
    e();
  }, [userData]);

  const studentRef = collection(firestore, "alunos");
  const s = query(studentRef, where("id", "==", uid));
  useEffect(() => {
    let response: any = [];
    async function e() {
      const res = await getDocs(s);
      res.forEach((doc) => {
        const { matricula, nome } = doc.data();
        const res = { id: doc.id, matricula, nome };
        response.push(res);
      });
      setUserData(response);
    }
    e();
  }, [uid]);

  useEffect(() => {
    const id = auth.currentUser?.uid;
    setUid(id);
  }, []);

  useEffect(() => {
    async function getInfo() {
      const info = await localStorage.getItem("lastTrain");
      if (info) {
        const { type, data } = JSON.parse(info);
        type === "a" ? setTrainType("b") : setTrainType("a");
        return console.log("Tem storage", type);
      }
      console.log("Não tem storage");
    }
    getInfo();
  }, []);

  async function handleFinish() {
    let data: any = new Date();
    data = data.toLocaleString();
    const trainInfo = {
      data: data,
      type: trainType,
    };

    await localStorage.setItem("lastTrain", JSON.stringify(trainInfo));
    Swal.fire("Treino finalizado cm sucesso!").then(() => navigate("/home"));
  }

  console.log("type atual", trainType);
  return (
    <Container>
      <SecondaryHeader title="Lista de exercícios" />
      <Label>Último treino: </Label>
      <Body>
        <Label>Aerobios</Label>
        <Card>
          {aerobics.map(
            (a: any, index: number) =>
              a.type === trainType && <AerobicCard key={index} train={a} />
          )}
        </Card>
        <Label>Exercícios</Label>
        <Card>
          {trains.map(
            (t: any, index: number) =>
              t.type === trainType && <ExerciseCard key={index} train={t} />
          )}
        </Card>

        <DefaultButton onClick={handleFinish} title="Terminar treino" />
      </Body>
    </Container>
  );
}
