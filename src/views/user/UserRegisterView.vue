<template>
  <div id="userLoginView">
    <h1 style="margin-bottom: 20px">用户注册</h1>
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
      <a-form-item
        field="checkPassword"
        label="确认密码"
        validate-trigger="blur"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
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
        <a-link status="warning" @click="toHref">已有账号去登录</a-link>
      </div>
      <a-form-item>
        <a-button html-type="submit" style="width: 380px" type="primary"
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive } from "vue";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const formRef = ref();
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);
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
  checkPassword: [
    {
      required: true,
      message: "密码不能为空",
    },
    {
      validator: (value: any, cb: any) => {
        if (value !== form.userPassword) {
          cb("两次输入的密码不一致");
        } else {
          cb();
        }
      },
    },
  ],
};
/**
 * 提交表单
 * @param
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code === 0) {
    message.success("注册成功");
    setTimeout(() => {
      router.push({
        path: "/user/login",
        replace: true,
      });
    }, 1000);
  } else {
    message.error("注册失败" + res.message);
  }
};

/**
 * 去登录
 */
const toHref = () => {
  router.push({
    path: "/user/login",
    replace: true,
  });
};
</script>
