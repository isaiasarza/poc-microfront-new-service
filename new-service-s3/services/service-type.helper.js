export const fetchServiceType = () => {
  return Promise.resolve([
    {
      type: "Mi TV",
      subTypes: [
        { type: "Standard", price: 100 },
        { type: "Pro", price: 200 },
        { type: "Pro Max", price: 400 },
        { type: "Ultimate", price: 800 },
      ],
    },
    {
      type: "Internet Satellite",
      subTypes: [
        { type: "Standard", price: 150 },
        { type: "Pro", price: 300 },
        { type: "Pro Max", price: 600 },
        { type: "Ultimate", price: 1200 },
      ],
    },
  ]);
};
