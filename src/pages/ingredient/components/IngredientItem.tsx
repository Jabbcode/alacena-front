import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CircleMinus, RefreshCw } from "lucide-react";

import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { IIngredient } from "@/interfaces/ingredient.interface";

import useIngredientApi from "@/api/ingredient.service";
import { format } from "date-fns";

type IngredientItemProps = {
  ingredient: IIngredient;
};

const IngredienteItem = ({ ingredient }: IngredientItemProps) => {
  const { cancelIngredient, renewIngredient } = useIngredientApi();
  const queryCLient = useQueryClient();

  const cancelIngredientMutation = useMutation({
    mutationFn: cancelIngredient,
    onSuccess: () => {
      toast.success("Ingrediente dado de baja correctamente");
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const confirmCancelIngredientMutation = (id: number) => {
    toast("¿Desea dar de baja el ingrediente?", {
      action: {
        label: "Aceptar",
        onClick: () => cancelIngredientMutation.mutate(id),
      },
      closeButton: true,
      position: "top-center",
      duration: 20000,
    });
  };

  const renewIngredientMutation = useMutation({
    mutationFn: renewIngredient,
    onSuccess: () => {
      toast.success("Ingrediente renovado correctamente");
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const confirmRenew = (id: number) => {
    toast("¿Esta seguro de renovar el ingrediente?", {
      action: {
        label: "Renovar",
        onClick: () => renewIngredientMutation.mutate(id),
      },
      closeButton: true,
      position: "top-center",
      duration: 20000,
    });
  };

  return (
    <Card className="grid grid-cols-2 gap-2 p-4">
      <div className="col-span-1">
        <CardTitle className="mb-2">
          <span className="font-medium">{ingredient.name}</span>
        </CardTitle>
        <CardDescription className="mb-2">
          <span className="font-light text-sm">Ultima compra: </span>
          <span className="font-medium text-sm">
            {format(ingredient.purchaseDate!, "dd/MM/yyyy")}
          </span>
        </CardDescription>
        <Badge variant={ingredient.isActive ? "default" : "destructive"}>
          {ingredient.isActive ? "Disponible" : "Por comprar"}
        </Badge>
      </div>

      <div className="col-span-1 flex justify-end items-center mr-4 gap-3">
        {ingredient.isActive && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <CircleMinus
                  size={18}
                  color="red"
                  className="cursor-pointer"
                  onClick={() =>
                    confirmCancelIngredientMutation(ingredient.id!)
                  }
                />
              </TooltipTrigger>
              <TooltipContent>Dar de baja</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <RefreshCw
                size={18}
                className="cursor-pointer hover:animate-spin"
                onClick={() => confirmRenew(ingredient.id!)}
              />
            </TooltipTrigger>
            <TooltipContent>Renovar</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </Card>
  );
};

export default IngredienteItem;
