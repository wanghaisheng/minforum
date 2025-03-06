import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { pageviewProp } from 'interfaces/pageview';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

type topProp = {
  country?: string;
  reduction?: number;
  group?: string;
};

export default class PageviewStore {
  @observable loading: boolean = false;
  @observable page: number = 1;
  @observable limit: number = 20;
  @observable total: number = 0;
  @observable pageview: pageviewProp = {};
  @observable pageviews: pageviewProp[] = [];
  @observable countries: topProp[] = [];
  @observable cities: topProp[] = [];
  @observable browsers: topProp[] = [];
  @observable referrers: topProp[] = [];
  @observable urls: topProp[] = [];
  @observable devices: topProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action getTopPageview = async (slug: string) => {
    runInAction(() => {
      this.loading = true;
    });
    let url = `${API_URL}/pageview/top/${slug}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res.success) {
          let categories = [
            'country',
            'city',
            'browser',
            'device',
            'referrer',
            'url'
          ];
          const categoryMap = {
            country: 'countries',
            city: 'cities',
            browser: 'browsers',
            device: 'devices',
            referrer: 'referrers',
            url: 'urls'
          };

          runInAction(() => {
            if (categories.includes(slug) || slug === 'page') {
              this[categoryMap[slug]] = res.data;
            }

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

  @action getPageviews = async () => {
    this.loading = true;
    let url = `${API_URL}/pageview?page=${this.page}&limit=${this.limit}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: any) => {
        if (res.success) {
          runInAction(() => {
            this.pageviews = res.data;
            this.total = res.count;
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
}
