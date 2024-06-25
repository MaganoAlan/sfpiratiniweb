import { useEffect, useState } from "react";
import { Container, InfoContainer, InfoText, ShortCuts } from "./styles";
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
import { FaFacebook } from "react-icons/fa";
import { FiChrome } from "react-icons/fi";
import { MdOutlineWaterDrop } from "react-icons/md";
import { BiDumbbell } from "react-icons/bi";
import { CustomCarousel } from "../../components/Carousel";

export function Home() {
  const auth = getAuth();
  const firestore = getFirestore();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const [uid, setUid] = useState<any>("");
  const [mat, setMat] = useState<any>("");
  const [monthly, setMonthly] = useState<any>("");
  const [nextEval, setNextEval] = useState<any>("");
  const [anounces, setAnounces] = useState([]);

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
      const monthlyQuery = query(docRef, where("matricula", "==", mat));
      let responseMonthly: any = [];
      async function getMonthly() {
        const res = await getDocs(monthlyQuery);
        res.forEach((doc) => {
          const data = doc.data();
          responseMonthly.push(data);
        });

        setMonthly(responseMonthly[0]?.dia);
      }
      getMonthly();

      const datasAvaliacaoRef = collection(firestore, "datasAvaliacao");
      const q = query(datasAvaliacaoRef, where("matricula", "==", mat));
      let response: any = [];
      async function getNext() {
        const res = await getDocs(q);
        res.forEach((doc) => {
          const data = doc.data();
          response.push(data);
        });

        setNextEval(response[0]?.dia);
      }
      getNext();
    }
  }, [mat]);

  useEffect(() => {
    const avisos = collection(firestore, "anuncios");
    async function getAnounces() {
      let response: any = [];
      const res = await getDocs(avisos);
      res.forEach((doc) => {
        const data = doc.data();
        response.push(data);
      });

      setAnounces(response);
    }
    getAnounces();
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Header userName={userName} />

          {anounces.length > 0 && <CustomCarousel anounces={anounces} />}

          {nextEval.length > 0 && (
            <InfoContainer>
              <InfoText>
                Você pode agendar sua próxima avaliação a partir do dia:{" "}
                {nextEval}, consulte a disponibilidade de horários.
              </InfoText>
            </InfoContainer>
          )}
          <ShortCuts>
            <ShortcutCard
              path="/water"
              title="Cálculo de água"
              icon={<MdOutlineWaterDrop size={26} />}
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
