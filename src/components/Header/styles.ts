import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2%;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.varela};
  box-shadow: 4px 4px 11px gray;
`;

export const TopInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  h2 {
    font-family: ${({ theme }) => theme.fonts.roboto};
  }
`;
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 2%;
  margin-right: 5%;
  margin-left: auto;
  width: 100%;
`;

export const UserName = styled.span`
  margin-right: auto;
  margin-left: 2%;
`;

export const LogoImg = styled.img`
  width: 5vw;
  border-radius: 100%;
  margin-right: 2%;

  @media (max-width: 700px) {
    width: 15vw;
  }
`;
