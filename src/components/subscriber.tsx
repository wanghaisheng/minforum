import { subscriptionProp } from 'interfaces/subscription';
import { useState, useEffect } from 'react';
import SubscriptionStore from 'stores/user-subscription';
import { Card, Text, Button, Spacer, Link, Grid } from '@geist-ui/core';
import { Translation } from './intl/Translation';
import CustomIcon from './data/icon/icon';

type paywallProps = {
  premium: boolean;
  plan: string;
  username: string;
  userId: string;
  children: JSX.Element | JSX.Element[] | string;
  language: string;
};

const useSubscription = (props: subscriptionProp) => {
  const [sub]: any = useState(() => new SubscriptionStore());
  const [subscription, setSubscription] = useState(null);

  console.log(props.plan, props.userId);

  useEffect(() => {
    const getSubscription = async () => {
      let active = await sub.getSubscription(props.plan, props.userId);
      active ? setSubscription(true) : setSubscription(false);
    };

    getSubscription();
  }, [sub]);

  return subscription;
};

export const Paywall = (props: paywallProps) => {
  const { premium, plan, username, userId, language } = props;
  const subscription = useSubscription({ plan, userId });

  if (premium === false) {
    return <div>{props.children}</div>;
  } else if (premium === true && plan === userId) {
    return <div>{props.children}</div>;
  } else if (premium === true && plan !== userId && subscription === true) {
    return <div>{props.children}</div>;
  } else if (premium === true && plan !== userId && subscription === false) {
    return (
      <>
        <div className="polkadot custom-modal all">
          <div className="inner">
            <Card shadow>
              <div className="center">
                <CustomIcon
                  name="crown"
                  size={50}
                  type="solid"
                  color="#8B00F6"
                />
                <Spacer h={2} />
                <Text h4>
                  <Translation
                    lang={language}
                    value={'Subscription is required to access premium content'}
                  />
                </Text>
                <Spacer h={2} />
                <Link href={`/u/${username}`}>
                  <Button
                    style={{
                      backgroundColor: '#8B00F6',
                      borderColor: '#8B00F6',
                      color: '#fff'
                    }}
                  >
                    <b>
                      <Translation lang={language} value={'Get access'} />
                    </b>
                  </Button>
                </Link>
                <Spacer />
              </div>
            </Card>
          </div>
        </div>
        <Grid.Container gap={2} justify="center">
          <Grid xs={24}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          <Grid xs={24}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          <Grid xs={24}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
        </Grid.Container>
        <Grid.Container gap={2} justify="center">
          <Grid xs={24}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={12}>
            <Card shadow width="100%" height="50px" />
          </Grid>
          <Grid xs={6}>
            <Card shadow width="100%" height="50px" />
          </Grid>
        </Grid.Container>
      </>
    );
  }
};

export default useSubscription;
