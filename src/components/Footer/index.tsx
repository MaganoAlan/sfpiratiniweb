//@ts-nocheck
import { BsCalendarPlus, BsCalendarX } from "react-icons/bs";
import ShortcutCard from "../ShortcutCard";
import { Container, IconContainer, IconText, Link, Text } from "./styles";
import { TbGauge } from "react-icons/tb";
import { BiDumbbell } from "react-icons/bi";
import { GiExitDoor } from "react-icons/gi";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { CloudArrowUp, Trash } from "phosphor-react";

export function Footer({ userName }: { userName: string }) {
  const auth = getAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    swal({
      title: "Sair do App?",
      text: "Tem certeza que deseja sair do app?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancelar", true],
    }).then((sair) => {
      if (sair) {
        auth.signOut().then(() => {
          swal("Você foi desconectado");
          navigate("/");
        });
      }
      return;
    });
  }
  return (
    <Container>
      {userName.toUpperCase() !== "WAGNER CARDOSO" ? (
        <>
          {" "}
          <IconContainer onClick={() => navigate("/minhas-avaliacoes")}>
            <TbGauge size={26} />
            <IconText>Avaliações</IconText>
          </IconContainer>
          <IconContainer onClick={() => navigate("/aula-de-sabado")}>
            <BsCalendarPlus size={26} />
            <IconText>Agendar</IconText>
          </IconContainer>
          <IconContainer onClick={() => navigate("/cancelar-aula")}>
            <BsCalendarX size={26} />
            <IconText>Cancelar</IconText>
          </IconContainer>
          <IconContainer onClick={() => navigate("/lista-exercicios")}>
            <BiDumbbell size={26} />
            <IconText>Exercícios</IconText>
          </IconContainer>
        </>
      ) : (
        <>
          <IconContainer onClick={() => navigate("/uploads")}>
            <CloudArrowUp size={26} />
            <IconText>Uploads</IconText>
          </IconContainer>
          <IconContainer onClick={() => navigate("/delete-avaliacoes")}>
            <Trash size={26} />
            <IconText>Deletar</IconText>
          </IconContainer>
        </>
      )}

      <Link>
        <IconContainer>
          <GiExitDoor
            onClick={handleSignOut}
            style={{ cursor: "pointer" }}
            size={26}
          />
          <IconText>Sair</IconText>
        </IconContainer>
      </Link>
    </Container>
  );
}
