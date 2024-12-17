函数顺序

submit >commentsObject>createEle>render 返回对象，=>bindEvent

### 1、提交事件

使用 submit()函数进行提交

绑定在提交按钮和键盘的ENTER键位上

#### 1-1 submit做了什么

submit事件

1. 判断文本是否为空，如果为空，则不进行后续操作
2. 生成id，这个函数是生成的时间戳，具有唯一性
3. 创建一个对象，commentsObject是一个构造函数，返回一个对象
4. render进行渲染操作
5. rander返回的对象，是我们需要操作的dom对象
6. commentsArr对于数据层，做一个保存数据的数组
7. bindEvent这个是对于需要操作的dom绑定事件
8.  domArr.push(domObj) 这个生成一个dom数组，这个是方便做全选操作
9.  clearHandler()清除添加完成后的副作用，比如文本清空

```javascript
    function submit (e) {
      if (!commentStr.trim()) return
      let id = new Date().getTime()
      let item = commentsObject(commentStr, getData(), id)//生成一个对象，构造函数
 
      let domObj = render(item, id)//渲染dom,返回一个对像，包含所有我们以后需要操作的dom
      commentsArr.push(item);//评论添加到数据数组中，这个数组的作用 可以发给后端
      bindEvent(domObj)//绑定事件
      domArr.push(domObj)//添加一个数组，这个数组收集的是，我们所有的需要操作dom
      clearHandler()//清除副作用，每一个我们完成操作后，需要将输入框数据清空，并且我们收集的commentStr也需要重置。
    }
```

### 2-1commentsObject 构造函数

```javascript
  function commentsObject (text, time, id, name = "张三",) {
      let obj = {};
      obj.name = name;
      obj.text = text;
      obj.time = time;
      obj.id = id
      return obj;
    }
name="张三"是一个默认值，他的作用，是在于每一次我们不传入name，自动生成
```

这个函数的本质，是一个构造函数，说通俗点，就是根据参数生成一个对象，免去每一次，我们都要重新的书写对象。减少重复书写对象的大量文本，有兴趣同学，可以看一下new 运算符

### 2-2 createEle生成dom的工具函数

他的作用：生成一个dom对象，并且返回一个它，他接受三个参数，都是string类型，

- tag 创建dom的标签
- className 创建dom的class类名
- text 创建dom的innerHTML文本
- ele是返回由参数创建的对象

```javascript
   function createEle (tag, className = "", text = "") {
      let ele = document.createElement(tag);

      ele.className = className;
      if (text) ele.innerHTML = text;
      return ele
    }
```



### 2-3 render dom生成函数

arr数组，他的目的是在一个循环中，生成我们想要的dom对象

1. forEach循环，每一次循环的过程中，会创建3个p标签的dom，本质上 相当于下面的不停的创建createDom，然后在appendChild到父元素中，循环的顺序，你可以用if判断，在中间插入dom，我们再这个text文本创建的后面，添加了input，最终决定顺序的是appendChild的插入顺序，我们这个是添加在text的dom之前的
2. 如果理解有困难，则全部使用createDom和appendChild重构，这个commentDomObj对象，主要收集的是，我们传入数据和input文本修改框生成的dom
3. 下文就是不停的创建dom，不停的插入dom。每一个dom的顺序和位置，是由appendChild的顺序决定的

```javascript
    function render (obj, id) {
        //建议可以看一下Object.keys 和Object.value 然后尝试改写下面这个循环
      let arr = [
        "name", "text", "time"
      ] //3个对象的属性名称
      let info = createEle("div", 'info');//创建info标签和类名
      let commentDomObj = {}//收集我们创建评论的dom，放在一个对象中，方便进行管理
      //循环创建重复dom,需要的展示文本
      arr.forEach((item) => {
        let ele = createEle("p", item, obj[item])//创建dom函数，返回值是当前创建的dom
        if (item === "text") {
          let input = createEle("input", "hidden");
          info.appendChild(input)
          commentDomObj["input"] = input
        }
        commentDomObj[item] = ele;
        info.appendChild(ele);
      })

      let item = createEle("div", 'item');
      let menu = createEle("div", "menu");
      let leftTool = createEle("div", "leftTool");
      let checkbox = createEle("input", "listCheckbox");//选择框
      checkbox.type = "checkbox";//选择框
      let del = createEle('div', "del", "删除");
      //删除按钮
      leftTool.appendChild(checkbox)
      menu.appendChild(del)
      item.appendChild(leftTool);
      item.appendChild(info);
      item.appendChild(menu);

      document.querySelector(".list").appendChild(item)//将我们生成的dom添加到list类下面
      return {
        ...commentDomObj, del: del, checkbox, id: id
      }
    }
```

### 3-1绑定事件

bindEvent(dom对象)专门用于绑定所有的事件

```javascript
    function bindEvent (domObj) {
      //双击打开文本框事件
      domObj.text.ondblclick = function (e) {
        let textDom = domObj.text;
        //input框
        let inputDom = domObj.input;
        //toggle,如果有class就删除，没有就添加
        textDom.classList.toggle('hidden');
        inputDom.classList.toggle("hidden");
        //让input文本框的值，等于当前评论的文本
        inputDom.value = textDom.innerHTML
        //input显示出来后，自动聚焦
        inputDom.focus();
      }
      //失去焦点保存事件
      domObj.input.onblur = function (e) {
        let textDom = domObj.text;
        let inputDom = domObj.input;
        let timeDom = domObj.time;
        textDom.classList.toggle('hidden');
        inputDom.classList.toggle("hidden");
        let time = getData()//获取时间
        //修改收集数据数组的值
        let index = commentsArr.findIndex(item => item.id === domObj.id);
        commentsArr[index].text = inputDom.value
        commentsArr[index].time = time;
        // 修改当前innerHTML文本
        textDom.innerHTML = inputDom.value;
        timeDom.innerHTML = time;
      }
      //删除dom事件
      domObj.del.onclick = function (e) {
        let index = commentsArr.findIndex(item => item.id === domObj.id);
        let domIndex = domArr.findIndex(item => item.id === domObj.id);
        commentsArr.splice(index, 1);
        domArr.splice(index, 1);
        e.target.parentElement.parentElement.remove()
      }
      domObj.checkbox.onchange = function (e) {
        let checkLength = 0
        for (let i = 0; i < domArr.length; i++) {
          const ele = domArr[i];
          if (ele.checkbox.checked) {
            checkLength++
          }
        }
        if (checkLength === domArr.length) {
          allCheckDom.checked = true
        } else {
          allCheckDom.checked = false
        }

      }
    }
```

### 3-2双击出现和隐藏修改文本框

ondblclick是鼠标左键双击事件

1. 我们通过出传入的dom对象，获取到text文本dom和input输入框dom
2. 使用classList.toggle（）api实现对隐藏css类的添加，来决定dom是否显示
3. 显示之后，我们需要使input需要有原来的值，我们使用value属性来设置
4. 使用focus（）api事件，使input出现后，焦点自动聚焦到输入框

```javascript
   domObj.text.ondblclick = function (e) {
        let textDom = domObj.text;
        //input框
        let inputDom = domObj.input;
        //toggle,如果有class就删除，没有就添加
        textDom.classList.toggle('hidden');
        inputDom.classList.toggle("hidden");
        //让input文本框的值，等于当前评论的文本
        inputDom.value = textDom.innerHTML
        //input显示出来后，自动聚焦
        inputDom.focus();
      }
```

### 3-3失去焦点后的事件

失去焦点事件，更新事件，切换显示的dom，更新文本，更新收集数据的数组

1. 我们获取相应的dom，然后同toggle对于有hidden的class类名进行删除，没有的则添加
2. 使用getDate（）更新时间
3. findIndex接受一个回调，通过每个对象的id是否等于当前dom对象的id ，索引到需要更改的数据对象
4. 让收集的数组更新文本，更新时间
5. 页面使用innerHTML进行渲染

```javascript
   domObj.input.onblur = function (e) {
        let textDom = domObj.text;
        let inputDom = domObj.input;
        let timeDom = domObj.time;
        textDom.classList.toggle('hidden');
        inputDom.classList.toggle("hidden");
        let time = getData()//获取时间
        //修改收集数据数组的值
        let index = commentsArr.findIndex(item => item.id === domObj.id);
        commentsArr[index].text = inputDom.value
        commentsArr[index].time = time;
        // 修改当前innerHTML文本
        textDom.innerHTML = inputDom.value;
        timeDom.innerHTML = time;
      }
```

### 3-4删除dom事件

通过id找到对应的收集数据的数组和dom对象的数组

1. 找到收集数据数组中的对应数据对象
2. 使用splice将其从数组中移除
3. 通过e.terget找到父元素的父元素，目的在于找到整个评论对象的dom可以通过打印来看 获取的是什么
4. 通过removeapi移除

```javascript
      domObj.del.onclick = function (e) {
        let index = commentsArr.findIndex(item => item.id === domObj.id);
        let domIndex = domArr.findIndex(item => item.id === domObj.id);
        commentsArr.splice(index, 1);
        domArr.splice(index, 1);
        e.target.parentElement.parentElement.remove()
      }
```

### 3-4全选事件

通过计数的手段，判断选择中的checked值的多少，是否和全部dom数组的长度相等，如果相等，则将全选框dom的checked状态改为true，如果不相等，则将全选框的状态变更为false

1. 设置一个0的数字，对数组的长度进行循环
2. domArr里面所存放的dom，是会跟着真实的dom发生变化的，它实际上就是页面上存在的dom元素
3. 判断是否是选中状态，如果是则++ 
4. 将最终长度和所获取checked的dom的元素数量进行对比，如果相等 则全选

外部的全选框事件

1. 我们在render生成dom的时候，就已经将dom数组收集完毕了
2. 我们再点击全选框后，会使它的checked状态发生变化，我们使用onchange事件去监听它
3. 如果发生的变化，则将所有dom数组中的checkbox都设置为当前全选框的checked值

```javascript
//每个dom的选择框事件
domObj.checkbox.onchange = function (e) {
        let checkLength = 0
        for (let i = 0; i < domArr.length; i++) {
          const ele = domArr[i];
          if (ele.checkbox.checked) {
            checkLength++
          }
        }
    //或者checkLength >= domArr.length
        if (checkLength === domArr.length) {
          allCheckDom.checked = true
        } else {
          allCheckDom.checked = false
        }

      }

//外部全选框事件
 allCheckDom.onchange = function (e) {
      for (let i = 0; i < domArr.length; i++) {
        domArr[i].checkbox.checked = e.target.checked;

      }
    }
```