import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Container, Img, LoginCard, Subtitle } from "./styles";
import LogoG from "../../assets/logo_g.jpg";
import DefaultButton from "../../components/DefaultButton";
import DefaultInput from "../../components/DefaultInput";
import { Envelope, Key } from "phosphor-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSigIn() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <Container>
      <Img src={LogoG} alt="Imagem de logo" />
      <Subtitle>Unidade Piratini</Subtitle>
      <LoginCard>
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
        <DefaultButton title="Login" onClick={handleSigIn} />
      </LoginCard>
    </Container>
  );
};

export default Login;
