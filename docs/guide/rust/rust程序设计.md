### 基本操作方法

1. !符号，系统宏使用这个
2. use std::io 引入 想象成 std.io
3. 变量名前添加 `mut`（mutability，可变性）let mut bananas = 5;
4. `::new` 那一行的 `::` 语法表明 `new` 是 `String` 类型的一个关联函数
5. read_line(&mut guess) `&` 表示这个参数是一个**引用**
6. `{}` 也可以打印多个值：第一对 `{}` 使用格式化字符串之后的第一个值，第二对则使用第二个值，
7. use rand::Rng `Rng` 是一个 trait，它定义了随机数生成器应实现的方法
8. 区间表达式采用的格式为 `start..end 1..=100`
9. `cargo doc --open` 命令来构建所有本地依赖提供的文档;
10. 不过 Rust 允许用一个新值来**遮蔽**
11. loop 循环 会持续循环内容 知道 break 退出 continu 中断进入下一次循环
12. match 可以比较多次情况，选项为 Ok 和 Err 时能代替 expect

## 1、基本概念

### 1-1、变量和可变性

#### 1-1-1-1、 可变性

```rust
let space = "     ";
let space = space.len();
这样可以遮蔽 但如果你使用变量 则会报错 因为我们不能修改变量的类型 涉及到变量类型的修改需要遮蔽
错误示例
let mut spaces = "   ";
 spaces = spaces.len();
```

### 1-2、数据类型

#### 1-2-1、基本数据类型

**标量** （ _scalar_ ）类型表示单个值。Rust 有 4 个基本的标量类型：整型、浮点型、布尔型和字符

i&u 可选值 8，16，32，64，128，size

整型

`i` 是英文单词 _integer_ 的首字母，与之相反的是 `u`,`u无符号 i有符号`

| 类型 |       存储数字范围       |   十进制   |
| :--- | :----------------------: | :--------: |
| i8   | $-(2 ^7^ ) ~ 2^7^ - 1$ | -128 ~ 127 |
| u8   |     $0 ~ 2^8^ - 1$     |  0 ~ 255  |

数字字面量还可以使用 `_` 作为可视分隔符以方便读数，如 `1_000`，此值和 `1000` 相同

整数溢出 在 `u8` 的情况下，256 变成 0，257 变成 1，依此类推

| 类型 | 知识点               |
| ---- | -------------------- |
| 浮点 | f64(default)更加精准 |
| 布尔 | bool                 |

#### 1-2-2、符合数据类型

1、元组类型

```rust
 let tup: (i32, f64, u8) = (500, 6.4, 1);
tup.0
 let (x,y,z) = tup
```

2、数组类型

明确元素数量不需要改变时，数组会更有用,大小**允许**增长或缩小。如果不确定是使用数组还是 vector，那就应该使用一个 vector

```rust
let a: [i32; 5] = [1, 2, 3, 4, 5];
let a=[3;5] 等效于let a = [3, 3, 3, 3, 3]
```

### 1-3、函数

Rust 代码中的函数和变量名使用下划线命名法（ _snake case_ ，直译为蛇形命名法）规范风格 another_function

函数调用是一个表达式。宏调用是一个表达式。我们用来创建新作用域的大括号（代码块） `{}` 也是一个表达式，表达式的结尾没有分号。如果在表达式的末尾加上分号，那么它就转换为语句，而语句不会返回值。

> 返回值

1. 在 Rust 中，函数的返回值等同于函数体最后一个表达式的值
2. 使用 `return` 关键字和指定值，可以从函数中提前返回；但大部分函数隐式返回最后一个表达式。

```rust
    let y = {
        let x = 3;
        x + 1
    };
    println!("这是y{}", y);//这个是成立的 但加上;后，会从表达式变成语句,会报错
	fn five() -> i8 {
    	return -2 + 2;
	}
等效于
fn five() -> i8 {
    	 -2 + 2
	}
不能加;
```

### 1-4、控制流

#### 1-4-1、if

`if` 是一个表达式，我们可以在 `let` 语句的右侧使用它来将结果赋值给一个变量;

> `if` 的每个分支的可能的返回值都必须是相同类型；

```rust
 let  condition = false;
 let number = if condition { 5 } else { 6 };
```

#### 1-4-2、循环

Rust 有三种循环：`loop`、`while` 和 `for`。

##### loop

`loop` 关键字告诉 Rust 一遍又一遍地执行一段代码直到你明确要求停止。停止关键字 break

```rust
fn loopfn() {
    let mut x = 0;
    let _res = loop {
        if x == 100 {
            break x;
        }
        x += 1;
    };
    println!("值{}", x)
}//loop新婚换可以使用break 返回出值 类似于 if
```

##### while

在程序中计算循环的条件也很常见。当条件为真，执行循环。当条件不再为真，调用 `break` 停止循环。这个循环类型可以通过组合 `loop`、`if`、`else` 和 `break` 来实现；

##### for

可以使用 `for` 循环来对一个集合的每个元素执行一些代码。

`Range`，它是标准库提供的类型，用来生成从一个数字开始到另一个数字之前结束的所有数字的序列,start..end 包左不包右

```rust
fn main() {
    for number in (1..4).rev() {
        println!("{}!", number);
    }
    println!("LIFTOFF!!!");
}
```

## 2、所有权

所有权规则

- Rust 中的每一个值都有一个被称为其 **所有者** （ _owner_ ）的变量。
- 值在任一时刻有且只有一个所有者。
- 当所有者（变量）离开作用域，这个值将被丢弃。

### 2-1、所有权基本概论

#### 2-1-1、string

Rust 有第二个字符串类型，`String`。这个类型管理被分配到堆上的数据，所以能够存储在编译时未知大小的文本。可以使用 `from` 函数基于字符串字面量来创建 `String`

双冒号（`::`）运算符允许我们将特定的 `from` 函数置于 `String` 类型的命名空间（namespace）下,而不需要使用类似 `string_from` 这样的名字

```rust
let s = String::from("hello");
 s.push_str(", world!"); // push_str() 在字符串后追加字面值
```

#### 2-1-2、移动

栈内存

所以这两个 `5` 被放入了栈中

```rust
 let x = 5;
 let y = x;
```

以下的代码会对指针产生移动，为了性能考虑，并不会赋值堆内存，而是移动其指针

Rust 同时使第一个变量无效了，这个操作被称为 **移动** （ _move_ ）

```rust
   let s1 = String::from("hello");
   let s2 = s1;
//这段代码不能运行
//当变量离开作用域后，Rust 自动调用 drop 函数并清理变量的堆内存。
```

两个指针指向同一个堆，这样会导致在离开时进行两次释放，这是一个叫做 **二次释放** （ _double free_ ）的错误

Rust 永远也不会自动创建数据的 “深拷贝”。因此，任何 **自动** 的复制可以被认为对运行时性能影响较小。

#### 2-1-3、克隆

可以使用一个叫做 `clone` 的通用函数

```rust
 let s1 = String::from("hello");
 let s2 = s1.clone();

 println!("s1 = {}, s2 = {}", s1, s2);
```

#### 2-1-4、拷贝

```rust
   let x = 5;
   let y = x;

   println!("x = {}, y = {}", x, y);
```

像整型这样的在编译时已知大小的类型被整个存储在栈上，所以拷贝其实际的值是快速的

Rust 有一个叫做 `Copy` trait 的特殊标注，可以用在类似整型这样的存储在栈上的类型上

#### 2-1-5、所有权函数

将值传递给函数在语义上与给变量赋值相似。向函数传递值可能会移动或者复制，就像赋值语句一样。

```rust
fn main() {
    let s: String = String::from("hello");
    let s1: String = s.clone();
    takes_ownership(s);
    println!("smain{}", s1);

    let x = 5; // x 进入作用域

    makes_copy(x);
    println!("xmain{}", x);
}
fn takes_ownership(s: String) {
    println!("s,{}", s)
}
fn makes_copy(some_integer: i32) {
    // some_integer 进入作用域
    println!("{}", some_integer);
}
```

传入值进入函数 栈类型会重新赋值

传入堆的值，会将指针改变指向，因为后续指针变了所以 s 的值就没有了。形参 s 的指针就指向实参的堆了

返回值也可以转移所有权

我们可以使用元组来返回多个值

```rust
fn main() {
    let s1 = String::from("hello");

    let (s2, len) = calculate_length(s1);

    println!("The length of '{}' is {}.", s2, len);
}

fn calculate_length(s: String) -> (String, usize) {
    let length = s.len(); // len() 返回字符串的长度

    (s, length)
}
```

### 2-2、引用

```rust
fn main() {
    println!("Hello, world!");
    let s1 = String::from("hello");
    let len = calculate_length(&s1);
    println!("len{},s1{}", len, s1);
}
fn calculate_length(s: &String) -> usize {
    s.len()
}
//传入后都不会改变指针位置
```

& 符号就是 **引用** ，它们允许你使用值但不获取其所有权。

> 注意：与使用 `&` 引用相反的操作是 **解引用** （ _dereferencing_ ），它使用解引用运算符，`*`。

函数签名使用 `&` 来表明参数 `s` 的类型是一个引用；

可变引用

```rust
fn main() {
    let mut s = String::from("hello");

    change(&mut s);
}

fn change(some_string: &mut String) {
    some_string.push_str(", world");
}
```

可变引用有一个很大的限制：在同一时间，只能有一个对某一特定数据的可变引用。尝试创建两个可变引用的代码将会失败

```rust
 let mut s = String::from("hello");

    let r1 = &mut s;
    let r2 = &mut s;

    println!("{}, {}", r1, r2);
数据竞争，rust不会编译
* 两个或更多指针同时访问同一数据。
* 至少有一个指针被用来写入数据。
* 没有同步数据访问的机制。
```

可以使用大括号来创建一个新的作用域，以允许拥有多个可变引用，只是不能 **同时** 拥有

```rust
    let mut s = String::from("hello");

    {
        let r1 = &mut s;
    } // r1 在这里离开了作用域，所以我们完全可以创建一个新的引用

    let r2 = &mut s;
```

```rust
    let mut s = String::from("hello");

    let r1 = &s; // 没问题
    let r2 = &s; // 没问题
    let r3 = &mut s; // 大问题

    println!("{}, {}, and {}", r1, r2, r3);
```

可变会通过指针访问堆数据，如果不用 mut,&仅仅是借用，无法进行修改，没有存在所有权在&中；

不能在拥有不可变引用的同时拥有可变引用，多个不可变引用是可以的

> 一个引用的作用域从声明的地方开始一直持续到最后一次使用为止

```rust
let mut s = String::from("hello");

    let r1 = &s; // 没问题
    let r2 = &s; // 没问题
    println!("{} and {}", r1, r2);
    // 此位置之后 r1 和 r2 不再使用

    let r3 = &mut s; // 没问题
    println!("{}", r3);
    let r4 = &mut s; // 没问题
    println!("r4{}", r4);
//不可变引用 r1 和 r2 的作用域在 println! 最后一次使用之后结束，这也是创建可变引用 r3 的地方。它们的作用域没有重叠，所以代码是可以编译的
```

#### 2-2-1、悬垂指针

    悬垂指针是其指向的内存可能已经被分配给其它持有者

```rust
fn dangle() -> &String { // dangle 返回一个字符串的引用

    let s = String::from("hello"); // s 是一个新字符串

    &s // 返回字符串 s 的引用
} // 这里 s 离开作用域并被丢弃。其内存被释放。
  // 危险！
```

#### 2-2-2、引用总结

- 在任意给定时间，**要么** 只能有一个可变引用，**要么** 只能有多个不可变引用。
- 引用必须总是有效的。
- 如果要有多个可用，需要不在一个作用域内
- 一个引用的作用域从声明的地方开始一直持续到最后一次使用为止

### 2-3、切片 slice

另一个没有所有权的数据类型是 _slice_ 。slice 允许你引用集合中一段连续的元素序列，而不用引用整个集合。

#### 2-3-1、**字符串 slice**

```rust
   let s = String::from("hello world");

    let hello = &s[0..5];
    let world = &s[6..11];
    let slice = &s[0..2];
    let slice = &s[..2];
    let slice = &s[3..len];
    let slice = &s[3..];
    let slice = &s[0..len];
    let slice = &s[..];
```

“字符串 slice” 的类型声明写作 `&str`

字符串 slice，正如你想象的那样，是针对字符串的。不过也有更通用的 slice 类型。考虑一下这个数组

## 3、结构体组织关联数据

### 3-1、定义

#### 3-1-1、结构体

类似于对象

```rust

#[derive(Debug)]
struct User {
    active: bool,
    username: String,
    email: String,
    sign_in_count: u64,
}
fn main() {
    let mut user1 = User {
        email: String::from("hello.com"),
        active: true,
        username: String::from("姬霓太美"),
        sign_in_count: 123456,
    };
    user1.email = String::from("我是你的谁.com");
    // println!("{:?}", user1);
    test_fn(&mut user1);
    println!("{:?}", user1);
}

fn test_fn(test: &mut User) {
    test.sign_in_count = 5;
    println!("{:?}", test);
}

```

注意 所有权机制

**字段初始化简写语法**

```rust
fn build_user(email: String, username: String) -> User {
    User {
        email,
        username,
        active: true,
        sign_in_count: 1,
    }
}
```

`..` 语法指定了剩余未显式设置值的字段应有与给定实例对应字段相同的值 `..user1` 必须放在最后

```rust
.. 语法指定了剩余未显式设置值的字段应有与给定实例对应字段相同的值。
  let user2 = User {
        username: String::from("马喽"),
        ..user1
    };
```

所有权会发生移动

#### 3-1-2、元组

```rust
struct Color(i32, i32, i32);
struct Point(i32, i32, i32);

fn main() {
    let black = Color(0, 0, 0);
    let origin = Point(0, 0, 0);
}

//元组实际使用场景
fn main() {
    let rect1 = (30, 50);

    println!(
        "The area of the rectangle is {} square pixels.",
        area(rect1)
    );
}

fn area(dimensions: (u32, u32)) -> u32 {
    dimensions.0 * dimensions.1
}
```

#### 3-1-3、单元结构体

你想要在某个类型上实现 trait 但不需要在类型中存储数据的时候发挥作用

```rust
struct AlwaysEqual;

fn main() {
    let subject = AlwaysEqual;
}
```

#### 3-1-4、打印结构体

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!("rect1 is {:?}", rect1);
}
```

在结构体定义之前加上外部属性 `#[derive(Debug)]`

两种风格 `{:?}` `{:#?}`

dbg!宏打印

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

fn main() {
    let scale = 2;
    let rect1 = Rectangle {
        width: dbg!(30 * scale),
        height: 50,
    };

    dbg!(&rect1);
}
//[src/main.rs:14] &rect1 = Rectangle {
    //width: 60,
    //height: 50,
//}
```

### 3-2、方法语法

**方法** 与函数类似：它们使用 `fn` 关键字和名称声明，可以拥有参数和返回值，同时包含在某处调用该方法时会执行的代码。不过方法与函数是不同的，因为它们在结构体的上下文中被定义（或者是枚举或 trait 对象的上下文，将分别在第 6 章和第 17 章讲解），并且它们第一个参数总是 `self`，它代表调用该方法的结构体实例。

```rust
#[derive(Debug)]
struct Rectangle {
    width: u32,
    height: u32,
}

impl Rectangle {//impl 块中的所有内容都将与 Rectangle 类型相关联
    fn area(&self) -> u32 {
        self.width * self.height
    }//在 area 的签名中，使用 &self 来替代 rectangle: &Rectangle，&self 实际上是 self: &Self 的缩写
    fn width(&self) -> bool {
        self.width > 0
    }
}

fn main() {
    let rect1 = Rectangle {
        width: 30,
        height: 50,
    };

    println!(
        "The area of the rectangle is {} square pixels.",
        rect1.area()
    );
println!("Hello, world!{}", rect1.width());同名的情况下，()是方法，不加（）是值
println!("Hello, world!{}", rect1.width);
}
```

> 如果想要在方法中改变调用方法的实例，需要将第一个参数改为 `&mut self `通过仅仅使用 `self` 作为第一个参数来使方法获取实例的所有权是很少见的 这种技术通常用在当方法将 `self` 转换成别的实例的时候，这时我们想要防止调用者在转换之后使用原始的实例。

> 当我们在 `rect1.width` 后面加上括号时。Rust 知道我们指的是方法 `width`。当我们不使用圆括号时，Rust 知道我们指的是字段 `width`。

#### 3-2-1、关联函数

所有在 `impl` 块中定义的函数被称为 **关联函数** （ _associated function_ ）

我们可以定义不以 `self` 为第一参数的关联函数（因此不是方法）

```rust
impl Rectangle {
    fn square(size: u32) -> Rectangle {
        Rectangle {
            width: size,
            height: size,
        }
    }
}
```

使用结构体名和 `::` 语法来调用这个关联函数：比如 `let sq = Rectangle::square(3);`。这个方法位于结构体的命名空间中：`::` 语法用于关联函数和模块创建的命名空间。第 7 章会讲到模块。

> **区别 关联函数需要通过::语法调用**

#### 3-2-2、多个 impl 块

```rust
impl Rectangle {
    fn area(&self) -> u32 {
        self.width * self.height
    }
}

impl Rectangle {
    fn can_hold(&self, other: &Rectangle) -> bool {
        self.width > other.width && self.height > other.height
    }
}
```

## 4、枚举和模式匹配

### 4-1、枚举

`枚举::枚举值`

#### 4-1-1、定义枚举

```rust
#[derive(Debug)]
enum IpAddrkind {
    V4,
    V6,
}
struct IpAddr {
    kind: IpAddrkind,
    address: String,
}
fn main() {
    let four = dbg!(IpAddrkind::V4);
    let six = IpAddrkind::V6;
    dbg!(four);
    route(IpAddrkind::V4);
    route(IpAddrkind::V6);
    let home = IpAddr {
        kind: IpAddrkind::V4,
        address: String::from("127.0.0.1"),
    };
    let loopback = IpAddr {
        kind: IpAddrKind::V6,
        address: String::from("::1"),
    };
}
fn route(ip_type: IpAddrkind) {}

```

注意枚举的成员位于其标识符的命名空间中，并使用两个冒号分开。这么设计的益处是现在 `IpAddrKind::V4` 和 `IpAddrKind::V6` 都是 `IpAddrKind` 类型的。例如，接着可以定义一个函数来获取任何 `IpAddrKind`：

#### 4-1-2、枚举成员

```rust
    #[derive(Debug)]
    enum IpAddr {
        V4(String),
        V6(String),
    }
    let home = IpAddr::V4(String::from("127.0.0.1"));
    let loopback = IpAddr::V6(String::from("::1"));
    println!("home,{:?}", home)
```

我们直接将数据附加到枚举的每个成员上，这样就不需要一个额外的结构体了

每个成员可以处理不同类型和数量的数据。IPv4 版本的 IP 地址总是含有四个值在 0 和 255 之间的数字部分。如果我们想要将 `V4` 地址存储为四个 `u8` 值而 `V6` 地址仍然表现为一个 `String`，这就不能使用结构体了。枚举则可以轻易地处理这个情况：

莫非 模板字符串出现了

```rust
enum IpAddr {
    V4(u8, u8, u8, u8),
    V6(String),
}

let home = IpAddr::V4(127, 0, 0, 1);

let loopback = IpAddr::V6(String::from("::1"));
```

兼容各种类型

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
/////////
struct Ipv4Addr {
    // --snip--
}

struct Ipv6Addr {
    // --snip--
}

enum IpAddr {
    V4(Ipv4Addr),
    V6(Ipv6Addr),
}
```

#### 4-1-3、枚举的 impl

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
impl Message {
    fn call(&self) {
        println!("hello")
    }
}
fn impl_test() {
    let msg = Message::Write(String::from("wukong"));
    println!("msg{:?}", msg);
    msg.call()
}

```

#### 4-1-4、Option 枚举

`Option` 类型应用广泛是因为它编码了一个非常普遍的场景，即一个值要么有值要么没值

Rust 并没有很多其他语言中有的空值功能。 **空值** （_Null_ ）是一个值，它代表没有值。在有空值的语言中，变量总是这两种状态之一：空值和非空值。不过它确实拥有一个可以编码存在或不存在概念的枚举。这个枚举是 `Option<T>,枚举可以直接拿出来`

可以推论出不同类型

可以在函数中直接使用 `None`，而不需要写成 `Option::None`，这是因为 Rust 提供了一个方便的语法糖，使得 `None` 可以直接作为 `Option` 类型的值使用

```rust
enum Option<T> {
    Some(T),
    None,
}
  let some_number = Some(5);
  let some_string = Some("a string");
```

```rust
let x: i8 = 5;
let y: Option<i8> = Some(5);

let sum = x + y;
//这段代码不能编译，因为它尝试将 Option<i8> 与 i8 相加
```

option 是内置的，可以直接调用

```rust
#[derive(Debug)]
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter,
    None,
}
fn main() {
    println!("Hello, world!");
    let val = Value_in_cents(Coin::Penny);

    let val: Option<u8> = Value_in_cents(Coin::None);
    println!("{:?}", val)
}
fn Value_in_cents(coin: Coin) -> Option<u8> {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            Some(1)
        }
        Coin::Dime => Some(5),
        Coin::Nickel => Some(10),
        Coin::Quarter => Some(25),
        Coin::None => None,
    }
}

```

#### 4-2-5、例子

```rust
pub mod staff_mod {
    use crate::const_v::arr_enum::staff::StaffEnum;
    use std::collections::HashMap;
    #[derive(Debug)]
    pub struct Company {
        department: HashMap<String, Vec<String>>,
    }

    impl Company {
        pub fn new() -> Self {
            Company {
                department: HashMap::new(),
            }
        }
        pub fn add(&mut self, name: String, department: String) {
            self.department
                .entry(department)
                .or_insert(vec![])
                .push(name)
        }
        pub fn get_department(&self, department_name: String) -> Option<Vec<String>> {
            let res: Option<&Vec<String>> = self.department.get(&department_name);
            let res: Option<Vec<String>> = res.cloned();

            if let Some(mut vec) = res {
                vec.sort();
                return Some(vec);
            } else {
                return None;
            }

            // match res {
            //     Some(vec) => println!("{:?}", vec),
            //     None => println!("None"),
            // }
        }
    }
}

```

### 4-2、match

可以把 `match` 表达式想象成某种硬币分类器：硬币滑入有着不同大小孔洞的轨道，每一个硬币都会掉入符合它大小的孔洞。同样地，值也会通过 `match` 的每一个模式，并且在遇到第一个 “符合” 的模式时，值会进入相关联的代码块并在执行中被使用。

#### 4-2-1、绑定值

```rust
#[derive(Debug)]
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
    None,
}
#[derive(Debug)] // 这样可以立刻看到州的名称
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}
fn main() {
    println!("Hello, world!");
    let val = Value_in_cents(Coin::Penny);

    let val: Option<u8> = Value_in_cents(Coin::None);
    let val: Option<u8> = Value_in_cents(Coin::Quarter(UsState::Alabama));
    println!("{:?}", val)
}
fn Value_in_cents(coin: Coin) -> Option<u8> {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            Some(1)
        }
        Coin::Dime => Some(5),
        Coin::Nickel => Some(10),
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            Some(25)
        }
        Coin::None => None,
    }
}

```

可以传入枚举值 在 match 中的回调获取当前传入的值

#### 4-2-2、Option 匹配

```rust
#[derive(Debug)]
enum Coin {
    Penny,
    Nickel,
    Dime,
    Quarter(UsState),
    None,
}
#[derive(Debug)] // 这样可以立刻看到州的名称
enum UsState {
    Alabama,
    Alaska,
    // --snip--
}
fn main() {
    println!("Hello, world!");
    let val = Value_in_cents(Coin::Penny);

    let val: Option<u8> = Value_in_cents(Coin::None);
    let val: Option<u8> = Value_in_cents(Coin::Quarter(UsState::Alabama));
    println!("{:?}", val);
    let five: Option<i32> = dbg!(Some(5));
    println!("{:?}", five);
    let six = plus_one(five);
    println!("{:?}", six);
    let none = plus_one(None);
}
fn Value_in_cents(coin: Coin) -> Option<u8> {
    match coin {
        Coin::Penny => {
            println!("Lucky penny!");
            Some(1)
        }
        Coin::Dime => Some(5),
        Coin::Nickel => Some(10),
        Coin::Quarter(state) => {
            println!("State quarter from {:?}!", state);
            Some(25)
        }
        Coin::None => None,
    }
}
fn plus_one(x: Option<i32>) -> Option<i32> {
    match x {
        None => None,
        Some(i) => Some(i + 1),
    }
}
```

可以通过使用 some，来对值进行处理

Rust 知道我们没有覆盖所有可能的情况甚至知道哪些模式被忘记了！Rust 中的匹配是 **穷举式的** （ _exhaustive_ ）：必须穷举到最后的可能性来使代码有效。特别的在这个 `Option<T>` 的例子中，Rust 防止我们忘记明确的处理 `None` 的情况，这让我们免于假设拥有一个实际上为空的值，从而使之前提到的价值亿万的错误不可能发生。

#### 4-2-3、通配模式和\_占位符

```rust
    let dice_roll = 9;
    match dice_roll {
        3 => add_fancy_hat(),
        7 => remove_fancy_hat(),
        other => move_player(other),
    }

    fn add_fancy_hat() {}
    fn remove_fancy_hat() {}
    fn move_player(num_spaces: u8) {}
```

最后一个分支则涵盖了所有其他可能的值，模式是我们命名为 `other` 的一个变量。`other` 分支的代码通过将其传递给 `move_player` 函数来使用这个变量。

因为最后一个模式将匹配所有未被特殊列出的值

Rust 还提供了一个模式，当我们不想使用通配模式获取的值时，请使用 `_` ，这是一个特殊的模式，可以匹配任意值而不绑定到该值。

我们必须将通配分支放在最后，因为模式是按顺序匹配的。

other 和*区别 *获取不到参数 ，而 other 则是最后一位，能获取到参数

#### 4-2-4、if let

`if let` 获取通过等号分隔的一个模式和一个表达式。

```rust
fn main() {
    let mut some_u8_value = 3;
    if let 3 = some_u8_value {
        println!("three");
    } else {
        some_u8_value += 1;
        println!("some_u8_value{}", some_u8_value)
    }
}

```

使用 `if let` 意味着编写更少代码，更少的缩进和更少的样板代码。然而，这样会失去 `match` 强制要求的穷尽性检查。

可以在 `if let` 中包含一个 `else`。`else` 块中的代码与 `match` 表达式中的 `_` 分支块中的代码相同，这样的 `match` 表达式就等同于 `if let` 和 `else`

## 5、包、create、模块

### 5-1、包和 create

#### 5-1-1、包

一个包中至多 **只能** 包含一个库 crate（library crate）；包中可以包含任意多个二进制 crate（binary crate）；包中至少包含一个 crate，无论是库的还是二进制的

在此，我们有了一个只包含 _src/main.rs_ 的包，意味着它只含有一个名为 `my-project` 的二进制 crate。如果一个包同时含有 _src/main.rs_ 和 _src/lib.rs_ ，则它有两个 crate：一个库和一个二进制项，且名字都与包相同。通过将文件放在 _src/bin_ 目录下，一个包可以拥有多个二进制 crate：每个 _src/bin_ 下的文件都会被编译成一个独立的二进制 crate。

将一个 crate 的功能保持在其自身的作用域中，可以知晓一些特定的功能是在我们的 crate 中定义的还是在 `rand` crate 中定义的，这可以防止潜在的冲突。例如，`rand` crate 提供了一个名为 `Rng` 的特性（trait）。我们还可以在我们自己的 crate 中定义一个名为 `Rng` 的 `struct`。因为一个 crate 的功能是在自身的作用域进行命名的，当我们将 `rand` 作为一个依赖，编译器不会混淆 `Rng` 这个名字的指向。在我们的 crate 中，它指向的是我们自己定义的 `struct Rng`。我们可以通过 `rand::Rng` 这一方式来访问 `rand` crate 中的 `Rng` 特性（trait）。

#### 5-1-2、模块的作用域和私有性

通过执行 `cargo new --lib restaurant`，来创建一个新的名为 `restaurant` 的库。然后将示例 7-1 中所罗列出来的代码放入 _src/lib.rs_ 中，来定义一些模块和函数

```rust
mod front_of_house {
    mod hosting {
        fn add_to_waitlist() {}

        fn seat_at_table() {}
    }

    mod serving {
        fn take_order() {}

        fn serve_order() {}

        fn take_payment() {}
    }
}
```

_src/main.rs_ 和 _src/lib.rs_ 被称为 crate 根。如此称呼的原因是，这两个文件中任意一个的内容会构成名为 `crate` 的模块，且该模块位于 crate 的被称为 _模块树_ 的模块结构的根部

#### 5-1-3、路径用于引用模块树中的项

路径有两种形式：

- **绝对路径** （ _absolute path_ ）从 crate 根部开始，以 crate 名或者字面量 `crate` 开头。
- **相对路径** （ _relative path_ ）从当前模块开始，以 `self`、`super` 或当前模块的标识符开头。

> 包的移动用相对
>
> 包内移动用绝对

作用域

Rust 中默认所有项（函数、方法、结构体、枚举、模块和常量）都是私有的。父模块中的项不能使用子模块中的私有项，但是子模块中的项可以使用他们父模块中的项。

##### pub

可以通过使用 `pub` 关键字来创建公共项，使子模块的内部部分暴露给上级模块

`add_to_waitlist` 函数是私有的。私有性规则不但应用于模块，还应用于结构体、枚举、函数和方法

```rust
#[cfg(test)]
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
        fn seat_at_table() {}
    }
    mod serving {
        fn take_order() {}
        fn serve_order() {}
        fn take_payment() {}
    }
}
pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
}

```

我们还可以使用 `pub` 来设计公有的结构体和枚举，不过有一些额外的细节需要注意。如果我们在一个结构体定义的前面使用了 `pub` ，这个结构体会变成公有的，但是这个结构体的字段仍然是私有的

```rust

mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
        fn seat_at_table() {}
    }
    mod serving {
        fn take_order() {}
        fn serve_order() {}
        fn take_payment() {}
    }
}
pub fn eat_at_restaurant() {
    // 绝对路径
    crate::front_of_house::hosting::add_to_waitlist();

    // 相对路径
    front_of_house::hosting::add_to_waitlist();
    let mut meal = back_of_house::Breakfast::summer("Rye");
    meal.toast = String::from("Wheat");
//不能修改seasonal_fruit 因为它是私有的
    println!("I'd like {} toast please", meal.toast);
}
fn serve_order() {}
mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::serve_order();
    }
    pub struct Breakfast {
        pub toast: String,
        seasonal_fruit: String,
    }
    impl Breakfast {
        pub fn summer(toast: &str) -> Breakfast {
            Breakfast {
                toast: String::from(toast),
                seasonal_fruit: String::from("peaches"),
            }
        }
    }
}



```

###### 枚举

```rust

mod back_of_house {
    pub enum Appetizer {
        Soup,
        Salad,
    }
}

pub fn eat_at_restaurant() {
    let order1 = back_of_house::Appetizer::Soup;
    let order2 = back_of_house::Appetizer::Salad;
}
```

如果枚举成员不是公有的，那么枚举会显得用处不大；给枚举的所有成员挨个添加 `pub` 是很令人恼火的，因此枚举成员默认就是公有的。结构体通常使用时，不必将它们的字段公有化，因此结构体遵循常规，内容全部是私有的，除非使用 `pub` 关键字。

##### super

我们还可以使用 `super` 开头来构建从父模块开始的相对路径。这么做类似于文件系统中以 `..` 开头的语法。

```rust
fn serve_order() {}
mod back_of_house {
    fn fix_incorrect_order() {
        cook_order();
        super::serve_order();
    }
}

```

我们认为 `back_of_house` 模块和 `serve_order` 函数之间可能具有某种关联关系，并且，如果我们要重新组织这个 crate 的模块树，需要一起移动它们。因此，我们使用 `super`，这样一来，如果这些代码被移动到了其他模块，我们只需要更新很少的代码

#### 5-1-4、use

在作用域中增加 `use` 和路径类似于在文件系统中创建软连接（符号连接，symbolic link）。通过在 crate 根增加 `use crate::front_of_house::hosting`，现在 `hosting` 在作用域中就是有效的名称了，如同 `hosting` 模块被定义于 crate 根一样。通过 `use` 引入作用域的路径也会检查私有性，同其它路径一样

`use` 和相对路径来将一个项引入作用域

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}
use crate::front_of_house::hosting;
//use front_of_house::hosting;
pub fn eat_at_restaurant() {
    hosting::add_to_waitlist;
}
```

其他包引入

```rust
use std::fmt;
use std::io;

fn function1() -> fmt::Result {
    // --snip--
}

fn function2() -> io::Result<()> {
    // --snip--
}
//使用as关键字来解决
use std::fmt::Result;
use std::io::Result as IoResult;

fn function1() -> Result {
    // --snip--
}

fn function2() -> IoResult<()> {
    // --snip--
}
```

如你所见，使用父模块可以区分这两个 `Result` 类型。如果我们是指定 `use std::fmt::Result` 和 `use std::io::Result`，我们将在同一作用域拥有了两个 `Result` 类型，当我们使用 `Result` 时，Rust 则不知道我们要用的是哪个。

我们可以使用 as 关键字来提供新名称

##### 重导出

当使用 `use` 关键字将名称导入作用域时，在新作用域中可用的名称是私有的。如果为了让调用你编写的代码的代码能够像在自己的作用域内引用这些类型，可以结合 `pub` 和 `use`。这个技术被称为 “ _重导出_ （ _re-exporting_ ）”

```rust
mod front_of_house {
    pub mod hosting {
        pub fn add_to_waitlist() {}
    }
}

pub use crate::front_of_house::hosting;
// pub use，我们可以使用一种结构编写代码，却将不同的结构形式暴露出来。这样做使我们的库井井有条，方便开发这个库的开发者和调用这个库的开发者之间组织起来
pub fn eat_at_restaurant() {
    hosting::add_to_waitlist();
}
```

通过 `pub use`，现在可以通过新路径 `hosting::add_to_waitlist` 来调用 `add_to_waitlist` 函数。如果没有指定 `pub use`，`eat_at_restaurant` 函数可以在其作用域中调用 `hosting::add_to_waitlist`，但外部代码则不允许使用这个新路径。

##### 使用外部包

```rust
use rand::Rng;
use std::collections::HashMap;
fn main() {
    let secret_number = rand::thread_rng().gen_range(1..101);
}
```

注意标准库（`std`）对于你的包来说也是外部 crate。因为标准库随 Rust 语言一同分发，无需修改 _Cargo.toml_ 来引入 `std`，不过需要通过 `use` 将标准库中定义的项引入项目包的作用域中来引用它们，比如我们使用的 `HashMap`：

##### 嵌套路径

```rust
use std::cmp::Ordering;
use std::io;
等同于
use std::{cmp::Ordering, io}; 一样的可以合在一起
```

##### glob

```rust
use std::collections::*;
```

这个 `use` 语句将 `std::collections` 中定义的所有公有项引入当前作用域。使用 glob 运算符时请多加小心！Glob 会使得我们难以推导作用域中有什么名称和它们是在何处定义的。

#### 5-1-5 分割不同的文件

```rust

/lib.rs
mod front_of_house;
需要再同级目录下有这个文件名
/front_of_house.rs
pub mod hosting;

//需要再同名目录下有这个文件名
/front_of_house/hosting
pub fn add_to_waitlist() {}

上述后两步等效
pub mod hosting {
    pub fn add_to_waitlist() {}
}
在 mod front_of_house 后使用分号，而不是代码块，这将告诉 Rust 在另一个与模块同名的文件中加载模块的内容。继续重构我们例子，将 hosting 模块也提取到其自己的文件中，仅对 src/front_of_house.rs 包含 hosting 模块的声明进行修改：
```

> lib.rs 是根目录，会直接在 src 下面寻找 ，而不是根目录的包 则需要在同名的文件名下有这个包名
>
> 引入包后才能开始使用
>
> crate 可以在子目录中寻找父级

## 6、常见集合

### 6-1、vec

是的，Rust 中的 `Vec`（动态数组）也要求其所有元素必须是同一类型。`Vec` 是 Rust 标准库中提供的一种动态大小的数组类型，但它仍然遵循 Rust 的类型系统规则，即所有元素必须是同质的。

类似于任何其他的 `struct`，vector 在其离开作用域时会被释放，如示例 8-4 所标注的

#### 6-1-1、语法

```rust
let v: Vec<i32> = Vec::new();
let v = vec![1, 2, 3];
```

Rust 提供了 `vec!` 宏。这个宏会根据我们提供的值来创建一个新的 `Vec`

修改值必须使用 `mut` 关键字使其可变。放入其中的所有值都是 `i32` 类型的，

注:用此方法超出范围不会报错

```rust
    match v.get(100) {
        Some(x) => println!("{:?}", x),
        None => println!("None"),
    }
```

|      | 方法                    |                                                        |
| ---- | ----------------------- | ------------------------------------------------------ |
| 新增 | v.push                  |                                                        |
| 索引 | &v[index]，超出范围报错 | v.get(index),返回一个 `Option<&T>，超出范围返回none` |

```rust
//报错
let mut v = vec![1, 2, 3, 4, 5];

let first = &v[0];

v.push(6);

println!("The first element is: {}", first);

//修正
let mut v = vec![1, 2, 3, 4, 5];
v.push(6);
let first = &v[0];
println!("The first element is: {}", first);
```

在读取元素后再添加，内存会发生变化，前面的代码不知有它，不认过去，君生我未生；

#### 6-1-2、循环

```rust
    for i in &mut v {
        *i += 50
    }
```

为了修改可变引用所指向的值，在使用 `+=` 运算符之前必须使用解引用运算符（`*`）获取 `i` 中的值

#### 6-1-3、枚举结合 vec

```rust
    enum spreadsheetceel {
        Int(i32),
        Float(f64),
        Text(String),
    };
    let row = vec![
        spreadsheetceel::Int(3),
        spreadsheetceel::Text(String::from("blue")),
        spreadsheetceel::Float(10.12),
    ];
```

用枚举生成 vec，可以存储不同的类型，另外 可以使用 match 来对不同的值进行匹配 确保不会报错

### 6-2、字符串

#### 6-2-1、初始化

以下两个方法等效

字符串是 UTF-8 编码的，所以可以包含任何正确编码的数据

```rust
    let s = "initContent".to_string();
    let s = String::from("initial contents");
    println!("{}", s);
```

#### 6-2-2、更新字符串

可以通过 `push_str` 方法来附加字符串 slice，从而使 `String` 变长，如示例 8-15 所示。

```rust
let mut s1 = String::from("foo");
let s2 = "bar";
s1.push_str(s2);
println!("s2 is {}", s2);
```

s2 是 slice，我们不能获取其所有权，避免自身所有权失效

`push` 方法被定义为获取一个单独的字符作为参数，并附加到 `String` 中

```rust
let mut s = String::from("lo");
s.push('l');
```

拼接，遵循所有权规则

```rust
    let s1 = String::from("Hello, ");
    let s2 = String::from("world");
    let res = s1 + &s2;
    println!("{},{}", res, s2);
```

`+` 运算符使用了 `add` 函数，这个函数签名看起来像这样：

self 的所有权会被获取

```rust
fn add(self, s: &str) -> String {

```

`s2` 使用了 `&`，意味着我们使用第二个字符串的 **引用** 与第一个字符串相加。这是因为 `add` 函数的 `s` 参数：只能将 `&str` 和 `String` 相加，不能将两个 `String` 值相加。

`&String` 可以被 **强转** （ _coerced_ ）成 `&str`。当 `add` 函数被调用时，Rust 使用了一个被称为 **解引用强制转换** （ _deref coercion_ ）的技术，你可以将其理解为它把 `&s2` 变成了 `&s2[..]`

#### 6-2-3、 `format!` 宏

`format!` 与 `println!` 的工作原理相同，不过不同于将输出打印到屏幕上，它返回一个带有结果内容的 `String`。这个版本就好理解的多，并且不会获取任何参数的所有权。

```rust
 let s1 = String::from("tic");
    let s2 = String::from("tic");
    let s3 = String::from("tic");
    let s = format!("{}-{}-{}", s1, s2, s3);
    println!("{}", s);
```

#### 6-2-4、索引字符串

Rust 不允许使用索引获取 `String` 字符的原因是，索引操作预期总是需要常数时间 (O(1))。但是对于 `String` 不可能保证这样的性能，因为 Rust 必须从开头到索引位置遍历来确定有多少有效的字符。

比如一些非英文字符，在字节码中不能确保是第一位

我们可以用 slice 来解决

```rust
    let hello = "Здравствуйте";
    let s = &hello[0..4];
    println!("{}", s)
这里，s 会是一个 &str，它包含字符串的头 4 个字节。早些时候，我们提到了这些字母都是 2 个字节长的，所以这意味着 s 将会是 “Зд”。
```

#### 6-2-5、遍历字符串

如果你需要操作单独的 Unicode 标量值，最好的选择是使用 `chars` 方法。对 “नमस्ते” 调用 `chars` 方法会将其分开并返回六个 `char` 类型的值，接着就可以遍历其结果来访问每一个元素了：

```rust
    for c in hello.chars() {
        println!("{}", c);
    }

```

`bytes` 方法返回每一个原始字节，这可能会适合你的使用场景

```rust
for b in "नमस्ते".bytes() {
    println!("{}", b);
}
```

### 6-3、hash-map

像 vector 一样，哈希 map 将它们的数据储存在堆上，这个 `HashMap` 的键类型是 `String` 而值类型是 `i32`。类似于 vector，哈希 map 是同质的：所有的键必须是相同类型，值也必须都是相同类型。

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);
```

#### 6-3-1、元组构建

是使用一个元组的 vector 的 `collect` 方法，其中每个元组包含一个键值对。`collect` 方法可以将数据收集进一系列的集合类型，包括 `HashMap`。例如，如果队伍的名字和初始分数分别在两个 vector 中，可以使用 `zip` 方法来创建一个元组的 vector，其中 “Blue” 与 10 是一对，依此类推。接着就可以使用 `collect` 方法将这个元组 vector 转换成一个 `HashMap`，如示例 8-21 所示：

必须规定类型

```rust
   let teams = vec![String::from("Blue"), String::from("Yellow")];
    let initial_scores = vec![10, 50];
    let score: HashMap<_, _> = teams.iter().zip(initial_scores).collect();
    println!("{:?}", score);
```

在类型中规定借用即可

```rust
  let a = [1, 2, 3];
  let b = [4, 5, 6];

    let zipped: Vec<(&i32, &i32)> = a.iter().zip(b.iter()).collect();
```

这里 `HashMap<_, _>` 类型标注是必要的，因为 `collect` 有可能当成多种不同的数据结构，而除非显式指定否则 Rust 无从得知你需要的类型。但是对于键和值的类型参数来说，可以使用下划线占位，而 Rust 能够根据 vector 中数据的类型推断出 `HashMap` 所包含的类型。

#### 6-3-2、hashma 和所有权

```rust
use std::collections::HashMap;

let field_name = String::from("Favorite color");
let field_value = String::from("Blue");

let mut map = HashMap::new();
map.insert(field_name, field_value);
// 这里 field_name 和 field_value 不再有效，
// 尝试使用它们看看会出现什么编译错误！
```

当 `insert` 调用将 `field_name` 和 `field_value` 移动到哈希 map 中后，将不能使用这两个绑定。

#### 6-3-3、访问 hashmap 中的值

通过 get 访问 hashmap 的值，注意所有权及借用

`get` 返回 `Option<V>`，所以结果被装进 `Some`如果没有对应值，会返回 `None`

```rust
    let field_name = String::from("Favorite color");
    let field_value = String::from("Blue");

    let mut map = HashMap::new();
    map.insert(&field_name, &field_value);

    let val = map.get(&field_name);
    println!("{:?}", val);
```

使用与 vector 类似的方式来遍历哈希 map 中的每一个键值对，也就是 `for` 循环：

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Yellow"), 50);

for (key, value) in &scores {
    println!("{}: {}", key, value);
}
```

#### 6-3-4、键入

覆盖值

```rust
use std::collections::HashMap;

let mut scores = HashMap::new();

scores.insert(String::from("Blue"), 10);
scores.insert(String::from("Blue"), 25);

println!("{:?}", scores);
```

没有对应值

哈希 map 有一个特有的 API，叫做 `entry`，它获取我们想要检查的键作为参数。`entry` 函数的返回值是一个枚举，`Entry`

```rust
  let mut map: HashMap<&String, &String> = HashMap::new();
    map.insert(&field_name, &field_value);

    let val = map.get(&field_name);
    println!("{:?}", val);
    let str: String = String::from("haha");
    let name: String = String::from("haha");
    map.entry(&field_name).or_insert(&str);
    let enter_v = map.entry(&name).or_insert(&str);
    println!("{:?}", enter_v);
    println!("{:?}", map);
```

map 和 get 不能一起，`map.entry(name.clone())` 对 `map` 进行了可变借用，而 `map.get(&name)` 对 `map` 进行了不可变借用。

#### 6-3-5、根据旧值更新

`or_insert` 方法事实上会返回这个键的值的一个可变引用（`&mut V`）,所以为了赋值必须首先使用星号（`*`）解引用 `count`

```rust
    let text = "hello world wonderful world";
    let mut map = HashMap::new();
    for word in text.split_whitespace() {
        let count = map.entry(word).or_insert(0);
        *count += 1;
    }
```

## 7、处理错误

### 7-1、Result 与可恢复的错误

```rust
use std::fs::File;
use std::io::ErrorKind;

fn main() {
    let f = File::open("hello.txt");

    let f = match f {
        Ok(file) => file,
        Err(error) => match error.kind() {
            ErrorKind::NotFound => match File::create("hello.txt") {
                Ok(fc) => fc,
                Err(e) => panic!("Problem creating the file: {:?}", e),
            },
            other_error => panic!("Problem opening the file: {:?}", other_error),
        },
    };
}
```

#### 7-1-1、panic 简写:unwrap 和 expect

`unwrap`，它的实现就类似于示例 9-4 中的 `match` 语句。如果 `Result` 值是成员 `Ok`，`unwrap` 会返回 `Ok` 中的值。如果 `Result` 是成员 `Err`，`unwrap` 会为我们调用 `panic!`。这里是一个实践 `unwrap` 的例子：

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt").unwrap();
}

```

使用 `expect` 而不是 `unwrap` 并提供一个好的错误信息可以表明你的意图并更易于追踪 panic 的根源。`expect` 的语法看起来像这样

```rust
use std::fs::File;

fn main() {
    let f = File::open("hello.txt").expect("Failed to open hello.txt");
}
```

`expect` 在调用 `panic!` 时使用的错误信息将是我们传递给 `expect` 的参数，而不像 `unwrap` 那样使用默认的 `panic!` 信息,expect 是自定义的，帮助我们更容易找到错误信息

#### 7-1-2、错误传播简写 ?UI 运算符

```rust
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    let mut f = File::open("hello.txt")?;
    let mut s = String::new();
    f.read_to_string(&mut s)?;
    Ok(s)
}
```

`?` 运算符消除了大量样板代码并使得函数的实现更简单。我们甚至可以在 `?` 之后直接使用链式方法调用来进一步缩短代码，如示例 9-8 所示：

```rust
use std::io;
use std::io::Read;
use std::fs::File;

fn read_username_from_file() -> Result<String, io::Error> {
    let mut s = String::new();

    File::open("hello.txt")?.read_to_string(&mut s)?;

    Ok(s)
}
```

#### 7-1-3、main 的?处理

`main` 函数是特殊的，其必须返回什么类型是有限制的。`main` 函数的一个有效的返回值是 `()`，同时出于方便，另一个有效的返回值是 `Result<T, E>`，如下所示：

```rust
use std::error::Error;
use std::fs::File;

fn main() -> Result<(), Box<dyn Error>> {
    let f = File::open("hello.txt")?;

    Ok(())
}
```

`main` 函数是特殊的，其必须返回什么类型是有限制的。`main` 函数的一个有效的返回值是 `()`，同时出于方便，另一个有效的返回值是 `Result<T, E>`

#### 7-1-4、可以帮助函数中断

```rust
impl Guess {
    pub fn new(value: i32) -> Guess {
        if value < 1 || value > 100 {
            panic!("Guess value must be between 1 and 100, got {}.", value);
        }

        Guess { value }
    }

    pub fn value(&self) -> i32 {
        self.value
    }
}
```

## 8、泛型、trait、和生命周期

### 8-1、泛型

#### 8-1-1、函数泛型

```rust
fn largest<T: PartialOrd + Copy>(list: &Vec<T>) -> T {
    let mut largest = list[0];
    for &item in list.iter() {
        if item > largest {
            largest = item;
        }
    }
    largest
}
```

涉及到 trait

#### 8-1-2、结构体和枚举

```rust
struct PointA<T> {
    x: T,
    y: T,
}
//两个类型一致
struct Point<T, U> {
    x: T,
    y: U,
}
//可以不一致
enum Result<T, E> {
    Ok(T),
    Err(E),
}
```

#### 8-1-3、方法

```rust
struct Point<T> {
    x: T,
    y: T,
}

impl<T> Point<T> {
    fn x(&self) -> &T {
        &self.x
    }
}

fn main() {
    let p = Point { x: 5, y: 10 };

    println!("p.x = {}", p.x());
}
```

必须在 `impl` 后面声明 `T`，这样就可以在 `Point<T>` 上实现的方法中使用它了。在 `impl` 之后声明泛型 `T` ，这样 Rust 就知道 `Point` 的尖括号中的类型是泛型而不是具体类型。

```rust
struct Point<T, U> {
    x: T,
    y: U,
}
impl<T, U> Point<T, U> {
    fn mixup<V, W>(self, other: Point<V, W>) -> Point<T, W> {
        Point {
            x: self.x,
            y: other.y,
        }
    }
}
```

可以用类型推断，多个类型会根据方法参数的类型进行推断

### 8-2、trait

_trait_ 类似于其他语言中常被称为 **接口** （ _interfaces_ ）的功能，虽然有一些不同。

#### 8-2-1、定义 trait

如果可以对不同类型调用相同的方法的话，这些类型就可以共享相同的行为了。trait 定义是一种将方法签名组合起来的方法，目的是定义一个实现某些目的所必需的行为的集合

```rust
pub mod _trait {
    pub trait Summary {
        fn summarize(&self) -> String;
    }
}
```

trait 体中可以有多个方法：一行一个方法签名且都以分号结尾。

#### 8-2-2、结构体

```rust
mod _trait;
pub use _trait::_trait::Summary;
pub struct NewsArticle {
    pub headline: String,
    pub location: String,
    pub author: String,
    pub content: String,
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{}, by {} ({})", self.headline, self.author, self.location)
    }
}

pub struct Tweet {
    pub username: String,
    pub content: String,
    pub reply: bool,
    pub retweet: bool,
}

impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}: {}", self.username, self.content)
    }
}
```

它们并不位于 `aggregator` crate 本地作用域中。这个限制是被称为 **相干性** （ _coherence_ ） 的程序属性的一部分，或者更具体的说是 **孤儿规则** （ _orphan rule_ ），其得名于不存在父类型。这条规则确保了其他人编写的代码不会破坏你代码，反之亦然。没有这条规则的话，两个 crate 可以分别对相同类型实现相同的 trait，而 Rust 将无从得知应该使用哪一个实现。

不能修改其他的 trait

#### 8-2-3、默认实现

```rust
pub mod _trait {
    pub trait Summary {
        fn summarize(&self) -> String;
        fn default_summarize(&self) -> String {
            String::from("Read more ...")
        }
    }
}

impl Summary for NewsArticle {
    fn summarize(&self) -> String {
        format!("{},by {} ({})", self.headline, self.author, self.author)
    }
    fn default_summarize(&self) -> String {
        format!("默认实现取消")
    }
}
impl Summary for Tweet {
    fn summarize(&self) -> String {
        format!("{}:{}", self.username, self.content)
    }
}
```

该 impl 如果重新定义默认实现的函数 则优先调用定义后的值，

无法从相同方法的重载实现中调用默认方法

#### 8-2-4、可作为参数

```rust
pub fn notify(item: impl Summary) {
    println!("Breaking news! {}", item.summarize());
}
```

#### 8-2-5、trait Bound 语法

可以通过作为泛型的值来进行简写

`<T:trait>`

```rust
pub fn notify(item: &impl Summary, item2: &impl Summary) {
    // println!("{:?}", item)
}
pub fn notify2<T: Summary>(item: &T, item2: &T) {
    // println!("{:?}", item)
}
fn main() {
    let article = NewsArticle {
        headline: String::from("Penguins win the Stanley Cup Championship!"),
        location: String::from("Pittsburgh, PA, USA"),
        author: String::from("Iceburgh"),
        content: String::from(
            "The Pittsburgh Penguins once again are the best
    hockey team in the NHL.",
        ),
    };
    notify(&article, &article);
    notify2(&article, &article);
    // notify();
    println!("Hello, world!");
}
```

#### 8-2-6、通过+指定多个 bound

两个 debug 都需要

```rust
use std::fmt::Debug;
#[derive(Debug, Clone)]
pub struct NewsArticle {
.....
}
pub fn notify<T: Summary + Clone + Debug>(item: &T, item2: &T) {
    let res = format!("{}", item.clone().summarize());
    let res2 = item2.clone();
    println!("{},{:#?}", res, res2)
}
```

简写

```rust
pub fn notify3<T, U>(item: &T, item2: &U)
where
    T: Summary,
    U: Summary + Debug + Clone,
{
    let res = format!("{}", item.summarize());
    let res2 = item2.clone();
    println!("{},{:#?}", res, res2)
}
```

8-2-7、retrun 定义 trait

```rust
fn returns_summarizable() -> impl Summary {
    Tweet {
        username: String::from("horse_ebooks"),
        content: String::from("of course, as you probably already know, people"),
        reply: false,
        retweet: false,
    }
}
```

- `&dyn Summary` 表示一个实现了 `Summary` trait 的动态类型引用。
- `impl Summary` 表示一个实现了 `Summary` trait 的具体类型

```rust
  returns_summarizable(&mut article);
  fn returns_summarizable(_item: &mut NewsArticle) -> &dyn Summary {
    _item
}

```

只适用于返回单一类型的情况

#### 8-2-7、可选 impl

只有满足打印 Display，且比较 PartialOrd 此函数才会生效

```rust
impl<T: Display + PartialOrd> Pair<T> {
    fn cmp_display(&self) {
        if self.x >= self.y {
            println!("The largest member is x = {}", self.x);
        } else {
            println!("The largest member is y = {}", self.y);
        }
    }
}
```

标准库

```rust
impl<T: Display> ToString for T {
    // --snip--
}
```

我们可以对任何实现了 `Display` trait 的类型调用由 `ToString` 定义的 `to_string` 方法,可以将整型转换为对应的 `String` 值，因为整型实现了 `Display`

### 8-3、生命周期

主要用来处理引用数据类型发生的错误

#### 8-3-1、函数中的泛型生命周期

生命周期参数名称必须以撇号（`'`）开头，其名称通常全是小写，类似于泛型其名称非常短。`'a` 是大多数人默认使用的名称。生命周期参数标注位于引用的 `&` 之后，并有一个空格来将引用类型与生命周期标注分隔开。

`'a` 所替代的具体生命周期是 `x` 的作用域与 `y` 的作用域相重叠的那一部分。换一种说法就是**泛型生命周期 `'a` 的具体生命周期等同于 `x` 和 `y` 的生命周期中较小的那一个**。因为我们用相同的生命周期参数 `'a` 标注了返回的引用值，所以返回的引用值就能保证在 `x` 和 `y` 中较短的那个生命周期结束之前保持有效。

```
use std::env;
use std::fs;
fn main() {
    let args: Vec<String> = env::args().collect();
    let query = &args[1];
    let filename = &args[2];
    let contents = fs::read_to_string(filename).expect("Error reading file");
    println!("With text:\n{}", contents);
    parse_config(query, filename);
}
fn parse_config<'a>(query: &'a str, filename: &'a str) -> (&'a str, &'a str) {
    // let query = &args[1];
    // let filename = &args[2];
    (query, filename)
}

```

```rust

fn longest<'a>(x: &'a str, y: &'a str) -> &'a str {
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

成功

```rust
  let string1 = String::from("long string is long");

    {
        let string2 = String::from("xyz");
        let result = longest(string1.as_str(), string2.as_str());
        println!("The longest string is {}", result);
    }
```

失败

```rust
   let string1 = String::from("long string is long");
    let result;
    {
        let string2 = String::from("xyz");
        result = longest(string1.as_str(), string2.as_str());
    }
    println!("The longest string is {}", result);
```

该函数的生命周期与较短的保持一致，说明在 string2 生命周期结束时，rusult 的生命周期就结束了

报错,如果直接返回 String 不会报错 ，as_str 返回的是一个&str 类型 是一个引用，没有所有权

```rust

fn longest2() -> &str {
    let result = String::from("really long string");
    let res = result.as_str();
    res
}

```

最好的解决方案是返回一个有所有权的数据类型而不是一个引用，这样函数调用者就需要负责清理这个值了。

#### 8-3-2、结构体定义的生命周期

这是一个引用值，我们可以在 struct 中定义它的生命周期，novel 在上面 他的生命周期比 import 的生命周期更长，当 import 退出的时候 novel 都不会退出 所以 他的引用值是有效的

```rust
struct ImportantExcerpt<'a> {
    part: &'a str,
}

fn main() {
    let novel = String::from("Call me Ishmael. Some years ago...");
    let first_sentence = novel.split('.')
        .next()
        .expect("Could not find a '.'");
    let i = ImportantExcerpt { part: first_sentence };
}
```

在 Rust 中，如果你有一个结构体包含**引用类型**的字段，你必须为这些引用字段指定生命周期参数。这是因为 Rust 需要确保这些引用的生命周期是有效的，并且不会在结构体实例的生命周期内变得无效。

> 生命周期如何添加，应该注意其返回值又没有对其是否进行操作

#### 8-3-3、省略生命周期

**生命周期省略规则**

第一条规则是每一个是引用的参数都有它自己的生命周期参数。换句话说就是，有一个引用参数的函数有一个生命周期参数：`fn foo<'a>(x: &'a i32)`，有两个引用参数的函数有两个不同的生命周期参数，`fn foo<'a, 'b>(x: &'a i32, y: &'b i32)`，依此类推。

第二条规则是如果只有一个输入生命周期参数，那么它被赋予所有输出生命周期参数：`fn foo<'a>(x: &'a i32) -> &'a i32`。

第三条规则是如果方法有多个输入生命周期参数并且其中一个参数是 `&self` 或 `&mut self`，说明是个对象的方法(method)(译者注： 这里涉及 Rust 的面向对象，参见第 17 章), 那么所有输出生命周期参数被赋予 `self` 的生命周期。第三条规则使得方法更容易读写，因为只需更少的符号。

#### 8-3-4、方法的生命周期

`impl` 之后和类型名称之后的生命周期参数是必要的，不过因为第一条生命周期规则我们并不必须标注 `self` 引用的生命周期。

```rust
impl<'a> ImportantExcerpt<'a> {
    fn level(&self) -> i32 {
        3
    }
}
```

这里是一个适用于第三条生命周期省略规则的例子：

因为其中一个参数是 `&self`，返回值类型被赋予了 `&self` 的生命周期，这样所有的生命周期都被计算出来了

```rust
impl<'a> ImportantExcerpt<'a> {
    fn announce_and_return_part(&self, announcement: &str) -> &str {
        println!("Attention please: {}", announcement);
        self.part
    }
}
```

#### 8-3-5、静态生命周期

这里有一种特殊的生命周期值得讨论：`'static`，其生命周期**能够**存活于整个程序期间。所有的字符串字面量都拥有 `'static` 生命周期，我们也可以选择像下面这样标注出来：

```rust
let s: &'static str = "I have a static lifetime.";
```

因为生命周期也是泛型，所以生命周期参数 `'a` 和泛型类型参数 `T` 都位于函数名后的同一尖括号列表中

##### 8-3-6、生命周期与 trait

```rust
fn longest_with_an_announcement<'a, T>(x: &'a str, y: &'a str, ann: T) -> &'a str
where
    T: Display,
{
    println!("Announcement! {}", ann);
    if x.len() > y.len() {
        x
    } else {
        y
    }
}
```

这个额外的参数会在函数比较字符串 slice 的长度之前被打印出来，这也就是为什么 `Display` trait bound 是必须的。因为生命周期也是泛型，所以生命周期参数 `'a` 和泛型类型参数 `T` 都位于函数名后的同一尖括号列表中。

如果不加 Display，无法确定泛型类型，也就无法判断能否打印

总结 trait 帮其规定为泛型时候的行为

## 9、测试

### 9-1、编写测试

#### 9-1-1、#[test]

`#[test]`：这个属性表明这是一个测试函数

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() {
        assert_eq!(2 + 2, 4);
    }
}
```

函数体通过使用 `assert_eq!` 宏来断言 2 加 2 等于 4。一个典型的测试的格式，就是像这个例子中的断言一样。接下来运行就可以看到测试通过。

#### 9-1-2、`assert!`

`assert!` 宏由标准库提供，在希望确保测试中一些条件为 `true` 时非常有用。需要向 `assert!` 宏提供一个求值为布尔值的参数

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn larger_can_hold_smaller() {
        let larger = Rectangle { width: 8, height: 7 };
        let smaller = Rectangle { width: 5, height: 1 };

        assert!(larger.can_hold(&smaller));
    }
}
```

注意在 `tests` 模块中新增加了一行：`use super::*;`。`tests` 是一个普通的模块，它遵循第 7 章 [“路径用于引用模块树中的项”](https://rustwiki.org/zh-CN/book/ch07-03-paths-for-referring-to-an-item-in-the-module-tree.html) 部分介绍的可见性规则。因为这是一个内部模块，要测试外部模块中的代码，需要将其引入到内部模块的作用域中。**这里选择使用 glob 全局导入，以便在 `tests` 模块中使用所有在外部模块定义的内容**。

让我们为测试函数增加一个自定义失败信息参数：带占位符的格式字符串，以及 `greeting` 函数的值：

```rust
#[test]
fn greeting_contains_name() {
    let result = greeting("Carol");
    assert!(
        result.contains("Carol"),
        "Greeting did not contain name, value was `{}`", result
    );
}
```

#### 9-1-2、`assert_eq!` 和 `assert_ne!`

这两个宏分别比较两个值是相等还是不相等。当断言失败时他们也会打印出这两个值具体是什么，以便于观察测试 **为什么** 失败

```rust
    fn exploration() {
        assert_eq!(2 + 2, 4);
    }
```

`assert_ne!` 宏在传递给它的两个值不相等时通过，而在相等时失败。在代码按预期运行，我们不确定值 **会** 是什么，不过能确定值绝对 **不会** 是什么的时候，这个宏最有用处。

#### 9-1-3、#[should_panic]

可以通过对函数增加另一个属性 `should_panic` 来实现这些。这个属性在函数中的代码 panic 时会通过，而在其中的代码没有 panic 时失败。

```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    #[should_panic]
    fn greater_than_100() {
        Guess::new(200);
    }
}
```

我们可以给 `should_panic` 属性增加一个可选的 `expected` 参数。测试工具会确保错误信息中包含其提供的文本

```rust
#[should_panic(expected = "Guess value must be less than or equal to 100")]
```

#### 9-1-4 Result

不能在使用 `Result<T, E>` 的测试中使用 `#[should_panic]` 注解。要断言操作返回 `Err` 值，*不要*在 `Result<T, E>` 值上使用问号运算符。相反，请使用 `assert!(value.is_err())`

```rust
#[cfg(test)]
mod tests {
    #[test]
    fn it_works() -> Result<(), String> {
        if 2 + 2 == 4 {
            Ok(())
        } else {
            Err(String::from("two plus two does not equal four"))
        }
    }
}
```

### 9-2、运行测试

```rust
$ cargo test -- --test-threads=1
```

这里将测试线程设置为 `1`，告诉程序不要使用任何并行机制。这也会比并行运行花费更多时间，不过在有共享的状态时，测试就不会潜在的相互干扰了。

```rust
$ cargo test -- --show-output

```

如果你希望也能看到通过的测试中打印的值，可以通过在末尾增加 `--show-output` 参数来告知 Rust 显示通过测试的输出

```rust
cargo test #[test]函数名称
```

可以向 `cargo test` 传递任意测试的名称来只运行这个测试，这个也可以过滤 名称中携带这个字段的都会进行测试

```rust
cargo test -- --ignored
```

可以使用 `ignore` 属性来标记耗时的测试并排除他们

```rust
#[test]
fn it_works() {
    assert_eq!(2 + 2, 4);
}

#[test]
#[ignore]
fn expensive_test() {
    // 需要运行一个小时的代码
}
```

### 9-3、测试结构

#### 9-3-1、单元测试

测试模块的 `#[cfg(test)]` 标注告诉 Rust 只在执行 `cargo test` 时才编译和运行测试代码，而在运行 `cargo build` 时不这么做。

你需要使用 `#[cfg(test)]` 来指定他们不应该被包含进编译结果中

rust 可以测试私有函数

```rust
pub fn add_two(a: i32) -> i32 {
    internal_adder(a, 2)
}

fn internal_adder(a: i32, b: i32) -> i32 {
    a + b
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn internal() {
        assert_eq!(4, internal_adder(2, 2));
    }
}
```

#### 9-3-2、集成测试

为了编写集成测试，需要在项目根目录创建一个 _tests_ 目录，与 _src_ 同级。Cargo 知道如何去寻找这个目录中的集成测试文件。接着可以随意在这个目录中创建任意多的测试文件，Cargo 会将每一个文件当作单独的 crate 来编译。

集成测试对于你需要测试的库来说完全是外部的。同其他使用库的代码一样使用库文件，也就是说它们只能调用一部分库中的公有 API 。集成测试的目的是测试库的多个部分能否一起正常工作。一些单独能正确运行的代码单元集成在一起也可能会出现问题，所以集成测试的覆盖率也是很重要的。

```rust
use adder;

#[test]
fn it_adds_two() {
    assert_eq!(4, adder::add_two(2));
}
```

如果我们可以创建 一个*tests/common.rs* 文件并创建一个名叫 `setup` 的函数，我们希望这个函数能被多个测试文件的测试函数调用

```rust
pub fn setup() {
    // 编写特定库测试所需的代码
}

```

为了不让 `common` 出现在测试输出中，我们将创建 _tests/common/mod.rs_ ，而不是创建 _tests/common.rs_ 。这是一种 Rust 的命名规范，这样命名告诉 Rust 不要将 `common` 看作一个集成测试文件。将 `setup` 函数代码移动到 _tests/common/mod.rs_ 并删除 _tests/common.rs_ 文件之后，测试输出中将不会出现这一部分。_tests_ 目录中的子目录不会被作为单独的 crate 编译或作为一个测试结果部分出现在测试输出中。

一旦拥有了 _tests/common/mod.rs_ ，就可以将其作为模块以便在任何集成测试文件中使用。这里是一个 _tests/integration_test.rs_ 中调用 `setup` 函数的 `it_adds_two` 测试的例子：

```rust
use adder;

mod common;

#[test]
fn it_adds_two() {
    common::setup();
    assert_eq!(4, adder::add_two(2));
}
```

## 10、闭包与迭代器

### 10-1、闭包

#### 10-1-1、使用闭包存储结果

```rust
let expensive_closure = |num| {
    println!("calculating slowly...");
    thread::sleep(Duration::from_secs(2));
    num
};
   println!("today,do{}pushups!", res.value(4));
    println!("Next, do {} situps!", res.value(3));
```

闭包不要求像 `fn` 函数那样在参数和返回值上注明类型。函数中需要类型标注是因为他们是暴露给用户的显式接口的一部分。严格的定义这些接口对于保证所有人都认同函数使用和返回值的类型来说是很重要的。但是闭包并不用于这样暴露在外的接口：他们储存在变量中并被使用，不用命名他们或暴露给库的用户调用。

闭包通常很短，并只关联于小范围的上下文而非任意情境。



如果尝试调用闭包两次，第一次使用 `String` 类型作为参数而第二次使用 `u32`，则会得到一个错误：

```rust
let example_closure = |x| x;

let s = example_closure(String::from("hello"));
let n = example_closure(5);
```

#### 10-1-2、cacher单例模式

```rust{
impl<T> Cacher<T>
    where T: Fn(u32) -> u32
{
    fn new(calculation: T) -> Cacher<T> {
        Cacher {
            calculation,
            value: None,
        }
    }

    fn value(&mut self, arg: u32) -> u32 {
        match self.value {
            Some(v) => v,
            None => {
                let v = (self.calculation)(arg);
                self.value = Some(v);
                v
            },
        }
    }
}
```

#### 10-1-3、闭包与环境

闭包从环境中捕获一个值，闭包会在闭包体中储存这个值以供使用

```rust
fn main() {
    let x = 4;

    let equal_to_x = |z| z == x;

    let y = 4;

    assert!(equal_to_x(y));
}
```

以下不能编译，因为作用域的生命周期中没有x

```rust
fn main() {
    let x = 4;

    fn equal_to_x(z: i32) -> bool { z == x }

    let y = 4;

    assert!(equal_to_x(y));
}
```

闭包可以通过三种方式捕获其环境，他们直接对应函数的三种获取参数的方式：获取所有权，可变借用和不可变借用。这三种捕获值的方式被编码为如下三个 `Fn` trait：

- `FnOnce` 消费从周围作用域捕获的变量，闭包周围的作用域被称为其 **环境**，*environment*。为了消费捕获到的变量，闭包必须获取其所有权并在定义闭包时将其移动进闭包。其名称的 `Once` 部分代表了闭包不能多次获取相同变量的所有权的事实，所以它只能被调用一次。
- `FnMut` 获取可变的借用值所以可以改变其环境
- `Fn` 从其环境获取不可变的借用值

Rust 根据其如何使用环境中变量来推断我们希望如何引用环境。由于所有闭包都可以被调用至少一次，所以所有闭包都实现了 `FnOnce` 。那些并没有移动被捕获变量的所有权到闭包内的闭包也实现了 `FnMut` ，而不需要对被捕获的变量进行可变访问的闭包则也实现了 `Fn`

### 10-2、迭代器

#### 10-2-1、Iterator trait 和 next 方法

trait 是类型规范 impl trait for struct 可以理解成extends trait的类型

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;

    // 此处省略了方法的默认实现
}
```

`next` 是 `Iterator` 实现者被要求定义的唯一方法。`next` 一次返回迭代器中的一个项，封装在 `Some` 中，当迭代器结束时，它返回 `None`。

```rust
#[test]
fn iterator_demonstration() {
    let v1 = vec![1, 2, 3];

    let mut v1_iter = v1.iter();

    assert_eq!(v1_iter.next(), Some(&1));
    assert_eq!(v1_iter.next(), Some(&2));
    assert_eq!(v1_iter.next(), Some(&3));
    assert_eq!(v1_iter.next(), None);
}
```

这些调用 `next` 方法的方法被称为 **消费适配器**（*consuming adaptors*），因为调用他们会消费迭代器。一个消费适配器的例子是 `sum` 方法。这个方法获取迭代器的所有权并反复调用 `next` 来遍历迭代器，因而会消费迭代器

#### 10-2-2、迭代器方法

`Iterator` trait 中定义了另一类方法，被称为 **迭代器适配器**（*iterator adaptors*），他们允许我们将当前迭代器变为不同类型的迭代器。可以链式调用多个迭代器适配器。不过因为所有的迭代器都是惰性的，必须调用一个消费适配器方法以便获取迭代器适配器调用的结果。

```rust
let v1: Vec<i32> = vec![1, 2, 3];

let v2: Vec<_> = v1.iter().map(|x| x + 1).collect();

assert_eq!(v2, vec![2, 3, 4]);
```

`collect()` 可以将任何可迭代的东西变成一个相关的集合。 这是在各种上下文中使用的标准库中功能更强大的方法之一。

#### 10-2-3、闭包获取环境

```rust

#[derive(PartialEq, Debug)]
struct Shoe {
    size: u32,
    style: String,
}

fn shoes_in_my_size(shoes: Vec<Shoe>, shoe_size: u32) -> Vec<Shoe> {
    shoes.into_iter()
        .filter(|s| s.size == shoe_size)
        .collect()
}

#[test]
fn filters_by_size() {
    let shoes = vec![
        Shoe { size: 10, style: String::from("sneaker") },
        Shoe { size: 13, style: String::from("sandal") },
        Shoe { size: 10, style: String::from("boot") },
    ];

    let in_my_size = shoes_in_my_size(shoes, 10);

    assert_eq!(
        in_my_size,
        vec![
            Shoe { size: 10, style: String::from("sneaker") },
            Shoe { size: 10, style: String::from("boot") },
        ]
    );
}
```

如果是函数的话，需要规定其生命周期，shoe_size的生命周期和筛选的生命周期不一致

#### 10-2-4、自定义迭代器

```rust

struct Counter {
    count: u32,
}

impl Counter {
    fn new() -> Counter {
        Counter { count: 0 }
    }
}
impl Iterator for Counter {
    type Item = u32;

    fn next(&mut self) -> Option<Self::Item> {
        self.count += 1;

        if self.count < 6 {
            Some(self.count)
        } else {
            None
        }
    }
}
```

## 11、智能指针

### 11-1、Box

box 允许你将一个值放在堆上而不是栈上。留在栈上的则是指向堆数据的指针。

使用场景

- 当有一个在编译时未知大小的类型，而又想要在需要确切大小的上下文中使用这个类型值的时候
- 当有大量数据并希望在确保数据不被拷贝的情况下转移所有权的时候
- 当希望拥有一个值并只关心它的类型是否实现了特定 trait 而不是其具体类型的时候

#### 11-1-1、Box<T>存储

```rust
fn main() {
    let b = Box::new(5);
    println!("b = {}", b);
}
```

其值是一个指向被分配在堆上的值 `5` 的 `Box`。这个程序会打印出 `b = 5`；

#### 11-1-2、Box递归类型

```rust
enum List{
    Cons(i32, Box<List>),
    Nil,
}
use crate::List::{Cons, Nil};
fn main() {
    let list = Cons(1,
        Box::new(Cons(2,
            Box::new(Cons(3,
                Box::new(Nil))))));
}
```

因为 `Box<T>` 是一个指针，我们总是知道它需要多少空间：指针的大小并不会根据其指向的数据量而改变。

现在实现这个概念的方式更像是一个项挨着另一项，而不是一项包含另一项。

### 11-2、Deref智能指针

实现 `Deref` trait 允许我们重载 **解引用运算符**

#### 11-2-1、解引用

```rust
fn main() {
    let x = 5;
    let y = &x;
    assert_eq!(5, x);
    assert_eq!(5, *y);
}
```

一旦解引用了 `y`，就可以访问 `y` 所指向的整型值并可以与 `5` 做比较

11-2-2、deref的trait

```rust
use std::ops::Deref;


impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.0
    }
}
```

没有 `Deref` trait 的话，编译器只会把 `&` 引用类型解引用。`deref` 方法向编译器提供了一种能力：能够获取任何实现了 `Deref` trait 的类型的值，并且可以通过调用这个类型的 `deref` 方法来获取一个解引用方法已知的 `&` 引用。

#### 11-2-3、解引用转换规则

类似于使用 `Deref` trait 重载不可变引用的 `*` 运算符，Rust 提供了 `DerefMut` trait 用于重载可变引用的 `*` 运算符。

Rust 在发现类型和 trait 的实现满足以下三种情况时会进行解引用强制转换：

- 当 `T: Deref<Target=U>` ：从 `&T` 到 `&U`。
- 当 `T: DerefMut<Target=U>` ：从 `&mut T` 到 `&mut U`。
- 当 `T: Deref<Target=U>` ：从 `&mut T` 到 `&U`。

前两种情况除了可变性之外是相同的：第一种情况表明如果有一个 `&T`，而 `T` 实现了返回 `U` 类型的 `Deref`，则可以直接得到 `&U`。第二种情况表明对于可变引用也有着相同的行为。

第三种情况有些微妙：Rust 也会将可变引用强转为不可变引用，但是反之是 **不可能** 的，因为不可变引用永远也不能强转为可变引用。因为根据借用规则，如果有一个可变引用，其必须是这些数据的唯一引用（否则程序将无法编译）。将一个可变引用转换为不可变引用永远也不会打破借用规则。将不可变引用转换为可变引用则需要数据只能有一个不可变引用，而借用规则无法保证这一点。因此，Rust 无法假设将不可变引用转换为可变引用是可能的。

#### 11-2-4、解引用转换

```rust
use std::ops::Deref;
impl<T> Deref for MyBox<T> {
    type Target = T;

    fn deref(&self) -> &T {
        &self.0
    }
}
fn hello(name: &str) {
    println!("Hello, {}!", name);
}
fn main() {
    let m = MyBox::new(String::from("Rust"));
    hello(&(*m)[..]);
}
```

&因为切片需要显示书写

myBox实现了Deref的trait，这个里面对Box<T>进行解引用,解引用得到String，可以对string进行操作，如果没有这个智能指针，则接出来的是MyBox

### 11-3、Drop

我们在智能指针上下文中讨论 `Drop` 是因为其功能几乎总是用于实现智能指针。例如，`Box<T>` 自定义了 `Drop` 用来释放 box 所指向的堆空间。

#### 11-3-1、std::mem::drop

```RUST
use std::mem::drop
fn main() {
    let c = CustomSmartPointer { data: String::from("some data") };
    println!("CustomSmartPointer created.");
    drop(c);
    println!("CustomSmartPointer dropped before the end of main.");
}
```

#### 11-4、Rc<T>

`Rc<T>` 的类型。其名称为 **引用计数**

注意 `Rc<T>` 只能用于单线程场景；

#### 11-4-1、Rc共享数据

每次调用 `Rc::clone`，`Rc<List>` 中数据的引用计数都会增加，直到有零个引用之前其数据都不会被清理。

```rust
enum List {
    Cons(i32, Rc<List>),
    Nil,
}
use crate::List::{Cons, Nil};
use std::rc::Rc;

fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    let b = Cons(3, Rc::clone(&a));
    let c = Cons(4, Rc::clone(&a));
}
```

在程序中每个引用计数变化的点，会打印出引用计数，其值可以通过调用 `Rc::strong_count` 函数获得。

```rust
fn main() {
    let a = Rc::new(Cons(5, Rc::new(Cons(10, Rc::new(Nil)))));
    println!("count after creating a = {}", Rc::strong_count(&a));
    let b = Cons(3, Rc::clone(&a));
    println!("count after creating b = {}", Rc::strong_count(&a));
    {
        let c = Cons(4, Rc::clone(&a));
        println!("count after creating c = {}", Rc::strong_count(&a));
    }
    println!("count after c goes out of scope = {}", Rc::strong_count(&a));
}
```

`Rc<T>` 允许在程序的多个部分之间只读地共享数据,`Drop` trait 的实现当 `Rc<T>` 值离开作用域时自动减少引用计数。

### 11-5、RefCell

#### 11-5-1、RefCell<T>和内部可变模式

`RefCell<T>` 代表其数据的唯一的所有权,

类似于 `Rc<T>`，`RefCell<T>` 只能用于单线程场景。如果尝试在多线程上下文中使用`RefCell<T>`，会得到一个编译错误。第 16 章会介绍如何在多线程程序中使用 `RefCell<T>` 的功能。

如下为选择 `Box<T>`，`Rc<T>` 或 `RefCell<T>` 的理由：

- `Rc<T>` 允许相同数据有多个所有者；`Box<T>` 和 `RefCell<T>` 有单一所有者。
- `Box<T>` 允许在编译时执行不可变或可变借用检查；`Rc<T>`仅允许在编译时执行不可变借用检查；`RefCell<T>` 允许在运行时执行不可变或可变借用检查。
- 因为 `RefCell<T>` 允许在运行时执行可变借用检查，所以我们可以在即便 `RefCell<T>` 自身是不可变的情况下修改其内部的值。

#### 11-5-2、refcell用于进行可变借用

```rust
#[cfg(test)]
mod tests {
    use super::*;

    struct MockMessenger {
   //     sent_messages: Vec<String>,//2、因为&self并不是可变
        //3、进行refcell借用
           sent_messages: RefCell<Vec<String>>,
        
    }

    impl MockMessenger {
        fn new() -> MockMessenger {
            MockMessenger { sent_messages: vec![] }
        }
    }

    impl Messenger for MockMessenger {
        fn send(&self, message: &str) {
     //1、self只是借用无法进行可变            self.sent_messages.push(String::from(message));
            //4、可以使用borrow_mut进行修改
             self.sent_messages.borrow_mut().push(String::from(message));
          
        }
    }

    #[test]
    fn it_sends_an_over_75_percent_warning_message() {
        let mock_messenger = MockMessenger::new();
        let mut limit_tracker = LimitTracker::new(&mock_messenger, 100);

        limit_tracker.set_value(80);

        assert_eq!(mock_messenger.sent_messages.len(), 1);
    }
}
```

`borrow` 方法返回 `Ref<T>` 类型的智能指针，`borrow_mut` 方法返回 `RefMut<T>` 类型的智能指针。这两个类型都实现了 `Deref`。

#### 11-5-3、*Rc<T>和RefCell<T>可以拥有多个可变数据所有者

Rc是不允许可变的,它可以让数据有多个指针，可以进行共享，，理解为一个电视机多个人看

```RUST
#[derive(Debug)]
enum List {
    Cons(Rc<RefCell<i32>>, Rc<List>),
    Nil,
}

use crate::List::{Cons, Nil};
use std::rc::Rc;
use std::cell::RefCell;

fn main() {
    let value = Rc::new(RefCell::new(5));

    let a = Rc::new(Cons(Rc::clone(&value), Rc::new(Nil)));

    let b = Cons(Rc::new(RefCell::new(6)), Rc::clone(&a));
    let c = Cons(Rc::new(RefCell::new(10)), Rc::clone(&a));
//此处 对所有使用value的值进行处理 对所有的value值+10，a是value的值
    *value.borrow_mut() += 10;

    println!("a after = {:?}", a);15，nil
    println!("b after = {:?}", b);6,15
    println!("c after = {:?}", c);10,15
}
```

RefCell用于此处是用来进行可变处理的，

### 11-6、循环引用

```rust
use std::rc::Rc;
use std::cell::RefCell;
use crate::List::{Cons, Nil};

#[derive(Debug)]
enum List {
    Cons(i32, RefCell<Rc<List>>),
    Nil,
}

impl List {
    fn tail(&self) -> Option<&RefCell<Rc<List>>> {
        match self {
            Cons(_, item) => Some(item),
            Nil => None,
        }
    }
}
fn main() {
    let a = Rc::new(Cons(5, RefCell::new(Rc::new(Nil))));

    println!("a initial rc count = {}", Rc::strong_count(&a));
    println!("a next item = {:?}", a.tail());

    let b = Rc::new(Cons(10, RefCell::new(Rc::clone(&a))));

    println!("a rc count after b creation = {}", Rc::strong_count(&a));
    println!("b initial rc count = {}", Rc::strong_count(&b));
    println!("b next item = {:?}", b.tail());

    if let Some(link) = a.tail() {
        //将其Cons中的第二位RefCell的值就是a的RefCell::new(Rc::new(Nil))  但b里面又有a所以循环引用了
        *link.borrow_mut() = Rc::clone(&b);
    }

    println!("b rc count after changing a = {}", Rc::strong_count(&b));
    println!("a rc count after changing a = {}", Rc::strong_count(&a));

    // Uncomment the next line to see that we have a cycle;
    // it will overflow the stack
    // println!("a next item = {:?}", a.tail());
}
```

避免循环引用

#### 11-6、weak

```rust
use std::rc::{Rc, Weak};
use std::cell::RefCell;

#[derive(Debug)]
struct Node {
    value: i32,
    parent: RefCell<Weak<Node>>,
    children: RefCell<Vec<Rc<Node>>>,
}
fn main() {
    let leaf = Rc::new(Node {
        value: 3,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![]),
    });

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());

    let branch = Rc::new(Node {
        value: 5,
        parent: RefCell::new(Weak::new()),
        children: RefCell::new(vec![Rc::clone(&leaf)]),
    });
//调用 Rc::downgrade 时会得到 Weak<T> 类型的智能指针
    //强引用代表如何共享 Rc<T> 实例的所有权，但弱引用并不属于所有权关系。他们不会造成引用循环，因为任何弱引用的循环会在其相关的强引用计数为 0 时被打断。
    *leaf.parent.borrow_mut() = Rc::downgrade(&branch);

    println!("leaf parent = {:?}", leaf.parent.borrow().upgrade());
}
```

结果

```rust
leaf parent = Some(Node { value: 5, parent: RefCell { value: (Weak) },
children: RefCell { value: [Node { value: 3, parent: RefCell { value: (Weak) },
children: RefCell { value: [] } }] } })
```

`Rc<Node>` 的强引用计数减少为 0，所以其 `Node` 被丢弃。来自 `leaf.parent` 的弱引用计数 1 与 `Node` 是否被丢弃无关，所以并没有产生任何内存泄漏！

## 12、并发

### 12-1、线程

- 竞争状态（Race conditions），多个线程以不一致的顺序访问数据或资源
- 死锁（Deadlocks），两个线程相互等待对方停止使用其所拥有的资源，这会阻止它们继续运行
- 只会发生在特定情况且难以稳定重现和修复的 bug

#### 12-1-1、spawn新线程

```rust
use std::thread;
use std::time::Duration;

fn main() {
    thread::spawn(|| {
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });

    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}

hi number 1 from the main thread!
hi number 1 from the spawned thread!
hi number 2 from the main thread!
hi number 2 from the spawned thread!
hi number 3 from the main thread!
hi number 3 from the spawned thread!
hi number 4 from the main thread!
hi number 4 from the spawned thread!
hi number 5 from the spawned thread!
```

`thread::sleep` 调用强制线程停止执行一小段时间，这会允许其他不同的线程运行。这些线程可能会轮流运行，不过并不保证如此：这依赖操作系统如何调度线程

#### 12-1-2、join等待所有线程结束

线程是异步操作，**阻塞**（*Blocking*） 线程意味着阻止该线程执行工作或退出

```rust
use std::thread;
use std::time::Duration;

fn main() {
    println!("hello world1");
    let handle = thread::spawn(|| {
        println!("hello world2");
        for i in 1..10 {
            println!("hi number {} from the spawned thread!", i);
            thread::sleep(Duration::from_millis(1));
        }
    });
    println!("hello world3");
    handle.join().unwrap();
    println!("hello world4");
    for i in 1..5 {
        println!("hi number {} from the main thread!", i);
        thread::sleep(Duration::from_millis(1));
    }
}
hello world1
hello world3
hello world2
hi number 1 from the spawned thread!
hi number 2 from the spawned thread!
hi number 3 from the spawned thread!
hi number 4 from the spawned thread!
hi number 5 from the spawned thread!
hi number 6 from the spawned thread!
hi number 7 from the spawned thread!
hi number 8 from the spawned thread!
hi number 9 from the spawned thread!
hello world4
hi number 1 from the main thread!
hi number 2 from the main thread!
hi number 3 from the main thread!
hi number 4 from the main thread!
```

#### 12-1-3、move转移所有权

通过move捕获环境中的所有权并且实现转移，不能在主线程中使用drop清理代码，所有权转移到spawn中了

```rust
use std::thread;

fn main() {
    let v = vec![1, 2, 3];

    let handle = thread::spawn(move || {
        println!("Here's a vector: {:?}", v);
    });

    handle.join().unwrap();
}
```

### 12-2、通讯

#### 12-2-1、mpsc::channel

`mpsc::channel` 函数返回一个元组：第一个元素是发送端，而第二个元素是接收端。由于历史原因，`tx` 和 `rx` 通常作为 **发送者**（*transmitter*）和 **接收者**（*receiver*）的缩写



```rust
use std::thread;
use std::sync::mpsc;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let val = String::from("hi");
        tx.send(val).unwrap();
    });
    let received = rx.recv().unwrap();
    println!("Got: {}", received);
}
```

`send` 函数获取其参数的所有权并移动这个值归接收者所有

#### 12-2-2、发送多个值

```rust
use std::thread;
use std::sync::mpsc;
use std::time::Duration;

fn main() {
    let (tx, rx) = mpsc::channel();

    thread::spawn(move || {
        let vals = vec![
            String::from("hi"),
            String::from("from"),
            String::from("the"),
            String::from("thread"),
        ];

        for val in vals {
            tx.send(val).unwrap();
            thread::sleep(Duration::from_secs(1));
        }
    });

    for received in rx {
        println!("Got: {}", received);
    }
}
```

将 `rx` 当作一个迭代器。对于每一个接收到的值，我们将其打印出来。当通道被关闭时，迭代器也将结束

#### 12-2-3、通过克隆创建多个发送者

```rust

let (tx, rx) = mpsc::channel();

let tx1 = tx.clone();
thread::spawn(move || {
    let vals = vec![
        String::from("hi"),
        String::from("from"),
        String::from("the"),
        String::from("thread"),
    ];

    for val in vals {
        tx1.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

thread::spawn(move || {
    let vals = vec![
        String::from("more"),
        String::from("messages"),
        String::from("for"),
        String::from("you"),
    ];

    for val in vals {
        tx.send(val).unwrap();
        thread::sleep(Duration::from_secs(1));
    }
});

for received in rx {
    println!("Got: {}", received);
}

Got: hi
Got: more
Got: from
Got: messages
Got: for
Got: the
Got: thread
Got: you
```

这一次，在创建新线程之前，我们对通道的发送端调用了 `clone` 方法。这会给我们一个可以传递给第一个新建线程的发送端句柄。我们会将原始的通道发送端传递给第二个新建线程。这样就会有两个线程，每个线程将向通道的接收端发送不同的消息。

## 12-3、共享状态并发

### 12-3-1、互斥器

**互斥器**（*mutex*）是 *mutual exclusion* 的缩写，也就是说，任意时刻，其只允许一个线程访问某些数据。为了访问互斥器中的数据，线程首先需要通过获取互斥器的 **锁**（*lock*）来表明其希望访问数据。锁是一个作为互斥器一部分的数据结构，它记录谁有数据的排他访问权。因此，我们描述互斥器为通过锁系统 **保护**（*guarding*）其数据。

1. 在使用数据之前尝试获取锁。
2. 处理完被互斥器所保护的数据之后，必须解锁数据，这样其他线程才能够获取锁。

#### 12-3-2、Mutex<T>的api

```rust
use std::sync::Mutex;

fn main() {
    let m = Mutex::new(5);

    {
        let mut num = m.lock().unwrap();
        *num = 6;
        //离开此作用域时，lock锁自动释放
    }

    println!("m = {:?}", m);
}
```

`Mutex<T>` 是一个智能指针。更准确的说，`lock` 调用 **返回** 一个叫做 `MutexGuard` 的智能指针。这个智能指针实现了 `Deref` 来指向其内部数据；其也提供了一个 `Drop` 实现当 `MutexGuard` 离开作用域时自动释放锁，这正发生于示例 16-12 内部作用域的结尾。为此，我们不会冒忘记释放锁并阻塞互斥器为其它线程所用的风险，因为锁的释放是自动发生的。

#### 12-3-3、共享Mutex<T>

所幸 `Arc<T>` **正是** 这么一个类似 `Rc<T>` 并可以安全的用于并发环境的类型。字母 “a” 代表 **原子性**（*atomic*），所以这是一个**原子引用计数**（*atomically reference counted*）类型。原子性是另一类这里还未涉及到的并发原语：请查看标准库中 `std::sync::atomic` 的文档来获取更多细节。其中的要点就是：原子性类型工作起来类似原始类型，不过可以安全的在线程间共享。

```rust
use std::sync::{Mutex, Arc};
use std::thread;

fn main() {
    //问题，多个线程中move会多次获取counter的所有权我们该怎么解决
    //方案一 使用Rc获取多个所有权，但每次使用需要使用Rc.clone()对其进行计数，无法实现，此方案不可行
    //方案二 使用Arc进行原子引用计数
    let counter = Arc::new(Mutex::new(0));
    let mut handles = vec![];

    for _ in 0..10 {
        let counter = Arc::clone(&counter);
        let handle = thread::spawn(move || {
            let mut num = counter.lock().unwrap();

            *num += 1;
        });
        handles.push(handle);
    }

    for handle in handles {
        handle.join().unwrap();
    }

    println!("Result: {}", *counter.lock().unwrap());
}
```

#### 12-3-4、RefCell<T>/Rc<T>与Mutex<T>/Arc<T>的相似性

使用 `RefCell<T>` 可以改变 `Rc<T>` 中的内容那样，同样的可以使用 `Mutex<T>` 来改变 `Arc<T>` 中的内容

`Mutex<T>` 提供了内部可变性;

都是通过先引用计数再获取其所有权

```RUST
 let receiver = Arc::new(Mutex::new(receiver));
 let value = Rc::new(RefCell::new(5));
```



这时两个 `Rc<T>` 值相互引用，造成内存泄漏。同理，`Mutex<T>` 也有造成 **死锁**（*deadlock*） 的风险。这发生于当一个操作需要锁住两个资源而两个线程各持一个锁，这会造成它们永远相互等待。如果你对这个主题感兴趣，尝试编写一个带有死锁的 Rust 程序，接着研究任何其他语言中使用互斥器的死锁规避策略并尝试在 Rust 中实现他们。标准库中 `Mutex<T>` 和 `MutexGuard` 的 API 文档会提供有用的信息。

### 12-4、使用Sync与Send的Trait

1. `Send` 标记 trait 表明类型的所有权可以在线程间传递
2. `Sync` 标记 trait 表明一个实现了 `Sync` 的类型可以安全的在多个线程中拥有其值的引用。
3. 通常并不需要手动实现 `Send` 和 `Sync` trait，因为由 `Send` 和 `Sync` 的类型组成的类型，自动就是 `Send` 和 `Sync` 的。手动实现是不安全的

## 13、Rust的面向对象

### 13-1、特点

另一个通常与面向对象编程相关的方面是 **封装**（*encapsulation*）的思想：对象的实现细节不能被使用对象的代码获取到。所以唯一与对象交互的方式是通过对象提供的公有 API；使用对象的代码无法深入到对象内部并直接改变数据或者行为。封装使得改变和重构对象的内部时无需改变使用对象的代码。

**继承**（*Inheritance*）是一个很多编程语言都提供的机制，一个对象可以定义为继承另一个对象的定义，这使其可以获得父对象的数据和行为，而无需重新定义。

 Rust 代码可以使用默认 trait 方法实现来进行共享

表现为子类型可以用于父类型被使用的地方。这也被称为 **多态**（*polymorphism*），这意味着如果多种对象共享特定的属性，则可以相互替代使用。

### 13-2、trait

#### 13-2-1、trait的实现

我们通过指定某种指针来创建 trait 对象，例如 `&` 引用或 `Box<T>` 智能指针，还有 `dyn` keyword

```rust
pub trait Draw {
    fn draw(&self);
}
pub struct Screen {
    pub components: Vec<Box<dyn Draw>>,
}
impl Screen {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
//泛型类型参数一次只能替代一个具体类型，而 trait 对象则允许在运行时替代多种具体类型。
//使用bound
//我在库里调用他只会认出一种类型参数传进去 需要多种类型传入的情况无法使用
pub struct Screen<T: Draw> {
    pub components: Vec<T>,
}

impl<T> Screen<T>
    where T: Draw {
    pub fn run(&self) {
        for component in self.components.iter() {
            component.draw();
        }
    }
}
```

```rust
use gui::{Screen, Button};

fn main() {
    let screen = Screen {
        components: vec![
            Box::new(SelectBox {
                width: 75,
                height: 10,
                options: vec![
                    String::from("Yes"),
                    String::from("Maybe"),
                    String::from("No")
                ],
            }),
            Box::new(Button {
                width: 50,
                height: 10,
                label: String::from("OK"),
            }),
        ],
    };

    screen.run();
}
```

#### 13-2-2、trait要求对象安全

- 返回值类型不为 `Self`
- 方法没有任何泛型类型参数

```rust
pub struct Screen {
    pub components: Vec<Box<dyn Clone>>,
}
```

例如，如果尝试实现示例 17-4 中的 `Screen` 结构体来存放实现了 `Clone` trait 而不是 `Draw` trait 的类型

```rust
error[E0038]: the trait `std::clone::Clone` cannot be made into an object
 --> src/lib.rs:2:5
  |
2 |     pub components: Vec<Box<dyn Clone>>,
  |     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ the trait `std::clone::Clone`
  cannot be made into an object
  |
  = note: the trait cannot require that `Self : Sized`
```

## 14、模式和匹配

### 14-1、模式

#### 14-1-1、match

`match` 表达式必须是 **穷尽**（*exhaustive*）的，意为 `match` 表达式所有可能的值都必须被考虑到。

```rust
match VALUE {
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
    PATTERN => EXPRESSION,
}
```

#### 14-1-2、if let条件表达式

```rust
fn main() {
    let favorite_color: Option<&str> = None;
    let is_tuesday = false;
    let age: Result<u8, _> = "34".parse();

    if let Some(color) = favorite_color {
        println!("Using your favorite color, {}, as the background", color);
    } else if is_tuesday {
        println!("Tuesday is green day!");
    } else if let Ok(age) = age {
        if age > 30 {
         // 打印此代码
            println!("Using purple as the background color");
         
        } else {
            println!("Using orange as the background color");
            
        }
    } else {
        println!("Using blue as the background color");
    }
}
```

`if let` 表达式的缺点在于其穷尽性没有为编译器所检查，而 `match` 表达式则检查了。如果去掉最后的 `else` 块而遗漏处理一些情况，编译器也不会警告这类可能的逻辑错误。

#### 14-1-3、while let 条件循环

一个与 `if let` 结构类似的是 `while let` 条件循环，它允许只要模式匹配就一直进行 `while` 循环

```rust
let mut stack = Vec::new();

stack.push(1);
stack.push(2);
stack.push(3);

while let Some(top) = stack.pop() {
    println!("{}", top);
}
```

这个例子会打印出 3、2 接着是 1。`pop` 方法取出 vector 的最后一个元素并返回 `Some(value)`。如果 vector 是空的，它返回 `None`。`while` 循环只要 `pop` 返回 `Some` 就会一直运行其块中的代码。一旦其返回 `None`，`while` 循环停止。我们可以使用 `while let` 来弹出栈中的每一个元素。

#### 14-1-4、for循环

```rust
let v = vec!['a', 'b', 'c'];

for (index, value) in v.iter().enumerate() {
    println!("{} is at index {}", value, index);
}
```

这里使用 `enumerate` 方法适配一个迭代器来产生一个值和其在迭代器中的索引，他们位于一个元组中。第一个 `enumerate` 调用会产生元组 `(0, 'a')`。当这个值匹配模式 `(index, value)`，`index` 将会是 0 而 `value` 将会是 `'a'`，并打印出第一行输出。

#### 14-1-5、let语句

```rust
let PATTERN = EXPRESSION;
```

let本身就是一种模式匹配,进行解构的同时更为明显

```rust
let (x, y, z) = (1, 2, 3);
```

这里将一个元组与模式匹配。Rust 会比较值 `(1, 2, 3)` 与模式 `(x, y, z)` 并发现此值匹配这个模式。在这个例子中，将会把 `1` 绑定到 `x`，`2` 绑定到 `y` 并将 `3` 绑定到 `z`。你可以将这个元组模式看作是将三个独立的变量模式结合在一起。

#### 14-1-6、函数参数

函数参数也是一个模式匹配

```rust
fn print_coordinates(&(x, y): &(i32, i32)) {
    println!("Current location: ({}, {})", x, y);
}

fn main() {
    let point = (3, 5);
    print_coordinates(&point);
}
```

这会打印出 `Current location: (3, 5)`。值 `&(3, 5)` 会匹配模式 `&(x, y)`，如此 `x` 得到了值 `3`，而 `y`得到了值 `5`。

### 14-2、refutability可反驳性

irrefutable（不可反驳的）:一个例子就是 `let x = 5;` 语句中的 `x`，因为 `x` 可以匹配任何值所以不可能会失败。

refutable（可反驳的）:能匹配任何传递的可能值的模式被称为是 **不可反驳的**（*irrefutable*）。一个这样的例子便是 `if let Some(x) = a_value` 表达式中的 `Some(x)`；如果变量 `a_value` 中的值是 `None` 而不是 `Some`，那么 `Some(x)` 模式不能匹配。

函数参数、 `let` 语句和 `for` 循环只能接受不可反驳的模式，因为通过不匹配的值程序无法进行有意义的工作。`if let` 和 `while let` 表达式被限制为只能接受可反驳的模式，因为根据定义他们意在处理可能的失败：条件表达式的功能就是根据成功或失败执行不同的操作。

```rust
let Some(x) = some_option_value;
//修正
if let Some(x) = some_option_value {
    println!("{}", x);
}
```

若 `some_option_value` 的值是 `None`，则不会成功匹配模式 `Some(x)`，表明这个模式是可反驳的。然而 `let` 语句只能接受不可反驳模式，因为代码不能通过 `None` 值进行有效的操作。Rust 会在编译时抱怨我们尝试在要求不可反驳模式的地方使用可反驳模式：

```rust
error[E0005]: refutable pattern in local binding: `None` not covered
 -->
  |
3 | let Some(x) = some_option_value;
  |     ^^^^^^^ pattern `None` not covered
```

我们给了代码一个得以继续的出路！这段代码完全有效，尽管这意味着我们不能在避免产生警告的情况下使用无可辩驳的模式。如果为 `if let` 提供了一个总是会匹配的模式，比如示例 18-10 中的 `x`，编译器会给出一个警告。

```rust
if let x = 5 {
    println!("{}", x);
};
warning: irrefutable if-let pattern
 --> <anon>:2:5
  |
2 | /     if let x = 5 {
3 | |     println!("{}", x);
4 | | };
  | |_^
  |
  = note: #[warn(irrefutable_let_patterns)] on by default
```

基于此，`match` 匹配分支必须使用可反驳模式，除了最后一个分支需要使用能匹配任何剩余值的不可反驳模式。Rust 允许我们在只有一个匹配分支的 `match` 中使用不可反驳模式，不过这么做不是特别有用，并可以被更简单的 `let` 语句替代。

### 14-3、模式语法

#### 14-3-1、匹配命名变量

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(y) => println!("Matched, y = {:?}", y),//5
        _ => println!("Default case, x = {:?}", x),
    }

    println!("at the end: x = {:?}, y = {:?}", x, y);//Some(5),10
}
```

让我们看看当 `match` 语句运行的时候发生了什么。第一个匹配分支的模式并不匹配 `x` 中定义的值，所以代码继续执行。

第二个匹配分支中的模式引入了一个新变量 `y`，它会匹配任何 `Some` 中的值。因为我们在 `match` 表达式的新作用域中，这是一个新变量，而不是开头声明为值 10 的那个 `y`。这个新的 `y` 绑定会匹配任何 `Some` 中的值，在这里是 `x` 中的值。因此这个 `y` 绑定了 `x` 中 `Some` 内部的值。这个值是 5，所以这个分支的表达式将会执行并打印出 `Matched, y = 5`。

如果 `x` 的值是 `None` 而不是 `Some(5)`，头两个分支的模式不会匹配，所以会匹配下划线。这个分支的模式中没有引入变量 `x`，所以此时表达式中的 `x` 会是外部没有被覆盖的 `x`。在这个假想的例子中，`match` 将会打印 `Default case, x = None`。

一旦 `match` 表达式执行完毕，其作用域也就结束了，同理内部 `y` 的作用域也结束了。最后的 `println!` 会打印 `at the end: x = Some(5), y = 10`。

#### 14-3-2、多个模式

在 `match` 表达式中，可以使用 `|` 语法匹配多个模式，它代表 **或**（*or*）的意思。例如，如下代码将 `x` 的值与匹配分支相比较，第一个分支有 **或** 选项，意味着如果 `x` 的值匹配此分支的任一个值，它就会运行：

```rust

let x = 1;

match x {
    1 | 2 => println!("one or two"),
    3 => println!("three"),
    _ => println!("anything"),
}
```

#### 14-3-3、通过..=匹配值的范围

如果 `x` 是 1、2、3、4 或 5，第一个分支就会匹配。这相比使用 `|` 运算符表达相同的意思更为方便；相比 `1..=5`，使用 `|` 则不得不指定 `1 | 2 | 3 | 4 | 5`。相反指定范围就简短的多，特别是在希望匹配比如从 1 到 1000 的数字的时候！

```rust
let x = 5;

match x {
    1..=5 => println!("one through five"),
    _ => println!("something else"),
}
```

如下是一个使用 `char` 类型值范围的例子：

```
let x = 'c';

match x {
    'a'..='j' => println!("early ASCII letter"),
    'k'..='z' => println!("late ASCII letter"),
    _ => println!("something else"),
}
```

#### 14-3-4、解构并分解值

也可以使用模式来解构结构体、枚举、元组和引用，以便使用这些值的不同部分。让我们来分别看一看。

```rust
struct Point {
    x: i32,
    y: i32,
}

fn main() {
    let p = Point { x: 0, y: 7 };

    let Point { x: a, y: b } = p;
    assert_eq!(0, a);
    assert_eq!(7, b);
}
```

这段代码创建了变量 `a` 和 `b` 来匹配结构体 `p` 中的 `x` 和 `y` 字段。

```rust
fn main() {
    let p = Point { x: 0, y: 7 };

    match p {
        Point { x, y: 0 } => println!("On the x axis at {}", x),
        Point { x: 0, y } => println!("On the y axis at {}", y),
        Point { x, y } => println!("On neither axis: ({}, {})", x, y),
    }
}
//实际上是模式进行匹配，匹配成功的才会拿到y,拿不到x，x他不是为止值解构
```

第一个分支通过指定字段 `y` 匹配字面量 `0` 来匹配任何位于 `x` 轴上的点。此模式仍然创建了变量 `x` 以便在分支的代码中使用。

类似的，第二个分支通过指定字段 `x` 匹配字面量 `0` 来匹配任何位于 `y` 轴上的点，并为字段 `y` 创建了变量 `y`。第三个分支没有指定任何字面量，所以其会匹配任何其他的 `Point` 并为 `x` 和 `y` 两个字段创建变量。

在这个例子中，值 `p` 因为其 `x` 包含 0 而匹配第二个分支，因此会打印出 `On the y axis at 7`。

#### 14-3-5、解构枚举

```rust
enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(i32, i32, i32),
}
fn main() {
    let msg = Message::ChangeColor(0, 160, 255);

    match msg {
        Message::Quit => {
            println!("The Quit variant has no data to destructure.")
        }
        Message::Move { x, y } => {
            println!(
                "Move in the x direction {} and in the y direction {}",
                x,
                y
            );
        }
        Message::Write(text) => println!("Text message: {}", text),
        Message::ChangeColor(r, g, b) => {
            println!(
                "Change the color to red {}, green {}, and blue {}",
                r,
                g,
                b
            )
        }
    }
}
```

#### 14-3-6、解构嵌套的结构体和枚举

```rust
enum Color {
   Rgb(i32, i32, i32),
   Hsv(i32, i32, i32),
}

enum Message {
    Quit,
    Move { x: i32, y: i32 },
    Write(String),
    ChangeColor(Color),
}

fn main() {
    let msg = Message::ChangeColor(Color::Hsv(0, 160, 255));

    match msg {
        Message::ChangeColor(Color::Rgb(r, g, b)) => {
            println!(
                "Change the color to red {}, green {}, and blue {}",
                r,
                g,
                b
            )
        }
        Message::ChangeColor(Color::Hsv(h, s, v)) => {
            println!(
                "Change the color to hue {}, saturation {}, and value {}",
                h,
                s,
                v
            )
        }
        _ => ()
    }
}
```

#### 14-3-7、解构结构体和元组

```rust
let ((feet, inches), Point {x, y}) = ((3, 10), Point { x: 3, y: -10 });
```

#### 14-3-8、忽略

有时忽略模式中的一些值是有用的，比如 `match` 中最后捕获全部情况的分支实际上没有做任何事，但是它确实对所有剩余情况负责。有一些简单的方法可以忽略模式中全部或部分值：使用 `_` 模式（我们已经见过了），在另一个模式中使用 `_` 模式，使用一个以下划线开始的名称，或者使用 `..` 忽略所剩部分的值。让我们来分别探索如何以及为什么要这么做。

函数

```rust
fn foo(_: i32, y: i32) {
    println!("This code only uses the y parameter: {}", y);
}

fn main() {
    foo(3, 4);
}
```

嵌套

```rust
let mut setting_value = Some(5);
let new_setting_value = Some(10);

match (setting_value, new_setting_value) {
    (Some(_), Some(_)) => {
        println!("Can't overwrite an existing customized value");
    }
    _ => {
        setting_value = new_setting_value;
    }
}

println!("setting is {:?}", setting_value);
```

这段代码会打印出 `Can't overwrite an existing customized value` 接着是 `setting is Some(5)`

测试 `setting_value` 和 `new_setting_value` 都为 `Some` 成员的情况,如果有值不为Some才会调用下面的赋值

元组

```rust
let numbers = (2, 4, 8, 16, 32);

match numbers {
    (first, _, third, _, fifth) => {
        println!("Some numbers: {}, {}, {}", first, third, fifth)
    },
}
```

忽略未使用变量

```rust
fn main() {
    let _x = 5;
    let y = 10;


let s = Some(String::from("Hello!"));
//if let Some(_s) = s 使用_s会报错
if let Some(_) = s {
    println!("found a string");
}

println!("{:?}", s);
}
```

因为 `s` 的值仍然会移动进 `_s`，并阻止我们再次使用 `s`。然而只使用下划线本身，并不会绑定值。示例 18-22 能够无错编译，因为 `s` 没有被移动进 `_`

用..忽略剩余值

```rust
struct Point {
    x: i32,
    y: i32,
    z: i32,
}

let origin = Point { x: 0, y: 0, z: 0 };

match origin {
    Point { x, .. } => println!("x is {}", x),
}
```

只操作 `x` 坐标并忽略 `y` 和 `z` 字段的值

元组..忽略

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (first, .., last) => {
            println!("Some numbers: {}, {}", first, last);
        },
    }
}
```

 `..` 必须是无歧义的。如果期望匹配和忽略的值是不明确的，Rust 会报错

```rust
fn main() {
    let numbers = (2, 4, 8, 16, 32);

    match numbers {
        (.., second, ..) => {
            println!("Some numbers: {}", second)
        },
    }
}
```

#### 14-3-9、匹配守卫

**匹配守卫**（*match guard*）是一个指定于 `match` 分支模式之后的额外 `if` 条件，它也必须被满足才能选择此分支。匹配守卫用于表达比单独的模式所能允许的更为复杂的情况。

```rust
let num = Some(4);

match num {
    Some(x) if x < 5 => println!("less than five: {}", x),
    Some(x) => println!("{}", x),
    None => (),
}
```

现在这会打印出 `Default case, x = Some(5)`。现在第二个匹配分支中的模式不会引入一个覆盖外部 `y` 的新变量 `y`，这意味着可以在匹配守卫中使用外部的 `y`。相比指定会覆盖外部 `y` 的模式 `Some(y)`，这里指定为 `Some(n)`。此新建的变量 `n` 并没有覆盖任何值，因为 `match` 外部没有变量 `n`。

```rust
fn main() {
    let x = Some(5);
    let y = 10;

    match x {
        Some(50) => println!("Got 50"),
        Some(n) if n == y => println!("Matched, n = {}", n),
        _ => println!("Default case, x = {:?}", x),
    }

    println!("at the end: x = {:?}, y = {}", x, y);
}
```

也可以在匹配守卫中使用 **或** 运算符 `|` 来指定多个模式，同时匹配守卫的条件会作用于所有的模式

```rust

let x = 4;
let y = false;

match x {
    4 | 5 | 6 if y => println!("yes"),
    _ => println!("no"),
}
//优先级
(4 | 5 | 6) if y => ...
```

#### 14-3-10、@绑定

*at* 运算符（`@`）允许我们在创建一个存放值的变量的同时测试其值是否匹配模式。

```rust
enum Message {
    Hello { id: i32 },
}

let msg = Message::Hello { id: 5 };

match msg {
    Message::Hello { id: id_variable @ 3..=7 } => {
        println!("Found an id in range: {}", id_variable)
    },
    Message::Hello { id: 10..=12 } => {
        println!("Found an id in another range")
    },
    Message::Hello { id } => {
        println!("Found some other id: {}", id)
    },
}
```

使用 `@` 可以在一个模式中同时测试和保存变量值。

## 15、高级特征

### 15-1、不安全的rust

Rust 还隐藏有第二种语言，它不会强制执行这类内存安全保证：这被称为 **不安全 Rust**（*unsafe Rust*）。它与常规 Rust 代码无异，但是会提供额外的超能力。

#### 15-1-1、unsafe

有五类可以在不安全 Rust 中进行而不能用于安全 Rust 的操作，它们称之为 “不安全的超能力。

- 解引用裸指针
- 调用不安全的函数或方法
- 访问或修改可变静态变量
- 实现不安全 trait
- 访问 `union` 的字段

这五类操作必须位于标记为 `unsafe` 的块中，就能够知道任何与内存安全相关的错误必定位于 `unsafe` 块内。保持 `unsafe` 块尽可能小

#### 15-1-2、解引用指针

裸指针与引用和智能指针的区别在于：

- 允许忽略借用规则，可以同时拥有不可变和可变的指针，或多个指向相同位置的可变指针
- 不保证指向有效的内存
- 允许为空
- 不能实现任何自动清理功能

同时创建不可变和可变裸指针

```rust

let mut num = 5;

let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;
```

可以在安全代码中 **创建** 裸指针，只是不能在不安全块之外 **解引用** 裸指针

创建一个指针不会造成任何危险；只有当访问其指向的值时才有可能遇到无效的值。需要在unsafe中调用

```rust

let mut num = 5;

let r1 = &num as *const i32;
let r2 = &mut num as *mut i32;

unsafe {
    println!("r1 is: {}", *r1);
    println!("r2 is: {}", *r2);
}
```

#### 15-1-3、不安全函数或方法

``split_at_mut``

```rust

let mut v = vec![1, 2, 3, 4, 5, 6];

let r = &mut v[..];

let (a, b) = r.split_at_mut(3);

assert_eq!(a, &mut [1, 2, 3]);
assert_eq!(b, &mut [4, 5, 6]);
```

Rust 的借用检查器不能理解我们要借用这个 slice 的两个不同部分：它只知道我们借用了同一个 slice 两次。本质上借用 slice 的不同部分是可以的，因为结果两个 slice 不会重叠，不过 Rust 还没有智能到能够理解这些。当我们知道某些事是可以的而 Rust 不知道的时候，就是触及不安全代码的时候了

```rust
use std::slice;

fn split_at_mut(slice: &mut [i32], mid: usize) -> (&mut [i32], &mut [i32]) {
    let len = slice.len();
    let ptr = slice.as_mut_ptr();

    assert!(mid <= len);

    unsafe {
        (slice::from_raw_parts_mut(ptr, mid),
         slice::from_raw_parts_mut(ptr.add(mid), len - mid))
    }
}
```

`slice::from_raw_parts_mut` 函数是不安全的因为它获取一个裸指针，并必须确信这个指针是有效的。裸指针上的 `add` 方法也是不安全的，因为其必须确信此地址偏移量也是有效的指针。因此必须将 `slice::from_raw_parts_mut` 和 `add` 放入 `unsafe` 块中以便能调用它们。通过观察代码，和增加 `mid` 必然小于等于 `len` 的断言

#### 15-1-4、使用exterm调用外部代码

有时你的 Rust 代码可能需要与其他语言编写的代码交互。为此 Rust 有一个关键字，`extern`，有助于创建和使用 **外部函数接口**（*Foreign Function Interface*， FFI）。外部函数接口是一个编程语言用以定义函数的方式，其允许不同（外部）编程语言调用这些函数

```rust
extern "C" {
    fn abs(input: i32) -> i32;
}

fn main() {
    unsafe {
        println!("Absolute value of -3 according to C: {}", abs(-3));
    }
}
```

在 `extern "C"` 块中，列出了我们希望能够调用的另一个语言中的外部函数的签名和名称。`"C"` 部分定义了外部函数所使用的 **应用二进制接口**（*application binary interface*，ABI） —— ABI 定义了如何在汇编语言层面调用此函数。`"C"` ABI 是最常见的，并遵循 C 编程语言的 ABI。

使用 `extern` 来创建一个允许其他语言调用 Rust 函数的接口。不同于 `extern` 块，就在 `fn` 关键字之前增加 `extern` 关键字并指定所用到的 ABI。还需增加 `#[no_mangle]` 标注来告诉 Rust 编译器不要 mangle 此函数的名称。

```rust

#[no_mangle]
pub extern "C" fn call_from_c() {
    println!("Just called a Rust function from C!");
}
```

#### 15-1-5、访问或修改可变静态变量

```rust
static HELLO_WORLD: &str = "Hello, world!";

fn main() {
    println!("name is: {}", HELLO_WORLD);
}
```

静态变量一般以大写形式书写；

常量与不可变静态变量可能看起来很类似，不过一个微妙的区别是静态变量中的值有一个固定的内存地址。使用这个值总是会访问相同的地址。另一方面，常量则允许在任何被用到的时候复制其数据。

常量与静态变量的另一个区别在于静态变量可以是可变的。访问和修改可变静态变量都是 **不安全** 的

```rust
static mut COUNTER: u32 = 0;

fn add_to_count(inc: u32) {
    unsafe {
        COUNTER += inc;
    }
}

fn main() {
    add_to_count(3);

    unsafe {
        println!("COUNTER: {}", COUNTER);
    }
}
```

#### 15-1-6、不安全trait

`unsafe` 的另一个操作用例是实现不安全 trait。当 trait 中至少有一个方法中包含编译器无法验证的不变式（invariant）时 trait 是不安全的。可以在 `trait` 之前增加 `unsafe` 关键字将 trait 声明为 `unsafe`，同时 trait 的实现也必须标记为 `unsafe`，

```
unsafe trait Foo {
    // methods go here
}

unsafe impl Foo for i32 {
    // method implementations go here
}
```

Rust 不能验证我们的类型保证可以安全的跨线程发送或在多线程间访问，所以需要我们自己进行检查并通过 `unsafe` 表明。

#### 15-1-7、访问联合体中的字段

仅适用于 `unsafe` 的最后一个操作是访问 **联合体** 中的字段，`union` 和 `struct` 类似，但是在一个实例中同时只能使用一个声明的字段。联合体主要用于和 C 代码中的联合体交互

### 15-2、高级trait

#### 15-2-1、关联类型在trait定义中指定占位符类型

**关联类型**（*associated types*）是一个将类型占位符与 trait 相关联的方式，这样 trait 的方法签名中就可以使用这些占位符类型。

```rust
pub trait Iterator {
    type Item;

    fn next(&mut self) -> Option<Self::Item>;
}
```

和泛型的区别

泛型需要在每个实现中标注类型；

当 trait 有泛型参数时，可以多次实现这个 trait，每次需改变泛型参数的具体类型。接着当使用 `Counter` 的 `next` 方法时，必须提供类型标注来表明希望使用 `Iterator` 的哪一个实现。

#### 15-2-2、运算符重载

```rust
use std::ops::Add;

#[derive(Debug, PartialEq)]
struct Point {
    x: i32,
    y: i32,
}

impl Add for Point {
    type Output = Point;

    fn add(self, other: Point) -> Point {
        //Point 结构体上实现 Add trait 来重载 + 运算符，这样就可以将两个 Point 实例相加了
        Point {
            x: self.x + other.x,
            y: self.y + other.y,
        }
    }
}

fn main() {
    assert_eq!(Point { x: 1, y: 0 } + Point { x: 2, y: 3 },
               Point { x: 3, y: 3 });
}
```

`Add` trait 有一个叫做 `Output` 的关联类型，它用来决定 `add` 方法的返回值类型

```rust

trait Add<RHS=Self> {
    type Output;

    fn add(self, rhs: RHS) -> Self::Output;
}
```

尖括号中的 `RHS=Self`：这个语法叫做 **默认类型参数**（*default type parameters*）。`RHS` 是一个泛型类型参数（“right hand side” 的缩写），它用于定义 `add` 方法中的 `rhs` 参数。如果实现 `Add` trait 时不指定 `RHS` 的具体类型，`RHS` 的类型将是默认的 `Self` 类型，也就是在其上实现 `Add` 的类型

 `Add` trait 时希望自定义 `RHS` 类型而不是使用默认类型的例子

```rust
use std::ops::Add;

struct Millimeters(u32);
struct Meters(u32);

impl Add<Meters> for Millimeters {
    type Output = Millimeters;

    fn add(self, other: Meters) -> Millimeters {
        Millimeters(self.0 + (other.0 * 1000))
    }
}
```

为了使 `Millimeters` 和 `Meters` 能够相加，我们指定 `impl Add<Meters>` 来设定 `RHS` 类型参数的值而不是使用默认的 `Self`。

默认参数类型主要用于如下两个方面：

- 扩展类型而不破坏现有代码。
- 在大部分用户都不需要的特定情况进行自定义。

不能从外部读取类型，这不是动态语言，是静态语言



#### 15-2-3、调用名字相同的方法

```rust
trait Pilot {
    fn fly(&self);
}

trait Wizard {
    fn fly(&self);
}

struct Human;

impl Pilot for Human {
    fn fly(&self) {
        println!("This is your captain speaking.");
    }
}

impl Wizard for Human {
    fn fly(&self) {
        println!("Up!");
    }
}

impl Human {
    fn fly(&self) {
        println!("*waving arms furiously*");
    }
}
```

当调用 `Human` 实例的 `fly` 时，编译器默认调用直接实现在类型上的方法，如示例 19-17 所示。

```rust
fn main() {
    let person = Human;
    person.fly();
}
```

为了能够调用 `Pilot` trait 或 `Wizard` trait 的 `fly` 方法，我们需要使用更明显的语法以便能指定我们指的是哪个 `fly` 方法。这个语法展示在示例 19-18 中：

```rust
fn main() {
    let person = Human;
    Pilot::fly(&person);
    Wizard::fly(&person);
    person.fly();//也可以选择写成 Human::fly(&person)，这等同于示例 19-18 中的 person.fly()
}
```

#### 15-2-4、完全限定语法

关联函数是 trait 的一部分，但没有 `self` 参数。当同一作用域的两个类型实现了同一 trait，Rust 就不能计算出我们期望的是哪一个类型，除非使用 **完全限定语法**（*fully qualified syntax*）

```rust
trait Animal {
    fn baby_name() -> String;
}

struct Dog;

impl Dog {
    fn baby_name() -> String {
        String::from("Spot")
    }
}

impl Animal for Dog {
    fn baby_name() -> String {
        String::from("puppy")
    }
}

fn main() {
    println!("A baby dog is called a {}", Dog::baby_name());
    println!("A baby dog is called a {}", <Dog as Animal>::baby_name());
}

```

`Animal` trait,它有关联函数 `baby_name`，结构体 `Dog` 实现了 `Animal`，同时有关联函数 `baby_name` 直接定义于 `Dog` 之上,如果要调用trait重新赋值在Dog上的方法，因为他不是实现对象，所以没有self

通常，完全限定语法定义为：

```rust
<Type as Trait>::function(receiver_if_method, next_arg, ...);
```

#### 15-2-5、trait中实现另一个trait

实质：在一个trait上添加另一个trait能使之默认实现,可以理解成继承，不过是添加在父trait上

有时我们可能会需要某个 trait 使用另一个 trait 的功能。在这种情况下，需要能够依赖相关的 trait 也被实现。这个所需的 trait 是我们实现的 trait 的 **父（超） trait**（*supertrait*）。

```rust
use std::fmt;

trait OutlinePrint: fmt::Display {
    fn outline_print(&self) {
        let output = self.to_string();
        let len = output.len();
        println!("{}", "*".repeat(len + 4));
        println!("*{}*", " ".repeat(len + 2));
        println!("* {} *", output);
        println!("*{}*", " ".repeat(len + 2));
        println!("{}", "*".repeat(len + 4));
    }
}
```

因为指定了 `OutlinePrint` 需要 `Display` trait，则可以在 `outline_print` 中使用 `to_string`， 其会为任何实现 `Display` 的类型自动实现。如果我们尝试使用 `to_string` 而不添加冒号（`:`）并在 trait 名称后面指定 `Display` trait，则会得到一个错误说在当前作用域中没有找到用于 `&Self` 类型的方法 `to_string`。

```rust

struct Point {
    x: i32,
    y: i32,
}

impl OutlinePrint for Point {}
error[E0277]: the trait bound `Point: std::fmt::Display` is not satisfied
  --> src/main.rs:20:6
   |
20 | impl OutlinePrint for Point {}
   |      ^^^^^^^^^^^^ `Point` cannot be formatted with the default formatter;
try using `:?` instead if you are using a format string
   |
   = help: the trait `std::fmt::Display` is not implemented for `Point`
```



```rust
use std::fmt;

impl fmt::Display for Point {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "({}, {})", self.x, self.y)
    }
}
fn main(){
	let point = Point { x: 3, y: 4 };
    point.outline_print();
}
//那么在 Point 上实现 OutlinePrint trait 将能成功编译，并可以在 Point 实例上调用 outline_print 来显示位于星号框中的点的值。
```

在 `Point` 上实现 `OutlinePrint` trait 将能成功编译，并可以在 `Point` 实例上调用 `outline_print` 来显示位于星号框中的点的值

#### 15-2-6、newType

*如何不用宏来实现打印

孤儿规则（orphan rule），它说明只要 trait 或类型对于当前 crate 是本地的话就可以在此类型上实现该 trait。一个绕开这个限制的方法是使用 **newtype 模式**（*newtype pattern*）

例如，如果想要在 `Vec<T>` 上实现 `Display`，而孤儿规则阻止我们直接这么做，因为 `Display` trait 和 `Vec<T>` 都定义于我们的 crate 之外。可以创建一个包含 `Vec<T>` 实例的 `Wrapper` 结构体，

```rust
use std::fmt;
//()元组 
struct Wrapper(Vec<String>);

impl fmt::Display for Wrapper {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "[{}]", self.0.join(", "))
    }
}

fn main() {
    let w = Wrapper(vec![String::from("hello"), String::from("world")]);
    println!("w = {}", w);
}
```

在 `Vec<T>` 上实现 `Display`，而孤儿规则阻止我们直接这么做，因为 `Display` trait 和 `Vec<T>` 都定义于我们的 crate 之外。可以创建一个包含 `Vec<T>` 实例的 `Wrapper` 结构体，接着可以如示例 19-31 那样在 `Wrapper` 上实现 `Display` 并使用 `Vec<T>` 的值：

`Display` 的实现使用 `self.0` 来访问其内部的 `Vec<T>`，因为 `Wrapper` 是元组结构体而 `Vec<T>` 是结构体总位于索引 0 的项。接着就可以使用 `Wrapper` 中 `Display` 的功能了。

### 15-3、高级类型

#### 15-3-1、类型别名

Rust 还提供了声明 **类型别名**（*type alias*）的能力，使用 `type` 关键字来给予现有类型另一个名字

```rust

type Kilometers = i32;

let x: i32 = 5;
let y: Kilometers = 5;

println!("x + y = {}", x + y);
```



类型别名的主要用途是减少重复。例如，可能会有这样很长的类型：

```rust

type Thunk = Box<dyn Fn() + Send + 'static>;

let f: Thunk = Box::new(|| println!("hi"));

fn takes_long_type(f: Thunk) {
    // --snip--
}

fn returns_long_type() -> Thunk {
    // --snip--
}
```

类型别名也经常与 `Result<T, E>` 结合使用来减少重复。考虑一下标准库中的 `std::io` 模块。

```rust

type Result<T> = std::result::Result<T, std::io::Error>;
pub trait Write {
    fn write(&mut self, buf: &[u8]) -> Result<usize>;
    fn flush(&mut self) -> Result<()>;

    fn write_all(&mut self, buf: &[u8]) -> Result<()>;
    fn write_fmt(&mut self, fmt: fmt::Arguments) -> Result<()>;
}
```

#### 15-3-2、never type

1. 用于无返回值
2. 用于修正match,用于panic!
3. loop

Rust 有一个叫做 `!` 的特殊类型。在类型理论术语中，它被称为 *empty type*，因为它没有值。我们更倾向于称之为 *never type*。这个名字描述了它的作用：在函数从不返回的时候充当返回值。例如：

```rust
fn bar() -> ! {
    // --snip--
}
```

match

忽略了代码中的一些细节,`match` 的分支必须返回相同的类型

```rust
let guess: u32 = match guess.trim().parse() {
    Ok(num) => num,
    Err(_) => continue,
};
```

他们需要同一个返回值，前者是 `u32` 值，而后者是 `!` 值。因为 `!` 并没有一个值，Rust 决定 `guess` 的类型是 `u32`。所以在 `Err` 的情况，事实上并未对 `guess` 赋值。

panic

never type 的另一个用途是 `panic!`。还记得 `Option<T>` 上的 `unwrap` 函数吗？它产生一个值或 panic。这里是它的定义：

```rust
impl<T> Option<T> {
    pub fn unwrap(self) -> T {
        match self {
            Some(val) => val,
            None => panic!("called `Option::unwrap()` on a `None` value"),
        }
    }
}
```

loop

```rust
print!("forever ");

loop {
    print!("and ever ");
}
```

#### 15-3-3、动态大小和size trait

因为 Rust 需要知道例如应该为特定类型的值分配多少空间这样的信息其类型系统的一个特定的角落可能令人迷惑：这就是 **动态大小类型**（*dynamically sized types*）的概念。这有时被称为 “DST” 或 “unsized types”，这些类型允许我们处理只有在运行时才知道大小的类型。

`str` 是一个 DST；直到运行时我们都不知道字符串有多长

Rust 需要知道应该为特定类型的值分配多少内存，同时所有同一类型的值必须使用相同数量的内存

```rust
let s1: str = "Hello there!";
let s2: str = "How's it going?";
//如果允许编写这样的代码，也就意味着这两个 str 需要占用完全相同大小的空间，不过它们有着不同的长度。这也就是为什么不可能创建一个存放动态大小类型的变量的原因。
s1 和 s2 的类型是 &str 而不是 str所以就不会报错
```

所以虽然 `&T` 是一个储存了 `T` 所在的内存位置的单个值，`&str` 则是 **两个** 值：`str` 的地址和其长度。这样，`&str` 就有了一个在编译时可以知道的大小：它是 `usize` 长度的两倍。也就是说，我们总是知道 `&str` 的大小，

动态大小类型的黄金规则：必须将动态大小类型的值置于某种指针之后。

为了处理 DST，Rust 有一个特定的 trait 来确定一个类型的大小是否在编译时可知：这就是 `Sized` trait。这个 trait 自动为编译器在编译时就知道其大小的类型实现。另外，Rust 隐式的为每一个泛型函数增加了 `Sized` bound。也就是说，对于如下泛型函数定义：

```rust
fn generic<T>(t: T) {
    // --snip--
}
```

实际上被当作如下处理：

```rust
fn generic<T: Sized>(t: T) {
    // --snip--
}
```

以使用如下特殊语法来放宽这个限制：

```rust
fn generic<T: ?Sized>(t: &T) {
    // --snip--
}
```

### 15-4、高级函数和闭包

#### 15-4-1、函数指针

函数的类型是 `fn` （使用小写的 “f” ）以免与 `Fn` 闭包 trait 相混淆。`fn` 被称为 **函数指针**（*function pointer*）。指定参数为函数指针的语法类似于闭包

```rust
fn add_one(x: i32) -> i32 {
    x + 1
}

fn do_twice(f: fn(i32) -> i32, arg: i32) -> i32 {
    f(arg) + f(arg)
}

fn main() {
    let answer = do_twice(add_one, 5);

    println!("The answer is: {}", answer);
}
```

不同于闭包，`fn` 是一个类型而不是一个 trait，所以直接指定 `fn` 作为参数而不是声明一个带有 `Fn` 作为 trait bound 的泛型参数。

可以使用内联定义的闭包又可以使用命名函数

```rust
let list_of_numbers = vec![1, 2, 3];
let list_of_strings: Vec<String> = list_of_numbers
    .iter()
    .map(|i| i.to_string())//  .map(ToString::to_string)//
    .collect();
```

元组结构体和元组结构体枚举成员的实现细节

```rust
enum Status {
    Value(u32),
    Stop,
}

let list_of_statuses: Vec<Status> =
    (0u32..20)
    .map(Status::Value)
    .collect();
```

#### 15-4-2、返回闭包

```rust
fn returns_closure() -> Fn(i32) -> i32 {
    |x| x + 1
}
//报错
不允许使用函数指针 fn 作为返回值类型。Rust 并不知道需要多少空间来储存闭包
```

我们可以使用trait对象

```rust
fn returns_closure() -> Box<dyn Fn(i32) -> i32> {
    Box::new(|x| x + 1)
}
```

### 15-5、宏

从根本上来说，宏是一种为写其他代码而写代码的方式，即所谓的 **元编程**（*metaprogramming*）;

宏可以在编译器翻译代码前展开，例如,宏可以在一个给定类型上实现 trait 。而函数则不行，因为函数是在运行时被调用，同时 trait 需要在编译时实现

**宏**（*Macro*）指的是 Rust 中一系列的功能：使用 `macro_rules!` 的 **声明**（*Declarative*）宏，和三;种 **过程**（*Procedural*）宏：

- 自定义 `#[derive]` 宏在结构体和枚举上指定通过 `derive` 属性添加的代码
- 类属性（Attribute-like）宏定义可用于任意项的自定义属性
- 类函数宏看起来像函数不过作用于作为参数传递的 token

#### 15-5-1、macro_rules!的声明宏用于通用元编程

Rust 最常用的宏形式是 **声明宏**（*declarative macros*）。它们有时也被称为 “macros by example”、“`macro_rules!` 宏” 或者就是 “macros”。其核心概念是，声明宏允许我们编写一些类似 Rust `match` 表达式的代码;

可以使用 macro_rules! 来定义宏。让我们通过查看 vec! 宏定义来探索如何使用 macro_rules! 结构。第 8 章讲述了如何使用 vec! 宏来生成一个给定值的 vector。例如，下面的宏用三个整数创建一个 vector：

```rust

let v: Vec<u32> = vec![1, 2, 3];

```

无法使用函数做相同的事情，因为我们无法预先知道参数值的数量和类型

vec!的简化定义

```rust
#[macro_export]
macro_rules! vec {
    ( $( $x:expr ),* ) => {
        {
            let mut temp_vec = Vec::new();
            $(
                temp_vec.push($x);
            )*
            temp_vec
        }
    };
}
```

`#[macro_export]` 标注说明，只要将定义了宏的 crate 引入作用域，宏就应当是可用的。如果没有该标注，这个宏就不能被引入作用域。

接着使用 `macro_rules!` 和宏名称开始宏定义，且所定义的宏并 **不带** 感叹号。名字后跟大括号表示宏定义体，在该例中宏名称是 `vec` 。

`vec!` 宏的结构和 `match` 表达式的结构类似。此处有一个单边模式 `( $( $x:expr ),* )` ，后跟 `=>` 以及和模式相关的代码块。如果模式匹配，该相关代码块将被执行。假设这是这个宏中唯一的模式，则只有这一种有效匹配，其他任何匹配都是错误的。更复杂的宏会有多个单边模式。

首先，一对括号包含了整个模式。接下来是美元符号（ `$` ），后跟一对括号，捕获了符合括号内模式的值以用于替换后的代码。`$()` 内则是 `$x:expr` ，其匹配 Rust 的任意表达式，并将该表达式记作 `$x`。

`$()` 之后的逗号说明一个可有可无的逗号分隔符可以出现在 `$()` 所匹配的代码之后。紧随逗号之后的 `*` 说明该模式匹配零个或更多个 `*` 之前的任何模式。

当以 `vec![1, 2, 3];` 调用宏时，`$x` 模式与三个表达式 `1`、`2` 和 `3` 进行了三次匹配。

调用该宏时，替换该宏调用所生成的代码会是下面这样：

```rust
let mut temp_vec = Vec::new();
temp_vec.push(1);
temp_vec.push(2);
temp_vec.push(3);
temp_vec
```

#### 15-5-2、从属性生产过程宏

第二种形式的宏被称为 **过程宏**（*procedural macros*），因为它们更像函数（一种过程类型）。过程宏接收 Rust 代码作为输入，在这些代码上进行操作，然后产生另一些代码作为输出，而非像声明式宏那样匹配对应模式然后以另一部分代码替换当前代码。

有三种类型的过程宏（自定义派生（derive），类属性和类函数），不过它们的工作方式都类似。

创建过程宏时，其定义必须驻留在它们自己的具有特殊 crate 类型的 crate 中。这么做出于复杂的技术原因，将来我们希望能够消除这些限制。使用这些宏需采用类似示例 19-29 所示的代码形式，其中 `some_attribute` 是一个使用特定宏的占位符。

```rust
use proc_macro;

#[some_attribute]
pub fn some_name(input: TokenStream) -> TokenStream {
}
```

定义过程宏的函数以一个 `TokenStream` 作为输入并产生一个 `TokenStream` 作为输出。该 `TokenStream` 类型由包含在 Rust 中的 `proc_macro` crate 定义，并表示令牌序列。这是宏的核心：宏操作的源代码构成了输入 `TokenStream`，宏产生的代码是输出 `TokenStream`。该函数还附加了一个属性，该属性指定我们正在创建过程宏的类型。我们可以在同一个 crate 中拥有多种过程宏。

#### 15-5-3、编写自定义derive宏

```rust
use hello_macro::HelloMacro;
use hello_macro_derive::HelloMacro;

#[derive(HelloMacro)]
struct Pancakes;

fn main() {
    Pancakes::hello_macro();
}
```

运行该代码将会打印 `Hello, Macro! My name is Pancakes!` 第一步是像下面这样新建一个库 crate：

```rust
cargo new hello_macro --lib
```

文件名: src/lib.rs

```rust

pub trait HelloMacro {
    fn hello_macro();
}
```

下一步是定义过程式宏。在编写本部分时，过程式宏必须在其自己的 crate 内。该限制最终可能被取消。构造 crate 和其中宏的惯例如下：对于一个 `foo` 的包来说，一个自定义的派生过程宏的包被称为 `foo_derive` 。在 `hello_macro` 项目中新建名为 `hello_macro_derive` 的包。

```rust
cargo new hello_macro_derive --lib
```

由于两个 crate 紧密相关，因此在 `hello_macro` 包的目录下创建过程式宏的 crate。如果改变在 `hello_macro` 中定义的 trait ，同时也必须改变在 `hello_macro_derive` 中实现的过程式宏。这两个包需要分别发布，编程人员如果使用这些包，则需要同时添加这两个依赖并将其引入作用域。我们也可以只用 `hello_macro` 包而将 `hello_macro_derive` 作为一个依赖，并重新导出过程式宏的代码。但现在我们组织项目的方式使编程人员在无需 `derive` 功能时也能够单独使用 `hello_macro`。

我们需要声明 `hello_macro_derive` crate 是过程宏(proc-macro) crate。正如稍后将看到的那样，我们还需要 `syn` 和 `quote` crate 中的功能，所以需要将其加到依赖中。将下面的代码加入到 `hello_macro_derive` 的 *Cargo.toml* 文件中。

```rust
[lib]
proc-macro = true

[dependencies]
syn = "1.0"
quote = "1.0"
```

```rust
 hello_macro_derive/src/lib.rs
extern crate proc_macro;

use crate::proc_macro::TokenStream;
use quote::quote;
use syn;

#[proc_macro_derive(HelloMacro)]
pub fn hello_macro_derive(input: TokenStream) -> TokenStream {
    // 将 Rust 代码解析为语法树以便进行操作
    let ast = syn::parse(input).unwrap();

    // 构建 trait 实现
    impl_hello_macro(&ast)
}
```

现在，我们已经引入了三个新的 crate：`proc_macro` 、 [`syn`](https://crates.io/crates/syn) 和 [`quote`](https://crates.io/crates/quote) 。Rust 自带 `proc_macro` crate，因此无需将其加到 *Cargo.toml* 文件的依赖中。`proc_macro` crate 是编译器用来读取和操作我们 Rust 代码的 API。

`syn` crate 将字符串中的 Rust 代码解析成为一个可以操作的数据结构。`quote` 则将 `syn` 解析的数据结构转换回 Rust 代码。这些 crate 让解析任何我们所要处理的 Rust 代码变得更简单：为 Rust 编写整个的解析器并不是一件简单的工作。

当用户在一个类型上指定 `#[derive(HelloMacro)]` 时，`hello_macro_derive` 函数将会被调用。原因在于我们已经使用 `proc_macro_derive` 及其指定名称对 `hello_macro_derive` 函数进行了标注：`HelloMacro`，其匹配到 trait 名，这是大多数过程宏遵循的习惯。

`TokenStream` 的 `input` 转换为一个我们可以解释和操作的数据结构。这正是 `syn` 派上用场的地方。`syn` 中的 `parse_derive_input` 函数获取一个 `TokenStream` 并返回一个表示解析出 Rust 代码的 `DeriveInput` 结构体。示例 19-32 展示了从字符串 `struct Pancakes;` 中解析出来的 `DeriveInput` 结构体的相关部分：

```rust
DeriveInput {
    // --snip--

    ident: Ident {
        ident: "Pancakes",
        span: #0 bytes(95..103)
    },
    data: Struct(
        DataStruct {
            struct_token: Struct,
            fields: Unit,
            semi_token: Some(
                Semi
            )
        }
    )
}
```

该结构体的字段展示了我们解析的 Rust 代码是一个类单元结构体，其 `ident`（ identifier，表示名字）为 `Pancakes`。

此时，尚未定义 `impl_hello_macro` 函数，其用于构建所要包含在内的 Rust 新代码。但在此之前，注意其输出也是 `TokenStream`。所返回的 `TokenStream` 会被加到我们的 crate 用户所写的代码中，因此，当用户编译他们的 crate 时，他们会获取到我们所提供的额外功能。

当调用 `syn::parse` 函数失败时，我们用 `unwrap` 来使 `hello_macro_derive` 函数 panic。在错误时 panic 对过程宏来说是必须的，因为 `proc_macro_derive` 函数必须返回 `TokenStream` 而不是 `Result`，以此来符合过程宏的 API。这里选择用 `unwrap` 来简化了这个例子；在生产代码中，则应该通过 `panic!` 或 `expect` 来提供关于发生何种错误的更加明确的错误信息。

现在我们有了将标注的 Rust 代码从 `TokenStream` 转换为 `DeriveInput` 实例的代码，让我们来创建在注明类型上实现 `HelloMacro` trait 的代码，如示例 19-33 所示。

```rust
 hello_macro_derive/src/lib.rs
fn impl_hello_macro(ast: &syn::DeriveInput) -> TokenStream {
    let name = &ast.ident;
    let gen = quote! {
        impl HelloMacro for #name {
            fn hello_macro() {
                println!("Hello, Macro! My name is {}", stringify!(#name));
            }
        }
    };
    gen.into()
}
```

我们得到一个包含以 `ast.ident` 作为注明类型名字（标识符）的 `Ident` 结构体实例

`quote!` 宏让我们可以编写希望返回的 Rust 代码。`quote!` 宏执行的直接结果并不是编译器所期望的并需要转换为 `TokenStream`。为此需要调用 `into` 方法，它会消费这个中间表示（intermediate representation，IR）并返回所需的 `TokenStream` 类型值。

这个宏也提供了一些非常酷的模板机制；我们可以写 `#name` ，然后 `quote!` 会以名为 `name` 的变量值来替换它。你甚至可以做一些类似常用宏那样的重复代码的工作。查阅 [`quote` crate 的文档](https://docs.rs/quote) 来获取详尽的介绍。

我们期望我们的过程式宏能够为通过 `#name` 获取到的用户注明类型生成 `HelloMacro` trait 的实现。该 trait 的实现有一个函数 `hello_macro` ，其函数体包括了我们期望提供的功能：打印 `Hello, Macro! My name is` 和标注的类型名。

添加依赖

```rust

[dependencies]
hello_macro = { path = "../hello_macro" }
hello_macro_derive = { path = "../hello_macro/hello_macro_derive" }
```

#### 15-5-4、类属性宏

类属性宏与自定义派生宏相似，不同于为 `derive` 属性生成代码，它们允许你创建新的属性。它们也更为灵活；`derive` 只能用于结构体和枚举；属性还可以用于其它的项，比如函数。作为一个使用类属性宏的例子，可以创建一个名为 `route` 的属性用于标注 web 应用程序框架（web application framework）的函数：

```rust
#[route(GET, "/")]
fn index() {
```

`#[route]` 属性将由框架本身定义为一个过程宏。其宏定义的函数签名看起来像这样：

```rust
#[proc_macro_attribute]
pub fn route(attr: TokenStream, item: TokenStream) -> TokenStream {
```

这里有两个 `TokenStream` 类型的参数；第一个用于属性内容本身，也就是 `GET, "/"` 部分。第二个是属性所标记的项：在本例中，是 `fn index() {}` 和剩下的函数体。

除此之外，类属性宏与自定义派生宏工作方式一致：创建 `proc-macro` crate 类型的 crate 并实现希望生成代码的函数！

#### 15-5-6、类函数宏

类函数宏定义看起来像函数调用的宏。类似于 `macro_rules!`，它们比函数更灵活；例如，可以接受未知数量的参数。然而 `macro_rules!` 宏只能使用之前 [“使用 `macro_rules!` 的声明宏用于通用元编程”](https://rustwiki.org/zh-CN/book/ch19-06-macros.html#declarative-macros-with-macro_rules-for-general-metaprogramming) 介绍的类匹配的语法定义。类函数宏获取 `TokenStream` 参数，其定义使用 Rust 代码操纵 `TokenStream`，就像另两种过程宏一样。一个类函数宏例子是可以像这样被调用的 `sql!` 宏：

```rust
let sql = sql!(SELECT * FROM posts WHERE id=1);
```

这个宏会解析其中的 SQL 语句并检查其是否是句法正确的，这是比 `macro_rules!` 可以做到的更为复杂的处理。`sql!` 宏应该被定义为如此：

```rust
#[proc_macro]
pub fn sql(input: TokenStream) -> TokenStream {
```

