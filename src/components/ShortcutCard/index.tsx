import { ReactNode } from "react";
import { Card, Icon, Title } from "./styles";

type Props = {
  icon: ReactNode;
  title: string;
};

export default function ShortcutCard({ icon, title }: Props) {
  return (
    <Card>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </Card>
  );
}
