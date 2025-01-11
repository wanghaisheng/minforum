import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable } from 'mobx';
// import { paymentProp } from 'interfaces/payment';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class PaymentStore {
  @observable loading: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 20;
  @observable payment: any = {};
  @observable payments: any[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setPayment = (data: any) => {
    this.payment = data;
  };

  @action stripePayment = async (body: any) => {
    let url = `${API_URL}/payment/stripe`;

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
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action newPayment = async (body: any) => {
    let url = `${API_URL}/payment/create`;

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

  @action updatePayment = async (body: any) => {
    let url = `${API_URL}/payment/update`;

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

  @action getPayment = async (slug: string) => {
    let url = `${API_URL}/payment/${slug}`;
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
          this.payment = res.data;
          this.loading = false;
          return res.data;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getPayments = async () => {
    this.loading = true;
    let url = `${API_URL}/payment?page=${this.page}&limit=${this.limit}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          this.payments = res.data;
          this.loading = false;
        } else {
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  };
}
