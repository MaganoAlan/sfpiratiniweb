import styled from "styled-components";

export const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.gray[100]};
  height: 10vh;
  width: 100%;
  box-shadow: 2px 2px 11px gray;
  margin-bottom: 5%;
  padding: 15px;
  display: flex;
  align-items: center;

  h2 {
    font-family: ${({ theme }) => theme.fonts.roboto};
    width: 100%;
    text-align: center;
  }
`;
