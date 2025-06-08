import { Badge } from "../ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { LockIcon, LockOpen } from "lucide-react";

interface TaskCardProps {
  title: string;
  description: string;
  createdAt: string;
  dueDate: string;
  stake: number;
}

export function TaskCard({ title, description, createdAt, dueDate, stake }: TaskCardProps) {

  const CloseIcon = () => (
    <Button
      variant="ghost"
      size="sm"
      className="p-1 rounded-full bg-red-200 hover:bg-red-300"
    >
      <LockIcon />
    </Button>
  );

  const CheckIcon = () => (
    <Button
      variant="ghost"
      size="sm"
      className="p-1 rounded-full bg-green-500 hover:bg-green-600"
    >
      <LockOpen />
    </Button>
  );
  
  return (
    <Card>
      <CardHeader className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg">{title}</h1>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default">Pendente</Badge>
        </div>
      </CardHeader>
      <CardContent>
          <p className="text-sm text-muted-foreground">
            {createdAt} - {dueDate}
          </p>
      </CardContent>
      <CardFooter className="flex justify-between">
         <div className="flex flex-col gap-2">
            <p className="text-sm text-muted-foreground">texto</p>
         </div>
         <span>{stake} wei</span>
      </CardFooter>

    </Card>
  );
};