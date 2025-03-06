import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Badge, Table, Pagination, Link, Select, Text } from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import { format } from 'date-fns';
import { es, fr, enUS } from 'date-fns/locale';
import AdminNavbar from 'components/admin/navbar';
import SearchHeading from 'components/search-heading';
import Sidebar from 'components/admin/sidebar';
import Auth from 'components/admin/auth';
import ReportStore from 'stores/report';
import { reportProp } from 'interfaces/report';
import toast, { Toaster } from 'react-hot-toast';
import DiscussionStore from 'stores/discussion';
import { translation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import useSettings from 'components/settings';

const Reports = observer(() => {
  const token = useToken();
  const settings = useSettings();
  const [{ updateDiscussion }] = useState(() => new DiscussionStore());
  const [{ loading, page, limit, total, reports, setPage, getReports }] =
    useState(() => new ReportStore());

  useEffect(() => {
    getReports();
  }, [token?.id]);

  const paginate = (val: number) => {
    setPage(val);
    getReports();
  };

  const handleChange = async (status: string, id: string) => {
    await updateDiscussion({ status, id }).then((res: any) => {
      if (res.success) {
        toast.success(
          translation({
            lang: settings?.language,
            value: 'Discussion status updated'
          })
        );
        getReports();
      } else {
        toast.error(
          translation({
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

  const renderType = (value: string) => {
    return <Translation lang={settings?.language} value={value} />;
  };

  const renderView = (value: string, rowData: reportProp) => {
    return (
      <Link target={'_blank'} icon href={`/d/${rowData.slug}`}>
        {translation({
          lang: settings?.language,
          value: 'View'
        })}
      </Link>
    );
  };

  const renderAction = (value: string, rowData: reportProp) => {
    return (
      <Select
        placeholder={translation({
          lang: settings?.language,
          value: 'Change status'
        })}
        // value={rowData.status}
        onChange={(value: any) => handleChange(value, rowData.post.id!)}
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
    );
  };

  return (
    <Auth roles={['admin', 'moderator']}>
      <AdminNavbar
        title={translation({
          lang: settings?.language,
          value: 'Reports'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Reports'
        })}
      />
      <Toaster />
      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="reports"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <SearchHeading
            title={`${translation({
              lang: settings?.language,
              value: 'Reports'
            })} (${reports.length})`}
            withoutSearch={true}
          />

          <Table width={'100%'} data={reports}>
            <Table.Column
              prop="title"
              label={translation({
                lang: settings?.language,
                value: 'Title'
              })}
            />
            <Table.Column
              prop="type"
              label={translation({
                lang: settings?.language,
                value: 'Type'
              })}
              render={renderType}
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
              prop="slug"
              label={translation({
                lang: settings?.language,
                value: 'Action'
              })}
              render={renderAction}
            />
            <Table.Column prop="post" label="" render={renderView} />
          </Table>

          {loading ? (
            <Text>
              <Translation lang={settings?.language} value="Loading" />
            </Text>
          ) : (
            ''
          )}

          {total >= limit ? (
            <div className="pagination">
              <Pagination
                count={Math.round(total / limit)}
                page={page}
                limit={7}
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

export default Reports;
