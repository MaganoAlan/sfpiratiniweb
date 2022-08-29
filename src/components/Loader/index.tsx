import React from "react";
import { AnimationContainer, Container } from "./styles";
import Hourglass from "../../assets/animations/hourglass.json";
import { useLottie } from "lottie-react";

// import { Container } from './styles';

function Loader() {
  const AnimationOptions = {
    animationData: Hourglass,
    loop: true,
  };

  const { View } = useLottie(AnimationOptions);
  return (
    <Container>
      <AnimationContainer>{View}</AnimationContainer>
    </Container>
  );
}

export default Loader;
