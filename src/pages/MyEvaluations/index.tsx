import { ChangeEvent, useEffect, useState } from "react";
import { Container, Image } from "./styles";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import DefaultInput from "../../components/DefaultInput";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  getDownloadURL,
  list,
  listAll,
} from "firebase/storage";
import DefaultButton from "../../components/DefaultButton";
import { DefaultSelect } from "../../components/DefaultSelect";
import Swal from "sweetalert2";

export function MyEvaluations() {
  const auth = getAuth();
  const firestore = getFirestore();
  const storage = getStorage();

  const [uid, setUid] = useState<any>("");
  const [mat, setMat] = useState<any>("");
  const [evalDates, setEvalDates] = useState<any>("");
  const [selectedDate, setSelectedDate] = useState<any>("");
  const [path, setPath] = useState<any>("");
  const [url, setUrl] = useState<any>("");

  useEffect(() => {
    const user = auth.currentUser?.displayName;
    setUid(auth.currentUser?.uid);
    const saturdayRef = collection(firestore, "alunos");
    const q = query(saturdayRef, where("id", "==", uid));
    let response: any = [];
    async function getMat() {
      const res = await getDocs(q);
      res.forEach((doc) => {
        const data = doc.data();
        response.push(data);
      });
      if (user === "Wagner Cardoso") {
        setMat("");
        return;
      }
      setMat(response[0]?.matricula);
    }
    getMat();
  }, [uid]);

  async function getDates() {
    const evaluationsRef = ref(storage, `avaliações/${mat}`);
    let response: any = [];
    const res = await listAll(evaluationsRef).then((resp) => {
      resp.prefixes.forEach((itemRef) => {
        response.push(itemRef.fullPath);
      });
    });
    setEvalDates(response);

    /*  res.forEach((doc) => {
      const data = doc.data();
      response.push(data);
    }); */
    //setEvalDates(response);
  }

  useEffect(() => {
    async function teste() {
      const listRef = ref(storage, selectedDate);
      const response = await list(listRef, { maxResults: 100 });
      //("response", response.items[0].fullPath);
      setPath(response?.items[0]?.fullPath);
      if (path) {
        await getDownloadURL(ref(storage, path)).then((url) => {
          /* ("url", url);
          ("path", path); */
          setUrl(url);
          Swal.fire("Opção de download de avaliação indisponível no momento!");
        });
      }
    }
    teste();
  }, [mat, selectedDate, path]);

  return (
    <Container>
      <SecondaryHeader title="Minhas avaliações" />
      <span>Matricula:</span>
      <DefaultInput value={mat} onChange={(e) => setMat(e.target.value)} />
      <DefaultButton title="Ver datas" onClick={getDates} />
      {evalDates ? (
        <div className="main">
          <span>Selecione a data:</span>
          <DefaultSelect
            onChange={(e: ChangeEvent<HTMLSelectElement>) =>
              setSelectedDate(e.target.value)
            }
          >
            <option defaultValue="Selecione">Selecione</option>
            {evalDates &&
              evalDates.map((data: any, index: number) => (
                <option key={index} value={data}>
                  {data}
                </option>
              ))}
          </DefaultSelect>
        </div>
      ) : (
        ""
      )}
      {url ? <Image src={url} alt="avaliação física" /> : ""}
    </Container>
  );
}
