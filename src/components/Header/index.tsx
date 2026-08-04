import { Container, LogoImg, TopInfo, UserInfo, UserName } from "./styles";
import logoDefault from "../../assets/logos/logo_oficial_padrao.jpeg";
import logoJaneiro from "../../assets/logos/janeiro_ano_novo.jpeg";
import logoAbril from "../../assets/logos/abril_autismo.png";
import logoSetembro from "../../assets/logos/setembro_amarelo.png";
import logoOutubro from "../../assets/logos/outubro_rosa.png";
import logoNovembro from "../../assets/logos/novembro_azul.png";
import logoDezembro from "../../assets/logos/dezembro_natal.jpeg";
import { Clock } from "phosphor-react";

type Props = {
  userName: string;
  monthly: string;
};

export default function Header({ userName, monthly }: Props) {
  let currentLogo = logoDefault;

  function getCurrentLogo() {
    const currentMonth = new Date().getMonth() + 1;
    switch (currentMonth) {
      case 1:
        return logoJaneiro;
      case 4:
        return logoAbril;
      case 9:
        return logoSetembro;
      case 10:
        return logoOutubro;
      case 11:
        return logoNovembro;
      case 12:
        return logoDezembro;
      default:
        return logoDefault;
    }
  }

  currentLogo = getCurrentLogo();

  return (
    <Container>
      <TopInfo>
        <LogoImg src={currentLogo} />
        <UserInfo>
          <h2>Studio Fitness Piratini</h2>
          <UserName>Olá, {userName}</UserName>
          <UserName>
            Sua mensalidade vence todo dia {monthly}{" "}
            <Clock
              style={{ marginLeft: "5px" }}
              size={14}
              color="#fff"
              weight="bold"
            />
          </UserName>
        </UserInfo>
      </TopInfo>
    </Container>
  );
}
