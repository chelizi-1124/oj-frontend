<template>
  <div id="userLoginView">
    <h1 style="margin-bottom: 20px">用户登录</h1>
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      :size="'large'"
      auto-label-width
      label-align="left"
      style="max-width: 380px; margin: 0 auto"
      @submit-success="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号" validate-trigger="blur">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码" validate-trigger="blur">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <div
        style="
          width: 380px;
          display: flex;
          justify-content: right;
          margin-bottom: 10px;
        "
      >
        <a-link status="warning" @click="toHref">还没有账号去注册</a-link>
      </div>
      <a-form-item>
        <a-button html-type="submit" style="width: 380px" type="primary"
          >登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

const form = reactive({
  userAccount: "admin",
  userPassword: "admin123",
} as UserLoginRequest);
const router = useRouter();
const store = useStore();

/**
 * 校验表单
 */
const rules = {
  userAccount: [
    {
      required: true,
      message: "账号不能为空",
    },
  ],
  userPassword: [
    {
      required: true,
      message: "密码不能为空",
    },
  ],
};
/**
 * 提交表单
 * @param
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    router.push({
      path: "/",
      replace: true,
    });
    console.log(res, "user");
  } else {
    message.error("登录失败" + res.message);
  }
};

/**
 * 去注册
 */
const toHref = () => {
  router.push({
    path: "/user/register",
    replace: true,
  });
};
</script>
