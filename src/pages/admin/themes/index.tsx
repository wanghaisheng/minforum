import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table,
  Button,
  Spacer,
  Text,
  Loading,
  Pagination
} from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle, Plus } from '@geist-ui/icons';
import Link from 'next/link';
import AdminNavbar from 'components/admin/navbar';
import SearchHeading from 'components/search-heading';
import Sidebar from 'components/admin/sidebar';
import Auth from 'components/admin/auth';
import ThemeStore from 'stores/theme';
import { translation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import useSettings from 'components/settings';

const Themes = observer(() => {
  const token = useToken();
  const settings = useSettings();
  const [{ loading, total, page, limit, themes, setPage, getThemes }] =
    useState(() => new ThemeStore());

  useEffect(() => {
    getThemes();
  }, [token?.id]);

  const paginate = (val: number) => {
    setPage(val);
    getThemes();
  };

  const renderStatus = (value: boolean) => {
    return (
      <Translation
        lang={settings?.language}
        value={value === true ? 'Active' : 'Inactive'}
      />
    );
  };

  const renderAction = (value: string, rowData: any) => {
    return (
      <Link href={`/admin/themes/${rowData.slug}`}>
        <Button type="secondary" ghost auto scale={0.5}>
          <Translation lang={settings?.language} value="Edit" />
        </Button>
      </Link>
    );
  };

  return (
    <Auth roles={['admin']}>
      <AdminNavbar
        title={translation({
          lang: settings?.language,
          value: 'Themes'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Themes'
        })}
      />

      <div className="page-container top-100">
        <Sidebar role={token?.role} active="themes" lang={settings?.language} />

        <main className="main for-admin">
          <SearchHeading
            title={`${translation({
              lang: settings?.language,
              value: 'Themes'
            })} (${themes.length})`}
            withoutSearch
          />
          <Link href="/admin/themes/new">
            <Button type="secondary" auto scale={0.7} icon={<Plus />}>
              <Translation lang={settings?.language} value="Add" />
            </Button>
          </Link>
          <Spacer />
          <Table width={'100%'} data={themes}>
            <Table.Column
              prop="title"
              label={translation({
                lang: settings?.language,
                value: 'Title'
              })}
            />
            <Table.Column
              prop="active"
              label={translation({
                lang: settings?.language,
                value: 'Status'
              })}
              render={renderStatus}
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
                page={page}
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

export default Themes;
