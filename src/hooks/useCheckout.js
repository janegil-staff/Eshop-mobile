import { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { createPaymentIntent, createOrder } from '../api/orders';
import { useCartStore } from '../store/cartStore';
import { ENV } from '../config/env';

export function useCheckout() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // shipping: { shippingAddress1, shippingAddress2, city, zip, country, phone, user? }
  const pay = async (shipping) => {
    setError('');
    setLoading(true);
    try {
      const lineItems = items.map((i) => ({
        product: i.product.id || i.product._id,
        quantity: i.quantity,
      }));

      // 1. Get a client secret from our API (amount computed server-side).
      const { clientSecret } = await createPaymentIntent(lineItems);

      // 2. Initialise the Stripe payment sheet (Apple Pay enabled).
      const initRes = await initPaymentSheet({
        merchantDisplayName: ENV.MERCHANT_NAME,
        paymentIntentClientSecret: clientSecret,
        applePay: { merchantCountryCode: 'NO' },
        defaultBillingDetails: { phone: shipping.phone },
        returnURL: 'estore://stripe-redirect',
      });
      if (initRes.error) throw new Error(initRes.error.message);

      // 3. Present it. User pays (card or Apple Pay).
      const sheetRes = await presentPaymentSheet();
      if (sheetRes.error) {
        // Code 'Canceled' means the user dismissed — not a real error.
        if (sheetRes.error.code === 'Canceled') {
          setLoading(false);
          return { canceled: true };
        }
        throw new Error(sheetRes.error.message);
      }

      // 4. Payment succeeded — persist the order.
      const order = await createOrder({
        orderItems: lineItems.map((i) => ({
          quantity: i.quantity,
          product: i.product,
        })),
        shippingAddress1: shipping.shippingAddress1,
        shippingAddress2: shipping.shippingAddress2,
        city: shipping.city,
        zip: shipping.zip,
        country: shipping.country,
        phone: shipping.phone,
        status: 'Paid',
        user: shipping.user || undefined,
      });

      clear();
      setLoading(false);
      return { order };
    } catch (err) {
      setError(err.message || 'Payment failed');
      setLoading(false);
      return { error: err.message };
    }
  };

  return { pay, loading, error };
}