## 1、grid

### justify-self 属性、align-self 属性以及 place-self 属性

[justify-self 属性/ align-self 属性/ place-self 属性演示地址](https://link.juejin.cn?target=https%3A%2F%2Fcodepen.io%2Fgpingfeng%2Fpen%2FZEQZEJK%3Feditors%3D1100)

`justify-self` 属性设置单元格内容的水平位置（左中右），跟 `justify-items` 属性的用法完全一致，但只作用于单个项目

`align-self` 属性设置单元格内容的垂直位置（上中下），跟align-items属性的用法完全一致

justify-content,align-content也能生效

grid 布局简写row在前

- /* <'grid-template'> values */\
- /* <'grid-template-rows'> /
- /* [ auto-flow && dense? ] <'grid-auto-rows'>? /  <'grid-template-columns'> values */
- /* Global values */



```
grid = 
  <'grid-template'>                                   |
  <'grid-template-rows'> / [ auto-flow && dense? ] <'grid-auto-columns'>?  |
  [ auto-flow && dense? ] <'grid-auto-rows'>? / <'grid-template-columns'>  
```

|                           grid简写                           |                    案例                    |
| :----------------------------------------------------------: | :----------------------------------------: |
| /* [ auto-flow && dense? ] <'grid-auto-rows'>? /  <'grid-template-columns'> values */ | grid: auto-flow dense 1fr 2fr/200px 200px; |
| /* <'grid-template-rows'> /    [ auto-flow && dense? ] <'grid-auto-columns'>? values */ |     grid: repeat(3, 60px) / auto-flow;     |
|                /* <'grid-template'> values */                |        grid: 1fr 2fr /2fr 1fr 1fr;         |



|                      grid-template简写                       |                             案例                             |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|     /* 为 grid-template-rows / grid-template-columns */      |             grid-template: 100px 1fr / 50px 1fr;             |
| /* 为 grid-template-areas grid-template-rows / grid-template-column */ | grid-template:<br/> "head head" 30px<br/>   "nav  main" 1fr <br/>   "nav  foot" 30px <br/>    / 200px 300px;<br/>} |

### 1.1  grid-template-columns

每一位数字都代表当前列；  grid-template-columns: 1fr 2fr 1fr;3列，中间一列代表2等分列；fr代表百分比；repeat()表示网格轨道的重复部分，以一种更简洁的方式去表示大量而且重复列的表达式。



### 1.2grid-template-rows 

`grid-template-rows` 该属性是基于 [网格行](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Row) 的维度，去定义网格线的名称和网格轨道的尺寸大小。

它会根据 grid-template-columns多退少补

### 1.3repeat

```
/* <track-repeat> values */
repeat(4, [col-start] 1fr [col-end])
在子元素中设置grid-column-start开始位置column
在子元素中设置grid-column-end结束位置column
在子元素中设置grid-row-start开始位置row
在子元素中设置grid-row-end结束位置row
```

[`max-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat#max-content)

代表占据网格轨道的网格项目所分配的最大内容区域的最大值。

[`min-content`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat#min-content)

代表占据网格轨道的网格项目所分配的最小内容区域的最小值。

[`auto`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat#auto)

作为最大值，等同于 `max-content`。作为最小值，它代表占据网格轨道的网格项目的最小尺寸的最大值（如同[`min-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-width)/[`min-height`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/min-height)所指定的)）。

[`auto-fill`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat#auto-fill)

如果网格容器在相关轴上具有确定的大小或最大大小，则重复次数是最大可能的正整数，不会导致网格溢出其网格容器。如果定义了，将每个轨道视为其最大轨道尺寸大小函数 ( `grid-template-rows` 或 `grid-template-columns`用于定义的每个独立值。否则，作为最小轨道尺寸函数，将网格间隙加入计算。如果重复次数过多，那么重复值是 `1` 。否则，如果网格容器在相关轴上具有确定的最小尺寸，重复次数是满足该最低要求的可能的最小正整数。否则，指定的轨道列表仅重复一次。

[`auto-fit`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/repeat#auto-fit)

行为与 `auto-fill` 相同，除了放置网格项目后，所有空的重复轨道都将折叠。空轨道是指没有流入网格或跨越网格的网格项目。（如果所有轨道都为空，则可能导致所有轨道被折叠。）

折叠的轨道被视为具有单个固定轨道大小函数为 `0px`，两侧的槽都折叠了。

为了找到自动重复的轨道数，用户代理将轨道大小限制为用户代理指定的值（例如 `1px`），以避免被零除。

注：如果有剩余空间的话，`auto-fill` 会创建额外的空列。而 `auto-fit` 则以最后一个 Gird 项目结束 Gird 容器，不管是否还有额外的空间存在。

### 1.4gap

[CSS](https://developer.mozilla.org/zh-CN/docs/Web/CSS) **`gap`** [简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties)用于设置行与列之间的间隙（[网格间距](https://developer.mozilla.org/zh-CN/docs/Glossary/Gutters)）。

规范的早期版本将该属性命名为 `grid-gap`，且为了保持与旧网站的兼容性，浏览器仍然会接受 `grid-gap` 作为 `gap` 的别名。

### 1.5grid-area

CSS 属性 **`grid-area`** 是一种对于 [`grid-row-start` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-start)、[`grid-column-start` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-start)、[`grid-row-end` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-row-end) 和 [`grid-column-end` (en-US)](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-column-end) 的简写，通过基线（line），跨度（span）或没有（自动）的网格放置在 [grid row](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Row) 中指定一个网格项的大小和位置，继而确定 [grid area](https://developer.mozilla.org/zh-CN/docs/Glossary/Grid_Areas) 的边界。

### 1.6网格行grid-column-start， grid-column-end   注 再整理

列之间的线称为列线，行之间的线称为行线，如果三条列线三条行线会组成6个网格

如需放置某个项目，您可以引用行号（line numbers），或使用关键字 "span" 来定义该项目将跨越多少列。



 给第一个item 添加类item1，从第一列线开始第三列线结束，说明item1此时占据两个网格项的长度， 此时界面就会变成。

.item1 {
        grid-column-start: 1;
        grid-column-end: 3;
       //也可以写成
        grid-column: 1 / 3;
     }
//等价于
.item1{
        grid-column: 1 / span 2;//表示从第一列开始  占两格  相当于从第1列开始 第3列结束
     }

###  1.7grid-area属性

grid-area属性可以用作 grid-row-start、grid-column-start、grid-row-end 和 grid-column-end 属性的简写属性。

  .item1 {
        //列线从第一条到第三条，行线从第一条到第三条
        grid-area: 1 / 1 / 3 / 3;
    }

这个是命名

### 1.8grid-template-areas

grid-template-areas 属性在网格布局中规定区域。您可以使用 grid-area 属性命名网格项目，然后在 grid-template-areas 属性中引用该名称。

这个是使用

//基线参考资料

https://blog.csdn.net/Tonghanhan/article/details/130289704

#### 1.9grid-auto-flow

**`grid-auto-flow`** 属性控制着自动布局算法怎样运作，精确指定在网格中被自动布局的元素怎样排列。

```
grid-auto-flow: row;
grid-auto-flow: column;
grid-auto-flow: dense;
grid-auto-flow: row dense;
grid-auto-flow: column dense;
```

[`row`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-flow#row)

该关键字指定自动布局算法按照通过逐行填充来排列元素，在必要时增加新行。如果既没有指定 `row` 也没有 `column`，则默认为 `row`。

[`column`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-flow#column)

该关键字指定自动布局算法通过逐列填充来排列元素，在必要时增加新列。

[`dense`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-auto-flow#dense)

该关键字指定自动布局算法使用一种“稠密”堆积算法，如果后面出现了稍小的元素，则会试图去填充网格中前面留下的空白。这样做会填上稍大元素留下的空白，但同时也可能导致原来出现的次序被打乱。

如果省略它，使用一种「稀疏」算法，在网格中布局元素时，布局算法只会「向前」移动，永远不会倒回去填补空白。这保证了所有自动布局元素「按照次序」出现，即使可能会留下被后面元素填充的空白。

#### 2.0grid-auto-rows 

属性为网格容器中的行设置尺寸。

该属性只会影响未设置尺寸的行。

**隐式和显示网格**：显式网格包含了你在 `grid-template-columns` 和 `grid-template-rows` 属性中定义的行和列。如果你在网格定义之外又放了一些东西，或者因为内容的数量而需要的更多网格轨道的时候，网格将会在隐式网格中创建行和列

假如有多余的网格（也就是上面提到的隐式网格），那么它的行高和列宽可以根据 `grid-auto-columns` 属性和 `grid-auto-rows` 属性设置。它们的写法和` grid-template-columns` 和 `grid-template-rows` 完全相同。如果不指定这两个属性，浏览器完全根据单元格内容的大小，决定新增网格的列宽和行

#### 2.1grid-template 

所简写属性：[`grid-template-rows`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-rows)、[`grid-template-columns`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-columns)与[`grid-template-areas`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/grid-template-areas)

以/分割 前面的每一行代表实际的一行基线分布情况 后面的值是row的值 <track-list> values 

/后面的就是整体column的分布情况

```css
#page {
  display: grid;
  width: 100%;
  height: 200px;
  grid-template:
 "head head" 30px
   "nav  main" 1fr 
   "nav  foot" 30px 
    / 200px 300px;
}
```