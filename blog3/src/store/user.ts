import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => {
    return {
      userinfo: {
				}
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    // 这里写方法action
    setUser(user:Object) {
      this.userinfo = user
    }
  },
  getters: {
    //   getters
  },

persist: {
  enabled: true,
  strategies: [
    {
      key: 'userInfo',//设置存储的key
      storage: localStorage,//表示存储在localStorage
    }
  ]
}
})

