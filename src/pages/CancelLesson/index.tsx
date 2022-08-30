import { useEffect, useState } from "react";
import { Container, Div, Text } from "./styles";
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

export function CancelLesson() {
  const [sat, setSat] = useState<any>([]);
  const [uid, setUid] = useState<any>("");
  const firestore = getFirestore();
  const auth = getAuth();

  const saturdayRef = collection(firestore, "saturday");
  const q = query(saturdayRef, where("ownerId", "==", uid));
  useEffect(() => {
    let response: any = [];
    async function e() {
      const res = await getDocs(q);
      res.forEach((doc) => {
        const { name, date } = doc.data();
        const res = { id: doc.id, name, date };
        response.push(res);
      });
      setSat(response);
    }
    e();
  }, [uid]);

  console.log(sat);

  useEffect(() => {
    const id = auth.currentUser?.uid;
    setUid(id);
  }, []);

  async function handleCancel(id: string) {
    await deleteDoc(doc(firestore, "saturday", id));
    swal("Aula cancelada com sucesso!").then(
      () => (window.location.href = "/")
    );
  }
  return (
    <Container>
      <SecondaryHeader title="Cancelar aula" />
      {sat &&
        sat?.map((item: any, index: number) => (
          <Div key={index}>
            <Text>{item.name}</Text>
            <Text>{item.date}</Text>
            <DefaultButton
              title="Cancelar"
              onClick={() => handleCancel(item.id)}
            />
          </Div>
        ))}
    </Container>
  );
}
