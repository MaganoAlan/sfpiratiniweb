import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import {
  ButtonContainer,
  Container,
  InfoSpan,
  Select,
  UserContainer,
} from "./styles";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
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
  const [mat, setMat] = useState("");

  const [dat, setDat] = useState("");
  const [students, setStudents] = useState([]);
  const [saturdayDates, setSaturdayDates] = useState<ISaturdayDates[]>([]);

  const [maxRange1, setMaxRange1] = useState("");
  const [maxRange2, setMaxRange2] = useState("");
  const [maxRange3, setMaxRange3] = useState("");
  const [maxRange4, setMaxRange4] = useState("");

  const [range, setRange] = useState("");

  const inRange1 = students.filter(
    (students: any) => students.horario === "range1"
  );
  const inRange2 = students.filter(
    (students: any) => students.horario === "range2"
  );
  const inRange3 = students.filter(
    (students: any) => students.horario === "range3"
  );
  const inRange4 = students.filter(
    (students: any) => students.horario === "range4"
  );

  function handleVerify() {
    if (range === "") {
      return swal("Selecione um horário.");
    }
    let hasInRange1 = [];
    let hasInRange2 = [];
    let hasInRange3 = [];
    let hasInRange4 = [];
    hasInRange1 = inRange1.find((item: any) => item.matricula === mat)!;
    hasInRange2 = inRange2.find((item: any) => item.matricula === mat)!;
    hasInRange3 = inRange3.find((item: any) => item.matricula === mat)!;
    hasInRange4 = inRange4.find((item: any) => item.matricula === mat)!;
    console.log(
      "Ranges 1 2 3 4",
      hasInRange1,
      hasInRange2,
      hasInRange3,
      hasInRange4
    );
    if (hasInRange1 || hasInRange2 || hasInRange3 || hasInRange4) {
      setAvailable(false);
      return swal("Você já agendou aula para este dia.");
    }
    if (
      (range === "range1" && inRange1.length >= Number(maxRange1)) ||
      (range === "range2" && inRange2.length >= Number(maxRange2)) ||
      (range === "range3" && inRange3.length >= Number(maxRange3)) ||
      (range === "range4" && inRange4.length >= Number(maxRange4))
    ) {
      setAvailable(false);
      return swal("Não há mais vagas disponíveis");
    }
    setAvailable(true);
    return swal("Há vagas para esta data.");
  }

  async function handleSubmit() {
    if (!dat) {
      return swal("Por favor selecione a data!");
    }
    //agendar a aula
    await addDoc(collection(firestore, "saturday"), {
      horario: range,
      date: dat,
      name: userName,
      matricula: mat,
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
    console.log(auth.currentUser);
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
      setMaxRange1(response[0]?.max_range_1);
      setMaxRange2(response[0]?.max_range_2);
      setMaxRange3(response[0]?.max_range_3);
      setMaxRange4(response[0]?.max_range_4);
    }
    getMax();
  }, [dat]);

  useEffect(() => {
    const saturdayRef = collection(firestore, "alunos");
    const q = query(saturdayRef, where("id", "==", userId));
    let response: any = [];
    async function getMat() {
      const res = await getDocs(q);
      res.forEach((doc) => {
        const data = doc.data();
        response.push(data);
      });

      setMat(response[0]?.matricula);
    }
    getMat();
  }, [userId]);

  return (
    <Container>
      <SecondaryHeader title="Agendar aula" />
      {saturdayDates.length > 0 ? (
        <>
          <span>Selecione a data:</span>

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

          <span>Selecione o horário:</span>

          <Select onChange={(e: any) => setRange(e.target.value)}>
            <option value="" defaultValue="Selecione">
              Selecione
            </option>
            {saturdayDates &&
              saturdayDates.map((date: any, index) => (
                <>
                  {date.range_1 && (
                    <option key={0} value={"range1"}>
                      {date.range_1 && "9:30h às 10:30h"}
                      {date.free_range1 && " (LIVRE)"}
                    </option>
                  )}
                  {date.range_2 && (
                    <option key={1} value={"range2"}>
                      {date.range_2 && "11:00h às 12:00h"}
                      {date.free_range2 && " (LIVRE)"}
                    </option>
                  )}
                  {date.range_3 && (
                    <option key={2} value={"range3"}>
                      {date.range_3 && "13:30h às 14:30h"}
                      {date.free_range3 && " (LIVRE)"}
                    </option>
                  )}
                  {date.range_4 && (
                    <option key={3} value={"range4"}>
                      {date.range_4 && "15:00 às 16:00h"}
                      {date.free_range4 && " (LIVRE)"}
                    </option>
                  )}
                </>
              ))}
          </Select>
          <ButtonContainer>
            <DefaultButton title="Ver disponibilidade" onClick={handleVerify} />
          </ButtonContainer>
          <Divider />
          {available ? (
            <UserContainer>
              <DefaultInput value={userName} onChange={() => {}} />
              <DefaultInput value={dat} onChange={() => {}} />
              <DefaultButton title="Agendar" onClick={handleSubmit} />
            </UserContainer>
          ) : (
            ""
          )}
        </>
      ) : (
        <InfoSpan>Não existem datas disponíveis.</InfoSpan>
      )}
    </Container>
  );
}
