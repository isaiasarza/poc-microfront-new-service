import SelectServiceTypeFormComponent from "@/components/select-service-type-form";
import { NextUIProvider } from "@nextui-org/react";

const SelectServiceTypePage = () => {
  const state = globalStore((state) => state);

  useEffect(() => {
    console.log("New Service S1 Microfrontend - global state:", state);
  });
  return (
    <div className="flex flex-1 justify-center justify-items-center w-90 h-100 items-center">
      <SelectServiceTypeFormComponent></SelectServiceTypeFormComponent>
    </div>
  );
};

export default SelectServiceTypePage;
