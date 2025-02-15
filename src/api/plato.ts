import { axiosClient } from "@/helpers/axiosHelpers";
import { IPlato } from "@/interfaces/plato";

export const findAllPlatosService = async (): Promise<IPlato[]> => {
  const { data } = await axiosClient.get<IPlato[]>("/platos");
  return data;
};
