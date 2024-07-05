import React, { useState } from "react";
import {
  ButtonContainer,
  CardContainer,
  Container,
  InputContainer,
  Tip,
  Title,
} from "./styles";
import DefaultInput from "../../components/DefaultInput";
import { Envelope } from "phosphor-react";
import DefaultButton from "../../components/DefaultButton";
import { useNavigate } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import Swal from "sweetalert2";
import { SpinnerContainer } from "../Login/styles";
import { Spinner } from "react-bootstrap";

export function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  async function handleReset() {
    if (!email) {
      return Swal.fire("Por favor preencha o email.");
    }
    setIsLoading(true);
    await sendPasswordResetEmail(auth, email)
      .then(() => {
        Swal.fire(
          'Recuperação enviada para o seu email, se não receber em 2 min verifique em "span"'
        );
        setIsLoading(false);
        navigate("/");
      })
      .catch((err: Error) => {
        Swal.fire("Email inválido ou usuário não encontrado.");
        setIsLoading(false);
        console.log("Erro ao recuperar senha", err);
      });
  }
  return (
    <Container>
      <CardContainer>
        <Title>Redefinir senha</Title>
        <Tip>
          Você receberá um email com as instruções para redefinir a sua senha, e
          deve ser o mesmo utilizado na hora do cadastro.
        </Tip>
        <DefaultInput
          type="email"
          placeholder="Informe o email"
          icon={<Envelope />}
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        {isLoading ? (
          <SpinnerContainer>
            <Spinner variant="primary" />
          </SpinnerContainer>
        ) : (
          <>
            <ButtonContainer>
              <DefaultButton title="REDEFINIR" onClick={handleReset} />
            </ButtonContainer>
            <ButtonContainer>
              <DefaultButton
                title="VOLTAR"
                background="secondary"
                onClick={() => navigate("/")}
              />
            </ButtonContainer>
          </>
        )}
      </CardContainer>
    </Container>
  );
}
