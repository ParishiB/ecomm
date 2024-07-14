import axios from "axios";

export const getItems = async () => {
  const response = await axios("https://fakestoreapi.com/products/20");
  console.log("The respone is:", response);
  console.log("The response data value is", response.data);
  return response.data;
};
