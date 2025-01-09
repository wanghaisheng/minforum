import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable } from 'mobx';
import { themeProp } from 'interfaces/theme';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class ThemeStore {
  @observable loading: boolean = true;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 20;
  @observable theme: themeProp = {};
  @observable themes: themeProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setTheme = (data: themeProp) => {
    this.theme = data;
  };

  @action newTheme = async (body: themeProp) => {
    let url = `${API_URL}/theme/create`;

    return await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          return { success: true, data: res.data };
        } else {
          return { success: false, message: res.message };
        }
      })
      .catch((err) => console.log(err));
  };

  @action updateTheme = async (body: themeProp) => {
    let url = `${API_URL}/theme/update`;

    return await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      },
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          return res;
        } else {
          return { success: false, message: res.message };
        }
      })
      .catch((err) => console.log(err));
  };

  @action getTheme = async (slug: string) => {
    let url = `${API_URL}/theme/${slug}`;
    this.loading = true;

    return await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          this.theme = res.data;
          this.loading = false;
          return res.data;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getThemes = async () => {
    this.loading = true;
    let url = `${API_URL}/theme?page=${this.page}&limit=${this.limit}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          this.themes = res.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  };
}
