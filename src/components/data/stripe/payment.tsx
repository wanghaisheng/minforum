import { Button, Spacer, Card } from '@geist-ui/core';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import PaymentStore from 'stores/payment';

const PaymentForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [{ loading, setLoading, stripePayment }] = useState(
    () => new PaymentStore()
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    } else {
      const response = await stripePayment({ amount });

      const data = await response.data;
      console.log(data);

      const clientSecret = data;

      // Confirm the payment on the client side
      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)
          }
        });

      if (stripeError) {
        setError(stripeError.message);
        setLoading(false);
      } else {
        setError(null);
        setLoading(false);
        console.log('Payment succeeded:', paymentIntent);
        alert('Payment successful!');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardElement />
      </Card>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <Spacer />
      <Button
        width={'100%'}
        scale={1.5}
        type="secondary-light"
        htmlType="submit"
        disabled={!stripe || loading}
        loading={loading}
      >
        <b>{loading ? 'Processing...' : 'Pay'}</b>
      </Button>
    </form>
  );
};

export default PaymentForm;
