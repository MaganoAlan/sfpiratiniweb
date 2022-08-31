import styled from "styled-components";

export const Select = styled.select`
  height: 6vh;
  width: 62vw;
  border: none;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  margin: 10px 0;
  font-family: ${({ theme }) => theme.fonts.varela};
`;
