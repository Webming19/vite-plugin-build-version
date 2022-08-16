<h1 align="center">vite-plugin-build-time</h1>

vite项目记录下本次打包的时间，供生产环境使用

如果在开发环境使用，获取到的是本次启动的时间

## 安装

通过npm下载

```base
npm install --save-dev vite-plugin-build-time
```

## 用法

```js
// vite.config.js
import buildTimePlugin from 'vite-plugin-build-time'

// ...
plugins: [buildTimePlugin()]
// 或者 在开发模式使用
plugins: [buildTimePlugin(['development'])]
// 或者 在自定义模式使用
plugins: [buildTimePlugin(['test'])]
// ...
```

```vue
<!-- src/App.vue -->
<script>
import { getBuildTime } from 'vite-plugin-build-time'
// 获取打包时间
console.log(getBuildTime())
</script>
```
