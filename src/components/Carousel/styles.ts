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
  max-height: 25vh;
  vertical-align: middle;
  align-self: center;
`;

export const Teste = styled.div`
  height: 10rem;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  width: 100%;
`;
