<h1 align="center">vite-plugin-build-version</h1>

vite项目记录下本次打包的package.json版本

## 安装

通过npm下载

```shell
npm install vite-plugin-build-version --save-dev
```

## 用法

```js
// vite.config.js
import { defineConfig } from 'vite';

import buildVersionPlugin from 'vite-plugin-build-version';

// https://vitejs.dev/config/
export default defineConfig({
  // ...其他配置
  plugins: [
    // 获取打包package中的打包版本
    buildVersionPlugin(JSON.stringify(process.env.npm_package_version), true),
  ],
});

// ...
```

```vue
<!-- src/App.vue -->
<script>
import { getBuildVersion } from 'vite-plugin-build-time';

console.log('BuildVersion==>', getBuildVersion());
</script>
```
