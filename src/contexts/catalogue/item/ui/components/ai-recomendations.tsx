import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/contexts/shared/ui/components/shadcn/card";

const AiRecomendations = () => {
  return (
    <div className="border-b">
      <Card className="border-none bg-transparent">
        <CardHeader>
          <CardTitle>Aegis Recomendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AiRecomendations;
