### 路由组件

1. pages下的为动态路由路径
2. 动态路由[id]
3. 嵌套路由
4. `<NuxtPage></NuxtPage>` 类比为routerView

```js
    pages/
    --- detail/
    ------[id].vue
    --- detail.vue
    --- index.vue
===   
      {
      path: '/detail',
      component: '~/pages/detail.vue',
      children: [
        {
          path: '/:id',
          component: '~/pages/detail/[id].vue'
        }
      ]
    }
```

### 资源目录

- public：会被作为应用程序根目录提供给用户，打包工具不会处理，访问时添加 `/`即可，例如：`/logo.png`
- assets：打包工具会处理，访问时以 `~`开头，例如：`~/assets/logo.png`。

### 全局样式

```js
export default defineNuxtConfig({
  css: [
    'assets/global.css'
  ]
})
```

```js
变量文件
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ["assets/global.scss"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "~/assets/_variables.scss";',
        },
      },
    },
  },
});
```

### 公共组件

- Nuxt 中约定把组件放在 `components/`目录中，这些组件只要被用在页面或其他组件中，就会自动导入并注册。
- ```js
  驼峰命名
  | components/
  --| base/
  ----| foo/
  ------| Button.vue
  <BaseFooButton />
  ```
- 

### 服务端api

```javasc
server/api/hello.ts 
export default defineEventHandler((event) => {
  return {
    message: 'hello，nuxt3！'
  }
})
```

### gray-matter

```javascript
const fs = require('fs');
const matter = require('gray-matter');
const str = fs.readFileSync('example.html', 'utf8');
console.log(matter(str));
作用 读取数据形成对象
---
title: Hello
slug: home
---
<h1>Hello world!</h1>

{
  content: '<h1>Hello world!</h1>',
  data: {
    title: 'Hello',
    slug: 'home'
  }
}

可以转化为html
    import { remark } from "remark";
    import html from "remark-html";
```

### 请求

|            路由参数            |                                 请求体                                 | 查询参数                          |
| :-----------------------------: | :--------------------------------------------------------------------: | --------------------------------- |
| `getRouterParam(event, 'id')` | $fetch('/api/create-post', { method: 'post', body: { id: 'new id' } }) | `/api/query?param1=a&param2=b ` |
|     /api/hello/[name].ts；     |                   const body = await readBody(event)                   | const query = getQuery(event)     |
|                                |                                                                        |                                   |

### 数据获取

| 钩子                                                                                                                               | 函数                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `useFetch`是对 `useAsyncData`和 `$fetch`的封装，只需传入请求的 URL                                                           | const { data: posts, pending, error } = await useFetch('/api/posts')                                     |
| 该方法等效于 `useFetch`设置了 `lazy`选项为 true，不同之处在于它 **不会阻塞路由导航** ，这意味着我们需要处理 data 为 null | const { data: posts, pending, error } = await useLazyFetch('/api/posts')                                 |
| 该方法和 `useFetch` 相比功能上是相同的，但是更底层                                                                               | const fetchPost = () =>$fetch(`url`);``const { data, pending } = await useAsyncData(fetchPost); |
| useLazyAsyncData                                                                                                                   | 该方法等效于 `useAsyncData`，仅仅设置了 `lazy`选项为true，也就是它不会阻塞路由导航                   |

### 刷新数据和缓存

传入返回值可以刷新

1. const { data, refresh } = useFetch('/api/somedata') api有缓存不会刷新
2. const { data, refresh } = useFetch(() => `/api/somedata?page=${page}`)无缓存，会刷新

### 状态管理

#### useState 服务端共享状态

```typescript
useState<T>(init?: () => T | Ref<T>): Ref<T>
useState<T>(key: string, init?: () => T | Ref<T>): Ref<T>
```

* useState(key, init) 是有缓存性的，如果 key 不变，init 只做初始化，则多次调用同一个 useState，结果是一样的；
* 服务端友好性，得益于缓存性，即便 init 返回值是不稳定的，也能保证前端注水时前后端状态的一致性。
* composables/state.ts：export const useCounter = () => useState('data', () => 1) 可以在多个组件中共享这一个数据

可以使用pinia，具体见https://nuxt.com.cn/modules/pinia

### 错误处理

    throw createError({
      statusCode: 404,
      statusMessage: "文章不存在"
    });

### SEO

#### 1、全局配置页头信息

```javascript
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8', // 快捷方式
      viewport: 'width=device-width, initial-scale=1', // 快捷方式
      title: 'My App',
      meta: [
        { name: 'description', content: 'My amazing site.' },
        { name: 'charset', content: 'utf-8' },
      ],
      "link": [],
      "style": [],
      "script": []
    }
  }
})
```

#### 2、设置各子页面标题

```js
首页
useHead({
  title: '文章列表'
})
子页面
useHead({
  titleTemplate: (s) => {
    return s ? `${s} - 附属文本1` : "附属文本2";
  },
});
```

#### 3内置组件修改

Nuxt 还提供了多种组件可以在模板中设置具体页面页头信息：`<Title>`, `<Base>`, `<NoScript>`, `<Style>`,
`<Meta>`, `<Link>`, `<Body>`, `<Html>` , `<Head>`，像下面这样使用：

### 中间件

| 匿名中间件                                                                                                             | 具名中间件                                                        | 全局中间件                              |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------- |
| 只影响一个页面，不可复用                                                                                               | 指定若干影响页面，可复用、组合                                    | 影响所有页面，文件名需要加后缀 global。 |
| definePageMeta({``      middleware(to,from) {``        console.log('匿名中间件，具体页面执行');      }}) | definePageMeta({``      middleware: ['amid', 'bmid']    }) | 中间件.global.ts：                      |

### 插件

```js
export default defineNuxtPlugin(nuxtApp => {
  // Doing something with nuxtApp
  console.log(nuxtApp)
})
```

- 实际上只注册 plugins 目录下根文件和子目录下的 index 文件。
- 插件的执行顺序可以用数字来控制，因为插件之间可能有依赖关系。
- 可在文件名上使用 `.server` 或 `.client` 后缀使插件仅作用于服务端或者客户端。
  * plugins/
    | - server-plugin.server.ts
    | - client-plugin.client.ts

nuxtApp

* `provide (name, value)`：定义全局变量和方法；
* `hook(name, cb)`：定义 nuxt 钩子函数；
* `vueApp`：获取 vue 实例；
* `ssrContext`：服务端渲染时的上下文；
* `payload`：从服务端到客户端传递的数据和状态；
* `isHydrating`：用于检测是否正在客户端注水过程中。
