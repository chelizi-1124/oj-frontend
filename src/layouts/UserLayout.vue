<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/oj-logo.png" />
          <div style="font-size: 20px; font-weight: 700">文理 Online Judge</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="fotter">
        <a href="https://blog.kalika.vip">文理 Online Judge系统by泡泡糖恶魔</a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>
<style lang="scss">
#userLayout {
  text-align: center;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
  .logo {
    width: 64px;
    height: 64px;
  }
  .header {
    padding: 10px 0;
  }
  .content {
    margin-bottom: 16px;
    padding: 20px;
  }

  .fotter {
    padding: 16px;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
  }
}
</style>
<script lang="ts" setup></script>
