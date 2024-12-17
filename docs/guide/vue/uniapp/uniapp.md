## 1、项目

### 1.1 参数回调

emits('事件名'，参数)

```js
const switchHandler=(val:number)=>{
  isSwitch.value=val;
  emits('switchHandlerEmit',val)
}
```

### 1.2 dataset参数

```html
      <view
        class="scroll-view-item"
        v-for="(item, index) in navList"
        :key="item.id"
        :class="{ active: index == sliderData.sliderIndex }"
        :data-index="index"
      >
        {{ item.name }}
      </view>

```

可以在e.target中的dataset属性中获取设置的属性值

### 1.3 下拉刷新 mescroll插件（使用插件流程）

https://www.mescroll.com/demo.html，

- 组件区分大小写，注意不能用驼峰代替-
- 新建uni_modules，右键去市场引入包
- @ts-ignore，取消ts的报错
- 需要刷新的由mescroll-body包裹
- 小程序的easycom规范，自动注册组件

### 1.4 easycom规范

传统vue组件，需要安装、引用、注册，三个步骤后才能使用组件。`easycom`将其精简为一步。

只要组件路径符合规范

`路径规范`指：

1. 安装在项目根目录的components目录下，并符合 `components/组件名称/组件名称.vue`
2. 安装在uni_modules下，路径为 `uni_modules/插件ID/components/组件名称/组件名称.vue`

### 1.5 小程序的各个平台

- 以 `#ifdef` 或 `#ifndef` 加 `%PLATFORM%` 开头，以 `#endif` （一定存在）结尾。
- `#ifdef`：if defined 仅在某平台存在
- `#ifndef`：if not defined 除了某平台均存在
- `%PLATFORM%`：平台名称

  常见平台

  VUE3、VUE2、APP、APP-PLUS （uni-app js引擎版编译为App时）、APP-PLUS-NVUE或APP-NVUE、APP-ANDROID、APP-IOS、H5、WEB、MP-WEIXIN

### 1.6常用组件

scroll-view

```html
	<view class="navbar">
		<!-- 这里是标题栏 -->
	</view>
	<scroll-view scroll-y="true" class="page-content">
		这里是内容区
	</scroll-view>
.navbar{
	position: fixed;
	top:0;
	width:100%;
	height:44px;
}
.page-content {
	position: fixed;
	top: 44px;   // 距离标题栏高度
	left: 0;
	right: 0;
	bottom: 0px;
}
注释：父元素设置子元素不换行 white-space: nowrap;，设置最小宽度，可以实现滑动栏的效果
负责用户上下浏览设置 `scroll-y`，而导航栏负责左右浏览设置 `scroll-x`
```

 NavBar 导航栏 支持左右插槽 （下载 非内置组件）

```html
	<uni-nav-bar fixed :status-bar="true" title="我的音乐" @clickLeft="goCloud" @clickRight="goCloud">
		<block slot="left"><image class="top-img left" src="/static/image/mine/l.png"></image></block>
		<!-- #ifdef APP-PLUS -->
		<block slot="right"><image class="top-img" src="/static/image/mine/r.png"></image></block>
		<!-- #endif -->
	</uni-nav-bar>
```

- vue3中，有时会出现bug，需从文件中引入，

使用uniapp组件库，不走弯路了

image的图片可以使用 mode="widthFix"实现自适应高度

    `<image :src="item.image" mode="widthFix" style="width: 100%"></image>`

### 1.7pinia

```ts
import { createPinia } from "pinia";
import { createPersistedState } from "pinia-plugin-persistedstate";

const store = createPinia();
// 状态持久化
store.use(
    createPersistedState({
        storage: {
            getItem: (key: string) => uni.getStorageSync(key),
            setItem: (key: string, value: string) => uni.setStorageSync(key, value)
        }
    })
);

export default store;

```

小程序中，使用插件实现数据持久化

```js
  persist: {
        key: "模块名",
        paths: ['state中需要存储的值']
    }
```

Pinia在ts中使用，需要注入store

```js
import store from "@/store/index"
import {setBarStore} from "@/store/setTabBar"
//设置标签
const useSetBar = setBarStore(store);
```

### 1.8app扫码api

```html
<!-- components/scan/scan.vue -->
<template>
    <view></view>
</template>

<script>
    export default {
        data() {
            return {
                typeList: [ // 码类型 参考地址 https://www.dcloud.io/docs/api/zh_cn/barcode.html
                    plus.barcode.QR,
                    // plus.barcode.EAN13,
                    // plus.barcode.EAN8,
                    // plus.barcode.UPCA,
                    // plus.barcode.UPCE,
                    // plus.barcode.CODABAR,
                    // plus.barcode.CODE39,
                    // plus.barcode.CODE93,
                    // plus.barcode.CODE128,
                    // plus.barcode.ITF,
                ],
            };
        },
        methods: {
            open() {
                // 创建上层webview
                let pages = getCurrentPages();
                let currentWebview = pages[pages.length - 1].$getAppWebview();
                // 创建一个扫码框
                this.barcode = plus.barcode.create('barcode', this.typeList, {
                    position: 'fixed',  // fixed 固定在页面
                    top: '64px',
                    left: '0px',
                    width: '100%',
                    height: '100%',
                });
                // 扫码成功回调
                this.barcode.onmarked = this.onmarked;
                // 添加到当前 Webview
                currentWebview.append(this.barcode);
                // 打开扫码
                this.barcode.start();
            },
            // 关闭扫码
            close () {
                this.barcode.close();
            },
            // 扫码成功
            onmarked (type, result) {
                this.openStartRecognize(result)
                this.$emit('success', result);
                this.close()
            }
        }
    }
</script>
<style lang="scss"></style>
```

### 1.9字体px

一般设计稿750px，手机像素点缩放2rpx=1px,如果遇到0.5px无法渲染，可以使用伪元素配合scale属性进行缩放

```css
 transform: scale(0.84);
```

### 2.0使用vue3ref组件

```js
defineExpose({ openSearch, closeSearch })
```

需要使用defineExpose函数对实例的值进行暴露

### 2.1storage

```js
uni.setStorageSync() ，uni.getStorageSync() 同步
```

### uni.setStorageSync(KEY,DATA)

将 data 存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个同步接口。

**参数说明**

| 参数 | 类型   | 必填 | 说明                                                         |
| :--- | :----- | :--- | :----------------------------------------------------------- |
| key  | String | 是   | 本地缓存中的指定的 key                                       |
| data | Any    | 是   | 需要存储的内容，只支持原生类型、及能够通过 JSON.stringify 序列化的对象 |

### uni.getStorageSync(KEY)

从本地缓存中同步获取指定 key 对应的内容。

**参数说明**

| 参数 | 类型   | 必填 | 说明                   |
| :--- | :----- | :--- | :--------------------- |
| key  | String | 是   | 本地缓存中的指定的 key |

### 2.2防抖

```html
function debounce(fn, wait = 300) {  
    var timeout = null;  
    return function() {    
        if(timeout !== null) clearTimeout(timeout);    
        timeout = setTimeout(fn, wait);  
    }
}
```

### 2.3分包

```html
// pages.json
"pages": [],
"subPackages": [
	{
		"root": "pages/subpages",   // 分包根目录
		"pages": [{
			"path": "album",              // 配置页面路径，此为subpages下的路径
			"style": {
				"navigationBarTitleText": "歌单",
				"app-plus": {
					"titleNView": false
				}
			}
		}]
	}
],
```

每次打开小程序会发现有的小程序打开的很快，有些很慢，甚至白屏时间很长。原因是包代码量大小的问题。第一次进入小程序的时候，小程序会下载主包代码，如果我们的主包业务代码越多，那么白屏的时间也会越长。理解成懒加载就好

### 2.4 transform

```css
transform:translateX(-50%)不会生效
transform:translate(-50%,-50%)生效
```

### 2.5跳转

switchTab才能跳转到tab页面

### 2.6固定定位产生的布局问题

因为fixed元素脱离了正常文档流，所以relative元素的原本位置向上提了，产生了覆盖的行为。

需要添加 `margin`or `padding`属性到下层内容组件上，使其发生向下偏移，不再被覆盖。

- 给内容设置margin-top，**同时设置header中的top:0和z-index**，否则引起margin-top失效
- 用空div占位，同时设置body margin=0，使div的位置相对于视窗口无边距，变得可计算

### 2.7scroll-view事件问题

```html
   <scroll-view scroll-y="true" class="detailBody" style="height: 100%" @scroll="scrollHandler">
       <view>高度要高于scroll-view高度</view>
      </scroll-view>
```

需要内部高度超出整个scroll-view高度 ，关于scroll事件是否生效

### 2.8uView组件

这次使用的uView-plus组件，组件内部设置border是!important，得将border关闭后再设置border,它的u-input自带flex:1 flex 1 1 0%  flex-grow，flex-shrink，flex-basis 得将grow设置为0 并且flex-basis设置为auto 既代表项目原来大小

### 2.9登陆获取头像问题

- **自生效期起，小程序 wx.getUserProfile 接口将被收回**：生效期后发布的小程序新版本，通过 wx.getUserProfile 接口获取用户头像将统一返回默认[灰色头像](https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0)，昵称将统一返回 “微信用户”。生效期前发布的小程序版本不受影响，但如果要进行版本更新则需要进行适配。
- **自生效期起，插件通过 wx.getUserInfo 接口获取用户昵称头像将被收回**：生效期后发布的插件新版本，通过 wx.getUserInfo 接口获取用户头像将统一返回默认[灰色头像](https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0)，昵称将统一返回 “微信用户”。生效期前发布的插件版本不受影响，但如果要进行版本更新则需要进行适配。通过 wx.login 与 wx.getUserInfo 接口获取 openId、unionId 能力不受影响。
- **「头像昵称填写能力」支持获取用户头像昵称**：如业务需获取用户头像昵称，可以使用「[头像昵称填写能力](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html)」（基础库 2.21.2 版本开始支持，覆盖iOS与安卓微信 8.0.16 以上版本），具体实践可见下方《最佳实践》。
- **小程序 wx.getUserProfile 与插件 wx.getUserInfo 接口兼容基础库 2.27.1 以下版本的头像昵称获取需求**：对于来自低版本的基础库与微信客户端的访问，小程序通过 wx.getUserProfile 接口将正常返回用户头像昵称，插件通过 wx.getUserInfo 接口将正常返回用户头像昵称，开发者可继续使用以上能力做向下兼容。

简而言之，就是getUserProfile和getUserInfo 都无法获取头像了，最开始从getUserInfo 改到getUserProfile，现在都不能用了，只能通过button组件来实现

```html
头像选择
需要将 button 组件 open-type 的值设置为 chooseAvatar，当用户选择需要使用的头像之后，可以通过 bindchooseavatar 事件回调获取到头像信息的临时路径。

从基础库2.24.4版本起，若用户上传的图片未通过安全监测，不触发bindchooseavatar 事件。
```

```html
昵称填写
需要将 input 组件 type 的值设置为 nickname，当用户在此input进行输入时，键盘上方会展示微信昵称。

从基础库2.24.4版本起，在onBlur 事件触发时，微信将异步对用户输入的内容进行安全监测，若未通过安全监测，微信将清空用户输入的内容，建议开发者通过 form 中form-type 为submit 的button 组件收集用户输入的内容。
```

### 3.0登录需要注意的问题

- js的对象类型比较是比较引用地址，而不是比较值，需要换成字符串进行比较;

- 登录需要使用Uni.reLaunch,用来重新刷新页面

  

### 3.1音频接口

```js
const changePlayTime = (e: any) => {
 
  playState.value.current = e.detail.value;
 bgAudioManager.seek(e.detail.value);
};
```

seek方法不能使用响应式数据