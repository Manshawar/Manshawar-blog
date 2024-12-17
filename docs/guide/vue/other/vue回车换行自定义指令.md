### vue回车换行自定义指令

有客户提出需求，希望在输入框输入后能使用回车换行，因为项目表单很多，我想到使用自定义指令来实现这个功能，我书写了两个版本，vue2和vue3

我会先贴出完整的代码片段和注释，后面再对书写的内容进行详解 ，大家有需要可以直接去使用，第一次写文章，如果有不妥，大家请见谅。如果代码内容有问题，请帮忙提出一下修改意见，谢谢。

### 1、Vue2速通版

```js
//  ./module/iptLine.js文件
let nodes;//以数组形式存放node节点
let callBackHandler;//暂存bind值，方便在事件中回调
export default {
  bind: function (el, bind) {
    nodes = getNode(el, []); //在当前绑定的元素下，获取非disabled的node节点
    callBackHandler = bind;
    el.addEventListener("keyup", nextHandler);//绑定keyup事件
  },
  unbind: function (el) {
### //移除副作用
    el.removeEventListener("keyup", nextHandler);//移除keyup事件
    nodes = undefined;//
    callBackHandler = undefined;
  },
};
function nextHandler(e) {

  e.preventDefault();//阻止原生事件
  if (e.key !== "Enter") return;//如果不是回车键，则不触发
  nodes.forEach((item, index) => {//对于nodes节点进行循环，进行事件委托
    if (e.target === item) {//寻找当前触发的这个事件的node节点
      if (index === nodes.length - 1)//如果node节点是最后一位，则触发传入回调
        return callBackHandler.value && callBackHandler.value();//当传入回调存在时则进行触发
      nodes[index + 1].focus();//将焦点移动至下一个node
    }
  });
}
/**
 * 
 * @param {HTMLElement} el 传入dom实例，获取该实例下的所有input的node节点
 * @param {[]} arr 方便递归时存储已筛选出的node节点，请固定传入[]
 * @returns 
 */
function getNode(el, arr) {
  el.childNodes.forEach((item, index) => {//对于当前元素的子节点进行循环
    if (item.tagName === "INPUT" && item.disabled !== true) {
      //如果当前的node节点是input,且为可用状态，则添加的数组中
      arr.push(item);
    } else {
      if (item.childNodes === undefined) return;//如果没有子节点则终止该函数
      getNode(item, arr);//如果有子节点则进行递归
    }
  });
  return arr;
}

```

```js
//vue事件注册
import iptLine from './module/iptLine'
Vue.directive("iptLine", iptLine);
//iptLine是自定义的名字，大家可以根据习惯定义
```

总体思路：获取当前绑定自定义指令的元素，递归这个元素中的input标签形成数组，通过事件委托，找到当前元素再数组中的位置，将焦点通过focus移动到下一个元素，接受一个回调函数

回调函数是在移动到最后一位时触发，如果要传入参数，请以闭包的形式传入  。ps:v-iptLine='()=>callback("hello world")',一般情况下如果不需要传入参数v-iptLine='callback'即可



### 2、Vue3速通版

vue3的只需要修改生命周期即可bind和unbind，修改为created和beforeUnmount

```js
let nodes;
let callBackHandler;
export default {
  created: function (el, bind) {
    nodes = getNode(el, []);
    callBackHandler = bind;
    el.addEventListener('keyup', nextHandler);
  },
  beforeUnmount: function (el) {
    el.removeEventListener('keyup', nextHandler);
    nodes = undefined;
    callBackHandler = undefined;
  }
};
function nextHandler(e) {
  e.preventDefault();
  if (e.key !== 'Enter') return;
  nodes.forEach((item, index) => {
    if (e.target === item) {
      if (index === nodes.length - 1)
        return callBackHandler.value && callBackHandler.value()
      nodes[index + 1].focus();
    }
  });
}
function getNode(el, arr) {
  el.childNodes.forEach((item, index) => {
    if (item.tagName === 'INPUT' && item.disabled !== true) {
      arr.push(item);
    } else {
      if (item.childNodes === undefined) return;
      getNode(item, arr);
    }
  });
  return arr;
}

```

vue3的使用方法和vue2基本一致，不多赘述了。（偷懒，嘿嘿）

如果不想看具体的想法，已经结束了啦

### 3、具体实现

如何实现回车跳转呢？我的设想是获取我们需要跳转元素的input元素，按回车跳转到下一个元素，那就通过两步走来实现

1. 获取当前元素下所有的input元素
2. 按回车跳转到下一个元素

### 3.1、基本知识

一个指令定义对象可以提供如下几个钩子函数 (均为可选)：

- `bind`：只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。
- `inserted`：被绑定元素插入父节点时调用 (仅保证父节点存在，但不一定已被插入文档中)。
- `update`：所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。指令的值可能发生了改变，也可能没有。但是你可以通过比较更新前后的值来忽略不必要的模板更新 (详细的钩子函数参数见下)。

- `componentUpdated`：指令所在组件的 VNode **及其子 VNode** 全部更新后调用。

- `unbind`：只调用一次，指令与元素解绑时调用。

  

  指令钩子函数会被传入以下参数：

  - el：指令所绑定的元素，可以用来直接操作 DOM。

  - binding

    ：一个对象，包含以下 property：

    - `name`：指令名，不包括 `v-` 前缀。
    - `value`：指令的绑定值，例如：`v-my-directive="1 + 1"` 中，绑定值为 `2`。
    - `oldValue`：指令绑定的前一个值，仅在 `update` 和 `componentUpdated` 钩子中可用。无论值是否改变都可用。
    - `expression`：字符串形式的指令表达式。例如 `v-my-directive="1 + 1"` 中，表达式为 `"1 + 1"`。
    - `arg`：传给指令的参数，可选。例如 `v-my-directive:foo` 中，参数为 `"foo"`。
    - `modifiers`：一个包含修饰符的对象。例如：`v-my-directive.foo.bar` 中，修饰符对象为 `{ foo: true, bar: true }`。

  - `vnode`：Vue 编译生成的虚拟节点。移步 [VNode API](https://v2.cn.vuejs.org/v2/api/#VNode-接口) 来了解更多详情。
  - `oldVnode`：上一个虚拟节点，仅在 `update` 和 `componentUpdated` 钩子中可用。

  官网链接

[]: https://v2.cn.vuejs.org/v2/guide/custom-directive.html

### 3.2、获取元素

我们可以在自定义指令的钩子函数中，直接获取当前的dom实例，我书写了一个函数，通过递归，可以找到所有的input子节点

```js
/**
 * 
 * @param {HTMLElement} el 传入dom实例，获取该实例下的所有input的node节点
 * @param {[]} arr 方便递归时存储已筛选出的node节点，请固定传入[]
 * @returns 
 */
function getNode(el, arr) {
  el.childNodes.forEach((item, index) => {//对于当前元素的子节点进行循环
    if (item.tagName === "INPUT" && item.disabled !== true) {
      //如果当前的node节点是input,且为可用状态，则添加的数组中
      arr.push(item);
    } else {
      if (item.childNodes === undefined) return;//如果没有子节点则终止该函数
      getNode(item, arr);//如果有子节点则进行递归
    }
  });
  return arr;
}
```

这个函数传入两个参数，第一个是dom实例，第二个是一个空数组，

1. dom实例的作用是获取实例身上的childNodes，它会返回子节点的集合，我们对它进行循环
2. 空数组则是帮助我们再递归的过程中，保留我们需要的数据，通过闭包的形式返回出来

如果当前的node节点是input，并且它的diabled属性不会true，就会添加到我们的数组集合中。如果当前层级的input节点查询完毕，我们需要判断他是否有子节点，如果有子节点则进行递归操作，如果没有子节点则终止当前条件

### 3.3、绑定事件

我们将事件绑定到当前的dom上去，通过事件委托的机制来对我们需要实现的功能进行下发。

```js
nodes = getNode(el, []); //在当前绑定的元素下，获取非disabled的node节点
callBackHandler = bind;
el.addEventListener("keyup", nextHandler);//绑定keyup事件
```

#### 3.3.1绑定事件函数

```js
function nextHandler(e) {
  e.preventDefault();//阻止原生事件
  if (e.key !== "Enter") return;//如果不是回车键，则不触发
  nodes.forEach((item, index) => {//对于nodes节点进行循环，进行事件委托
    if (e.target === item) {//寻找当前触发的这个事件的node节点
      if (index === nodes.length - 1)//如果node节点是最后一位，则触发传入回调
        return callBackHandler.value && callBackHandler.value();//当传入回调存在时则进行触发
      nodes[index + 1].focus();//将焦点移动至下一个node
    }
  });
}
```

首先先阻止该函数的原生事件，当按键不会'Enter'时，则不进行触发，我们对收集到的node节点进行循环，找到当前触发事件的dom元素，接下来使用focus函数将焦点移动到下一个node节点，如果当前的节点是最后一个，则判断是否存在传入的回调函数，如果存在则调用，上文的if(条件)return这是一种简写方法

#### 3.3.2为什么要进行事件委托？

其实在开始的一版，是直接使用el.querySelectorAll("input");获取所有的input标签，然后直接进行绑定的，真的很好用，直接写个函数就干完了，但是它是真的很耗性能，所有的input标签都会绑定这个事件，如果你后续需要对input标签绑定事件，就该掉头发了，我们通过事件委托，就可以只绑定在父元素上，而且就一个，对于后期的副作用也好处理哦

![图片转存失败，建议将图片保存下来直接上传](https://img0.baidu.com/it/u=1954292512,992155393&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=450)

### 3.3.3为什么绑定keyup事件？

主要是因为大多键盘的默认事件都是在keydown上，而且大多数的ui框架也都是绑定一些事件在keydown上，主要就是为了不影响大家的习惯，后续拓展其他事件也方便

### 3.3.4为什么使用变量提前进行申明？

使用变量申明主要是方便在addEventListener绑定事件的函数中进行操作，addEventListener是无法传参进去的，如果你书写成（参数a）=>function（e）{}这种形式想要去获取如el或者bind这些我们需要在函数中使用的一些参数，我们会面临一个问题，在后续的removeEventListener中，我们将无法移除这个事件，道理和vue的data为什么是return一样，它每次都会生成一个具有新地址的函数，我没没法去移除它

感谢阅读。看到这里帮忙点个攒吧！Thanks♪(･ω･)ﾉ