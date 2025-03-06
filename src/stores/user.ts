import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { userProp } from 'interfaces/user';
import { encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class UserStore {
  @observable loading: boolean = false;
  @observable more: boolean = false;
  @observable page: number = 1;
  @observable limit: number = 30;
  @observable total: number = 0;
  @observable user: userProp = {
    id: '',
    name: ''
  };
  @observable profile: userProp = {
    id: '',
    name: ''
  };
  @observable users: userProp[] = [];
  @observable files: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setUsers = (data: userProp[]) => {
    this.users = data;
  };

  @action setUser = (data: userProp) => {
    this.user = data;
  };

  @action setup = async (body: userProp) => {
    let url = `${API_URL}/user/setup`;
    runInAction(() => {
      this.loading = true;
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
        runInAction(() => {
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action signup = async (body: userProp) => {
    let url = `${API_URL}/user/create`;
    runInAction(() => {
      this.loading = true;
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
        runInAction(() => {
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action socialConnect = async (body: userProp) => {
    let url = `${API_URL}/user/social`;
    runInAction(() => {
      this.loading = true;
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
        runInAction(() => {
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action forgot = async (body: any) => {
    let url = `${API_URL}/user/forgot`;
    runInAction(() => {
      this.loading = true;
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
        runInAction(() => {
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action reset = async (body: any) => {
    let url = `${API_URL}/user/reset`;

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

  @action verifyAccount = async (body: any) => {
    let url = `${API_URL}/user/verify`;
    runInAction(() => {
      this.loading = true;
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
        runInAction(() => {
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action updateUser = async (body: userProp) => {
    let url = `${API_URL}/user/update`;

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

  @action updateAccount = async (body: userProp) => {
    let url = `${API_URL}/user/update-account`;

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

  @action updatePassword = async (body: userProp) => {
    let url = `${API_URL}/user/update-password`;

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

  @action login = async (body: userProp) => {
    let url = `${API_URL}/user/login`;
    runInAction(() => {
      this.loading = true;
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
      .then((res: resProp) => {
        runInAction(() => {
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action loginOtp = async (body: userProp) => {
    let url = `${API_URL}/user/login-otp`;
    runInAction(() => {
      this.loading = true;
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
      .then((res: resProp) => {
        runInAction(() => {
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action getUsers = async (filter: string) => {
    runInAction(() => {
      this.loading = true;
      this.users = [];
    });

    let url = `${API_URL}/user?page=${this.page}&limit=${this.limit}&filter=${filter}`;

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
              this.users = res.data;
              this.total = res.count;
              this.loading = false;
            });
          }, 2000);
        } else {
          runInAction(() => {
            this.loading = false;
          });
        }
      })
      .catch((err) => console.log(err));
  };

  @action getModerators = async () => {
    runInAction(() => {
      this.loading = true;
      this.users = [];
    });

    let url = `${API_URL}/user/moderators`;

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
            this.users = res.data;
            this.total = res.count;
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
      })
      .catch((err) => console.log(err));
  };

  @action getContributors = async () => {
    runInAction(() => {
      this.loading = true;
      this.users = [];
    });

    let url = `${API_URL}/user/contributors`;

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
            this.users = res.data;
            this.loading = false;
          } else {
            this.loading = false;
          }
        });
      })
      .catch((err) => console.log(err));
  };

  @action getUser = async (id: string) => {
    let url = `${API_URL}/user/${id}`;
    runInAction(() => {
      this.loading = true;
    });

    return await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        runInAction(() => {
          this.loading = false;
          this.user = res.data;
        });

        return res;
      })
      .catch((err) => console.log(err));
  };

  @action getProfile = async (id: string) => {
    let url = `${API_URL}/user/${id}`;

    await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        runInAction(() => {
          this.profile = res.data;
        });
      })
      .catch((err) => console.log(err));
  };

  @action getUsername = async (id: string) => {
    let url = `${API_URL}/user/username?username=${id}`;

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
            this.loading = false;
            this.user = res.data;
          });
          return res.data.id;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action checkUsername = async (query: string) => {
    let url = `${API_URL}/user/check-username?query=${query}`;

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

  @action searchUsers = async (query: string) => {
    runInAction(() => {
      this.loading = true;
    });
    let url = `${API_URL}/user/search?page=${this.page}&limit=${this.limit}&query=${query}`;

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
            setTimeout(() => {
              this.users = res.data;
              this.loading = false;
            }, 1000);
          } else {
            this.loading = false;
          }
        });
      })
      .catch((err) => console.log(err));
  };

  @action uploadImage = async (id: any, body: any) => {
    let url = `${API_URL}/upload/image?id=${id}`;

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

  @action uploadFile = async (id: any, body: any) => {
    let url = `${API_URL}/upload/file?id=${id}`;

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

  @action getFile = async (id: any) => {
    let url = `${API_URL}/upload/relative/${id}`;

    await fetch(url, {
      headers: {
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          runInAction(() => {
            this.files = res.data;
          });
        }
      })
      .catch((err) => console.log(err));
  };
}
