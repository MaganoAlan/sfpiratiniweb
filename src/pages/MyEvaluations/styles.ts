import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 18px;
  }

  .next {
    text-align: center;
    padding: 0px 5px;
    color: ${({ theme }) => theme.colors.green[500]};
  }
`;

export const Image = styled.img`
  @media (max-width: 700px) {
    width: 100%;
  }
`;

export const SelectContainer = styled.div`
  width: 90%;
  margin: 4% auto;

  span {
    margin-left: 2%;
  }
`;
