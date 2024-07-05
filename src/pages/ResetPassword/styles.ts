import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Title = styled.div`
  color: ${({ theme }) => theme.colors.primary[600]};
  font-family: ${({ theme }) => theme.fonts.varela};
  font-size: 1.4rem;
`;

export const Tip = styled.div`
  //color: ${({ theme }) => theme.colors.primary[600]};
  font-family: ${({ theme }) => theme.fonts.varela};
  font-size: 1rem;
  text-align: center;
  margin: 4% 0;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 80%;
  min-height: max-content;
  margin: auto;
  border-radius: 0.625rem;
  box-shadow: -4px 3px 14px 1px ${({ theme }) => theme.colors.gray[200]};
  padding: 1.875rem;
  background-color: ${({ theme }) => theme.colors.white};
`;

export const InputContainer = styled.div`
  width: 100%;
`;

export const ButtonContainer = styled.div`
  margin-top: 5%;
  width: 100%;
`;
