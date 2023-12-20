import ConfirmServiceSubscriptionFormComponent from "@/components/confirm-service-subscription-form";
import { useEffect } from "react";
import globalStore from "shell/globalStore";
const ConfirmServiceSubscriptionPage = () => {
  const state = globalStore((state) => state);

  useEffect(() => {
    console.log("New Service S3 Microfrontend - global state:", state);
  });

  return (
    <div className="flex flex-1 justify-center justify-items-center w-100 h-100 items-center">
      <ConfirmServiceSubscriptionFormComponent></ConfirmServiceSubscriptionFormComponent>
    </div>
  );
};

export default ConfirmServiceSubscriptionPage;
