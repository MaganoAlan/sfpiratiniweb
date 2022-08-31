import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2%;
`;

export const LoginCard = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 30vw;
  margin: auto;
  border-radius: 10px;
  box-shadow: -4px 3px 14px 1px ${({ theme }) => theme.colors.gray[200]};
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.white};

  .btn {
    margin: 0 auto;
    margin-top: 2%;
  }

  @media (max-width: 700px) {
    max-width: 90vw;
  }
`;

export const Img = styled.img`
  width: 20vw;
  border-radius: 100%;
  margin: auto;
  margin-bottom: 2%;

  @media (max-width: 700px) {
    width: 60vw;
    margin-top: 10vh;
  }
`;

export const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.alata};
  color: ${({ theme }) => theme.colors.gray[300]};
  margin: 2%;
`;
