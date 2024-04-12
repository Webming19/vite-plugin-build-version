<h1 align="center">vite-plugin-build-version</h1>

vite项目记录下本次打包的package.json版本

## 安装

推荐使用`pnpm`下载，`npm`/`yarn`都可以

```shell
pnpm install vite-plugin-build-version --save-dev
```

## 用法

```js
// vite.config.js
import { defineConfig } from 'vite';
import { buildVersionPlugin } from 'vite-plugin-build-version';
import packageJson from './package.json';

// https://vitejs.dev/config/
export default defineConfig({
  // ...其他配置
  plugins: [
    // 获取打包package中的打包版本
    buildVersionPlugin(JSON.stringify(packageJson.version), ['development', 'test']),
  ],
});
// ...
```

```vue
<!-- src/App.vue -->
<script>
import { getBuildVersion } from 'vite-plugin-build-version';

console.log('Version: ', getBuildVersion());
</script>
```
