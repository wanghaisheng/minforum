import { Badge, Modal, Text, Spacer } from '@geist-ui/core';
import dayjs from 'dayjs';
import { Translation } from 'components/intl/translation';
import { subscriptionProp } from 'interfaces/subscription';
import { formatNumber } from 'components/api/utils';

type userModalProps = {
  loading: boolean;
  show: boolean;
  lang: string;
  currency: string;
  data: subscriptionProp;
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
          <Text h3 className="capitalize">
            {currency} {formatNumber(data?.amount)}
          </Text>
          <Text>
            <Translation lang={lang} value="Name" />: @{data?.user?.name}
          </Text>
          <Text>
            <Translation lang={lang} value="Email" />: {data?.user?.email}
          </Text>
          <Text>
            <Translation lang={lang} value="Date" />:{' '}
            {dayjs(data.createdAt).format('MMM D, YYYY')}
          </Text>
          <Translation lang={lang} value="Status" />:{' '}
          {data.active ? (
            <Badge type="success">
              <Translation lang={lang} value="Active" />
            </Badge>
          ) : (
            <Badge type="error">
              <Translation lang={lang} value="Inactive" />
            </Badge>
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
