import { Card, CardBody, CardHeader, Divider, User } from "@nextui-org/react";

const MyAccountComponent = () => {
  const accountInfo = {
    user: {
      selfie: "https://i.pravatar.cc/150?u=a04258114e29026702d",
      name: "María Esteban Quito",
    },

    account: {
      status: "Activa",
      expiration: "20/12/2023",
      services: ["Mi TV Plus Max", "Internet Satellit Pro"],
    },
  };
  return (
    <Card className="w-[30rem]">
      <CardHeader className="flex gap-3">
        <User
          name=""
          description=""
          avatarProps={{
            src: accountInfo.user.selfie,
          }}
        />
        <div className="flex flex-col">
          <p className="text-md">Mi Cuenta</p>
          <p className="text-small text-default-500">{accountInfo.user.name}</p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>
          Estado:{" "}
          <span style={{ fontWeight: "bold" }}>
            {accountInfo.account.status}.
          </span>
        </p>
        <p>
          Servicios Contratados:{" "}
          <span style={{ fontWeight: "bold" }}>
            {accountInfo.account.services.join(",")}.
          </span>
        </p>
        <p>
          Venc. Prox Factura:{" "}
          <span style={{ fontWeight: "bold" }}>
            {accountInfo.account.expiration}.
          </span>
        </p>
      </CardBody>
    </Card>
  );
};

export default MyAccountComponent;
