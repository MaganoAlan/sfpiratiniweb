import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: red;
`;

export const Image = styled.img`
  width: 80%;
  min-height: 25vh;
  vertical-align: middle;
  align-self: center;
`;

export const Teste = styled.div`
  min-height: 10rem;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  width: 100%;
`;

export const Sub = styled.div`
  color: white;
  font-weight: bold;
`;
