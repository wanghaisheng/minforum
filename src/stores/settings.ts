import { resProp } from 'interfaces/res';
import { action, observable, makeAutoObservable, runInAction } from 'mobx';
import { userProp } from 'interfaces/user';
import { settingsProp } from 'interfaces/settings';
import { dec, encrypt } from 'components/api/utils';

const API_URL: any = process.env.NEXT_PUBLIC_API_URL;
const API_KEY: any = process.env.NEXT_PUBLIC_API_KEY;

export default class SettingsStore {
  @observable loading: boolean = false;
  @observable settings: settingsProp = {};
  @observable admin: userProp = {};
  @observable files: any = [];

  constructor() {
    makeAutoObservable(this);
  }

  @action setAdmin = (data: userProp) => {
    this.admin = data;
  };

  @action setSettings = (data: settingsProp) => {
    runInAction(() => {
      this.settings = data;
    });
  };

  @action create = async (body: settingsProp) => {
    let url = `${API_URL}/settings/create`;
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
        if (res.success) {
          return { success: true, data: res.data };
        } else {
          return { success: false, message: res.message };
        }
      })
      .catch((err) => console.log(err));
  };

  @action update = async (body: settingsProp) => {
    let url = `${API_URL}/settings/update`;
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
        if (res.success) {
          setTimeout(() => {
            runInAction(() => {
              this.loading = false;
            });
          }, 2000);
          return res;
        } else {
          setTimeout(() => {
            runInAction(() => {
              this.loading = false;
            });
          }, 2000);
          return { success: false, message: res.message };
        }
      })
      .catch((err) => console.log(err));
  };

  @action verifyTurnstile = async (body: { token: string }) => {
    let url = `${API_URL}/settings/turnstile`;
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
      .then((res: { success: boolean }) => {
        if (res.success) {
          setTimeout(() => {
            runInAction(() => {
              this.loading = false;
            });
          }, 2000);
          return res;
        } else {
          setTimeout(() => {
            runInAction(() => {
              this.loading = false;
            });
          }, 2000);
          return { success: res.success };
        }
      })
      .catch((err) => console.log(err));
  };

  @action getSettings = async () => {
    let url = `${API_URL}/settings`;

    return await fetch(url, {
      headers: {
        'content-type': 'application/json',
        Authorization: encrypt(API_KEY)
      }
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          let settings = res.data;

          let variables: any = settings.extensionVariables || [];
          let emailSettings = settings?.email;
          let social = settings?.socialAccount || {};

          social.facebook = social?.facebook ? dec(social?.facebook) : '';
          social.github = social?.github ? dec(social?.github) : '';
          social.google = social?.google ? dec(social?.google) : '';

          if (
            emailSettings?.email &&
            emailSettings?.email &&
            emailSettings?.password
          ) {
            const { email, password, host } = emailSettings;
            emailSettings.password = dec(password);
            emailSettings.host = dec(host);
            emailSettings.email = dec(email);
            settings.email = emailSettings;
          }

          settings.cloudflarePublicKey = dec(settings.cloudflarePublicKey);
          settings.cloudflareSecretKey = dec(settings.cloudflareSecretKey);

          variables?.forEach((variable: any) => {
            variable.value = dec(variable?.value);
          });

          settings.extensionVariables = variables;
          settings.socialAccount = social;
          runInAction(() => {
            this.settings = settings;
          });

          return res;
        }
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
    let url = `${API_URL}/upload/document/${id}`;

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
