import { useEffect, useState } from "react";
import { Container, ShortCuts } from "./styles";
import { getAuth } from "firebase/auth";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import ShortcutCard from "../../components/ShortcutCard";
import { Footer } from "../../components/Footer";
import { BsCalendarPlus, BsCalendarX, BsInstagram } from "react-icons/bs";
import { TbGauge } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import { FiChrome } from "react-icons/fi";

export function Home() {
  const auth = getAuth();
  const [userName, setUserName] = useState("");
  const [isLoading, setIsloading] = useState(true);

  useEffect(() => {
    setUserName(auth.currentUser?.displayName || "");
    setIsloading(false);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Header userName={userName} />
          <ShortCuts>
            <ShortcutCard
              link="/aula-de-sabado"
              title="Agendar aula no sábado"
              icon={<BsCalendarPlus size={26} />}
            />

            <ShortcutCard
              link="/cancelar-aula"
              title="Cancelar aula no sábado"
              icon={<BsCalendarX size={26} />}
            />
            <ShortcutCard
              title="Minhas avaliações"
              icon={<TbGauge size={26} />}
            />
            <ShortcutCard title="Instagram" icon={<BsInstagram size={26} />} />
            <ShortcutCard title="Facebook" icon={<FaFacebook size={26} />} />
            <ShortcutCard title="Google" icon={<FiChrome size={26} />} />
          </ShortCuts>
          <Footer />
        </Container>
      )}
    </>
  );
}
