import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Text,
  Link,
  Table,
  Pagination,
  Button,
  Loading,
  Spacer,
  Badge
} from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import AdminNavbar from 'components/admin/navbar';
import SearchHeading from 'components/search-heading';
import TransactionModal from 'components/modals/transaction-modal';
import Sidebar from 'components/admin/sidebar';
import TransactionStore from 'stores/transaction';
import { transactionProp } from 'interfaces/transaction';
import Auth from 'components/admin/auth';
import { format } from 'date-fns';
import { es, fr, enUS } from 'date-fns/locale';
import { translation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import useSettings from 'components/settings';
import { formatNumber } from 'components/api/utils';

const Transaction = observer(() => {
  const token = useToken();
  const [modal, toggleModal] = useState(false);
  const settings = useSettings();

  const [
    {
      loading,
      page,
      limit,
      total,
      transaction,
      transactions,
      setPage,
      setTransaction,
      getTransactions,
      searchTransactions
    }
  ] = useState(() => new TransactionStore());

  useEffect(() => {
    getTransactions();
  }, [token?.id]);

  const paginate = (val: number) => {
    setPage(val);
    getTransactions();
  };

  const handleSearch = (e: any) => {
    setPage(1);
    let value = e.target.value;
    value.length ? searchTransactions(value) : getTransactions();
  };

  const handleView = (val: transactionProp) => {
    setTransaction(val);
    toggleModal(true);
  };

  const renderAmount = (value: string, rowData: any) => {
    const amount: any = formatNumber(rowData?.amount);

    return (
      <b>
        {settings?.payment?.currency} {amount}
      </b>
    );
  };

  const renderDate = (value: string, rowData: any) => {
    const date: any = rowData?.createdAt
      ? format(new Date(rowData?.createdAt), 'MMM d, yyyy @ h:mm a', {
          locale:
            settings?.language === 'es'
              ? es
              : settings?.language === 'fr'
                ? fr
                : settings?.language === 'en'
                  ? enUS
                  : null
        })
      : '';
    return <span className="locale-time">{date}</span>;
  };

  const renderStatus = (value: string) => {
    return value === 'success' ? (
      <Badge type="success">
        <Translation lang={settings.language} value="Success" />
      </Badge>
    ) : value === 'failure' ? (
      <Badge type="error">
        <Translation lang={settings.language} value="Failure" />
      </Badge>
    ) : value === 'pending' ? (
      <Badge type="warning">
        <Translation lang={settings.language} value="Pending" />
      </Badge>
    ) : null;
  };

  const renderAction = (value: string, rowData: any) => {
    return (
      <Button
        type="secondary"
        ghost
        auto
        scale={0.5}
        onClick={() => handleView(rowData)}
      >
        <Translation lang={settings?.language} value="View" />
      </Button>
    );
  };

  return (
    <Auth roles={['admin']}>
      <AdminNavbar
        title={translation({
          lang: settings?.language,
          value: 'Transactions'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Transactions'
        })}
      />

      <TransactionModal
        lang={settings?.language}
        loading={loading}
        show={modal}
        data={transaction}
        currency={settings?.payment?.currency}
        toggleModal={() => toggleModal(!modal)}
      />
      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="transactions"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <SearchHeading
            title={`${translation({
              lang: settings?.language,
              value: 'Transactions'
            })} (${transactions.length})`}
            placeholder={translation({
              lang: settings?.language,
              value: 'Search....'
            })}
            onChange={handleSearch}
          />

          <Table width={'100%'} data={transactions}>
            <Table.Column
              prop="amount"
              label={translation({
                lang: settings?.language,
                value: 'Amount'
              })}
              render={renderAmount}
            />
            <Table.Column
              prop="narration"
              label={translation({
                lang: settings?.language,
                value: 'Narration'
              })}
            />
            <Table.Column
              prop="status"
              label={translation({
                lang: settings?.language,
                value: 'Status'
              })}
              render={renderStatus}
            />
            <Table.Column
              prop="createdAt"
              label={translation({
                lang: settings?.language,
                value: 'Date'
              })}
              render={renderDate}
            />
            <Table.Column
              prop="action"
              label={translation({
                lang: settings?.language,
                value: 'Action'
              })}
              render={renderAction}
            />
          </Table>
          <Spacer />
          {loading ? (
            <Loading>
              <Translation lang={settings?.language} value="Loading" />
            </Loading>
          ) : (
            ''
          )}

          {total! >= limit ? (
            <div className="pagination">
              <Pagination
                count={Math.round(total! / limit)}
                initialPage={page}
                limit={limit}
                onChange={paginate}
              >
                <Pagination.Next>
                  <ChevronRightCircle />
                </Pagination.Next>
                <Pagination.Previous>
                  <ChevronLeftCircle />
                </Pagination.Previous>
              </Pagination>
            </div>
          ) : (
            ''
          )}
        </main>
      </div>
    </Auth>
  );
});

export default Transaction;
