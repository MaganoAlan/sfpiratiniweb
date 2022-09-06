import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Res = styled.span`
  margin: 0 auto;
  margin-top: 5%;
  width: 100%;
  padding: 0 5%;
  text-align: justify;
  font-family: ${({ theme }) => theme.fonts.varela};
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5em;
  color: ${({ theme }) => theme.colors.green[500]};
`;

export const Image = styled.img`
  max-width: 100%;
`;
