import { Card, CardContent, CardHeader, CardTitle } from "../../../../../components/ui/card";

const AiRecomendations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Aegis Recomendations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"></div>
      </CardContent>
    </Card>
  );
};

export default AiRecomendations;
