import { useEffect, useState } from "react";
import { Container } from "./styles";
import {
  query,
  getDocs,
  getFirestore,
  collection,
  where,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";

export function SaturdayLesson() {
  const [sat, setSat] = useState<any>([]);
  const [uid, setUid] = useState<any>("");
  const firestore = getFirestore();
  const auth = getAuth();

  const citiesRef = collection(firestore, "saturday");
  const q = query(
    citiesRef,
    where("ownerId", "==", "CHEGG7ZpXGWEckJniP8MQekdwnS2")
  );
  useEffect(() => {
    let response: any = [];
    async function e() {
      const res = await getDocs(q);
      res.forEach((doc) => {
        response.push(doc.data());
      });
      setSat(response);
    }
    e();
    /*  async function h() {
      let res: any = [];
      const querySnapshot = await getDocs(collection(firestore, "saturday"));
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setSat(res);
    }
    h(); */
  }, []);

  useEffect(() => {
    const id = auth.currentUser?.uid;
    setUid(id);
  }, []);

  return (
    <Container>
      <h1>Aula de sábado</h1>
      {sat &&
        sat?.map((item: any, index: number) => (
          <div key={index}>
            <li>{item.name}</li>
            <li>{item.date}</li>
          </div>
        ))}
    </Container>
  );
}
