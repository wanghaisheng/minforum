import { Badge, Modal, Text, Spacer } from '@geist-ui/core';
import moment from 'moment';
import { Translation } from 'components/intl/Translation';
import { transactionProp } from 'interfaces/transaction';
import { formatNumber } from 'components/api/utils';

type userModalProps = {
  loading: boolean;
  show: boolean;
  lang: string;
  currency: string;
  data: transactionProp;
  toggleModal: () => void;
};

const UserModal = (props: userModalProps) => {
  const { loading, show, lang, data, currency, toggleModal } = props;
  return (
    <>
      <Modal
        disableBackdropClick={show}
        className="modal"
        visible={show}
        onClose={toggleModal}
      >
        <Modal.Content>
          <Text h3>
            Ref ID: <span className="uppercase">{data?.referenceId}</span>
          </Text>
          <Text h3>
            {currency} {formatNumber(data?.amount)}
          </Text>
          <Text>{data?.narration}</Text>
          <Text>
            <Translation lang={lang} value="Username" />: @{data?.user?.name}
          </Text>
          <Text>
            <Translation lang={lang} value="Email" />: {data?.user?.email}
          </Text>
          <Text>
            <Translation lang={lang} value="Date" />:{' '}
            {moment(data.createdAt).format('MMM D, YYYY')}
          </Text>
          <Translation lang={lang} value="Status" />:{' '}
          {data.status === 'success' ? (
            <Badge type="success">
              <Translation lang={lang} value="Success" />
            </Badge>
          ) : data.status === 'failure' ? (
            <Badge type="error">
              <Translation lang={lang} value="Failure" />
            </Badge>
          ) : data.status === 'pending' ? (
            <Badge type="warning">
              <Translation lang={lang} value="Pending" />
            </Badge>
          ) : (
            ''
          )}
          <Spacer />
        </Modal.Content>
        <Modal.Action loading={loading} passive onClick={toggleModal}>
          <Translation lang={lang} value="Close" />
        </Modal.Action>
      </Modal>
    </>
  );
};

export default UserModal;
