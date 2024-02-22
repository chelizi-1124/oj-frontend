<template>
  <div id="BasicLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <GlobalHeader />
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
#BasicLayout {
  width: 100%;
  background: url("https://gw.alipayobjects.com/zos/rmsportal/FfdJeJRQWjEeGTpqgBKj.png")
    0% 0% / 100% 100%;
  .header {
  }

  .content {
    margin-bottom: 16px;
    padding: 20px;
    display: flex;
  }

  .fotter {
    margin-top: 20px;
    background: white;
    padding: 16px;
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    z-index: 9999;
  }
}
</style>
<script lang="ts" setup>
import GlobalHeader from "@/components/GlobalHeader.vue";
</script>
