import { SecondaryHeader } from "../../components/SecondaryHeader";
import { Container } from "../Home/styles";
import { BtnContainer, Img, PixInput } from "./styles";
import pixImage from "../../assets/pix.png"; // Adjust the path as necessary
import DefaultButton from "../../components/DefaultButton";
import Swal from "sweetalert2";

export function Payment() {
  function copiarPix(text: string) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        Swal.fire({
          title: "Sucesso!",
          text: "Você copiou o PIX com sucesso! Agora é só colar no app do seu banco e pagar utilizando a chave CNPJ.",
          icon: "success",
          confirmButtonText: "OK",
        });
      })
      .catch((err) => {
        console.error("Erro ao copiar o PIX: ", err);
      });
  }
  return (
    <Container>
      <SecondaryHeader title="Pagamento via PIX" />
      <Img src={pixImage} />
      <PixInput disabled value="52429079000174" />
      <BtnContainer>
        <DefaultButton
          title="Copiar PIX"
          onClick={() => copiarPix("52429079000174")}
        />
      </BtnContainer>
    </Container>
  );
}
