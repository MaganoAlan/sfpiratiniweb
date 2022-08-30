import { Container } from "./styles";
import { TbArrowBackUp } from "react-icons/tb";

type Props = {
  title: string;
};

export function SecondaryHeader({ title }: Props) {
  function handleGoBack() {
    window.location.href = "/";
    // window.alert()
    // auth.GoBack()
  }

  return (
    <Container>
      <TbArrowBackUp size={26} onClick={handleGoBack} />
      <h2>{title}</h2>
    </Container>
  );
}
