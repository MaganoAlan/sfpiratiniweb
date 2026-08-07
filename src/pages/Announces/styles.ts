import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (min-width: 700px) {
    width: 45%;
  }
`;

export const AnnounceCard = styled.div`
  width: 80%;
  margin: 1rem auto;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0.375rem;
  background-color: ${({ theme }) => theme.colors.primary[600]};
  box-shadow: 0px 2px 17px 0px ${({ theme }) => theme.colors.primary[600]};
`;

export const Title = styled.div`
color:white;
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;
export const Body = styled.div`
  color: white;
  font-size: 1rem;
  text-align: center;
`;

export const Buttons = styled.div`
  display: flex;
`;

export const Btn = styled.button`
  outline: none;
  border: none;
  background-color: #e93f4a;
  margin-top: 2rem;
  padding: 0.3rem;
  border-radius: 0.375rem;
`;

export const SubTitle = styled.div`
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 1rem;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  width: 70%;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.5rem;
  width: 100%;
`;

export const InputTitle = styled.input`
  border-radius: 0.375rem;
  border: 1px solid gray;
  padding: 0.5rem;
  outline: none;
`;

export const TextareaBody = styled.textarea`
  border-radius: 0.375rem;
  border: 1px solid gray;
  padding: 0.5rem;
  outline: none;
`;