import { Container } from "./styles";
import { TbArrowBackUp } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

type Props = {
  title: string;
};

export function SecondaryHeader({ title }: Props) {
  const navigate = useNavigate();

  return (
    <Container>
      <TbArrowBackUp
        style={{ cursor: "pointer" }}
        size={26}
        onClick={() => navigate("/home")}
      />
      <h2>{title}</h2>
    </Container>
  );
}
