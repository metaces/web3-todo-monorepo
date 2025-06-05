import { Card, CardContent, CardHeader } from "../ui/card";

export function StakeCard() {
  return (
    // make card smaller
    <Card className="max-w-sm">
      <CardHeader className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Stake</h2>
        <span className="text-sm text-muted-foreground">Earn Rewards</span>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Stake your tokens to earn rewards and support the network.
        </p>
        {/* <div className="mt-4">
          <button className="px-2 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Stake Now
          </button>
        </div> */}
      </CardContent>
    </Card>
  );
};