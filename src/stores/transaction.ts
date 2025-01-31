import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { transactionProp } from 'interfaces/transaction';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class TransactionStore {
  @observable loading: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 20;
  @observable transaction: transactionProp = {};
  @observable transactions: transactionProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setTransaction = (data: transactionProp) => {
    this.transaction = data;
  };

  @action getTransaction = async (slug: string) => {
    let url = `${API_URL}/transaction/${slug}`;

    runInAction(() => {
      this.loading = false;
    });

    return await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          runInAction(() => {
            this.transaction = res.data;
            this.loading = false;
          });

          return res.data;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getTransactions = async () => {
    runInAction(() => {
      this.loading = true;
    });
    let url = `${API_URL}/transaction?page=${this.page}&limit=${this.limit}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        runInAction(() => {
          if (res.success) {
            this.transactions = res.data;
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
      })
      .catch((err) => console.log(err));
  };

  @action searchTransactions = async (query: string) => {
    runInAction(() => {
      this.loading = true;
    });
    let url = `${API_URL}/transaction/search?page=${this.page}&limit=${this.limit}&q=${query}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        runInAction(() => {
          if (res.success) {
            setTimeout(() => {
              this.transactions = res.data;
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
