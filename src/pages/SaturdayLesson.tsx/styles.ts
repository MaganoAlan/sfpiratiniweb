import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-family: ${({ theme }) => theme.fonts.varela};
    font-size: 18px;
  }
`;

export const Select = styled.select`
  width: 62vw;
  height: 5vh;
  border-radius: 5px;
  padding: 5px;
  background-color: ${({ theme }) => theme.colors.gray[100]};
  font-size: 16px;
  border: none;
  font-family: ${({ theme }) => theme.fonts.varela};
  margin-bottom: 4%;

  &:focus {
    outline: none;
  }
`;

export const InfoSpan = styled.div`
  margin: auto;
  font-size: 1.3rem;
`;

export const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 60%;
`;

export const UserContainer = styled.div`
  margin: 0 auto;
  width: 65%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
