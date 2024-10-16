import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAuth, updateProfile } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import Swal from "sweetalert2";
import { Container, Image, Input, Label, Title } from "./styles";
import Logo from "../../assets/favicon.png";
import DefaultButton from "../../components/DefaultButton";

export function Wellcome() {
  const auth = getAuth();
  const firestore = getFirestore();
  const navigate = useNavigate();

  const [user, setUser] = useState<any>("");
  const [email, setEmail] = useState<any>("");
  const [uid, setUid] = useState<any>("");
  const [newUser, setNewUser] = useState("");
  const [newMat, setNewMat] = useState("");
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    setUser(auth.currentUser?.displayName);
    setEmail(auth.currentUser?.email);
    setUid(auth.currentUser?.uid);
    async function get() {
      const saturdayRef = collection(firestore, "alunos");
      const q = query(saturdayRef, where("id", "==", auth.currentUser?.uid));
      let response: any = [];
      const res = await getDocs(q);
      res.forEach((doc) => {
        const data = doc.data();
        response.push(data);
      });
      console.log("RESPONSEEE", response[0]?.ativo);
      setIsActive(response[0]?.ativo);
    }
    get();
  }, []);

  async function studentVerify() {
    if (newUser.length < 1) {
      return Swal.fire({
        title: "Nome inválido!",
        text: "Por favor preencha seu nome.",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "OK",
        showLoaderOnConfirm: true,
        preConfirm: (user) => {},
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
    if (newMat.length < 4 || newMat.length > 4 || newMat.length === 0) {
      return Swal.fire({
        title: "A matrícula inválida!",
        text: "A matrícula precisa ter exatamente 4 dígitos.",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Entendi",
        showLoaderOnConfirm: true,
        preConfirm: (user) => {},
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
    const saturdayRef = collection(firestore, "alunos");
    const q = query(saturdayRef, where("matricula", "==", newMat));
    let response: any = [];
    const res = await getDocs(q);
    res.forEach((doc) => {
      const data = doc.data();
      response.push(data);
    });
    console.log("response", response);
    if (response.length > 0) {
      return Swal.fire({
        title: "Usuário já cadastrado",
        text: "A matrícula informada já foi cadastrada.",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Entendi",
        showLoaderOnConfirm: true,
        preConfirm: (user) => {},
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
    handleStudent();
    navigate("/home");
  }

  async function handleStudent() {
    if (user === null) {
      updateProfile(auth.currentUser!, { displayName: newUser }).then(() => {
        return;
      });

      //criar aluno no banco
      await addDoc(collection(firestore, "alunos"), {
        ativo: true,
        email: email,
        id: uid,
        matricula: newMat,
        nome: newUser,
      })
        .then(() => {
          console.log("Aluno criado no banco");
        })
        .catch((error) => {
          console.log(error);
        });
    }
    return;
  }

  async function blockVerify() {
    if (!isActive) {
      return Swal.fire({
        title: "Usuário bloqueado",
        text: "Contate o administrador.",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Entendi",
        showLoaderOnConfirm: true,
        preConfirm: (user) => {},
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
    navigate("/home");
  }

  return (
    <Container>
      <Image src={Logo} alt="logo" />
      {user === null ? (
        <div>
          <Title>Preencha seus dados</Title>
          <Label>Como você gostaria de ser chamado(a)*</Label>
          <Input
            type="text"
            value={newUser}
            onChange={(t) => setNewUser(t.target.value)}
          />
          <Label>Qual é a sua matrícula*</Label>
          <Input
            value={newMat}
            onChange={(t) => setNewMat(t.target.value)}
            type="number"
            minLength={4}
            maxLength={4}
          />
          <div>
            <DefaultButton
              title="CADASTRAR"
              onClick={() => {
                studentVerify();
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <h3>Partiu Treinar?</h3>
          <DefaultButton
            title="BORA!"
            onClick={() => {
              blockVerify();
            }}
          />
        </div>
      )}
    </Container>
  );
}
