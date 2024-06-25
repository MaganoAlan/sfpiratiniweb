import styled from "styled-components";

export const Select = styled.select`
  width: 100%;
  border: 1px solid black;
  padding: 0.6rem;
  border-radius: 0.6rem;
  //background-color: ${({ theme }) => theme.colors.gray[100]};
  background-color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.varela};
`;
