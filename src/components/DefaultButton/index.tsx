import { Button } from "./styles";

type Props = {
  title: string;
  onClick: () => void;
};

export default function DefaultButton({ title, onClick }: Props) {
  return <Button onClick={onClick}>{title}</Button>;
}
