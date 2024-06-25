import { useState } from "react";
import DefaultButton from "../../components/DefaultButton";
import DefaultInput from "../../components/DefaultInput";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import { Body, Container, Image, Res } from "./styles";
import coracao from "../../assets/coracao.png";

export function Water() {
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(0);

  function handleWater() {
    let w = weight;
    setResult(parseInt(w, 10) * 35);
  }

  return (
    <Container>
      <SecondaryHeader title="Calcule a água necessária" />
      <Body>
        <h2>Informe seu peso:</h2>
        <DefaultInput
          placeholder="Peso em Kg"
          value={weight}
          onChange={(e) => {
            setWeight(e.target.value);
          }}
        />
        <DefaultButton title="Calcular" onClick={handleWater} />
        {result !== 0 ? (
          <>
            <Res>Você precisa ingerir {result}ml de água por dia.</Res>
            <Image src={coracao} alt="coração de água" />
          </>
        ) : (
          ""
        )}
      </Body>
    </Container>
  );
}
