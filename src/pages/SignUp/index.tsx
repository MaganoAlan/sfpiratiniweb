import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { CancelContainer, Container, Img, Subtitle } from "./styles";
import LogoG from "../../assets/logo_g.jpg";
import DefaultButton from "../../components/DefaultButton";
import DefaultInput from "../../components/DefaultInput";
import { Envelope, Key } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { LoginCard } from "../Login/styles";
import Loader from "../../components/Loader";

export function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();
  const navigate = useNavigate();

  function handleCreate() {
    if (!passwordConfirm || !password || !email) {
      Swal.fire("Preencha todos os campos!");
      return;
    }
    if (passwordConfirm !== password) {
      Swal.fire("As senhas não são iguais!");
      return;
    }
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        Swal.fire("Usuário criado com sucesso!");
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error", errorCode, errorMessage);
        setIsLoading(false);
        Swal.fire("Algo deu errado");
      });
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container>
      <LoginCard>
        <Img src={LogoG} alt="Imagem de logo" />
        <Subtitle>Criar conta de usuário</Subtitle>
        <DefaultInput
          type="email"
          icon={<Envelope size={32} color="#7C7C8A" />}
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <DefaultInput
          type="password"
          icon={<Key size={32} color="#7C7C8A" />}
          placeholder="Senha"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
        <DefaultInput
          type="password"
          icon={<Key size={32} color="#7C7C8A" />}
          placeholder="Repita a Senha"
          value={passwordConfirm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setPasswordConfirm(e.target.value)
          }
        />
        <DefaultButton title="Cadastrar" onClick={handleCreate} />
        <CancelContainer>
          <DefaultButton
            background="secondary"
            title="Cancelar"
            onClick={() => navigate("/")}
          />
        </CancelContainer>
      </LoginCard>
    </Container>
  );
}
