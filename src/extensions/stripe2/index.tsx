import Sample from './components/sample';
import { addAction } from '../hooks';
import { Plugin } from 'interfaces/plugin';
import toast from 'react-hot-toast';

const StripePlugin: Plugin = {
  name: 'stripe2',
  initialize: () => {
    // Register a custom component
    addAction('doGood', () => {
      toast.success('Payment made successfully');
    });
    addAction('sample', () => {
      return <Sample />;
    });
  }
};

export default StripePlugin;
