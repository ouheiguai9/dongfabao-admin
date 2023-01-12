<template>
  <div class="system-layout-left">
    <aside :class="{ 'aside-fold': !expandAside }">
      <div class="aside-logo"></div>
      <el-scrollbar>
        <el-menu :collapse="!expandAside" class="el-menu-no-border" :default-active="router.currentRoute.value.name" @select="onSelectMenu">
          <menu-tree :node-list="nodeList"></menu-tree>
        </el-menu>
      </el-scrollbar>
      <div class="aside-tool">
        <el-icon v-if="expandAside" class="icon-btn" @click="expandAside = false">
          <fold />
        </el-icon>
        <el-icon v-else class="icon-btn" @click="expandAside = true">
          <expand />
        </el-icon>
      </div>
    </aside>
    <main>
      <header>
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ name: 'Home' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="name in breadList" :key="name" :to="{ name }">{{ name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <header-tool-bar></header-tool-bar>
      </header>
      <el-scrollbar view-style="padding: var(--layout-main-padding)">
        <slot name="main"></slot>
      </el-scrollbar>
    </main>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import HeaderToolBar from 'components/HeaderToolBar.vue'
import { Expand, Fold, ArrowRight } from '@element-plus/icons-vue'
import { getRouteConfig } from '@/router/index.js'
import MenuTree from 'components/MenuTree.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const expandAside = ref(true)
const nodeList = ref(getRouteConfig())

function onSelectMenu(index) {
  router.push({ name: index })
}

const breadList = computed(() => {
  const list = []
  let name = router.currentRoute.value.name
  if (name !== 'Home') {
    list.push(name)
    let index = -1
    while ((index = name.lastIndexOf('/')) > -1) {
      name = name.substring(0, index)
      list.unshift(name)
    }
  }

  return list
})
</script>

<style lang="scss" scoped>
.system-layout-left {
  display: flex;
  position: relative;
  height: 100%;
  background-color: var(--layout-main-bg);

  aside {
    display: flex;
    width: 240px;
    flex-direction: column;
    flex: none;
    background-color: var(--layout-menu-bg);
    box-shadow: var(--el-box-shadow-light);
    z-index: 1000;
    transition: width var(--el-transition-duration);

    .aside-logo,
    .aside-tool {
      height: var(--layout-header-height);
      padding: 0 20px;
      flex: none;
    }

    .aside-logo {
      border-bottom: var(--el-border);
    }

    .el-menu-no-border {
      border: none;
    }

    .aside-tool {
      display: flex;
      align-items: center;
      border-top: var(--el-border);

      .icon-btn {
        cursor: pointer;
        font-size: var(--layout-icon-size);
        --color: var(--layout-icon-color);
      }

      .icon-btn:hover {
        --color: var(--layout-icon-hover-color);
      }
    }
  }

  .aside-fold {
    width: 64px;
  }

  main {
    display: flex;
    position: relative;
    flex-direction: column;
    flex: auto;

    header {
      box-sizing: border-box;
      display: flex;
      width: 100%;
      height: var(--layout-header-height);
      padding: 0 var(--layout-padding);
      justify-content: space-between;
      align-items: center;
      flex: none;
      background-color: var(--layout-header-bg);
      box-shadow: var(--el-box-shadow-light);
      border-bottom: var(--el-border);
    }
  }
}
</style>
