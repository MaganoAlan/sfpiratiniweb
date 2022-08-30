import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 0px;
  border: 2px solid ${({ theme }) => theme.colors.secondary[600]};
  margin: 15px 0;
  box-shadow: 2px 2px 10px gray;
`;
