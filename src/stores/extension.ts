import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { extensionProp } from 'interfaces/extension';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class ExtensionStore {
  @observable loading: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 20;
  @observable extension: extensionProp = {};
  @observable extensions: extensionProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setExtension = (data: extensionProp) => {
    this.extension = data;
  };

  @action removeExtension = async (body: extensionProp) => {
    let url = `${API_URL}/extension/remove`;

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
          return { success: true, data: res.data };
        } else {
          return { success: false, message: res.message };
        }
      })
      .catch((err) => console.log(err));
  };

  @action updateExtension = async (body: extensionProp) => {
    let url = `${API_URL}/extension/update`;

    return await fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
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

  @action getExtension = async (slug: string) => {
    let url = `${API_URL}/extension/${slug}`;

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
            this.extension = res.data;
            this.loading = false;
          });

          return res.data;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getExtensions = async () => {
    runInAction(() => {
      this.loading = true;
    });
    let url = `${API_URL}/extension?page=${this.page}&limit=${this.limit}`;

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
            this.extensions = res.data;
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
      })
      .catch((err) => console.log(err));
  };

  @action uploadExtension = async (body: any, name: string) => {
    let url = `${API_URL}/extension/upload?name=${name}`;

    return await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: encrypt(API_KEY)
      },
      body: body
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
}
