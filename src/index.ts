import { Plugin } from 'vite';

const buildVersionKey = '__VITE_PLUGIN_BUILD_VERSION__';
// 插件是否可以运行
let isRun = false;
const virtualGlobal = {
  [buildVersionKey]: '0.0.0',
};

type GetGlobalThis = {
  (): typeof globalThis & typeof virtualGlobal;
};

// @ts-ignore
const getGlobalThis: GetGlobalThis = () => {
  if (typeof globalThis !== 'undefined') return globalThis;
  if (typeof self !== 'undefined') return self;
  if (typeof window !== 'undefined') return window;
  if (typeof global !== 'undefined') return global;
  return virtualGlobal
}

/**
 * @param version package.json版本号
 * @param serve 是否作用于serve阶段
 */
/*const buildVersionPlugin = (version: string, serve?: boolean): Plugin => {
  let isBuild = false;
  return {
    name: 'vite-plugin-build-time',
    config(uc, { command: viteCommand }) {
      isBuild = viteCommand === 'build';
    },
    transformIndexHtml(html) {
      if (!isBuild && !serve) return html;
      let newHtml = html;
      const pattern = /<head>\r?\n+\s*</;
      const execArr = pattern.exec(newHtml);
      let spaceStr = '';
      if (execArr) {
        let [val] = execArr;
        val = val.substring(6, val.length - 1);
        spaceStr = val.replace(/\r/g, '').replace(/\n/g, '');
      }
      let joinStr = spaceStr ? `\n${ spaceStr }` : '\n  ';
      newHtml = newHtml.replace(`<head>`, `<head>${ joinStr }<script>window.${ buildVersionKey }=${ version }</script>`);
      return newHtml;
    }
  }
};*/
/**
 * 写入版本号
 * @param version package.json版本号
 * @param modes 默认包含production模式，还要在什么模式下运行此插件。
 * 比如`buildVersionPlugin(['development'])`
 */
const buildVersionPlugin = (version:string, modes: string[] = []): Plugin => {
  return {
    name: 'vite-plugin-build-version',
    config(_uc, { mode }) {
      isRun = mode === 'production' || modes.includes(mode);
    },
    transformIndexHtml() {
      if (!isRun) return;
      return [
        {
          tag: 'script',
          children: `window.${buildVersionKey}=${version}`,
        },
      ];
    },
  }
};

// export const getBuildVersion = () => getGlobalThis()[buildVersionKey];
// 获取版本号
export const getBuildVersion = () => {
  if (!isRun) return '';
  if (typeof window === 'undefined') {
    console.warn('[vite-plugin-build-version] -> window未定义')
    return '';
  }
  const __window__ = window as typeof window & { [buildVersionKey]?: number };
  const buildVersion = __window__[buildVersionKey] || '';
  if (!buildVersion) console.warn('[vite-plugin-build-version] -> 无法获取版本号');
  return buildVersion;
}


export default buildVersionPlugin;
