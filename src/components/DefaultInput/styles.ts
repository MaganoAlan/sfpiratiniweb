import styled from "styled-components";

export const Input = styled.input`
  background-color: white;
  border: none;
  font-size: 1rem;
  font-family: ${({ theme }) => theme.fonts.varela};
  width: 100%;
  padding-left: 0.625rem;
  &:focus {
    outline: none;
  }
`;

export const Container = styled.div`
  background-color: white;
  padding: 0.325rem;
  border: 1px solid gray;
  margin: 0.625rem;
  width: 100%;
  border-radius: 0.3rem;
  display: flex;
  align-items: center;
`;
