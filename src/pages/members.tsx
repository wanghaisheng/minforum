import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import {
  Spacer,
  Text,
  Card,
  Loading,
  Pagination,
  Avatar
} from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle } from '@geist-ui/icons';
import { LicenseIcon, Medal06Icon } from 'hugeicons-react';
import Navbar from 'components/Navbar';
import { observer } from 'mobx-react-lite';
import UserStore from 'stores/user';
import useToken from 'components/Token';
import { pluralize, oneKFormat } from 'components/api/utils';
import { Translation } from 'components/intl/Translation';
import useSettings from 'components/settings';

const Members = observer(() => {
  const token = useToken();
  const settings = useSettings();
  const [{ loading, page, limit, total, users, setPage, getUsers }] = useState(
    () => new UserStore()
  );

  useEffect(() => {
    getUsers();
  }, [token]);

  const paginate = () => {
    setPage(page + 1);
    getUsers();
  };

  const user = users.map((item) => (
    <div className="pointer" key={item.id}>
      <NextLink href={`/u/${item.username}`}>
        <Card shadow className="notification-card">
          <div className="notification">
            <div className="one">
              <Avatar
                src={
                  item.photo ? `/storage/${item.photo}` : '/images/avatar.png'
                }
                w={2}
                h={2}
              />
            </div>
            <div className="two">
              <Text h4 className="text">
                {item.name}
                <Spacer inline />
                <small>@{item.username}</small>
              </Text>
              <Text small className="lowercase">
                <span className="icon-fit">
                  <LicenseIcon size={14} />
                </span>
                {oneKFormat(item.discussion!)}{' '}
                <Translation
                  lang={settings?.language}
                  value={`Discussion${pluralize(item.discussion!)}`}
                />
                <Spacer w={1} inline />
                <span className="icon-fit">
                  <Medal06Icon size={14} />
                </span>
                {oneKFormat(item.point!)}{' '}
                <span>
                  <Translation
                    lang={settings?.language}
                    value={`point${pluralize(item.point!)}`}
                  />
                </span>
              </Text>
            </div>
          </div>
        </Card>
      </NextLink>
    </div>
  ));

  return (
    <div>
      <Navbar title="Members" description="Members" />
      <div className="page-container top-100">
        <div className="notification-container">
          <div className="column">
            <div>
              <Text h3>
                <Translation lang={settings?.language} value={'Members'} />
              </Text>
            </div>
          </div>

          <Spacer h={2} />
          {loading ? (
            <Loading>
              <Translation lang={settings?.language} value="Loading" />
            </Loading>
          ) : (
            user
          )}

          <Spacer />

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

          <Spacer h={5} />
        </div>
      </div>
    </div>
  );
});

export default Members;
