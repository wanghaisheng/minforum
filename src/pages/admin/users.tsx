import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Text,
  Link,
  Table,
  Pagination,
  Button,
  Loading,
  Spacer
} from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import AdminNavbar from 'components/admin/navbar';
import SearchHeading from 'components/search-heading';
import UserModal from 'components/modals/UserModal';
import Sidebar from 'components/admin/sidebar';
import UserStore from 'stores/user';
import { userProp } from 'interfaces/user';
import toast, { Toaster } from 'react-hot-toast';
import Auth from 'components/admin/auth';
import { format } from 'date-fns';
import { es, fr, enUS } from 'date-fns/locale';
import { useTranslation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import useSettings from 'components/settings';

const Admin = observer(() => {
  const token = useToken();
  const [modal, toggleModal] = useState(false);
  const settings = useSettings();

  const [
    {
      loading,
      page,
      limit,
      total,
      user,
      users,
      setPage,
      setUser,
      getUsers,
      updateUser,
      searchUsers
    }
  ] = useState(() => new UserStore());

  useEffect(() => {
    getUsers('newest');
  }, [token?.id]);

  const paginate = (val: number) => {
    setPage(val);
    getUsers('newest');
  };

  const handleSearch = (e: any) => {
    setPage(1);
    let value = e.target.value;
    value.length ? searchUsers(value) : getUsers('newest');
  };

  const handleChange = async (val: userProp) => {
    await updateUser(val).then((res: any) => {
      if (res.success) {
        setUser(val);
        getUsers('newest');
        toast.success(
          useTranslation({
            lang: settings?.language,
            value: 'Profile updated successfully'
          })
        );
      } else {
        toast.error(
          useTranslation({
            lang: settings?.language,
            value: 'Unable to update profile. Please try again.'
          })
        );
      }
    });
  };

  const handleEdit = (val: userProp) => {
    setUser(val);
    toggleModal(true);
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

  const renderAction = (value: string, rowData: any) => {
    return (
      <Button
        type="secondary"
        ghost
        auto
        scale={0.5}
        onClick={() => handleEdit(rowData)}
      >
        <Translation lang={settings?.language} value="Edit" />
      </Button>
    );
  };

  const renderView = (value: string, rowData: any) => {
    return (
      <Link
        target="_blank"
        type="secondary"
        icon
        scale={0.7}
        href={`/u/${rowData.username}`}
      >
        <Translation lang={settings?.language} value="View" />
      </Link>
    );
  };

  return (
    <Auth roles={['admin']}>
      <AdminNavbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Users'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Users'
        })}
      />
      <Toaster />
      <UserModal
        lang={settings?.language}
        loading={loading}
        show={modal}
        data={user}
        toggleModal={() => toggleModal(!modal)}
        actionTrigger={handleChange}
      />
      <div className="page-container top-100">
        <Sidebar role={token?.role} active="users" lang={settings?.language} />

        <main className="main for-admin">
          <SearchHeading
            title={`${useTranslation({
              lang: settings?.language,
              value: 'Users'
            })} (${users.length})`}
            placeholder={useTranslation({
              lang: settings?.language,
              value: 'Search....'
            })}
            onChange={handleSearch}
          />

          <Table width={'100%'} data={users}>
            <Table.Column
              prop="name"
              label={useTranslation({
                lang: settings?.language,
                value: 'Name'
              })}
              className="capitalize"
            />
            <Table.Column
              prop="role"
              label={useTranslation({
                lang: settings?.language,
                value: 'Role'
              })}
            />
            <Table.Column
              prop="subscriptions"
              label={useTranslation({
                lang: settings?.language,
                value: 'Subscribers'
              })}
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
            <Table.Column prop="action2" label="" render={renderView} />
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

export default Admin;
