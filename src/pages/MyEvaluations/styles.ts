import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span {
    font-size: 18px;
    margin: 10px 0;
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
