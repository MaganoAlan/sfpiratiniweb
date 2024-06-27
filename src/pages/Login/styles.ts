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
  align-items: center;
  max-width: 30vw;
  min-height: max-content;
  margin: auto;
  border-radius: 0.625rem;
  box-shadow: -4px 3px 14px 1px ${({ theme }) => theme.colors.gray[200]};
  padding: 1.875rem;
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
  width: 12.25rem;
  border-radius: 100%;
  margin-bottom: 15%;
  box-shadow: 0px 0px 14px ${({ theme }) => theme.colors.primary[600]};

  @media (max-width: 700px) {
    width: 12.25rem;
  }
`;

export const LoginContainer = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const DividerContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 1rem auto;
`;

export const Line = styled.div`
  border-bottom: 1px solid black;
  width: 100%;
`;

export const DividerText = styled.div`
  padding: 0px 1rem;
`;

export const GoogleLogo = styled.img`
  max-width: 1.2rem;
  margin-right: 0.5rem;
`;

export const Subtitle = styled.h2`
  font-family: ${({ theme }) => theme.fonts.alata};
  color: ${({ theme }) => theme.colors.gray[300]};
  margin: 2%;
`;

export const SpinnerContainer = styled.div`
  margin-top: 15%;
`;
