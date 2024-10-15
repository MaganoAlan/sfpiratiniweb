import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
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

  @media (max-width: 700px) {
    max-width: 90vw;
  }
`;

export const Img = styled.img`
  width: 12.25rem;
  border-radius: 100%;
  margin-bottom: 15%;
  box-shadow: 0px 0px 14px ${({ theme }) => theme.colors.primary[600]};
`;

export const Subtitle = styled.h3`
  font-family: ${({ theme }) => theme.fonts.roboto};
  color: ${({ theme }) => theme.colors.gray[300]};
  margin: 2%;
`;

export const CancelContainer = styled.div`
  width: 100%;
  margin-top: 4%;
`;
