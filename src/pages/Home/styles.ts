import styled from "styled-components";

export const DefaultBody = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 700px) {
    width: 45%;
  }
`;

export const ShortCuts = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2%;
  row-gap: 2%;
  padding: 1%;
  align-self: center;
  margin-top: auto;
`;

export const InfoContainer = styled.div`
  width: 80%;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  padding: 1rem;
  border-radius: 1rem;
  box-shadow: 0px 2px 20px 0px gray;
`;

export const InfoText = styled.div`
  color: white;
  text-align: center;
  font-weight: bolder;
`;
