import { useRef, useState } from 'react';
import Link from 'next/link';
import { Spacer, Button, Modal } from '@geist-ui/core';
import { observer } from 'mobx-react-lite';
import { Translation } from 'components/intl/Translation';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from 'components/data/stripe/payment';

type stripeProps = {
  lang?: string;
  loading: boolean;
  content?: string;
  show: boolean;
  amount: number;
  toggleModal: () => void;
  save: (value: any) => void;
};

const stripePromise = loadStripe(
  'pk_test_51MiZOKCq2U8KGNxTpnMeRxNGgcSwwwLRg5NIj3f6uUVI4iA80oGyxLiEgL4NvcifOeDpTpaQAPMBd7gkokuVnmLz00MwJDAdKu'
);

const StripeModal = observer((props: stripeProps) => {
  const { lang, loading, content, show, amount, toggleModal, save } = props;

  return (
    <Modal visible={true}>
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
