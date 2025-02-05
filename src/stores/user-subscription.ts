import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { subscriptionProp } from 'interfaces/subscription';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class SubscriptionStore {
  @observable loading: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 20;
  @observable subscription: subscriptionProp = {};
  @observable subscriptions: subscriptionProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setSubscription = (data: subscriptionProp) => {
    this.subscription = data;
  };

  @action newSubscription = async (body: subscriptionProp) => {
    let url = `${API_URL}/transaction/user`;

    runInAction(() => {
      this.loading = true;
    });

    return await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action getSubscription = async (slug: string, userId: string) => {
    let url = `${API_URL}/user-subscription/${slug}?userId=${userId}`;

    runInAction(() => {
      this.loading = false;
    });

    return await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          runInAction(() => {
            this.loading = false;
          });

          return true;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getSubscriptions = async () => {
    runInAction(() => {
      this.loading = true;
    });
    let url = `${API_URL}/user-subscription?page=${this.page}&limit=${this.limit}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        runInAction(() => {
          if (res.success) {
            this.subscriptions = res.data;
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
      })
      .catch((err) => console.log(err));
  };

  @action searchSubscriptions = async (query: string) => {
    runInAction(() => {
      this.loading = true;
    });
    let url = `${API_URL}/user-subscription/search?page=${this.page}&limit=${this.limit}&q=${query}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        runInAction(() => {
          if (res.success) {
            setTimeout(() => {
              this.subscriptions = res.data;
              this.loading = false;
            }, 1000);
          } else {
            this.loading = false;
          }
        });
      })
      .catch((err) => console.log(err));
  };
}
