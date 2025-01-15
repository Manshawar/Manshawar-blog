import * as path from 'node:path';
import { env } from 'node:process';
import { defineConfig } from 'rspress/config';
export default defineConfig({
  root: path.join(__dirname, 'docs'),
  title: 'Manshawar blog',
  icon: '/rspress-icon.png',
  builderConfig: {
    //@ts-ignore
    resolve: {
      alias: {
        '@com': './src/components/',
        '@page': './src/page/',
        '@': './src/',
      },
    },
    html: {
      tags: env.NODE_ENV !== 'development' ? [

        {
          tag: 'script',
          // 通过 window.RSPRESS_THEME 变量来指定默认的主题模式，可选值为 'dark' 和 'light'
          children: "window.RSPRESS_THEME = 'dark';",
        },

        {
          tag: 'link',
          attrs: {
            rel: "manifest",
            href: "/sw/manifest.json"
          }
        },
        {

          tag: 'script',
          attrs: { src: '/sw/service.js' },
        },

      ] : []
    },
  },

  logo: {
    light: '/rspress-light-logo.png',
    dark: '/rspress-dark-logo.png',
  },


  plugins: [

    {
      name: "Live2DWidget",
      globalUIComponents: [
        [
          path.join(__dirname, './components/Live2DWidget.tsx'),
          {
            dockedPosition: "right",
            models: [
              {
                "path": "https://model.oml2d.com/cat-black/model.json",
                "scale": 0.15,
                position: [0, 0],

              },
              {
                path: "https://model.oml2d.com/HK416-1-normal/model.json",
                position: [0, 0],
                scale: 0.08,

              },
            ],
          }
        ],
      ],
    }
  ],

  themeConfig: {

    // 开启 View Transition 过渡
    enableContentAnimation: true,
    enableAppearanceAnimation: true,
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/Manshawar',
      },
    ],
  },
});
