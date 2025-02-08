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
import CategoryStore from 'stores/category';
import UserStore from 'stores/user';
import { translation, Translation } from 'components/intl/translation';
import useToken from 'components/token';
import useSettings from 'components/settings';

const Categories = observer(() => {
  const token = useToken();
  const settings = useSettings();
  const [{ users, getModerators }] = useState(() => new UserStore());
  const [
    {
      loading,
      total,
      page,
      limit,
      categories,
      setPage,
      getCategories,
      searchCategory
    }
  ] = useState(() => new CategoryStore());

  useEffect(() => {
    getModerators();
    getCategories();
  }, [token?.id]);

  const handleSearch = (e: any) => {
    setPage(1);
    let value = e.target.value;
    value.length ? searchCategory(value) : getCategories();
  };

  const renderColor = (value: string) => {
    return (
      <div
        className="custom-badge"
        style={
          { '--category-color': value, marginTop: 15 } as React.CSSProperties
        }
      ></div>
    );
  };

  const paginate = (val: number) => {
    setPage(val);
    getCategories();
  };

  const renderAuth = (value: string) => {
    return <Translation lang={settings?.language} value={value} />;
  };
  const renderAction = (value: string, rowData: any) => {
    return (
      <Link href={`/admin/categories/${rowData.slug}`}>
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
          value: 'Categories'
        })}
        description={translation({
          lang: settings?.language,
          value: 'Categories'
        })}
      />

      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="categories"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <SearchHeading
            title={`${translation({
              lang: settings?.language,
              value: 'Categories'
            })} (${categories.length})`}
            placeholder={translation({
              lang: settings?.language,
              value: 'Search....'
            })}
            onChange={handleSearch}
          />
          <Link href="/admin/categories/new">
            <Button type="secondary" auto scale={0.7} icon={<Plus />}>
              <Translation lang={settings?.language} value="Add" />
            </Button>
          </Link>
          <Spacer />
          <Table width={'100%'} data={categories}>
            <Table.Column
              prop="title"
              label={translation({
                lang: settings?.language,
                value: 'Title'
              })}
            />
            <Table.Column
              prop="color"
              label={translation({
                lang: settings?.language,
                value: 'Color'
              })}
              render={renderColor}
            />
            <Table.Column
              prop="discussion"
              label={translation({
                lang: settings?.language,
                value: 'Discussions'
              })}
            />
            <Table.Column
              prop="authRequired"
              label={translation({
                lang: settings?.language,
                value: 'Authentication'
              })}
              render={renderAuth}
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

export default Categories;
