<h1 align="center">vite-plugin-build-version</h1>

vite插件，记录下本次构建的package.json版本并用于开发环境/生产环境

> 请注意，为了适应未来vite移除CommonJS支持，插件仅适用于ES6的Module，不适用于CommonJS

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

export default defineConfig(({ mode }) => ({
  // ...其他配置
  plugins: [
    // 获取打包package中的打包版本，默认不传参仅production环境，传入mode参数表示任何构建环境
    buildVersionPlugin(packageJson.version, [mode]),
  ],
}));
// ...
```

```vue
<!-- src/App.vue -->
<script>
import { getBuildVersion } from 'vite-plugin-build-version';

console.log('Version: ', getBuildVersion());
</script>
```
