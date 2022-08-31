import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { Container, Select } from "./styles";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { IMaxStudents } from "../../DTOs/MaxStudents";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import swal from "sweetalert";
import { ISaturdayDates } from "../../DTOs/SaturdayDates";
import DefaultInput from "../../components/DefaultInput";
import DefaultButton from "../../components/DefaultButton";
import { Divider } from "../../components/Divider";
import { useNavigate } from "react-router-dom";

export function SaturdayLesson() {
  const auth = getAuth();
  const navigate = useNavigate();
  const firestore = getFirestore();

  const [isLoading, setIsLoading] = useState(false);

  const [available, setAvailable] = useState(false);

  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const [dat, setDat] = useState("");
  const [students, setStudents] = useState([]);
  const [saturdayDates, setSaturdayDates] = useState<ISaturdayDates[]>([]);
  const [maxStudents, setMaxStudents] = useState<IMaxStudents[]>([]);

  function handleVerify() {
    if (students.length >= maxStudents[0].max_students) {
      setAvailable(false);
      return swal("Não há mais vagas disponíveis");
    }
    setAvailable(true);
    return swal("Há vagas para esta data.");
  }

  async function handleSubmit() {
    //agendar a aula
    await addDoc(collection(firestore, "saturday"), {
      cellphone: "51 99999999",
      date: dat,
      name: userName,
      ownerId: userId,
    })
      .then(() => {
        swal("Aula agendada com sucesso!").then(() => {
          navigate("/home");
        });
      })
      .catch((error) => {
        console.log(error);
        return swal("Algo deu errado.");
      });
  }

  useEffect(() => {
    setUserName(auth.currentUser?.displayName || "");
    setUserId(auth.currentUser?.uid || "");
  }, []);

  useEffect(() => {
    // verificar quantos alunos tem nessa data
    const saturdayRef = collection(firestore, "saturday");
    const q = query(saturdayRef, where("date", "==", dat));
    let response: any = [];
    async function getSat() {
      const res = await getDocs(q);
      res.forEach((doc) => {
        const data = doc.data();
        response.push(data);
      });
      setStudents(response);
    }
    getSat();
  }, [dat]);

  console.log("alunos nessa data", students);

  useEffect(() => {
    // ver datas disponíveis
    async function getSats() {
      let response: any = [];
      const saturdayRef = collection(firestore, "saturdayDates");
      const resSnapshot = await getDocs(saturdayRef);
      resSnapshot.forEach((doc) => {
        response.push(doc.data());
      });
      setSaturdayDates(response);
    }
    getSats();
  }, []);

  useEffect(() => {
    // ver numero máx de alunos
    async function getMax() {
      let response: any = [];
      const saturdayRef = collection(firestore, "maxSaturdayStudents");
      const q = query(saturdayRef, where("date", "==", dat));
      const resSnapshot = await getDocs(q);
      resSnapshot.forEach((doc) => {
        response.push(doc.data());
      });
      setMaxStudents(response);
    }
    getMax();
  }, [dat]);

  console.log("saturdayDates", saturdayDates);
  console.log("data selecionada", dat);
  console.log("maximo", maxStudents[0]?.max_students);

  return (
    <Container>
      <SecondaryHeader title="Agendar aula" />
      <span>Verificar data</span>

      <Select onChange={(e: any) => setDat(e.target.value)}>
        <option value="" defaultValue="Selecione">
          Selecione
        </option>
        {saturdayDates &&
          saturdayDates.map((date: any, index) => (
            <option key={index} value={date.date}>
              {date.date}
            </option>
          ))}
      </Select>
      <DefaultButton title="Ver disponibilidade" onClick={handleVerify} />
      <Divider />
      {available ? (
        <>
          <DefaultInput value={userName} onChange={() => {}} />
          <DefaultInput value={dat} onChange={() => {}} />
          <DefaultButton title="Agendar" onClick={handleSubmit} />
        </>
      ) : (
        ""
      )}
    </Container>
  );
}
