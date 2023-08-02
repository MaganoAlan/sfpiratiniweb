import React, { useState } from "react";
import { Container, Icon, Label } from "./styles";
import { BsCheck2All } from "react-icons/bs";

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
  return (
    <Container>
      <Label>Exercício: {train.exercicio}</Label>
      <Label>Repetições: {train.repeticoes}</Label>
      <Label>Séries: {train.series}</Label>
      <Label>Carga: {train.carga}</Label>
      <Label>Como é o exercício: </Label>
      <Icon onClick={() => setChecked(!checked)}>
        <BsCheck2All color={checked ? "#52c211" : "#333"} size={26} />
      </Icon>
    </Container>
  );
}
