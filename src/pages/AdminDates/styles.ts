import styled from 'styled-components';

type BtnProps = {
  background?: string;
};

export const Container = styled.div`
  flex: 1;
`;

export const Card = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MatInput = styled.input`
  width: 80%;
  padding: 8px;
  outline: none;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 4%;
  `;

export const ModifyButton = styled.button<BtnProps>`
  background-color: ${({ theme, background }) =>
    background === "disabled" ? theme.colors.gray[300] : theme.colors.primary[600]};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  width: 80%;
`;

export const BlockButton = styled.button<BtnProps>`
  background-color: ${({ theme, background }) =>
    background === "block" ? 'green' : 'red'};
  color: #fff;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  width: 80%;
  margin-top: 4%;
`;

export const StudentLabel = styled.div`
  font-weight: medium;
  text-align: center;
  margin-bottom: 2%;
`;

export const Span = styled.span`
  font-weight: bold;
  text-align: center;
  margin-bottom: 2%;
`;