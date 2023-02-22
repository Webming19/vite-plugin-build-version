import { Plugin } from 'vite'

const buildVersionKey = '__VITE_PLUGIN_BUILD_VERSION__'
const virtualGlobal = {
  [buildVersionKey]: '0.0.0'
}

interface GetGlobalThis {
  (): typeof globalThis & typeof virtualGlobal
}

// @ts-ignore
const getGlobalThis: GetGlobalThis = () => {
  if (typeof globalThis !== 'undefined') return globalThis
  if (typeof self !== 'undefined') return self
  if (typeof window !== 'undefined') return window
  if (typeof global !== 'undefined') return global
  return virtualGlobal
}

/**
 * @param version package.json版本号
 * @param serve 是否作用于serve阶段
 */
const buildVersionPlugin = (version: string, serve?: boolean): Plugin => {
  let isBuild = false
  return {
    name: 'vite-plugin-build-time',
    config(uc, { command: viteCommand }) {
      isBuild = viteCommand === 'build'
    },
    transformIndexHtml(html) {
      if (!isBuild && !serve) return html
      let newHtml = html
      const pattern = /<head>\r?\n+\s*</
      const execArr = pattern.exec(newHtml)
      let spaceStr = ''
      if (execArr) {
        let [val] = execArr
        val = val.substring(6, val.length - 1)
        spaceStr = val.replace(/\r/g, '').replace(/\n/g, '')
      }
      let joinStr = spaceStr ? `\n${ spaceStr }` : '\n  '
      newHtml = newHtml.replace(`<head>`, `<head>${ joinStr }<script>window.${ buildVersionKey }=${ version }</script>`)
      return newHtml
    }
  }
}

export const getBuildVersion = () => getGlobalThis()[buildVersionKey]
export default buildVersionPlugin
