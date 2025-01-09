import React, { useState, useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import {
  Table,
  Button,
  Spacer,
  Text,
  Loading,
  Pagination,
  Tabs,
  Card,
  Grid,
  Link,
  Input
} from '@geist-ui/core';
import { ChevronRightCircle, ChevronLeftCircle, Plus } from '@geist-ui/icons';
import AdminNavbar from 'components/admin/Navbar';
import SearchHeading from 'components/SearchHeading';
import Sidebar from 'components/admin/Sidebar';
import Auth from 'components/admin/Auth';
import AnalyticsStore from 'stores/analytics';
import SettingsStore from 'stores/settings';
import PageviewStore from 'stores/pageview';
import { useTranslation, Translation } from 'components/intl/Translation';
import DateModal from 'components/modals/DateModal';
import moment from 'moment';
import { formatNumber, oneKFormat } from 'components/api/utils';
import { format } from 'date-fns';
import { emojis } from 'components/data/emoji/emoji';
import { es, fr, enUS, de, ja, ru, zhCN } from 'date-fns/locale';
import dynamic from 'next/dynamic';
import useToken from 'components/Token';
const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const Analytics = observer(() => {
  const token = useToken();
  const [{ settings, getSettings }] = useState(() => new SettingsStore());
  const [store] = useState(() => new AnalyticsStore());
  const [modal, toggleDate] = useState(false);
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [
    {
      loading,
      total,
      page,
      limit,
      pageviews,
      countries,
      cities,
      devices,
      referrers,
      browsers,
      urls,
      setPage,
      getPageviews,
      getTopPageview
    }
  ] = useState(() => new PageviewStore());

  useEffect(() => {
    getSettings();
    getPageviews();
    getTopPageview('country');
    getTopPageview('city');
    getTopPageview('browser');
    getTopPageview('device');
    getTopPageview('referrer');
    getTopPageview('url');
    let from = moment(date[0].startDate).format('YYYY-MM-DD');
    let to = moment(date[0].endDate).format('YYYY-MM-DD');
    store.getPageviews(from, to);
  }, [token?.id]);

  const processAnalytics = async () => {
    let from = moment(date[0].startDate).format('YYYY-MM-DD');
    let to = moment(date[0].endDate).format('YYYY-MM-DD');
    store.getPageviews(from, to);
    toggleDate(false);
  };

  const paginate = (val: number) => {
    setPage(val);
    getPageviews();
  };

  const ellipsis = (val: string) => {
    if (val?.length >= 40) {
      val = val?.substring(0, 40);
      val = val + '...';
    }
    return val;
  };

  const renderLocation = (value: string, rowData: any) => {
    return `${rowData.city}, ${rowData.country}`;
  };

  const lang = settings?.language;

  const series = [
    {
      name: useTranslation({
        lang: settings?.language,
        value: 'Pageviews'
      }),
      data: store?.pageviews.map((item: any) => item.count)
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
      categories: store?.pageviews.map((item: any) => item.day)
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      }
    }
  };

  const browserIcon = (browser: string) => {
    const icons = {
      Firefox: '/images/firefox.svg',
      Chrome: '/images/chrome.svg',
      Safari: '/images/safari.svg',
      Edge: '/images/edge.svg',
      Opera: '/images/opera.svg',
      Brave: '/images/brave.svg',
      Vivaldi: '/images/vivaldi.svg',
      fallback: '/images/fallback.svg'
    };

    const normalizedBrowser = browser.toLowerCase().replace(/\s+/g, '');

    for (const [key, value] of Object.entries(icons)) {
      if (normalizedBrowser === key.toLowerCase()) {
        return value;
      }
    }

    return icons.fallback;
  };

  const deviceIcon = (device: string) => {
    const icons = {
      Phone: '/images/phone.png',
      Tablet: '/images/tablet.png',
      Desktop: '/images/desktop.png',
      SmartTV: '/images/tv.png',
      fallback: '/images/fallback.svg'
    };

    const normalizedDevice = device.toLowerCase().replace(/\s+/g, '');

    for (const [key, value] of Object.entries(icons)) {
      if (normalizedDevice === key.toLowerCase()) {
        return value;
      }
    }

    return icons.fallback;
  };

  const icons = useMemo(() => {
    return emojis.filter((item) => item.category === 'Flags');
  }, [emojis]);

  const countryIcon = (country: string) => {
    country = country ? country.trim().toLowerCase() : 'Unknown';

    const emoticons = icons.filter(
      (item) => item.name.toLowerCase() === `flag: ${country}`
    );

    let emoji = emoticons.length ? emoticons[0].emoji : '🏳';

    return emoji;
  };

  return (
    <Auth roles={['admin']}>
      <DateModal
        show={modal}
        date={date}
        lang={settings?.language}
        toggleModal={() => toggleDate(!modal)}
        setDate={setDate}
        actionTrigger={processAnalytics}
      />
      <AdminNavbar
        title={useTranslation({
          lang: settings?.language,
          value: 'Analytics'
        })}
        description={useTranslation({
          lang: settings?.language,
          value: 'Analytics'
        })}
      />

      <div className="page-container top-100">
        <Sidebar
          role={token?.role}
          active="analytics"
          lang={settings?.language}
        />

        <main className="main for-admin">
          <Text h3>
            <Translation lang={settings?.language} value="Analytics" />
          </Text>

          <Tabs initialValue="1" leftSpace={'0px'}>
            <Tabs.Item
              label={
                <Translation lang={settings?.language} value="Top Activities" />
              }
              value="1"
            >
              <Spacer />
              <Grid.Container gap={2}>
                <Grid xs={24} md={12}>
                  <Card shadow width={'100%'}>
                    <Text h5 my={0}>
                      <Translation
                        lang={settings?.language}
                        value="Top Pages"
                      />
                    </Text>
                    <Spacer />
                    {urls.map((item, index) => (
                      <Grid.Container gap={2} key={index}>
                        <Grid xs={20} md={20}>
                          <div>
                            <Link
                              target="_blank"
                              href={`${item.group}`}
                              icon
                              color
                              underline
                            >
                              <small>{ellipsis(item.group)}</small>
                            </Link>
                          </div>
                        </Grid>
                        <Grid xs={4} md={4}>
                          <div className="right-align">
                            <small>{oneKFormat(item.reduction)}</small>
                          </div>
                        </Grid>
                      </Grid.Container>
                    ))}
                  </Card>
                </Grid>
                <Grid xs={24} md={12}>
                  <Card shadow width={'100%'}>
                    <Text h5 my={0}>
                      <Translation
                        lang={settings?.language}
                        value="Top Sources"
                      />
                    </Text>
                    <Spacer />
                    {referrers.map((item, index) => (
                      <Grid.Container gap={2} key={index}>
                        <Grid xs={20} md={21}>
                          <div>
                            <Link
                              target="_blank"
                              href={`${item.group === 'Direct' ? '/' : item.group}`}
                              icon
                              color
                              underline
                            >
                              <small>{ellipsis(item.group)}</small>
                            </Link>
                          </div>
                        </Grid>
                        <Grid xs={4} md={3}>
                          <div className="right-align">
                            <small>{oneKFormat(item.reduction)}</small>
                          </div>
                        </Grid>
                      </Grid.Container>
                    ))}
                  </Card>
                </Grid>
                <Grid xs={20} md={12}>
                  <Card shadow width={'100%'}>
                    <Text h5 my={0}>
                      <Translation
                        lang={settings?.language}
                        value="Top Countries"
                      />
                    </Text>
                    <Spacer />
                    {countries.map((item, index) => (
                      <Grid.Container gap={2} key={index}>
                        <Grid xs={20} md={21}>
                          <div>
                            <small>
                              {countryIcon(item.group)} {''}
                              {item.group}
                            </small>
                          </div>
                        </Grid>
                        <Grid xs={4} md={3}>
                          <div className="right-align">
                            <small>{oneKFormat(item.reduction)}</small>
                          </div>
                        </Grid>
                      </Grid.Container>
                    ))}
                  </Card>
                </Grid>
                <Grid xs={24} md={12}>
                  <Card shadow width={'100%'}>
                    <Text h5 my={0}>
                      <Translation
                        lang={settings?.language}
                        value="Top Cities"
                      />
                    </Text>
                    <Spacer />
                    {cities.map((item, index) => (
                      <Grid.Container gap={2} key={index}>
                        <Grid xs={20} md={21}>
                          <div>
                            <small>
                              {countryIcon(item.country)} {''}
                              {item.group}
                            </small>
                          </div>
                        </Grid>
                        <Grid xs={4} md={3}>
                          <div className="right-align">
                            <small>{oneKFormat(item.reduction)}</small>
                          </div>
                        </Grid>
                      </Grid.Container>
                    ))}
                  </Card>
                </Grid>
                <Grid xs={24} md={12}>
                  <Card shadow width={'100%'}>
                    <Text h5 my={0}>
                      <Translation
                        lang={settings?.language}
                        value="Top Browsers"
                      />
                    </Text>
                    <Spacer />
                    {browsers.map((item, index) => (
                      <Grid.Container gap={2} key={index}>
                        <Grid xs={20} md={21}>
                          <div>
                            <img
                              src={`${browserIcon(item.group)}`}
                              style={{
                                position: 'relative',
                                top: 2,
                                width: 15
                              }}
                            />{' '}
                            <small>{item.group}</small>
                          </div>
                        </Grid>
                        <Grid xs={4} md={3}>
                          <div className="right-align">
                            <small>{oneKFormat(item.reduction)}</small>
                          </div>
                        </Grid>
                      </Grid.Container>
                    ))}
                  </Card>
                </Grid>
                <Grid xs={24} md={12}>
                  <Card shadow width={'100%'}>
                    <Text h5 my={0}>
                      <Translation
                        lang={settings?.language}
                        value="Top Devices"
                      />
                    </Text>
                    <Spacer />
                    {devices.map((item, index) => (
                      <Grid.Container gap={2} key={index}>
                        <Grid xs={20} md={21}>
                          <div>
                            <img
                              src={`${deviceIcon(item.group)}`}
                              style={{
                                position: 'relative',
                                top: 2,
                                width: 15
                              }}
                            />{' '}
                            <small>{item.group}</small>
                          </div>
                        </Grid>
                        <Grid xs={4} md={3}>
                          <div className="right-align">
                            <small>{oneKFormat(item.reduction)}</small>
                          </div>
                        </Grid>
                      </Grid.Container>
                    ))}
                  </Card>
                </Grid>
              </Grid.Container>
            </Tabs.Item>
            <Tabs.Item
              label={<Translation lang={settings?.language} value="Graph" />}
              value="2"
            >
              <Spacer />
              <Grid.Container>
                <Grid xs={12} md={16}>
                  <Text h5>Pageviews ({formatNumber(total)})</Text>
                </Grid>
                <Grid xs={12} md={8}>
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
                </Grid>
              </Grid.Container>
              <Spacer />
              <Chart series={series} options={options} type="area" />
            </Tabs.Item>
            {/* <Tabs.Item
              label={<Translation lang={settings?.language} value="Table" />}
              value="3"
            >
              <Text>
                <b>Pageview ({formatNumber(total)})</b>
              </Text>
              <Table width={'100%'} data={pageviews}>
                <Table.Column
                  prop="url"
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'URL'
                  })}
                />
                <Table.Column
                  prop="device"
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Device'
                  })}
                />
                <Table.Column
                  prop="browser"
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Browser'
                  })}
                />
                <Table.Column
                  prop="location"
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Location'
                  })}
                  render={renderLocation}
                />
                <Table.Column
                  prop="createdAt"
                  label={useTranslation({
                    lang: settings?.language,
                    value: 'Date'
                  })}
                  render={(value: string) =>
                    moment(value).format('MMM D, YYYY @ h:mm A')
                  }
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
            </Tabs.Item> */}
          </Tabs>
        </main>
      </div>
    </Auth>
  );
});

export default Analytics;
