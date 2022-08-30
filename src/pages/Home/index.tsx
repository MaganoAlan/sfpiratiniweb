import React from "react";
import { Container, ShortCuts } from "./styles";
import Header from "../../components/Header";
import Loader from "../../components/Loader";
import ShortcutCard from "../../components/ShortcutCard";
import { BsCalendarPlus, BsCalendarX, BsInstagram } from "react-icons/bs";
import { TbGauge } from "react-icons/tb";
import { FaFacebook } from "react-icons/fa";
import { FiChrome } from "react-icons/fi";
import { Footer } from "../../components/Footer";

const Home: React.FC = () => {
  const [isLoading, setIsloading] = React.useState(false);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Container>
          <Header />
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
};

export default Home;
