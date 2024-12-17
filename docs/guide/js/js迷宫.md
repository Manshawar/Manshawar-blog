# 迷宫生成

## 1、生成数组

首先，设置一个储存宽高的数组，名称rect,将这个储存宽高的数组，可以通过x*y得出所有内部分割方块的坐标；

```js
    let rect = [5, 5];
    let side = 495 / 5;
    let arr = Array.from({ length: rect[0] }, (_, x) => {
      return Array.from({ length: rect[1] }, (_, y) => {
        return {
          visited: false,
          axis: [x, y],
          path: [true, true, true, true]
        }
      })
    })
```

通过Array.from 设置类数组对象转化为多维数组，以此得到每一个位置的坐标

## 2、编辑canvas绘画方法

```js
 let myCanvas = document.getElementById("myCanvas");
    let ctx = myCanvas.getContext("2d");
    let draw = {
      top ([x, y]) {
        ctx.moveTo(x * side, y * side);
        ctx.lineTo((x + 1) * side, y * side);
        ctx.stroke();
      },
      right ([x, y]) {
        ctx.moveTo((x + 1) * side, y * side);
        ctx.lineTo((x + 1) * side, (y + 1) * side);
        ctx.stroke();
      },
      bottom ([x, y]) {
        ctx.moveTo((x + 1) * side, (y + 1) * side);
        ctx.lineTo((x) * side, (y + 1) * side);
        ctx.stroke();
      },
      left ([x, y]) {
        ctx.moveTo((x) * side, (y + 1) * side);
        ctx.lineTo((x) * side, (y) * side);
        ctx.stroke();
      }
    }
    
     arr.forEach(arrIndex => {
      arrIndex.forEach(item => {

        if (item.path[0]) draw.top(item.axis)
        if (item.path[1]) draw.right(item.axis)
        if (item.path[2]) draw.bottom(item.axis)
        if (item.path[3]) draw.left(item.axis)
      })
    })
```

获取canvas，思路是通过对每一个分割出来的方块画出其边长，形成一个x*y的宫格，然后对其拆除墙体，实现迷宫

画出方块的对象方法，是根据上右下左来进行书写的,最后通过两轮循环，对所有的位置进行绘画。path 如果为false就代表不需要绘画，path数据初始化为[true,true,true,true],后续对其进行修改，以做到分割单元格的目的

## 3、进行迷宫生成

1. 我们找到当前位置的四个的相邻元素

2. 相邻元素是否可以访问，是否没有被遍历过

3. 如果没有被遍历过，就作为可访问数组来确定下一次走到的位置，

4. 将走到的位置加入stack内，我们不停的遍历入栈后这个元素的所有边

5. 可以形成一条通路到最后一个元素

   

###  3-1、设置初始位置

我们选择[0,0]作为初始位置开始生成

```js
    let current = { axis: [0, 0], dir: undefined };
      arr[0][0].visited = true;
```

### 3-2、寻找可选方向

寻找四个方向，如果到墙壁就返回，如果被访问过的也返回，我们的目的是将所有没有返回过的数组进行操作，并记录他相对于初始位置的方向，便于消除墙壁

```js
    function find_position ([x, y], dir) {

      switch (dir) {
        case 0:
          if (y - 1 < 0) return
          if (arr[x][y - 1].visited) return
          return { axis: [x, y - 1], dir }
        case 1:
          if (x + 1 >= rect[0]) return
          if (arr[x + 1][y].visited) return
          return { axis: [x + 1, y], dir }
        case 2:
          if (y + 1 >= rect[1]) return
          if (arr[x][y + 1].visited) return
          return { axis: [x, y + 1], dir }
        case 3:
          if (x - 1 < 0) return
          if (arr[x - 1][y].visited) return
          return { axis: [x - 1, y], dir }
      }
    }
```

### 3-3、将可选方向作为数组返回

[0,1,2,3]分别对应上右下左,存在能进行下一步操作的元素才进行收集

```js
    function find_neighbor ([x, y]) {
      let res = []
      let top = find_position([x, y], 0);
      let right = find_position([x, y], 1);
      let bottom = find_position([x, y], 2);
      let left = find_position([x, y], 3);
      if (top) res.push(top);
      if (right) res.push(right);
      if (bottom) res.push(bottom);
      if (left) res.push(left);
      return res
    }
```

### 3-4、随机当前元素的可选地址于上一个元素的墙壁进行联通

```js
       let random = Math.floor(Math.random() * find_res.length);
        clear_rect(current, find_res[random]);
```

消除墙壁,当下一个元素和当前元素的墙壁消掉后，将其可访问值设置为true，使其下一次不会被选中

```js
    function clear_rect (now_pos, next_pos) {
      let now = arr[now_pos.axis[0]][now_pos.axis[1]];

      let next = arr[next_pos.axis[0]][next_pos.axis[1]];
      next.visited = true

      switch (next_pos.dir) {
        case 0:
          next.path[2] = false
          now.path[0] = false;
          break;
        case 1:
          next.path[3] = false;
          now.path[1] = false;
          break;
        case 2:
          now.path[2] = false;
          next.path[0] = false
          break;
        case 3:
          next.path[1] = false;
          now.path[3] = false;
          break;
      }
```

### 3-5、使用堆栈对其进行遍历

```js
    function create_maze (arr) {
      let current = { axis: [0, 0], dir: undefined };
      arr[0][0].visited = true;
      let stack = [current]
      while (stack.length > 0) {
        let find_res = find_neighbor(current.axis);
        if (find_res.length > 0) {

          let random = Math.floor(Math.random() * find_res.length);
          clear_rect(current, find_res[random]);

          current = find_res[random];
          stack.push(current);
        } else {
          current = stack.pop()
        }
      }

    }
```

设置一个初始位置为初始栈，只要当前栈还有可选位置元素，就会对当前位置进行四个边的查找，没有对应的元素就会让其退出栈，直到所有元素都被访问过，才会退出循环，我们查找到下一次的边如果还存在可选边就会将其加入栈内，如果随机到一个位置恰好四个边都被访问，但还没有完全遍历整个迷宫，我们就会将其出栈，使其作为新的可选位置元素，使用pop出栈，他会从最后一位元素开始重新查找