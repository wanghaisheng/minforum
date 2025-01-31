import Payment, { paymentProps } from './components/payment';
import { addAction } from 'extensions/hooks';
import { Extension } from 'interfaces/extension';

const FlutterwavePayment: Extension = {
  name: 'Flutterwave',
  initialize: () => {
    addAction('provider', () => 'Flutterwave');

    addAction('paymentModal', (props: paymentProps) => {
      return <Payment {...props} />;
    });
  }
};

export default FlutterwavePayment;
