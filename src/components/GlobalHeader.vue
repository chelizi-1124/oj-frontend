<template>
  <div>
    <a-row id="globalHeader" :wrap="false" align="center">
      <a-col flex="auto">
        <a-menu
          :selected-keys="selectedKeys"
          mode="horizontal"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img alt="logo" class="logo" src="../assets/oj-logo.png" />
              <div class="title">文理 Online Judge</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in visibleRoutes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <a-col flex="100px">
        <a-dropdown trigger="hover">
          <div style="cursor: pointer">
            {{ store.state.user?.loginUser?.userName ?? `未登录` }}
            <icon-down />
          </div>
          <template #content>
            <a-doption
              v-if="store.state.user?.loginUser?.userName == '未登录'"
              @click="login"
            >
              <template #icon>
                <icon-user />
              </template>
              <template #default>登录</template>
            </a-doption>
            <a-doption v-else @click="logout">
              <template #icon>
                <icon-poweroff />
              </template>
              <template #default>退出登录</template>
            </a-doption>
          </template>
        </a-dropdown>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";
import message from "@arco-design/web-vue/es/message";

const router = useRouter();
const store = useStore();
//过滤不需要显示的页面
//展示在菜单的路由数组
const visibleRoutes = computed(() => {
  return routes.filter((item, index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }
    //TODO 根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});
//默认主页
const selectedKeys = ref(["/"]);
//路由跳转时，更新选中的菜单项
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};

setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "泡泡糖恶魔",
    userRole: ACCESS_ENUM.ADMIN,
  });
}, 3000);

const login = () => {
  if (store.state.user?.loginUser?.userName == "未登录") {
    router.push({
      path: "/user/login",
      replace: false,
    });
  }
};

const logout = async () => {
  const res = await UserControllerService.userLogoutUsingPost();
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("退出登录失败" + res.message);
  }
};
</script>

<style lang="scss" scoped>
#globalHeader {
  background: #fff;
}

.title-bar {
  display: flex;
  align-items: center;

  .logo {
    height: 48px;
  }

  .title {
    color: #444;
    font-weight: bold;
    margin-left: 16px;
  }
}
</style>
