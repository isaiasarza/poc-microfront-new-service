import SelectServiceTypeFormComponent from "@/components/select-service-type-form";
import { NextUIProvider } from "@nextui-org/react";

const SelectServiceTypePage = () => {
  return (
    <div className="flex flex-1 justify-center justify-items-center w-100 h-100 items-center">
      <SelectServiceTypeFormComponent></SelectServiceTypeFormComponent>
    </div>
  );
};

export default SelectServiceTypePage;
