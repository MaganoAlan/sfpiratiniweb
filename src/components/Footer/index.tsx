import { BsCalendarPlus, BsCalendarX } from "react-icons/bs";
import ShortcutCard from "../ShortcutCard";
import { Container, IconContainer, IconText, Link, Text } from "./styles";
import { TbGauge } from "react-icons/tb";
import { BiDumbbell } from "react-icons/bi";
import { GiExitDoor } from "react-icons/gi";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export function Footer() {
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
      <Link href="/minhas-avaliacoes">
        <IconContainer>
          <TbGauge size={26} />
          <IconText>Avaliações</IconText>
        </IconContainer>
      </Link>

      <Link href="/aula-de-sabado">
        <IconContainer>
          <BsCalendarPlus size={26} />
          <IconText>Agendar</IconText>
        </IconContainer>
      </Link>

      <Link href="/cancelar-aula">
        <IconContainer>
          <BsCalendarX size={26} />
          <IconText>Cancelar</IconText>
        </IconContainer>
      </Link>

      <Link href="/lista-exercicios">
        <IconContainer>
          <BiDumbbell size={26} />
          <IconText>Exercícios</IconText>
        </IconContainer>
      </Link>

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
