import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  margin-bottom: 0;
  margin-top: auto;
  box-shadow: 1px 7px 20px 0px gray;
`;

export const IconContainer = styled.div`
  color: ${({ theme }) => theme.colors.primary[600]};
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const IconText = styled.span`
  color: ${({ theme }) => theme.colors.primary[600]};
  font-family: ${({ theme }) => theme.fonts.varela};
  text-align: center;
  font-size: 0.8rem;
  padding-top: 0.5rem;
`;

export const Text = styled.span`
  color: ${({ theme }) => theme.colors.primary[600]};
  font-family: ${({ theme }) => theme.fonts.varela};
  text-align: center;
  margin-bottom: 2%;
`;

export const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;
