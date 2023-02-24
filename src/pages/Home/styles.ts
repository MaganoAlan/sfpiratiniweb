import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const ShortCuts = styled.div`
  width: 90%;
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2%;
  row-gap: 2%;
  padding: 1%;
  align-self: center;
`;
