import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { IIngredient } from "@/interfaces/ingredient.interface";
import { Trash2 } from "lucide-react";

type IngredientItemProps = {
  ingredient: IIngredient;
};

const IngredienteItem = ({ ingredient }: IngredientItemProps) => {
  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="font-medium text-center">{ingredient.name}</span>
          <Button variant="destructive">
            <Trash2 size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IngredienteItem;
