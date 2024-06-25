import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h3 {
    margin-bottom: 5%;
  }

  div {
    width: 45%;
    font-family: ${({ theme }) => theme.fonts.roboto};
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Image = styled.img`
  width: 13rem;
`;
