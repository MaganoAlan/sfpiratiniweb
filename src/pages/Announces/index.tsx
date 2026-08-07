import { useEffect, useState } from "react";
import {
  AnnounceCard,
  Body,
  Btn,
  Buttons,
  Container,
  FormContainer,
  InputContainer,
  InputTitle,
  SubTitle,
  TextareaBody,
  Title,
} from "./styles";
import {
  getFirestore,
  doc,
  getDocs,
  where,
  query,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import { Button } from "../../components/DefaultButton/styles";
import { Trash } from "phosphor-react";
import Swal from "sweetalert2";
import DefaultButton from "../../components/DefaultButton";

export function Announces() {
  const firestore = getFirestore();
  const navigate = useNavigate();
  const [anounces, setAnounces] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteAnnounce(an: string) {
    await Swal.fire({
      title: "Excluir Anúncio?",
      text: "Tem certeza que deseja excluir este anúncio?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoading(true);
        const q = query(
          collection(firestore, "anuncios"),
          //@ts-ignore
          where("body", "==", String(an.body).trim()),
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          // Encontrou o documento pelo campo interno
          querySnapshot.forEach(async (documento) => {
            await deleteDoc(documento.ref);
            Swal.fire({
              title: "Anúncio excluído com sucesso!",
              icon: "success",
            });
            setIsLoading(false);
            getAnounces();
          });
        } else {
          Swal.fire({
            title: "Nenhum documento com esse campo matrícula foi encontrado.",
            icon: "error",
          });
          setIsLoading(false);
        }
      }
    });
  }

  async function addAnounce() {
    if (!title || !body) {
      Swal.fire({
        title: "Preencha todos os campos!",
        icon: "error",
      });
      return;
    }
    try {
      const collectionRef = collection(firestore, "anuncios");
      const newAnnounce = {
        title: title,
        body: body,
      };
      const docRef = await addDoc(collectionRef, newAnnounce);
      Swal.fire({
        title: "Anúncio adicionado com sucesso!",
        icon: "success",
      });
      setTitle("");
      setBody("");
      getAnounces();
    } catch (error) {
      Swal.fire({
        title: "Erro ao adicionar anúncio!",
        icon: "error",
      });
    }
  }

  const avisos = collection(firestore, "anuncios");
  async function getAnounces() {
    let response: any = [];
    const res = await getDocs(avisos);
    res.forEach((doc) => {
      const data = doc.data();
      response.push(data);
    });

    setAnounces(response);
  }

  useEffect(() => {
    getAnounces();
  }, []);

  return (
    <Container>
      <SecondaryHeader title="Gestão de Anúncios" />
      <SubTitle>Adicionar Anúncio</SubTitle>
      <FormContainer>
        <InputContainer>
          <InputTitle
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título do Anúncio"
          />
        </InputContainer>
        <InputContainer>
          <TextareaBody
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={4}
            placeholder="Corpo do Anúncio"
          />
        </InputContainer>
        <DefaultButton
          title="Adicionar Anúncio"
          onClick={addAnounce}
          background="primary"
        />
      </FormContainer>
      <SubTitle>Anúncios Cadastrados</SubTitle>
      {anounces?.length > 0 &&
        anounces.map((item: any, index) => (
          <AnnounceCard key={index}>
            <Title>{item.title}</Title>
            <Body>{item.body}</Body>
            <Buttons>
              <Btn onClick={() => handleDeleteAnnounce(item)}>
                <Trash size={20} color="white" />
              </Btn>
            </Buttons>
          </AnnounceCard>
        ))}
    </Container>
  );
}
