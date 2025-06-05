import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface StatusCardProps {
  title: string;
  value: number;
}

export function StatusCard({ title, value }: StatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h1>{title}</h1>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h2>{value}</h2>
      </CardContent>
    </Card>
  );
};