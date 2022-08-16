import { Plugin } from 'vite'

const buildVersionKey = '__VITE_PLUGIN_BUILD_VERSION__'

/**
 * @param modes 除了production之外，还要在什么模式下运行此插件。比如`buildVersionPlugin(['development'])`
 * @param version 从package中获取的版本号
 */
const buildVersionPlugin = (modes: string[] = [], version: string): Plugin => {
  let _mode = ''
  return {
    name: 'vite-plugin-build-version',
    config(uc, { mode }) {
      _mode = mode
    },
    transformIndexHtml() {
      if (_mode !== 'production' && !modes.includes(_mode)) return
      return [{
        tag: 'script',
        children: `window.${ buildVersionKey }=${ version }`
      }]
    }
  }
}

export const getBuildVersion = () => {
  if (typeof window === 'undefined') {
    console.warn('[vite-plugin-build-version] -> window未定义')
    return '0.0.0'
  }
  const __window__ = window as typeof window & { [buildVersionKey]?: string }
  if (!__window__[buildVersionKey]) {
    console.warn('[vite-plugin-build-version] -> 无法获取打包时间，请查看文档')
    return '0.0.0'
  }
  return __window__[buildVersionKey] as string
}

export default buildVersionPlugin
