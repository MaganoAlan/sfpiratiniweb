import styled from "styled-components";

export const Input = styled.input`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  border: none;
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.varela};
  width: 100%;
  padding-left: 10px;
  &:focus {
    outline: none;
  }
`;

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  padding: 10px;
  border: none;
  margin: 10px;
  border-radius: 4px;
  display: flex;
`;
