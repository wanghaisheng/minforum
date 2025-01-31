import { commentProp } from 'interfaces/comment';
import { resProp } from 'interfaces/res';
import { observable, action, makeAutoObservable, runInAction } from 'mobx';
import { discussionProp } from 'interfaces/discussion';

const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default class DiscussionStore {
  @observable page: number = 1;
  @observable limit: number = 100;
  @observable total: number = 0;
  @observable loading: boolean = false;
  @observable nomore: boolean = false;
  @observable commentLoading: boolean = false;
  @observable discussions: discussionProp[] = [];
  @observable discussion: discussionProp = { premium: false };
  @observable comments: commentProp[] = [];
  @observable comment: commentProp = {};

  constructor() {
    makeAutoObservable(this);
  }

  @action setPage = (data: number) => {
    this.page = data;
  };

  @action setDiscussion = (data: discussionProp) => {
    this.discussion = data;
  };

  @action setDiscussions = (data: discussionProp[]) => {
    this.discussions = data;
  };

  headers: HeadersInit | any = {
    'content-type': 'application/json',
    apikey: API_KEY
  };

  @action newDiscussion = async (body: discussionProp) => {
    let url = `${API_URL}/discussion/create`;
    runInAction(() => {
      this.loading = true;
    });

    return await fetch(url, {
      method: 'POST',
      headers: this.headers,
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

  @action updateDiscussion = async (body: discussionProp) => {
    let url = `${API_URL}/discussion/update`;

    return await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action deleteDiscussion = async (body: discussionProp) => {
    let url = `${API_URL}/discussion/delete`;

    return await fetch(url, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify(body)
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action
  getDiscussions = async (paginate: boolean) => {
    let uri = `${API_URL}/discussion/public?page=${this.page}&limit=${this.limit}`;
    runInAction(() => {
      this.loading = true;
    });

    await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          const threads = this.discussions;
          const data = paginate ? [...threads, ...res.data] : res.data;
          let nomore = res.data.length < this.limit ? true : false;

          this.discussions = data;

          this.total = res.count;
          this.nomore = nomore;
          this.loading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  @action getAdminDiscussions = async (paginate: boolean) => {
    let uri = `${API_URL}/discussion?page=${this.page}&limit=${this.limit}`;
    runInAction(() => {
      this.loading = true;
    });

    await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          const threads = this.discussions;
          const data = paginate ? [...threads, ...res.data] : res.data;
          let nomore = res.data.length < this.limit ? true : false;

          this.discussions = data;

          this.total = res.count;
          this.nomore = nomore;
          this.loading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  @action
  getRecommendation = async (title: string, category: string) => {
    let uri = `${API_URL}/discussion/recommend?title=${title}&category=${category}`;
    runInAction(() => {
      this.loading = true;
    });

    await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data;

        runInAction(() => {
          this.loading = false;
          this.discussions = data;
          this.total = res.count;
        });
      })
      .catch((err) => console.log(err));
  };

  @action
  getUnansweredDiscussions = async (paginate: boolean) => {
    let uri = `${API_URL}/discussion/unanswered?page=${this.page}&limit=${this.limit}`;
    runInAction(() => {
      this.loading = true;
    });

    await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          const threads = this.discussions;
          const data = paginate ? [...threads, ...res.data] : res.data;
          let nomore = res.data.length < this.limit ? true : false;

          this.discussions = data;

          this.total = res.count;
          this.nomore = nomore;
          this.loading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  @action
  getPopularDiscussions = async (paginate: boolean) => {
    let uri = `${API_URL}/discussion/popular?page=${this.page}&limit=${this.limit}`;
    runInAction(() => {
      this.loading = true;
    });

    await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          const threads = this.discussions;
          const data = paginate ? [...threads, ...res.data] : res.data;
          let nomore = res.data.length < this.limit ? true : false;

          this.discussions = data;

          this.total = res.count;
          this.nomore = nomore;
          this.loading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  @action
  getDiscussionsByUser = async (id: string, paginate: boolean) => {
    let uri = `${API_URL}/discussion/user?id=${id}&page=${this.page}&limit=${this.limit}`;
    runInAction(() => {
      this.loading = false;
    });

    await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          const threads = this.discussions;
          const data = paginate ? [...threads, ...res.data] : res.data;
          let nomore = res.data.length < this.limit ? true : false;

          this.discussions = data;

          this.total = res.count;
          this.nomore = nomore;
          this.loading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  @action
  getComments = async (id: string, paginate: boolean) => {
    let uri = `${API_URL}/discussion/comment?id=${id}&page=${this.page}&limit=${this.limit}`;
    runInAction(() => {
      this.commentLoading = false;
    });

    return await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          const threads = this.comments;
          const data = paginate ? [...threads, ...res.data] : res.data;
          let nomore = res.data.length < this.limit ? true : false;

          this.comments = data;

          this.total = res.count;
          this.nomore = nomore;
          this.loading = false;
        });
        return res;
      })
      .catch((err) => console.log(err));
  };

  @action
  refreshComments = async (id: string, type: string) => {
    let uri = `${API_URL}/discussion/comment?id=${id}&page=${this.page}&limit=${this.limit}`;
    return await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data;
        runInAction(() => {
          this.comments = data;
          this.total = res.count;
        });
      })
      .catch((err) => console.log(err));
  };

  @action
  getReplies = async (id: string) => {
    let uri = `${API_URL}/discussion/reply?id=${id}&page=${this.page}&limit=${this.limit}`;
    this.commentLoading = false;

    return await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        let data = res.data;
        this.commentLoading = false;
        this.comments = data;
        this.total = res.count;
      })
      .catch((err) => console.log(err));
  };

  @action
  getDiscussionsByCategory = async (slug: string, paginate: boolean) => {
    let uri = `${API_URL}/discussion/category?category=${slug}&page=${this.page}&limit=${this.limit}`;
    runInAction(() => {
      this.loading = true;
      this.discussions = [];
    });

    await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          const threads = this.discussions;
          const data = paginate ? [...threads, ...res.data] : res.data;
          let nomore = res.data.length < this.limit ? true : false;

          this.discussions = data;

          this.total = res.count;
          this.nomore = nomore;
          this.loading = false;
        });
      })
      .catch((err) => console.log(err));
  };

  @action
  getDiscussion = async (id?: any) => {
    runInAction(() => {
      this.loading = true;
    });
    let uri = `${API_URL}/discussion/${id}`;

    return await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        runInAction(() => {
          this.loading = false;
        });

        if (res.success) {
          runInAction(() => {
            this.discussion = res.data;
          });
          return res.data;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action
  refreshDiscussion = async (id?: any) => {
    let uri = `${API_URL}/discussion/${id}`;

    return await fetch(uri, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          runInAction(() => {
            this.discussion = res.data;
          });
          return res.data;
        } else {
          return false;
        }
      })
      .catch((err) => console.log(err));
  };

  @action searchDiscussion = async (query: string) => {
    runInAction(() => {
      this.loading = true;
      this.discussions = [];
    });

    let url = `${API_URL}/discussion/search?search=${query}`;

    await fetch(url, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          setTimeout(() => {
            runInAction(() => {
              this.discussions = res.data;
              this.loading = false;
              this.total = res.count!;
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

  @action publicDiscussionSearch = async (query: string) => {
    runInAction(() => {
      this.loading = true;
      this.discussions = [];
    });
    let url = `${API_URL}/discussion/public-search?search=${query}`;

    await fetch(url, {
      headers: this.headers
    })
      .then((res) => res.json())
      .then((res: resProp) => {
        if (res.success) {
          setTimeout(() => {
            runInAction(() => {
              this.discussions = res.data;
              this.loading = false;
              this.total = res.count!;
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
