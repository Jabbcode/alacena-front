import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CirclePlus } from "lucide-react";
import { toast } from "sonner";

import IngredientList from "./components/IngredientList";

import FormCreateIngredient from "@/components/Form/FormCreateIngredient";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import MainLayout from "@/components/Layouts/MainLayout";

import useIngredientApi from "@/api/ingredient.service";
import { INITIAL_FORM_DATA } from "./constants";

const IngredientPage = () => {
  const queryCLient = useQueryClient();
  const { createIngredient, findAllIngredient } = useIngredientApi();

  const [form, setForm] = useState(INITIAL_FORM_DATA);

  const { data, isLoading, error } = useQuery({
    queryKey: ["ingredients"],
    queryFn: findAllIngredient,
  });

  const createIngredientMutation = useMutation({
    mutationFn: createIngredient,
    onSuccess: (response) => {
      toast.success(response.message);
      queryCLient.invalidateQueries();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleOnSubmit = async () => {
    createIngredientMutation.mutate({ name: form.name });
    setForm(INITIAL_FORM_DATA);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <MainLayout>
      <div className="mx-4">
        <Card className="w-full my-2">
          <CardContent className="flex items-center justify-between p-2">
            <h1 className="text-4xl font-bold">Alacena</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="cursor-pointer">
                  <CirclePlus />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Crear Plato</DialogTitle>
                </DialogHeader>
                <FormCreateIngredient form={form} setForm={setForm} />
                <DialogFooter>
                  <Button onClick={handleOnSubmit}>Crear</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
        {data && data.ingredients && (
          <IngredientList ingredients={data.ingredients} />
        )}
      </div>
    </MainLayout>
  );
};
export default IngredientPage;
