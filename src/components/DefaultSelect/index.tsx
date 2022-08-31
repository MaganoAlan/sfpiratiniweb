import { ChangeEventHandler, ReactNode } from "react";
import { Select } from "./styles";

type Props = {
  children: ReactNode;
  onChange: ChangeEventHandler<HTMLSelectElement>;
};

export function DefaultSelect({ children, onChange }: Props) {
  return <Select onChange={onChange}>{children}</Select>;
}
