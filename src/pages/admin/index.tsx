import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import moment from 'moment';
import { format } from 'date-fns';
import { es, fr, enUS, de, ja, ru, zhCN } from 'date-fns/locale';
import { Card, Text, Grid, Input } from '@geist-ui/core';
import CountUp from 'react-countup';
import dynamic from 'next/dynamic';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});
import Navbar from 'components/admin/Navbar';
import Sidebar from 'components/admin/Sidebar';
import Auth from 'components/admin/Auth';
import DateModal from 'components/modals/DateModal';
import AnalyticsStore from 'stores/analytics';
import SettingsStore from 'stores/settings';
import { useTranslation, Translation } from 'components/intl/Translation';
import useSocket from 'components/Socket';
import useToken from 'components/Token';

const Dashboard = observer(() => {
  const token = useToken();
  const socket = useSocket();
  const [modal, toggleDate] = useState(false);
  const [active, setActive] = useState(0);
  const [{ settings, getSettings }] = useState(() => new SettingsStore());
  const [
    { users, discussions, pageviews, getUsers, getDiscussions, getPageviews }
  ] = useState(() => new AnalyticsStore());

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    getSettings();
    let from = moment(date[0].startDate).format('YYYY-MM-DD');
    let to = moment(date[0].endDate).format('YYYY-MM-DD');
    getUsers(from, to);
    getDiscussions(from, to);
    getPageviews(from, to);

    return () => {
      socket ? socket.close() : null;
    };
  }, [active, token?.id]);

  socket?.on('activeUsers', (count) => {
    setActive(count);
  });

  const processAnalytics = async () => {
    let from = moment(date[0].startDate).format('YYYY-MM-DD');
    let to = moment(date[0].endDate).format('YYYY-MM-DD');
    getUsers(from, to);
    getDiscussions(from, to);
    getPageviews(from, to);
    toggleDate(false);
  };

  const series = [
    {
      name: useTranslation({
        lang: settings?.language,
        value: 'Users'
      }),
      data: users.map((item: any) => item.count)
    },
    {
      name: useTranslation({
        lang: settings?.language,
        value: 'Discussions'
      }),
      data: discussions.map((item: any) => item.count)
    },
    {
      name: useTranslation({
        lang: settings?.language,
        value: 'Pageviews'
      }),
      data: pageviews.map((item: any) => item.count)
    }
  ];

  const options: any = {
    chart: {
      height: 350,
      type: 'area'
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left'
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    xaxis: {
      type: 'datetime',
      categories: pageviews.map((item: any) => item.day)
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };

  const userTotal = users
    .map((item: any) => item.count)
    .reduce((a: number, b: number) => a + b, 0);

  const discussionTotal = discussions
    .map((item: any) => item.count)
    .reduce((a: number, b: number) => a + b, 0);

  const pageviewTotal = pageviews
    .map((item: any) => item.count)
    .reduce((a: number, b: number) => a + b, 0);

  const lang = settings.language;

  return (
    <Auth roles={['admin', 'moderator']}>
      <Navbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Dashboard'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Dashboard'
        })}
      />
      <DateModal
        show={modal}
        date={date}
        lang={lang}
        toggleModal={() => toggleDate(!modal)}
        setDate={setDate}
        actionTrigger={processAnalytics}
      />
      <div className="page-container top-100">
        <Sidebar role={token?.role} active="users" lang={settings?.language} />

        <main className="main for-admin">
          <div className="dashboard-header">
            <div className="item">
              <Text h3>
                <Translation lang={settings?.language} value="Dashboard" />
              </Text>
            </div>
            <div className="item">
              <Input
                width="100%"
                placeholder={`${format(date[0].startDate, 'MMM d, yyyy', {
                  locale:
                    lang === 'es'
                      ? es
                      : lang === 'fr'
                        ? fr
                        : lang === 'en'
                          ? enUS
                          : lang === 'ru'
                            ? ru
                            : lang === 'de'
                              ? de
                              : lang === 'cn'
                                ? zhCN
                                : lang === 'ja'
                                  ? ja
                                  : null
                })} - ${format(date[0].endDate, 'MMM d, yyyy', {
                  locale:
                    lang === 'es'
                      ? es
                      : lang === 'fr'
                        ? fr
                        : lang === 'en'
                          ? enUS
                          : lang === 'ru'
                            ? ru
                            : lang === 'de'
                              ? de
                              : lang === 'cn'
                                ? zhCN
                                : lang === 'ja'
                                  ? ja
                                  : null
                })}`}
                onClick={() => toggleDate(true)}
              />
            </div>
          </div>

          <Grid.Container gap={2}>
            <Grid xs={24} md={6}>
              <Card shadow width={'100%'}>
                <Text h3 my={0}>
                  <CountUp prefix="" start={0} end={active} separator="," />
                </Text>
                <Text h6 my={0}>
                  <span style={{ color: '#36AF61' }}>&#x25cf; </span>
                  <Translation lang={settings?.language} value="Online users" />
                </Text>
              </Card>
            </Grid>
            <Grid xs={24} md={6}>
              <Card shadow width={'100%'}>
                <Text h3 my={0}>
                  <CountUp prefix="" start={0} end={userTotal} separator="," />
                </Text>
                <Text h6 my={0}>
                  <Translation lang={settings?.language} value="Users" />
                </Text>
              </Card>
            </Grid>
            <Grid xs={24} md={6}>
              <Card shadow width={'100%'}>
                <Text h3 my={0}>
                  <CountUp
                    prefix=""
                    start={0}
                    end={discussionTotal}
                    separator=","
                  />
                </Text>
                <Text h6 my={0}>
                  <Translation lang={settings?.language} value="Discussions" />
                </Text>
              </Card>
            </Grid>
            <Grid xs={24} md={6}>
              <Card shadow width={'100%'}>
                <Text h3 my={0}>
                  <CountUp
                    prefix=""
                    start={0}
                    end={pageviewTotal}
                    separator=","
                  />
                </Text>
                <Text h6 my={0}>
                  <Translation lang={settings?.language} value="Pageviews" />
                </Text>
              </Card>
            </Grid>
            <Grid xs={24} md={24}>
              <Card shadow width={'100%'}>
                <Chart series={series} options={options} type="area" />
              </Card>
            </Grid>
          </Grid.Container>
        </main>
      </div>
    </Auth>
  );
});

export default Dashboard;
