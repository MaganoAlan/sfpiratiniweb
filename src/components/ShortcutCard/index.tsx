import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Card, Icon, Title } from "./styles";

type Props = {
  icon: ReactNode;
  title: string;
  link?: string;
};

export default function ShortcutCard({ icon, title, link = "" }: Props) {
  return (
    <Card>
      <Link
        style={{
          textDecoration: "none",
          color: "inherit",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
        to={link}
      >
        <Icon>{icon}</Icon>
        <Title>{title}</Title>
      </Link>
    </Card>
  );
}
