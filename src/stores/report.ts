import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { reportProp } from 'interfaces/report';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class ReportStore {
  @observable loading: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 50;
  @observable report: reportProp = {};
  @observable reports: reportProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setReport = (data: reportProp) => {
    this.report = data;
  };

  @action newReport = async (body: reportProp) => {
    let url = `${API_URL}/report/create`;

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

  @action updateReport = async (body: reportProp) => {
    let url = `${API_URL}/report/update`;

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

  @action getReport = async (slug: string) => {
    let url = `${API_URL}/report/${slug}`;

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
            this.report = res.data;
          });
          return res.data.id;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getReports = async () => {
    runInAction(() => {
      this.loading = true;
    });
    let url = `${API_URL}/report?page=${this.page}&limit=${this.limit}`;

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
            this.reports = res.data;
            this.loading = false;
          });
        } else {
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action searchReport = async (query: string) => {
    runInAction(() => {
      this.reports = [];
      this.loading = false;
    });
    let url = `${API_URL}/report/search?page=${this.page}&limit=${this.limit}&query=${query}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          setTimeout(() => {
            runInAction(() => {
              this.total = res.count;
              this.reports = res.data;
              this.loading = false;
            });
          }, 1000);
        } else {
          runInAction(() => {
            this.loading = false;
          });
        }
      })
      .catch((err) => console.log(err));
  };
}
