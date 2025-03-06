import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { commentProp } from 'interfaces/comment';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class CommentStore {
  @observable _loading: boolean = false;
  @observable more: boolean = false;
  @observable page: number = 1;
  @observable limit: number = 100;
  @observable comment: commentProp = {};
  @observable comments: commentProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action newComment = async (body: any) => {
    let url = `${API_URL}/comment/create`;

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

  @action newReply = async (body: any) => {
    let url = `${API_URL}/comment/reply`;

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

  @action updateComment = async (body: any) => {
    let url = `${API_URL}/comment/update`;

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

  @action updateReply = async (body: any) => {
    let url = `${API_URL}/comment/update-reply`;

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

  @action deleteComment = async (body: any) => {
    let url = `${API_URL}/comment/delete-comment`;

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

  @action deleteReply = async (body: any) => {
    let url = `${API_URL}/comment/delete-reply`;

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

  @action getComment = async (id?: string) => {
    let url = `${API_URL}/comment/${id}`;

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
            this.comment = res.data;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  @action getComments = async (requestId: any, paginate: boolean) => {
    runInAction(() => {
      this._loading = true;
    });

    let url = `${API_URL}/comments?page=${this.page}&limit=${this.limit}&requestId=${requestId}`;

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
            if (paginate) {
              let data = this.comments;
              this.more = res.data.length === 0 ? true : false;
              data = [...data, ...res.data];
              this.comments = data;
              this._loading = false;
            } else {
              this.comments = res.data;
              this._loading = false;
            }
          });
        } else {
          runInAction(() => {
            this._loading = false;
          });
        }
      })
      .catch((err) => console.log(err));
  };
}
