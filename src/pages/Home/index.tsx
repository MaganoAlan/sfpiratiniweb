import { useEffect, useState } from "react";
import { Container, ShortCuts } from "./styles";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  doc,
  getDocs,
  where,
  query,
  collection,
} from "firebase/firestore";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import ShortcutCard from "../../components/ShortcutCard";
import { Footer } from "../../components/Footer";
import { BsCalendarPlus, BsCalendarX, BsInstagram } from "react-icons/bs";
import { TbGauge } from "react-icons/tb";
import { GiWeightLiftingUp } from "react-icons/gi";
import { FaFacebook } from "react-icons/fa";
import { FiChrome } from "react-icons/fi";
import { MdOutlineWaterDrop } from "react-icons/md";

export function Home() {
  const auth = getAuth();
  const firestore = getFirestore();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [uid, setUid] = useState<any>("");
  const [mat, setMat] = useState<any>("");
  const [monthly, setMonthly] = useState<any>("");

  useEffect(() => {
    setUserName(auth.currentUser?.displayName || "");
    setIsloading(false);
  }, []);

  useEffect(() => {
    setUid(auth.currentUser?.uid);
    const saturdayRef = collection(firestore, "alunos");
    const q = query(saturdayRef, where("id", "==", uid));
    let response: any = [];
    async function getMat() {
      const res = await getDocs(q);
      res.forEach((doc) => {
        const data = doc.data();
        response.push(data);
      });

      setMat(response[0]?.matricula);
    }
    getMat();
  }, [uid]);

  useEffect(() => {
    if (mat) {
      const docRef = collection(firestore, "vencimento");
      const q = query(docRef, where("matricula", "==", mat));
      let response: any = [];
      async function getMonthly() {
        const res = await getDocs(q);
        res.forEach((doc) => {
          const data = doc.data();
          response.push(data);
        });

        setMonthly(response[0]?.dia);
      }
      getMonthly();
    }
  }, [mat]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Header userName={userName} />
          {monthly !== "" ? (
            <div
              style={{
                textAlign: "center",
                margin: "auto",
                marginTop: "2%",
                padding: 5,
                color: "green",
                fontSize: "18px",
              }}
            >
              Sua mensalidade vence todo dia {monthly}
            </div>
          ) : (
            ""
          )}
          <ShortCuts>
            <ShortcutCard
              path="/aula-de-sabado"
              title="Agendar aula no sábado"
              icon={<BsCalendarPlus size={26} />}
            />

            <ShortcutCard
              path="/cancelar-aula"
              title="Cancelar aula no sábado"
              icon={<BsCalendarX size={26} />}
            />
            <ShortcutCard
              path="/minhas-avaliacoes"
              title="Minhas avaliações"
              icon={<TbGauge size={26} />}
            />
            <ShortcutCard
              path="/water"
              title="Cálculo de água"
              icon={<MdOutlineWaterDrop size={26} />}
            />
            <ShortcutCard
              path="/anual"
              title="Avaliação anual"
              icon={<GiWeightLiftingUp size={26} />}
            />
            <ShortcutCard
              link="https://www.instagram.com/sfitnesspiratini/"
              title="Instagram"
              icon={<BsInstagram size={26} />}
            />
            <ShortcutCard
              link="https://www.facebook.com/sfitnesspiratini"
              title="Facebook"
              icon={<FaFacebook size={26} />}
            />
            <ShortcutCard
              link="https://linktr.ee/sfitnesspiratini"
              title="Google"
              icon={<FiChrome size={26} />}
            />
          </ShortCuts>
          <Footer />
        </Container>
      )}
    </>
  );
}
