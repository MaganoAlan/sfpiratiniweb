import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  bottom: 0;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.white};
  font-family: ${({ theme }) => theme.fonts.varela};
  text-align: center;
  margin-bottom: 2%;
`;
