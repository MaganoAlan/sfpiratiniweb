import styled from "styled-components";

export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.alata};
  font-weight: 600;
  font-size: 16px;
  padding: 5px;
  border: none;
  border-radius: 5px;
  width: 15vw;
  min-width: 10vw;
  height: 6vh;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    filter: brightness(0.9);
    box-shadow: -4px 4px 10px gray;
  }

  @media (max-width: 700px) {
    min-width: 62vw;
  }
`;
