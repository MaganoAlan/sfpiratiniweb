import React, { useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import {
  Container,
  DividerContainer,
  DividerText,
  Forgot,
  GoogleLogo,
  Img,
  Line,
  LoginCard,
  LoginContainer,
  SpinnerContainer,
  Subtitle,
} from "./styles";
import LogoG from "../../assets/logo_g.jpg";
import DefaultButton from "../../components/DefaultButton";
import DefaultInput from "../../components/DefaultInput";
import { Envelope, Key } from "phosphor-react";
import { useNavigate } from "react-router-dom";
import googleImg from "../../assets/google.png";
import { Divider } from "../../components/Divider";
import Swal from "sweetalert2";
import { Spinner } from "react-bootstrap";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleSigIn() {
    if (!email || !password) {
      return Swal.fire("Por favor preencha o usuário e a senha.");
    }
    setIsLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("user", user);
        setIsLoading(false);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (
          errorCode === "auth/user-not-found" ||
          errorCode === "auth/invalid-email"
        ) {
          Swal.fire(`Usuário não encontrado ou incorreto.`);
        }
        if (errorCode === "auth/wrong-password") {
          Swal.fire(`Senha incorreta.`);
        }
        console.log("ERRO", errorCode);
        setIsLoading(false);
      });
  }

  function handleGoogleSignIn() {
    const provider = new GoogleAuthProvider();

    provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

    const auth = getAuth();
    //auth.languageCode = "it";
    auth.useDeviceLanguage();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log("Erro ao logar", errorMessage);
      });
  }

  return (
    <Container>
      <LoginCard>
        <Img src={LogoG} alt="Imagem de logo" />
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
        {isLoading ? (
          <SpinnerContainer>
            <Spinner variant="primary" />
          </SpinnerContainer>
        ) : (
          <>
            <DividerContainer>
              <DefaultButton title="ENTRAR" onClick={handleSigIn} />
            </DividerContainer>
            <DefaultButton
              title="CADASTRAR"
              background="secondary"
              onClick={() => navigate("/cadastrar")}
            />

            {/* <DividerContainer>
              <Line />
              <DividerText>Ou</DividerText>
              <Line />
            </DividerContainer>

            <LoginContainer onClick={handleGoogleSignIn}>
              <GoogleLogo src={googleImg} />
              <div>Entrar com google</div>
            </LoginContainer> */}

            <DividerContainer>
              <Line />
              <DividerText> </DividerText>
              <Line />
            </DividerContainer>

            <LoginContainer onClick={() => navigate("/recuperar-senha")}>
              <Forgot>Esqueci minha senha</Forgot>
            </LoginContainer>
          </>
        )}
      </LoginCard>
    </Container>
  );
}
