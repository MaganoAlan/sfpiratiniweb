//@ts-nocheck
import React, { useState } from "react";
import { Container, Label } from "./styles";
import { Icon } from "../ExerciseCard/styles";
import { BsCheck2All } from "react-icons/bs";

interface IProps {
  train: {
    aerobios?: string;
  };
}

export function AerobicCard({ train }: IProps) {
  const [checked, setChecked] = useState(false);
  return (
    <Container>
      <Label>Aeróbicos:</Label>
      <Label>{train.aerobios}</Label>
      <Icon onClick={() => setChecked(!checked)}>
        <BsCheck2All color={checked ? "#52c211" : "#333"} size={26} />
      </Icon>
    </Container>
  );
}
