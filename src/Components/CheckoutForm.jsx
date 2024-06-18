import React from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import Button from 'react-bootstrap/Button';

const CheckoutForm = ({ clientSecret, handleClose }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handlePayment = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      }
    });

    if (result.error) {
      console.error(result.error.message);
      alert('Payment failed');
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        alert('Booking successful!');
        handleClose();
      }
    }
  };

  return (
    <form onSubmit={handlePayment}>
      <CardElement />
      <Button className='btn btn-primary' type="submit" disabled={!stripe}>
        Pay with Card
      </Button>
    </form>
  );
};

export default CheckoutForm;
