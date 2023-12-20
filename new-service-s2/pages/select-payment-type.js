import SelectPaymentTypeFormComponent from "@/components/select-payment-type-form";

const SelectPaymentTypePage = () => {
  const state = globalStore((state) => state);

  useEffect(() => {
    console.log("New Service S2 Microfrontend - global state:", state);
  });
  return (
    <div className="flex flex-1 justify-center justify-items-center w-100 h-100 items-center">
      <SelectPaymentTypeFormComponent></SelectPaymentTypeFormComponent>
    </div>
  );
};

export default SelectPaymentTypePage;
