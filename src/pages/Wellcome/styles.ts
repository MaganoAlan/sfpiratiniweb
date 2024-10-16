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
    text-align: center;
  }

  div {
    width: 45%;
    font-family: ${({ theme }) => theme.fonts.roboto};
    margin-top: 2%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 500px) {
      width: 95%;
    }
  }
`;

export const Image = styled.img`
  width: 13rem;
`;

export const Title = styled.h3`
  text-align: center;
`;

export const Input = styled.input`
  width: 90%;
  margin-bottom: 5%;
  border-radius: 5px;
  padding: 2%;
  border: 1px solid black;
`;

export const Label = styled.div`
  text-align: left;
`;
