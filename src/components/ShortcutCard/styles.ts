import styled from "styled-components";

export const Card = styled.div`
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.roboto};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
  border-radius: 10px;
  height: 7.5rem;

  cursor: pointer;

  /* @media (max-width: 700px) {
    width: 100%;
    height: 15vh;
  } */
`;

export const Icon = styled.div``;

export const Title = styled.span`
  text-align: center;
`;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;
