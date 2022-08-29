import { ReactNode, useState } from "react";
import { Container, Input } from "./styles";
import { Eye, EyeSlash } from "phosphor-react";

type Props = {
  type?: string;
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  icon?: ReactNode;
};

export default function DefaultInput({
  type,
  placeholder = "Default",
  value,
  onChange,
  icon,
}: Props) {
  const [visible, setVisible] = useState(false);
  return (
    <Container>
      {icon}
      <Input
        type={visible ? "text" : type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      {type === "password" && !visible ? (
        <Eye onClick={() => setVisible(!visible)} size={32} color="#7C7C8A" />
      ) : type === "password" && visible ? (
        <EyeSlash
          onClick={() => setVisible(!visible)}
          size={32}
          color="#7C7C8A"
        />
      ) : (
        ""
      )}
    </Container>
  );
}
