import { Container, Image } from "./styles";
import Logo from "../../assets/favicon.png";
import DefaultButton from "../../components/DefaultButton";

export function Wellcome() {
  return (
    <Container>
      <Image src={Logo} alt="logo" />
      <h1>Bem vindo(a)</h1>
      <DefaultButton
        title="Entrar"
        onClick={() => {
          window.location.href = "/home";
        }}
      />
    </Container>
  );
}
