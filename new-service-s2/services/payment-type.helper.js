export const fetchPaymentType = () => {
  return Promise.resolve([
    {
      type: "Tarjeta de Débito",
    },
    {
      type: "Tarjeta de Crédito",
    },
  ]);
};
