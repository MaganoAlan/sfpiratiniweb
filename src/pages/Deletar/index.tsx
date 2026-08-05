import React from "react";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import { Container } from "../MyEvaluations/styles";
import { PdfDelete } from "../../components/PdfDelete";

export function Deletes() {
  return (
    <Container>
      <SecondaryHeader title="Deletar Avaliações" />
      <PdfDelete />
    </Container>
  );
}
