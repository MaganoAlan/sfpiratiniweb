import { getAuth } from "firebase/auth";
import { Container, LogoImg, TopInfo, UserInfo, UserName } from "./styles";
import Logo from "../../assets/logo_g.jpg";
import { GiExitDoor } from "react-icons/gi";

export default function Header() {
  const auth = getAuth();

  function handleSignOut() {
    auth.signOut().then(() => {
      window.alert("Você foi desconectado");
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
