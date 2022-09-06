import { SecondaryHeader } from "../../components/SecondaryHeader";
import { Container, Image, Text } from "./styles";
import treino from "../../assets/treino.png";

export function Annual() {
  return (
    <Container>
      <SecondaryHeader title="Avaliação anual" />
      <Text>
        A avaliação anual é um relatório do seu desempenho ao longo do ano onde
        será mostrada a sua evolução física mês a mês. É um balanço de final de
        ano para que você possa ver o quanto evoluiu.
      </Text>
      <Image src={treino} alt="imagem de treino" />
      <h2>Em breve...</h2>
    </Container>
  );
}
