import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 5%;
`;

export const Text = styled.span`
  font-family: ${({ theme }) => theme.fonts.varela};
  margin-bottom: 2%;
`;

export const InfoText = styled.div`
  font-family: ${({ theme }) => theme.fonts.varela};
  margin: auto;
  width: 90%;
  font-size: 1.2rem;
  text-align: center;
`;
