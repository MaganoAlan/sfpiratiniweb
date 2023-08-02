import React, { useState } from "react";
import { Box, Container, Icon, Label, Row } from "./styles";
import { BsCheck2All } from "react-icons/bs";
import { FaRegQuestionCircle } from "react-icons/fa";
import Swal from "sweetalert2";
import gif from "../../assets/gifs/1.gif";
import { gifs } from "../../data/gifs";

interface IProps {
  train: {
    carga?: string;
    codigo?: string;
    exercicio?: string;
    repeticoes?: string;
    series?: string;
  };
}

export function ExerciseCard({ train }: IProps) {
  const [checked, setChecked] = useState(false);

  const t = gifs.find((g: any) => g.codigo === train.codigo);
  console.log(t);
  function showGif() {
    Swal.fire({
      html: `<img src="${t?.gif}" width="300" height="300" />`,

      confirmButtonColor: "#4193FF",
      confirmButtonText: "Entendi!",
      confirmButtonAriaLabel: "Entendi!",
    });
  }
  return (
    <Container>
      {/* <img src={t?.gif} width="200" height="200" /> */}
      <Label>Exercício: {train?.exercicio}</Label>
      <Label>Repetições: {train?.repeticoes}</Label>
      <Label>Séries: {train?.series}</Label>
      <Label>Carga: {train?.carga ? train?.carga : "Corporal"} Kg</Label>
      <Row>
        <Label>Como é o exercício: </Label>
        <Box onClick={showGif}>
          <FaRegQuestionCircle color="#4193FF" size={22} />
        </Box>
      </Row>
      <Icon onClick={() => setChecked(!checked)}>
        <BsCheck2All color={checked ? "#52c211" : "#333"} size={26} />
      </Icon>
    </Container>
  );
}
