import { Plugin } from 'vite';

// 版本关键字
const buildVersionKey = '__VITE_PLUGIN_BUILD_VERSION__';
// 插件是否可以运行
let isRun = false;

// 写入版本号
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
          children: `window.${buildVersionKey}='${version}'`,
        },
      ];
    },
  }
};

// 获取版本号
const getBuildVersion = (): string => {
  if (typeof window === 'undefined') {
    console.warn('[vite-plugin-build-version] -> window未定义');
    return '';
  }
  const __window__ = window as typeof window & { [buildVersionKey]?: string };
  const buildVersion = __window__[buildVersionKey] || '';
  if (!buildVersion) console.warn('[vite-plugin-build-version] -> 无法获取版本号');
  return buildVersion;
};

export { buildVersionPlugin, getBuildVersion };
