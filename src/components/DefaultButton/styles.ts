import styled from "styled-components";

type BtnProps = {
  background?: string;
};

export const Button = styled.button<BtnProps>`
  background-color: ${({ theme, background }) =>
    background === "primary" ? theme.colors.primary[600] : "lightgray"};
  color: ${({ theme, background }) =>
    background === "primary" ? "white" : theme.colors.primary[600]};
  font-family: ${({ theme }) => theme.fonts.roboto};
  font-weight: 600;
  font-size: 16px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  width: 15vw;
  min-width: 10vw;
  height: 5vh;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
    box-shadow: -4px 4px 10px gray;
  }

  @media (max-width: 700px) {
    min-width: 54vw;
  }
`;
