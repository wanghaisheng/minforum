import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import { Spacer, Button, Modal } from '@geist-ui/core';
import { formatNumber } from 'components/api/utils';
import useVariable from 'components/variable';

enum FlutterwaveCurrency {
  NGN = 'NGN', // Nigerian Naira
  GHS = 'GHS', // Ghanaian Cedi
  KES = 'KES', // Kenyan Shilling
  RWF = 'RWF', // Rwandan Franc
  ZAR = 'ZAR', // South African Rand
  TZS = 'TZS', // Tanzanian Shilling
  UGX = 'UGX', // Ugandan Shilling
  USD = 'USD' // United States Dollar
}

export type paymentProps = {
  title: string;
  amount: number;
  email: string;
  currency: FlutterwaveCurrency;
  reason: string;
  show: boolean;
  toggleModal: () => void;
  processPayment: (ref: string) => void;
};

const Payment = (props: paymentProps) => {
  const flw_key = useVariable('FLW_KEY');

  const {
    title,
    amount,
    email,
    currency,
    reason,
    show,
    toggleModal,
    processPayment
  } = props;

  const config: any = {
    public_key: flw_key,
    tx_ref: `flw${Date.now()}`,
    amount: amount,
    currency: currency,
    customer: {
      email: email
    },
    customizations: {
      title: title,
      description: reason
    }
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <Modal visible={show} disableBackdropClick onClose={() => toggleModal()}>
      <Modal.Content style={{ paddingTop: 0 }}>
        <h3>{title}</h3>
        <p>{reason}</p>
        <h4>
          {currency} {formatNumber(amount)} per month
        </h4>
        <Spacer />

        <Spacer />
        <div className="column">
          <div>
            <Button width={'100%'} scale={1.5} onClick={() => toggleModal()}>
              Cancel
            </Button>
          </div>
          <div>
            <Button
              width={'100%'}
              type="secondary-light"
              scale={1.5}
              onClick={() =>
                handleFlutterPayment({
                  callback: (response) => {
                    if (response?.status) {
                      processPayment(response.tx_ref);
                      closePaymentModal();
                    }
                  },
                  onClose: () => {}
                })
              }
            >
              Pay {currency}
              &nbsp;{formatNumber(amount)}
            </Button>
          </div>
        </div>
      </Modal.Content>
    </Modal>
  );
};

export default Payment;
