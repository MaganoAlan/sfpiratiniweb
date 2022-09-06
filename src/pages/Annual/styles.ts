import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.span`
  margin: 0 auto;
  width: 100%;
  padding: 0 5%;
  text-align: justify;
  font-family: ${({ theme }) => theme.fonts.varela};
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5em;
`;

export const Image = styled.img`
  margin-top: 5%;
  margin-bottom: 5%;
`;
