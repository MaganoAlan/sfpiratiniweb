import { Button } from "./styles";

type Props = {
  title: string;
  onClick: () => void;
  background?: string;
};

export default function DefaultButton({
  title,
  onClick,
  background = "primary",
}: Props) {
  return (
    <Button background={background} onClick={onClick}>
      {title}
    </Button>
  );
}
