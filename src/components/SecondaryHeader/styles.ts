import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[600]};
  width: 100%;
  box-shadow: 2px 2px 11px gray;
  margin-bottom: 5%;
  margin-top: 1%;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-radius: 2rem;

  h2 {
    font-family: ${({ theme }) => theme.fonts.varela};
    width: 100%;
    text-align: center;
    color: white;
  }
`;
