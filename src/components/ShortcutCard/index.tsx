import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Icon, Link, Title } from "./styles";

type Props = {
  icon: ReactNode;
  title: string;
  path?: string;
  link?: string;
};

export default function ShortcutCard({ icon, title, path = "", link }: Props) {
  const navigate = useNavigate();
  return (
    <Card onClick={() => navigate(path)}>
      <Icon>{icon}</Icon>
      <Title>
        <Link href={link}>{title}</Link>
      </Title>
    </Card>
  );
}
