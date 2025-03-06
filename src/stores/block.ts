import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { blockProp, blockStatusProp } from 'interfaces/block';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class BlockStore {
  @observable blockLoading: boolean = false;
  @observable total: number = 0;
  @observable page: number = 1;
  @observable limit: number = 20;
  @observable block: blockStatusProp = {};
  @observable blocked: boolean = false;
  @observable blocks: blockProp[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setLoading = (data: boolean) => {
    this.blockLoading = data;
  };

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action blockAction = async (body: blockProp) => {
    let url = `${API_URL}/block/action`;

    runInAction(() => {
      this.blockLoading = true;
    });

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
          runInAction(() => {
            this.block = res.data;
            this.blockLoading = false;
          });
        } else {
          runInAction(() => {
            this.blockLoading = false;
          });
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action getBlock = async (userId: string, profileId: string) => {
    let url = `${API_URL}/block/${userId}?profileId=${profileId}`;

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
            this.block = res.data;
          });
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };
}
