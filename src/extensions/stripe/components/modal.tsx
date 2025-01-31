import { useRef, useState } from 'react';
import { Spacer, Button, Modal } from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './payment';

enum StripeCurrency {
  USD = 'USD', // United States Dollar
  EUR = 'EUR', // Euro
  GBP = 'GBP', // British Pound Sterling
  CAD = 'CAD', // Canadian Dollar
  AUD = 'AUD', // Australian Dollar
  JPY = 'JPY', // Japanese Yen
  CHF = 'CHF', // Swiss Franc
  CNY = 'CNY', // Chinese Yuan
  SEK = 'SEK', // Swedish Krona
  NZD = 'NZD', // New Zealand Dollar
  MXN = 'MXN', // Mexican Peso
  SGD = 'SGD', // Singapore Dollar
  HKD = 'HKD', // Hong Kong Dollar
  NOK = 'NOK', // Norwegian Krone
  KRW = 'KRW', // South Korean Won
  TRY = 'TRY', // Turkish Lira
  INR = 'INR', // Indian Rupee
  BRL = 'BRL', // Brazilian Real
  ZAR = 'ZAR', // South African Rand
  AED = 'AED' // United Arab Emirates Dirham
}

type stripeProps = {
  loading: boolean;
  content?: string;
  show: boolean;
  amount: number;
  toggleModal: () => void;
  handlePayment: (value: any) => void;
};

const stripePromise = loadStripe(
  'pk_test_51MiZOKCq2U8KGNxTpnMeRxNGgcSwwwLRg5NIj3f6uUVI4iA80oGyxLiEgL4NvcifOeDpTpaQAPMBd7gkokuVnmLz00MwJDAdKu'
);

const StripeModal = observer((props: stripeProps) => {
  const { loading, content, show, amount, toggleModal, handlePayment } = props;

  return (
    <Modal visible={show} disableBackdropClick onClose={() => toggleModal()}>
      <Modal.Content>
        <Elements stripe={stripePromise}>
          <h3>{content}</h3>
          <h4>${amount} per month</h4>
          <Spacer />
          <PaymentForm amount={amount} />
          <Spacer />
          <Button width={'100%'} scale={1.5} onClick={() => toggleModal()}>
            Cancel
          </Button>
        </Elements>
      </Modal.Content>
    </Modal>
  );
});

export default StripeModal;
