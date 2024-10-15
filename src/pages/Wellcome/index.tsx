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
import { Container, Image } from "./styles";
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
  const [hasMat, setHasMat] = useState(false);

  useEffect(() => {
    setUser(auth.currentUser?.displayName);
    setEmail(auth.currentUser?.email);
    setUid(auth.currentUser?.uid);
  }, []);

  async function studentVerify() {
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
      return setHasMat(true);
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

  useEffect(() => {
    if (newMat.length > 3) {
      studentVerify();
    }
  }, [newMat]);

  useEffect(() => {
    if (user === null) {
      Swal.fire({
        title: "Como você gostaria de ser chamado(a)?",
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Confirmar",
        showLoaderOnConfirm: true,
        preConfirm: (user) => {
          setNewUser(user);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      }).then((result) => {
        Swal.fire({
          title: "Informe a sua matrícula",
          input: "text",
          inputAttributes: {
            autocapitalize: "off",
          },
          showCancelButton: false,
          confirmButtonText: "Confirmar",
          showLoaderOnConfirm: true,
          preConfirm: (mat) => {
            setNewMat(mat);
          },
          allowOutsideClick: () => !Swal.isLoading(),
        });
      });
    }
  }, [user]);

  useEffect(() => {
    if (hasMat) {
      Swal.fire({
        title: "A matrícula informada já foi cadastrada!",
        text: "Contate o administrador",
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: false,
        confirmButtonText: "Entendi",
        showLoaderOnConfirm: true,
        preConfirm: (user) => {
          //setNewUser(user);
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
    }
  }, [hasMat]);

  return (
    <Container>
      <Image src={Logo} alt="logo" />
      <div>
        <h3>Partiu Treinar?</h3>
        <DefaultButton
          title="BORA!"
          onClick={() => {
            studentVerify();
            if (hasMat) {
              Swal.fire({
                title: "A matrícula informada já foi cadastrada!",
                text: "Contate o administrador",
                inputAttributes: {
                  autocapitalize: "off",
                },
                showCancelButton: false,
                confirmButtonText: "SAIR",
                showLoaderOnConfirm: true,
                preConfirm: (user) => {
                  auth.signOut().then(() => {
                    //swal("Você foi desconectado");
                    navigate("/");
                  });
                },
                allowOutsideClick: () => !Swal.isLoading(),
              });
            }
          }}
        />
      </div>
    </Container>
  );
}
