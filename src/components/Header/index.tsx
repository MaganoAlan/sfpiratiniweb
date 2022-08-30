import { getAuth } from "firebase/auth";
import swal from "sweetalert";
import { Container, LogoImg, TopInfo, UserInfo, UserName } from "./styles";
import Logo from "../../assets/logo_g.jpg";
import { GiExitDoor } from "react-icons/gi";

export default function Header() {
  const auth = getAuth();

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
          window.alert("Você foi desconectado");
        });
      }
      return;
    });
  }
  return (
    <Container>
      <TopInfo>
        <LogoImg src={Logo} />
        <h2>Studio Fitness Piratini</h2>
      </TopInfo>
      <UserInfo>
        <UserName>Olá, Alan Magano</UserName>
        <span>Sair</span>
        <GiExitDoor
          onClick={handleSignOut}
          style={{ cursor: "pointer" }}
          size={26}
        />
      </UserInfo>
    </Container>
  );
}
