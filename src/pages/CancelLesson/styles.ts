import styled from "styled-components";

export const Container = styled.div``;

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
