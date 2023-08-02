import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h1 {
    font-family: ${({ theme }) => theme.fonts.roboto};
    margin-top: 2%;
  }
`;

export const Image = styled.img`
  width: 30vw;
  @media (max-width: 600px) {
    width: 60vw;
  }
`;
