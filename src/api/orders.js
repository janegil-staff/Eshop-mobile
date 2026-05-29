import client from './client';

export const createPaymentIntent = async (items) => {
  const { data } = await client.post('/orders/create-payment-intent', { items });
  return data; // { clientSecret, amount, currency }
};

export const createOrder = async (order) => {
  const { data } = await client.post('/orders', order);
  return data;
};