import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  // 存储的状态信息
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  // actions
  // 执行异步操作，并且触发mutation的更改
  actions: {
    async getLoginUser({ commit, state }, payload) {
      //远程请求获取登录用户信息
      console.log(await UserControllerService.getLoginUserUsingGet(), "ssss");
      const res = await UserControllerService.getLoginUserUsingGet();
      console.log(res, "ceshi");
      if (res.code === 0) {
        commit("updataUser", res.data);
      } else {
        commit("updataUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  // mutations
  //修改状态变量（对变量进行增删改）
  mutations: {
    updataUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
