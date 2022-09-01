import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 18px;
    margin: 10px 0;
  }

  .next {
    text-align: center;
    padding: 0px 5px;
    color: ${({ theme }) => theme.colors.green[500]};
  }

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Image = styled.img`
  @media (max-width: 700px) {
    width: 100%;
  }
`;
