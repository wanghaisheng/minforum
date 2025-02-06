import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Badge,
  Table,
  Pagination,
  Link,
  Select,
  Loading,
  Text,
  Button
} from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import AdminNavbar from 'components/admin/navbar';
import SearchHeading from 'components/search-heading';
import Sidebar from 'components/admin/sidebar';
import Auth from 'components/admin/auth';
import DiscussionStore from 'stores/discussion';
import { discussionProp } from 'interfaces/discussion';
import toast, { Toaster } from 'react-hot-toast';
import { useTranslation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import useSettings from 'components/settings';
import CustomIcon from 'components/data/icon/icon';

const Discussions = observer(() => {
  const token = useToken();
  const settings = useSettings();
  const [
    {
      loading,
      page,
      limit,
      total,
      discussions,
      setPage,
      getAdminDiscussions,
      updateDiscussion,
      searchDiscussion
    }
  ] = useState(() => new DiscussionStore());

  useEffect(() => {
    getAdminDiscussions(false);
  }, [token?.id]);

  const paginate = (val: number) => {
    setPage(val);
    getAdminDiscussions(true);
  };

  const handleSearch = (e: any) => {
    setPage(1);
    let value = e.target.value;
    value = value.trim();
    value.length ? searchDiscussion(value) : getAdminDiscussions(false);
  };

  const handleChange = async (status: string, id: string) => {
    await updateDiscussion({ status, id }).then((res: any) => {
      if (res.success) {
        toast.success(
          useTranslation({
            lang: settings?.language,
            value: 'Discussion status updated'
          })
        );
        getAdminDiscussions(false);
      } else {
        toast.error(
          useTranslation({
            lang: settings?.language,
            value: 'Unable to update status! Please try again later.'
          })
        );
      }
    });
  };

  const handlePin = async (isPinned: boolean, id: string) => {
    await updateDiscussion({ isPinned, id }).then((res: any) => {
      if (res.success) {
        toast.success(
          useTranslation({
            lang: settings?.language,
            value: 'Discussion status updated'
          })
        );
        getAdminDiscussions(false);
      } else {
        toast.error(
          useTranslation({
            lang: settings?.language,
            value: 'Unable to update status! Please try again later.'
          })
        );
      }
    });
  };

  const renderStatus = (value: string) => {
    let capitalize = value.charAt(0).toUpperCase() + value.slice(1);

    return value === 'banned' ? (
      <Badge type="error">
        <Translation lang={settings?.language} value="Banned" />
      </Badge>
    ) : value ? (
      <Badge type="success">
        <Translation lang={settings?.language} value={capitalize} />
      </Badge>
    ) : (
      <></>
    );
  };

  const renderView = (value: string, rowData: discussionProp) => {
    return (
      <Link target={'_blank'} icon href={`/d/${rowData.slug}`}>
        {useTranslation({
          lang: settings?.language,
          value: 'View'
        })}
      </Link>
    );
  };

  const renderAction = (value: string, rowData: discussionProp) => {
    return (
      <div className="column flow" style={{ marginBottom: 10 }}>
        <div>
          <Button
            auto
            scale={0.8}
            type={rowData.isPinned ? 'secondary-light' : 'default'}
            icon={
              <CustomIcon
                name="pin"
                size={25}
                color={rowData.isPinned ? '#fff' : '#000'}
                type="solid"
              />
            }
            onClick={() =>
              handlePin(rowData.isPinned ? false : true, rowData.id)
            }
          />
        </div>
        <div>
          <Select
            placeholder={useTranslation({
              lang: settings?.language,
              value: 'Change status'
            })}
            value={value}
            onChange={(value: any) => handleChange(value, rowData.id!)}
          >
            <Select.Option value="active">
              <Translation lang={settings?.language} value="Active" />
            </Select.Option>
            <Select.Option value="unanswered">
              <Translation lang={settings?.language} value="Unanswered" />
            </Select.Option>
            <Select.Option value="answered">
              <Translation lang={settings?.language} value="Answered" />
            </Select.Option>
            <Select.Option value="banned">
              <Translation lang={settings?.language} value="Banned" />
            </Select.Option>
          </Select>
        </div>
      </div>
    );
  };

  return (
    <Auth roles={['admin', 'moderator']}>
      <AdminNavbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Discussions'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Discussions'
        })}
      />
      <Toaster />
      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="discussions"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <SearchHeading
            placeholder={`${useTranslation({
              lang: settings?.language,
              value: 'Search....'
            })}`}
            title={`${useTranslation({
              lang: settings?.language,
              value: 'Discussions'
            })} (${discussions.length})`}
            onChange={handleSearch}
          />

          <Table
            width={'100%'}
            data={discussions.map((item) => ({
              ...item,
              view: item.view?.toString()
            }))}
          >
            <Table.Column
              prop="title"
              label={useTranslation({
                lang: settings?.language,
                value: 'Title'
              })}
            />
            <Table.Column
              prop="view"
              label={useTranslation({
                lang: settings?.language,
                value: 'View'
              })}
            />
            <Table.Column
              prop="status"
              label={useTranslation({
                lang: settings?.language,
                value: 'Status'
              })}
              render={renderStatus}
            />
            <Table.Column
              prop="action"
              label={useTranslation({
                lang: settings?.language,
                value: 'Action'
              })}
              render={renderAction}
            />
            <Table.Column prop="updatedAt" label="" render={renderView} />
          </Table>

          {loading ? (
            <Text>
              <Loading>
                <Translation lang={settings?.language} value="Loading" />
              </Loading>
            </Text>
          ) : (
            ''
          )}

          {total >= limit ? (
            <div className="pagination">
              <Pagination
                count={Math.round(total / limit)}
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

export default Discussions;
