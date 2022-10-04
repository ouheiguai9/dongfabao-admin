<template>
  <div class="system-layout-left">
    <aside :class="{ 'aside-fold': !expandAside }">
      <div class="aside-logo"></div>
      <el-scrollbar>
        <el-menu :collapse="!expandAside" class="el-menu-no-border" default-active="2">
          <el-sub-menu index="1">
            <template #title>
              <el-icon>
                <location />
              </el-icon>
              <span>Navigator One</span>
            </template>
            <el-menu-item-group>
              <template #title><span>Group One</span></template>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-sub-menu index="1-4">
              <template #title><span>item four</span></template>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-sub-menu>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon>
              <icon-menu />
            </el-icon>
            <template #title>Navigator Two</template>
          </el-menu-item>
          <el-menu-item disabled index="3">
            <el-icon>
              <document />
            </el-icon>
            <template #title>Navigator Three</template>
          </el-menu-item>
          <el-menu-item index="4">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
          <el-menu-item index="6">
            <el-icon>
              <setting />
            </el-icon>
            <template #title>Navigator Four</template>
          </el-menu-item>
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
        <div />
        <header-tool-bar></header-tool-bar>
      </header>
      <el-scrollbar view-style="padding: var(--layout-main-padding)">
        <slot name="main"></slot>
      </el-scrollbar>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import HeaderToolBar from 'components/HeaderToolBar.vue'
import { Expand, Fold, Location } from '@element-plus/icons-vue'

const expandAside = ref(true)
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
