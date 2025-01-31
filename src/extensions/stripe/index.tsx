import { addAction } from 'extensions/hooks';
import { Extension } from 'interfaces/extension';
import toast from 'react-hot-toast';
import StripeModal from './components/modal';

const StripePlugin: Extension = {
  name: 'stripe',
  initialize: () => {
    // Register a custom component
    addAction('makePayment', () => {
      toast.success('Payment made successfully');
    });

    addAction(
      'paymentModal',
      (
        show: boolean,
        loading: boolean,
        amount: number,
        toggleModal,
        handlePayment
      ) => {
        return (
          <StripeModal
            show={show}
            loading={loading}
            amount={amount}
            toggleModal={toggleModal}
            handlePayment={handlePayment}
          />
        );
      }
    );
  }
};

export default StripePlugin;
