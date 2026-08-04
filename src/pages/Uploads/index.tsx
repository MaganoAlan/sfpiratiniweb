import React from "react";
import { SecondaryHeader } from "../../components/SecondaryHeader";
import { Container } from "../MyEvaluations/styles";
import PdfUploader from "../../components/PdfUploader";

export function Uploads() {
  return (
    <Container>
      <SecondaryHeader title="Admin Uploads" />
      <PdfUploader />
    </Container>
  );
}
