import PlateItem from "./PlateItem";

import { IPlate } from "@/interfaces/plate.interface";

type PlateListProps = {
  plates: IPlate[];
};

const PlateList = ({ plates }: PlateListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {plates &&
        plates.map((plate) => {
          return <PlateItem plate={plate} key={plate.id} />;
        })}
    </div>
  );
};
export default PlateList;
