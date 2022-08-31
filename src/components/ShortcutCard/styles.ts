import styled from "styled-components";

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.varela};
  height: 15vh;
  width: 30vw;
  margin: auto;
  margin-top: 2%;
  display: flex;
  align-items: center;
  padding: 2%;
  border-radius: 10px;
  cursor: pointer;

  @media (max-width: 700px) {
    width: 80vw;
    height: 15vh;
  }
`;

export const Icon = styled.div`
  margin-right: auto;
  margin-left: 5%;
`;

export const Title = styled.span`
  margin: auto;
  width: 100%;
  text-align: center;
`;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;
