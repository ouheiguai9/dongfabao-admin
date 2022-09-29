import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const htmlPlugin = () => {
  return {
    name: 'html-transform',
    transformIndexHtml(html) {
      return html.replace(/<title>(.*?)<\/title>/, `<title>${loadEnv(null, process.cwd()).VITE_APP_TITLE}</title>`)
    },
  }
}
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      apis: path.resolve(__dirname, 'src/apis'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      composables: path.resolve(__dirname, 'src/composables'),
      stores: path.resolve(__dirname, 'src/stores'),
      utils: path.resolve(__dirname, 'src/utils'),
      views: path.resolve(__dirname, 'src/views'),
    },
  },
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    htmlPlugin(),
  ],
})
