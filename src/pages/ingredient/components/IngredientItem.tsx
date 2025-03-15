import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { IIngredient } from "@/interfaces/ingredient.interface";

import useIngredientApi from "@/api/ingredient.service";

type IngredientItemProps = {
  ingredient: IIngredient;
};

const IngredienteItem = ({ ingredient }: IngredientItemProps) => {
  const { removeIngredient } = useIngredientApi();
  const queryCLient = useQueryClient();

  const removeIngredientMutation = useMutation({
    mutationFn: removeIngredient,
    onSuccess: () => {
      toast.success("Ingrediente eliminado correctamente");
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const confirmDelete = (id: number) => {
    toast("¿Esta seguro de eliminar el ingrediente?", {
      action: {
        label: "Eliminar",
        onClick: () => removeIngredientMutation.mutate(id),
      },
      closeButton: true,
      position: "top-center",
      duration: 20000,
    });
  };

  return (
    <Card>
      <CardContent>
        <div className="flex justify-between items-center">
          <span className="font-medium text-center">{ingredient.name}</span>
          <Button
            variant="destructive"
            className="cursor-pointer"
            onClick={() => confirmDelete(ingredient.id!)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default IngredienteItem;
