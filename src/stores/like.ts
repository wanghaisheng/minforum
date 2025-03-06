import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable } from 'mobx';
import { likeProp } from 'interfaces/like';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class LikeStore {
  @observable loading: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 20;
  @observable like: likeProp = {};
  @observable likes: likeProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.loading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setLike = (data: likeProp) => {
    this.like = data;
  };

  @action likeDiscussion = async (body: likeProp) => {
    let url = `${API_URL}/like/discussion`;

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

  @action likeComment = async (body: likeProp) => {
    let url = `${API_URL}/like/comment`;

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

  @action likeReply = async (body: likeProp) => {
    let url = `${API_URL}/like/reply`;

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

  @action getLikes = async (postId: string) => {
    let url = `${API_URL}/like/${postId}`;

    return await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        return res;
      })
      .catch((err) => console.log(err));
  };
}
