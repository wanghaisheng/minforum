import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable } from 'mobx';
import { messageProp } from 'interfaces/message';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class MessageStore {
  @observable loading: boolean = false;
  @observable nomore: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 100;
  @observable unread_message: number = 0;
  @observable status: string = '';
  @observable content: string = '';
  @observable channel: string = '';
  @observable message: messageProp = {};
  @observable messages: messageProp[] = [];
  @observable threads: messageProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setNomore = (data: boolean) => {
    this.nomore = data;
  };

  @action setContent = (data: string) => {
    this.content = data;
  };

  @action setStatus = (data: string) => {
    this.status = data;
  };

  @action setMessage = (data: messageProp) => {
    this.message = data;
  };

  @action setThreads = (data: messageProp[]) => {
    this.threads = data;
  };

  @action updateMessage = async (body: messageProp) => {
    let url = `${API_URL}/message/update`;

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

  @action getUnreadMessage = async (id: string) => {
    let url = `${API_URL}/chat/unread/?userId=${id}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          this.unread_message = res.total;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getMessages = async (userId: string, paginate: boolean) => {
    let url = `${API_URL}/chat?userId=${userId}&page=${this.page}&limit=${this.limit}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          this.messages = res.data;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getThreads = async (
    channel: string,
    userId: string,
    paginate: boolean
  ) => {
    this.loading = true;
    let url = `${API_URL}/chat/thread?channel=${channel}&userId=${userId}&page=${this.page}&limit=${this.limit}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          const threads = this.threads;
          const data = paginate ? [...threads, ...res.data] : res.data;
          let nomore = res.data.length < this.limit ? true : false;

          this.threads = data.sort(
            (a: any, b: any) => a.timestamp - b.timestamp
          );

          this.total = res.total;
          this.nomore = nomore;
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  };
  @action getChannel = async (sender: string, receiver: string) => {
    this.loading = true;
    let url = `${API_URL}/chat/channel?sender=${sender}&receiver=${receiver}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        apikey: API_KEY
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          this.channel = res.data;
          this.loading = false;
        }
      })
      .catch((err) => console.log(err));
  };
}
