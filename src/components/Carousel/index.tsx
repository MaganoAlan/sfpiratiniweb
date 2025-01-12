import { Container, Image, Sub, Teste } from "./styles";
import Carousel from "react-bootstrap/Carousel";
import image from "../../assets/google.png";
import aviso from "../../assets/aviso.jpeg";

interface IProps {
  anounces: any[];
}

export function CustomCarousel({ anounces }: IProps) {
  console.log("anooo", anounces);
  return (
    <Carousel style={{ marginBottom: "1%", marginTop: "1%" }}>
      {anounces.map((item: any, index: number) => (
        <Carousel.Item key={index}>
          <Container>
            <Teste />
            <Carousel.Caption>
              <Sub>{item.title}</Sub>
              <p>{item.body}</p>
            </Carousel.Caption>
          </Container>
        </Carousel.Item>
      ))}

      {/* <Carousel.Item>
        <Container>
          <Teste />
          <Carousel.Caption>
            <h3>Aulas no sábado</h3>
            <p>Todos os 1º e 2º sábados de cada mês.</p>
          </Carousel.Caption>
        </Container>
      </Carousel.Item> */}
    </Carousel>
  );
}
