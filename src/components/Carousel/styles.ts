import styled from "styled-components";

export const Container = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  margin: auto;
  border-radius: 1rem;
`;

export const Image = styled.img`
  width: 80%;
  min-height: 25vh;
  vertical-align: middle;
  align-self: center;
`;

export const Teste = styled.div`
  min-height: 10rem;
  width: 40%;
  margin: auto;
`;

export const Sub = styled.div`
  color: white;
  font-weight: bold;
`;
