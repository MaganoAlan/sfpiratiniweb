import React from "react";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import PdfUploader from "../../components/PdfUploader";
import { Container } from "../AdminDates/styles";

export function Uploads() {
  return (
    <Container>
      <SecondaryHeader title="Upload de Avaliações" />
      <PdfUploader />
    </Container>
  );
}
