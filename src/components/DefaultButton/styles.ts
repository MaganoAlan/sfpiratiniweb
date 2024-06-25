import styled from "styled-components";

type BtnProps = {
  background?: string;
};

export const Button = styled.button<BtnProps>`
  background-color: ${({ theme, background }) =>
    background === "primary" ? theme.colors.primary[600] : "white"};
  color: ${({ theme, background }) =>
    background === "primary" ? "white" : theme.colors.primary[600]};
  border: 1px solid ${({ theme }) => theme.colors.primary[600]};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 600;
  font-size: 1rem;
  padding: 0.6rem 0.3rem;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
    box-shadow: -4px 4px 10px gray;
  }

  @media (max-width: 700px) {
    //min-width: 54vw;
  }
`;
