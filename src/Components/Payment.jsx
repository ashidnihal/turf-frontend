import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import { serverURL } from '../Services/serverURL';

const stripePromise = loadStripe('pk_test_51PJGohSBy7O37l9MmojKWKKkmAUKqDJ8VKxfKkV9RQWFaUXmMp3giAQJvIjvnKr7VuV3waqOMwfxrSASDjzKhrlh00PGDb6nPK');

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Customer Name',
        },
      },
    });

    if (payload.error) {
      setError(`Payment failed: ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setSucceeded(true);
      setProcessing(false);
    }
  };

  const createPaymentIntent = async () => {
    try {
      const response = await axios.post(`${serverURL}/turf/book`, {
        amount: 1000, // amount in cents
      });
      setClientSecret(response.data.clientSecret);
    } catch (error) {
      console.error('Error creating payment intent:', error);
    }
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  return (
    <form id="payment-form" className='m-5' onSubmit={handleSubmit}>
      <CardElement id="card-element" />
      <button className='btn btn-success mt-3' disabled={processing || succeeded} id="submit">
        <span id="button-text">
          {processing ? 'Processing...' : 'Pay now'}
        </span>
      </button>
      {error && <div className="card-error" role="alert">{error}</div>}
      {succeeded && <p>Payment succeeded!</p>}
    </form>
  );
};

const Payment = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Payment;
