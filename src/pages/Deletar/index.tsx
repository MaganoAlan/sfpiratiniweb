import React from "react";
import { SecondaryHeader } from "../../components/SecondaryHeader";

import { PdfDelete } from "../../components/PdfDelete";
import { Container } from "../AdminDates/styles";

export function Deletes() {
  return (
    <Container>
      <SecondaryHeader title="Deletar Avaliações" />
      <PdfDelete />
    </Container>
  );
}
