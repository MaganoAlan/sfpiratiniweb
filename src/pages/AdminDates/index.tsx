import React, { useEffect } from "react";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  BlockButton,
  Card,
  Container,
  MainCard,
  MatInput,
  ModifyButton,
  Span,
  StudentLabel,
} from "./styles";
import Swal from "sweetalert2";

export function AdminDates() {
  const [studentName, setStudentName] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [evalDate, setEvalDate] = React.useState("");
  const [billDate, setBillDate] = React.useState("");
  const [mat, setMat] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const firestore = getFirestore();

  const dateMask = (value: string) => {
    return value
      .replace(/\D/g, "") // Remove tudo o que não for número
      .replace(/(\d{2})(\d)/, "$1.$2") // Adiciona o primeiro ponto após 2 dígitos
      .replace(/(\d{2})(\d)/, "$1.$2") // Adiciona o segundo ponto após mais 2 dígitos
      .replace(/(\d{4})(\d+?$)/, "$1"); // Limpa o restante se passar de 4 dígitos no ano
  };

  async function changeStudentStatus() {
    let cache = mat;
    setIsLoading(true);
    const q = query(
      collection(firestore, "alunos"),
      where("matricula", "==", String(mat).trim()),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Encontrou o documento pelo campo interno
      querySnapshot.forEach(async (documento) => {
        await updateDoc(documento.ref, {
          ativo: !isActive,
        });
        Swal.fire({
          title:
            "Status do aluno alterado para " +
            (!isActive ? "ativo" : "inativo") +
            " com sucesso!",
          icon: "success",
        });
        setMat("");
        setIsLoading(false);
        setMat(cache);
        getMat();
      });
    } else {
      Swal.fire({
        title: "Nenhum documento com esse campo matrícula foi encontrado.",
        icon: "error",
      });
      setIsLoading(false);
    }
  }

  async function changeEvalDate() {
    setIsLoading(true);
    const q = query(
      collection(firestore, "datasAvaliacao"),
      where("matricula", "==", String(mat).trim()),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Encontrou o documento pelo campo interno
      querySnapshot.forEach(async (documento) => {
        await updateDoc(documento.ref, {
          dia: evalDate,
        });
        Swal.fire({
          title: "Data de avaliação alterada com sucesso!",
          icon: "success",
        });
        setIsLoading(false);
      });
    } else {
      Swal.fire({
        title: "Nenhum documento com esse campo matrícula foi encontrado.",
        icon: "error",
      });
      setIsLoading(false);
    }
  }

  async function changeBillDate() {
    setIsLoading(true);
    const q = query(
      collection(firestore, "vencimento"),
      where("matricula", "==", String(mat).trim()),
    );
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // Encontrou o documento pelo campo interno
      querySnapshot.forEach(async (documento) => {
        await updateDoc(documento.ref, {
          dia: billDate,
        });
        Swal.fire({
          title: "Data de vencimento alterada com sucesso!",
          icon: "success",
        });
        setIsLoading(false);
      });
    } else {
      Swal.fire({
        title: "Nenhum documento com esse campo matrícula foi encontrado.",
        icon: "error",
      });
      setIsLoading(false);
    }
  }

  async function getBillDate() {
    const studentRef = collection(firestore, "vencimento");
    const q = query(studentRef, where("matricula", "==", mat));
    let response: any = [];
    const res = await getDocs(q);
    res.forEach((doc) => {
      const data = doc.data();
      response.push(data);
    });
    setBillDate(response[0]?.dia);
    console.log("vencimento", response);
  }

  async function getEvalDate() {
    const studentRef = collection(firestore, "datasAvaliacao");
    const q = query(studentRef, where("matricula", "==", mat));
    let response: any = [];
    const res = await getDocs(q);
    res.forEach((doc) => {
      const data = doc.data();
      response.push(data);
    });
    setEvalDate(response[0]?.dia);
    console.log("data", response);
  }

  async function getMat() {
    const studentRef = collection(firestore, "alunos");
    const q = query(studentRef, where("matricula", "==", mat));
    let response: any = [];
    const res = await getDocs(q);
    res.forEach((doc) => {
      const data = doc.data();
      response.push(data);
    });
    setStudentName(response[0]?.nome);
    setIsActive(response[0]?.ativo);
    console.log("aluno", response);
  }

  useEffect(() => {
    getMat();
  }, [mat]);

  useEffect(() => {
    if (studentName) {
      getEvalDate();
      getBillDate();
    } else {
      setEvalDate("");
      setBillDate("");
    }
  }, [studentName]);

  return (
    <Container>
      <SecondaryHeader title="Datas Administrativas" />
      <MainCard>
        <Card>
          <Span>Matrícula do aluno</Span>
          <MatInput value={mat} onChange={(e) => setMat(e.target.value)} />
        </Card>
        <StudentLabel>Nome do aluno: {studentName}</StudentLabel>
        <Card>
          <Span>Data da próxima avaliação</Span>
          <MatInput
            value={evalDate}
            onChange={(e) => setEvalDate(dateMask(e.target.value))}
          />
          <ModifyButton
            background={isLoading || !billDate ? "disabled" : "primary"}
            disabled={isLoading || !evalDate}
            onClick={changeEvalDate}
          >
            Alterar
          </ModifyButton>
        </Card>
        <Card>
          <Span>Data de vencimento</Span>
          <MatInput
            value={billDate}
            onChange={(e) => setBillDate(e.target.value)}
          />
          <ModifyButton
            background={isLoading || !billDate ? "disabled" : "primary"}
            disabled={isLoading || !billDate}
            onClick={changeBillDate}
          >
            Alterar
          </ModifyButton>

          {studentName && (
            <BlockButton
              background={isActive ? "" : "block"}
              disabled={isLoading}
              onClick={changeStudentStatus}
            >
              {isActive ? "Bloquear aluno" : "Desbloquear aluno"}
            </BlockButton>
          )}
        </Card>
      </MainCard>
    </Container>
  );
}
