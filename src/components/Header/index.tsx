import { getAuth } from "firebase/auth";
import swal from "sweetalert";
import { Container, LogoImg, TopInfo, UserInfo, UserName } from "./styles";
import Logo from "../../assets/logo_g.jpg";
import { GiExitDoor } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

type Props = {
  userName: string;
};

export default function Header({ userName }: Props) {
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
      <TopInfo>
        <LogoImg src={Logo} />
        <UserInfo>
          <h2>Studio Fitness Piratini</h2>
          <UserName>Olá, {userName}</UserName>
        </UserInfo>
      </TopInfo>
    </Container>
  );
}
