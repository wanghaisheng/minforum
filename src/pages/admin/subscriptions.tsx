import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Text,
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
import SubscriptionModal from 'components/modals/subscription-modal';
import Sidebar from 'components/admin/sidebar';
import SubscriptionStore from 'stores/platform-subscription';
import { subscriptionProp } from 'interfaces/subscription';
import Auth from 'components/admin/auth';
import { format } from 'date-fns';
import { es, fr, enUS } from 'date-fns/locale';
import { useTranslation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import useSettings from 'components/settings';
import { formatNumber } from 'components/api/utils';

const Subscription = observer(() => {
  const token = useToken();
  const [modal, toggleModal] = useState(false);
  const settings = useSettings();

  const [
    {
      loading,
      page,
      limit,
      total,
      subscription,
      subscriptions,
      setPage,
      setSubscription,
      getSubscriptions,
      searchSubscriptions
    }
  ] = useState(() => new SubscriptionStore());

  useEffect(() => {
    getSubscriptions();
  }, [token?.id]);

  const paginate = (val: number) => {
    setPage(val);
    getSubscriptions();
  };

  const handleSearch = (e: any) => {
    setPage(1);
    let value = e.target.value;
    value.length ? searchSubscriptions(value) : getSubscriptions();
  };

  const handleView = (val: subscriptionProp) => {
    setSubscription(val);
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

  const renderStatus = (value: string, rowData: any) => {
    return rowData.active ? (
      <Badge type="success">
        <Translation lang={settings?.language} value="Active" />
      </Badge>
    ) : (
      <Badge type="error">
        <Translation lang={settings?.language} value="Inactive" />
      </Badge>
    );
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
        title={useTranslation({
          lang: settings?.language,
          value: 'Subscriptions'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Subscriptions'
        })}
      />

      <SubscriptionModal
        lang={settings?.language}
        loading={loading}
        show={modal}
        data={subscription}
        currency={settings?.payment?.currency}
        toggleModal={() => toggleModal(!modal)}
      />
      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="subscriptions"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <SearchHeading
            title={`${useTranslation({
              lang: settings?.language,
              value: 'Subscriptions'
            })} (${subscriptions.length})`}
            placeholder={useTranslation({
              lang: settings?.language,
              value: 'Search....'
            })}
            onChange={handleSearch}
          />

          <Table width={'100%'} data={subscriptions}>
            <Table.Column
              prop="amount"
              label={useTranslation({
                lang: settings?.language,
                value: 'Amount'
              })}
              render={renderAmount}
            />
            <Table.Column
              prop="active"
              label={useTranslation({
                lang: settings?.language,
                value: 'Status'
              })}
              render={renderStatus}
            />
            <Table.Column
              prop="createdAt"
              label={useTranslation({
                lang: settings?.language,
                value: 'Date'
              })}
              render={renderDate}
            />
            <Table.Column
              prop="action"
              label={useTranslation({
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

export default Subscription;
