import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { userProp } from 'interfaces/user';
import { discussionProp } from 'interfaces/discussion';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class AnalyticsStore {
  @observable loading: boolean = false;
  @observable users: userProp[] = [];
  @observable discussions: discussionProp[] = [];
  @observable pageviews: discussionProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action getUsers = async (from: string, to: string) => {
    runInAction(() => {
      this.loading = true;
      this.users = [];
    });

    let url = `${API_URL}/analytics/users?from=${from}&to=${to}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          runInAction(() => {
            this.users = res.data;
            this.loading = false;
          });
        } else {
          runInAction(() => {
            this.loading = false;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  @action getDiscussions = async (from: string, to: string) => {
    runInAction(() => {
      this.loading = true;
      this.users = [];
    });

    let url = `${API_URL}/analytics/discussions?from=${from}&to=${to}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          runInAction(() => {
            this.discussions = res.data;
            this.loading = false;
          });
        } else {
          runInAction(() => {
            this.loading = false;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  @action getPageAnalytics = async (from: string, to: string) => {
    runInAction(() => {
      this.loading = true;
      this.users = [];
    });

    let url = `${API_URL}/analytics/pageviews?from=${from}&to=${to}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          runInAction(() => {
            this.pageviews = res.data;
            this.loading = false;
          });
        } else {
          runInAction(() => {
            this.loading = false;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  @action trackPage = async (body: any) => {
    let url = `${API_URL}/pageview/create`;

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
        if (res.success) {
          return { success: true };
        } else {
          return { success: false };
        }
      })
      .catch((err) => console.log(err));
  };
}
