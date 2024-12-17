### 1、mySQL基础

mysql -h主机名  -u用户名 -**p**密码

```js
mysql --host=localhost --user=root --password=123456
mysql -hlocalhost -uroot -p123456
mysql -hlocalhost -uroot -p 推荐使用，不会报错，加密输入
```

```html
退出语句
quit
exit
\q
```

你可以通过设置环境变量`USER`来添加一个默认用户名。

| 参数名 |                             含义                             |
| :----: | :----------------------------------------------------------: |
|  `-h`  | 表示启动服务器程序的计算机的域名或者IP地址，如果服务器程序就运行在本机的话，可以省略这个参数，也可以填`localhost`或者`127.0.0.1`。也可以写作 `--host=主机`的形式。 |
|  `-u`  | 表示用户名，我们刚刚安装完，作为超级管理员的我们的用户名是`root`。也可以写作 `--user=用户名`的形式。 |
|   -p   |        表示密码。也可以写作 `--password=密码`的形式。        |

书写注意点

|        注意点        |                             含义                             |
| :------------------: | :----------------------------------------------------------: |
|     命令结束符号     | 在书写完一个命令之后需要以下边这几个符号之一结尾：1、； 2、\g 3、\G      *<br>*；和/g返回结果一致 \G返回结果是行，更适合大量数据查看 |
|   命令可以随意换行   | 按回车键的时候输入的语句里没有`;`、`\g`或者`\G`这些语句结束符号，该语句就算是没结束 |
| 可以一次提交多个命令 |    **SELECT** NOW(); **SELECT** NOW(); **SELECT** NOW();     |
| 使用`\c`放弃本次操作 |                    mysql\> SELECT NOW()\c                    |
|      大小写问题      | `MySQL`默认对命令的大小写并没有限制，也就是说我们这样查询当前时间也是可以的 \*<br>\*命令函数类一般大写，比如数据库名，表名、列名啥的都是要小写的 |
|     字符串的表示     |                          使用''包裹                          |

### 2、数据库基本操作

|      操作      |                             语法                             |
| :------------: | :----------------------------------------------------------: |
| 启动选中数据库 |          mysql -h 主机名 -u 用户名 -p密码 数据库名           |
|   创建数据库   |                CREATE DATABASE 数据库名\*;\*                 |
|   查看数据库   |                      **SHOW** DATABASES                      |
| 切换当前数据库 |                     USE 数据库名称\*;\*                      |
|   删除数据库   | DROP DATABASE 数据库名\*;<br>**DROP** DATABASE IF **EXISTS** 数据库名;\* |

### 3、表的基本操作

|            操作            |                             语法                             |
| :------------------------: | :----------------------------------------------------------: |
|    展示当前数据库中的表    |                       SHOW TABLES\*;\*                       |
|         创建表语法         | CREATE **TABLE** 表名（列名    数据类型    \[列的属性]）COMMENT "注释信息"<br>**CREATE** **TABLE** IF **NOT** **EXISTS** 表名(    各个列的信息 ... ); |
|           删除表           | **DROP** **TABLE** 表1, 表2, ..., 表n;<br>**DROP** **TABLE** IF **EXISTS** 表名; |
|         查看表结构         | **DESCRIBE** 表名;**DESC** 表名;EXPLAIN 表名;**SHOW** COLUMNS **FROM** 表名;**SHOW** FIELDS **FROM** 表名;<br>**SHOW** **CREATE** **TABLE** 表名;不用表格形式<br>查看其它数据库结构 SHOW TABLES FROM 数据库名.表名 |
|          修改表名          | ALTER **TABLE** 旧表名 RENAME **TO** 新表名;<br>RENAME **TABLE** 旧表名1 **TO** 新表名1, 旧表名2 **TO** 新表名2, ... 旧表名n **TO** 新表名n;<br>可以在不同的数据库中迁移RENAME **TABLE** 数据库.表 **TO**  数据库表; |
|           增加列           | **ALTER** **TABLE** 表名 **ADD** **COLUMN** 列名 数据类型 \[列的属性],**ADD** **COLUMN** 列名 数据类型 \[列的属性]; |
|      增加列到特定位置      | **ALTER** **TABLE** 表名 **ADD** **COLUMN** 列名 列的类型 \[列的属性] **FIRST**;<br>**ALTER** **TABLE** 表名 **ADD** **COLUMN** 列名 列的类型 \[列的属性] AFTER 指定列名; |
|           删除列           |      **ALTER** **TABLE** 表名 **DROP** **COLUMN** 列名;      |
|         修改列信息         | ALTER **TABLE** 表名 MODIFY 列名 新数据类型 \[新属性];<br>ALTER **TABLE** 表名 CHANGE 旧列名 新列名 新数据类型 \[新属性];<br>后面增加FIRST或者AFTER语句，可以实现位置的改变 |
| 一条语句中包含多个修改操作 | **ALTER** **TABLE** 表名 操作1, 操作2, ..., 操作n;<br>逗号隔开可以实现多个操作 |

### 4、列

候选键：通过某个列或者某些列确定唯一的一条记录，我们就可以把这个列或者这些列称为`候选键`

主键：选择一个候选键作为表的`主键`，一个表最多只能有一个主键，主键的值不能重复，通过主键可以找到唯一的一条记录。如果我们的表中有定义主键的需求可以选用下边这两种方式之一来指定主键

注：主键是唯一识别，如果有唯一属性可以选择它当主键，如果没有，可以让多个候选键组合成为主键

我们向一个包含唯一性约束的列插入或更新数据时，如果已存在相同的键值，MySQL 会抛出1062错误。

主键列默认是有`NOT NULL`属性

#### UNIQUE 和 PRIMARY KEY 的区别

*   UNIQUE（唯一约束）和 PRIMARY KEY（主键）非常相似，但是 UNIQUE 允许字段中出现一次 NULL 值，而 PRIMARY KEY 不允许出现 NULL 值，因为可以认为：

    PRIMARY KEY = UNIQUE + NOT NULL

*   一张表可以包含多个 UNIQUE 字段，但是只能有一个主键。

*   一个表中最多有一个具有AUTO\_INCREMENT属性的列。

AUTO\_INCREMENT递增

*   具有AUTO\_INCREMENT属性的列必须建立索引。主键和具有`UNIQUE`属性的列会自动建立索引。不过至于什么是索引，在学习MySQL进阶的时候才会介绍。
*   拥有AUTO\_INCREMENT属性的列就不能再通过指定DEFAULT属性来指定默认值。
*   一般拥有AUTO\_INCREMENT属性的列都是作为主键的属性，来自动生成唯一标识一条记录的主键值。

|            操作            |                             语法                             |
| :------------------------: | :----------------------------------------------------------: |
|       简单的查询语句       |                 **SELECT** \* **FROM** 表名;                 |
|        简单插入语句        | INSERT INTO 表名(列1, 列2, ...) VALUES(列1的值，列2的值, ...), (列1的值，列2的值, ...); |
|           默认值           |            添加表或者新建表后面加 DEFAULT 默认值             |
|        NOT NULL属性        |                    列名 列的类型 NOT NULL                    |
|     设置主键（建表时）     | **列名 列的类型 PRIMARY** KEY<br>创建表的时候，可以在最后一行写入PRIMARY KEY(候选键1，候选键2)来对主键进行设置 |
|     设置主键（建表后）     |         ALTER TABLE 表名 ADD PRIMARY KEY （字段名);          |
|     UNIQUE属性(建表时)     | 不是主键，表明该列或者列组合的值是不允许重复的。<br> 字段 类型 **UNIQUE**,<br>UNIQUE KEY \[约束名称] (列名1, 列名2, ...)最后一位 key可以省略 设置多个 |
| UNIQUE属性(建website 表后) | **ALTER** **TABLE** 表名 **MODIFY** 字段名 类型   **NOT** **NULL** **UNIQUE**;<br>  **ALTER** **TABLE** 表明**ADD** CONSTRAINT 约束的名字**UNIQUE**(alexa, url); |
|          设置外键          | CONSTRAINT \[外键名称] FOREIGN KEY(列1, 列2, ...) REFERENCES 父表名(父列1, 父列2, ...); |
|    AUTO\_INCREMENT属性     |                列名 列的类型 AUTO\_INCREMENT                 |
|          列的注释          |      建表语句的末尾可以添加`COMMENT`语句来给表添加注释       |
|           补充0            |        给该列加一个`ZEROFILL`属性，长度不足部分会补0         |

### 5、简单查询

|          操作          |                             语法                             |
| :--------------------: | :----------------------------------------------------------: |
|       查询单个列       |                **SELECT** 列名 **FROM** 表名;                |
| 列的别名（仅当次查询） |      **SELECT** 列名 \[**AS**] 列的别名 **FROM** 表名;       |
|       查询多个列       |      **SELECT** 列名1, 列名2, ... 列名n **FROM** 表名;       |
|       查询所有列       |                 **SELECT** \* **FROM** 表名;                 |
|   去除单列的重复结果   |         **SELECT** **DISTINCT** 列名 **FROM** 表名;          |
|   去除多列的重复结果   | **SELECT** **DISTINCT** 列名1, 列名2, ... 列名n  **FROM** 表名; |

### 6、带搜索条件的查询

##### 比较操作符

| 操作符        | 示例                    | 描述               |
| ------------- | ----------------------- | ------------------ |
| `=`           | `a = b`                 | a等于b             |
| `<>`或者`!=`  | `a <> b`                | a不等于b           |
| `<`           | `a < b`                 | a小于b             |
| `<=`          | `a <= b`                | a小于或等于b       |
| `>`           | `a > b`                 | a大于b             |
| `>=`          | `a >= b`                | a大于或等于b       |
| `BETWEEN`     | `a BETWEEN b AND c`     | 满足 b <= a <= c   |
| `NOT BETWEEN` | `a NOT BETWEEN b AND c` | 不满足 b <= a <= c |

##### SQL WHERE 语法

     SELECT column_name,column_name
     FROM table_name
     WHERE column_name operator value;

##### `IN`操作符

| 操作符   | 示例                     | 描述                          |
| -------- | ------------------------ | ----------------------------- |
| `IN`     | `a IN (b1, b2, ...)`     | a是b1, b2, ... 中的某一个     |
| `NOT IN` | `a NOT IN (b1, b2, ...)` | a不是b1, b2, ... 中的任意一个 |

##### 匹配`NULL`值

不能直接使用普通的操作符来与`NULL`值进行比较，必须使用`IS NULL`或者`IS NOT NULL`

| 操作符        | 示例            | 描述            |
| ------------- | --------------- | --------------- |
| `IS NULL`     | `a IS NULL`     | a的值是`NULL`   |
| `IS NOT NULL` | `a IS NOT NULL` | a的值不是`NULL` |

##### AND操作符

在给定多个搜索条件的时候，我们有时需要某条记录只在符合所有搜索条件的时候才将其加入结果集，这种情况我们可以使用`AND`操作符来连接多个搜索条件。

##### OR操作符

在给定多个搜索条件的时候，我们有时需要某条记录在符合某一个搜索条件的时候就将其加入结果集中，这种情况我们可以使用`OR`操作符来连接多个搜索条件。

多个操作符进行联合查询时，遵循操作符权重规范

##### 通配符

| 操作符     | 示例           | 描述     |
| ---------- | -------------- | -------- |
| `LIKE`     | `a LIKE b`     | a匹配b   |
| `NOT LIKE` | `a NOT LIKE b` | a不匹配b |

通配符模板

1.  `%`：代表任意一个字符串 复。
2.  `_`：代表任意一个字符 单。

转义

*   `'\%'`代表普通字符`'%'`
*   `'\_'`代表普通字符`'_'` 比方说这样：

### 7 表达式

`MySQL`中`操作数`可以是下边这几种类型：

1.  常数

    常数很好理解，我们平时用到的数字、字符串、时间值什么的都可以被称为常数，它是一个确定的值，比如数字`1`，字符串`'abc'`，时间值`2019-08-16 17:10:43`啥的。

2.  列名

    针对某个具体的表，它的列名可以被当作表达式的一部分，比如对于`student_info`表来说，`number`、`name`都可以作为`操作数`。

3.  函数调用

    `MySQL`中有`函数`的概念，比方说获取当前时间的函数`NOW`，而在函数后边加个小括号就算是一个`函数调用`，比如`NOW()`。

4.  标量子查询或者行子查询

5.  其他表达式

    一个表达式也可以作为一个操作数与另一个操作数来形成一个更复杂的表达式，比方说（假设`col`是一个列名）：

    *   (col - 5) / 3
    *   (1 + 1) \* 2 + col \* 3

##### 算术操作符

| 操作符 | 示例      | 描述                 |
| ------ | --------- | -------------------- |
| `+`    | `a + b`   | 加法                 |
| `-`    | `a - b`   | 减法                 |
| `*`    | `a * b`   | 乘法                 |
| `/`    | `a / b`   | 除法                 |
| `DIV`  | `a DIV b` | 除法，取商的整数部分 |
| `%`    | `a % b`   | 取余                 |
| `-`    | `-a`      | 负号                 |

##### 比较操作符

| 操作符        | 示例                     | 描述                          |
| ------------- | ------------------------ | ----------------------------- |
| `=`           | `a = b`                  | a等于b                        |
| `<>`或者`!=`  | `a <> b`                 | a不等于b                      |
| `<`           | `a < b`                  | a小于b                        |
| `<=`          | `a <= b`                 | a小于或等于b                  |
| `>`           | `a > b`                  | a大于b                        |
| `>=`          | `a >= b`                 | a大于或等于b                  |
| `BETWEEN`     | `a BETWEEN b AND c`      | 满足 b <= a <= c              |
| `NOT BETWEEN` | `a NOT BETWEEN b AND c`  | 不满足 b <= a <= c            |
| `IN`          | `a IN (b1, b2, ...)`     | a是b1, b2, ... 中的某一个     |
| `NOT IN`      | `a NOT IN (b1, b2, ...)` | a不是b1, b2, ... 中的任意一个 |
| `IS NULL`     | `a IS NULL`              | a的值是`NULL`                 |
| `IS NOT NULL` | `a IS NOT NULL`          | a的值不是`NULL`               |
| `LIKE`        | `a LIKE b`               | a匹配b                        |
| `NOT LIKE`    | `a NOT LIKE b`           | a不匹配b                      |

##### 逻辑操作符

逻辑操作符是用来将多个`布尔表达式`连接起来，我们需要了解这几个`逻辑操作符`：

| 操作符 | 示例      | 描述                                 |
| ------ | --------- | ------------------------------------ |
| `AND`  | `a AND b` | 只有a和b同时为真，表达式才为真       |
| `OR`   | `a OR b`  | 只要a或b有任意一个为真，表达式就为真 |
| `XOR`  | `a XOR b` | a和b有且只有一个为真，表达式为真     |

### 8函数

##### 文本处理函数

| 名称        | 调用示例                      | 示例结果    | 描述                                   |
| ----------- | ----------------------------- | ----------- | -------------------------------------- |
| `LEFT`      | `LEFT('abc123', 3)`           | `abc`       | 给定字符串从左边取指定长度的子串       |
| `RIGHT`     | `RIGHT('abc123', 3)`          | `123`       | 给定字符串从右边取指定长度的子串       |
| `LENGTH`    | `LENGTH('abc')`               | `3`         | 给定字符串的长度                       |
| `LOWER`     | `LOWER('ABC')`                | `abc`       | 给定字符串的小写格式                   |
| `UPPER`     | `UPPER('abc')`                | `ABC`       | 给定字符串的大写格式                   |
| `LTRIM`     | `LTRIM(' abc')`               | `abc`       | 给定字符串左边空格去除后的格式         |
| `RTRIM`     | `RTRIM('abc ')`               | `abc`       | 给定字符串右边空格去除后的格式         |
| `SUBSTRING` | `SUBSTRING('abc123', 2, 3)`   | `bc1`       | 给定字符串从指定位置截取指定长度的子串 |
| `CONCAT`    | `CONCAT('abc', '123', 'xyz')` | `abc123xyz` | 将给定的各个字符串拼接成一个新字符串   |

##### 日期和时间处理函数

| 名称          | 调用示例                                          | 示例结果              | 描述                                                         |
| ------------- | ------------------------------------------------- | --------------------- | ------------------------------------------------------------ |
| `NOW`         | `NOW()`                                           | `2019-08-16 17:10:43` | 返回当前日期和时间                                           |
| `CURDATE`     | `CURDATE()`                                       | `2019-08-16`          | 返回当前日期                                                 |
| `CURTIME`     | `CURTIME()`                                       | `17:10:43`            | 返回当前时间                                                 |
| `DATE`        | `DATE('2019-08-16 17:10:43')`                     | `2019-08-16`          | 将给定日期和时间值的日期提取出来                             |
| `DATE_ADD`    | `DATE_ADD('2019-08-16 17:10:43', INTERVAL 2 DAY)` | `2019-08-18 17:10:43` | 将给定的日期和时间值添加指定的时间间隔                       |
| `DATE_SUB`    | `DATE_SUB('2019-08-16 17:10:43', INTERVAL 2 DAY)` | `2019-08-14 17:10:43` | 将给定的日期和时间值减去指定的时间间隔                       |
| `DATEDIFF`    | `DATEDIFF('2019-08-16', '2019-08-17');`           | `-1`                  | 返回两个日期之间的天数（负数代表前一个参数代表的日期比较小） |
| `DATE_FORMAT` | `DATE_FORMAT(NOW(),'%m-%d-%Y')`                   | `08-16-2019`          | 用给定的格式显示日期和时间                                   |

##### 时间单位：

| 时间单位      | 描述 |
| ------------- | ---- |
| `MICROSECOND` | 毫秒 |
| `SECOND`      | 秒   |
| `MINUTE`      | 分钟 |
| `HOUR`        | 小时 |
| `DAY`         | 天   |
| `WEEK`        | 星期 |
| `MONTH`       | 月   |
| `QUARTER`     | 季度 |
| `YEAR`        | 年   |

##### DATE\_FORMAT**格式符**

| 格式符 | 描述                                                    |
| ------ | ------------------------------------------------------- |
| `%b`   | 简写的月份名称（Jan、Feb、...、Dec)                     |
| `%D`   | 带有英文后缀的月份中的日期（0th、1st、2nd、...、31st)） |
| `%d`   | 数字格式的月份中的日期(00、01、02、...、31)             |
| `%f`   | 微秒（000000-999999）                                   |
| `%H`   | 二十四小时制的小时 (00-23)                              |
| `%h`   | 十二小时制的小时 (01-12)                                |
| `%i`   | 数值格式的分钟(00-59)                                   |
| `%M`   | 月份名（January、February、...、December）              |
| `%m`   | 数值形式的月份(00-12)                                   |
| `%p`   | 上午或下午（AM代表上午、PM代表下午）                    |
| `%S`   | 秒(00-59)                                               |
| `%s`   | 秒(00-59)                                               |
| `%W`   | 星期名（Sunday、Monday、...、Saturday）                 |
| `%w`   | 周内第几天 （0=星期日、1=星期一、 6=星期六）            |
| `%Y`   | 4位数字形式的年（例如2019）                             |
| `%y`   | 2位数字形式的年（例如19）                               |

### 数值处理函数

| 名称   | 调用示例      | 示例结果             | 描述               |
| ------ | ------------- | -------------------- | ------------------ |
| `ABS`  | `ABS(-1)`     | `1`                  | 取绝对值           |
| `Pi`   | `PI()`        | `3.141593`           | 返回圆周率         |
| `COS`  | `COS(PI())`   | `-1`                 | 返回一个角度的余弦 |
| `EXP`  | `EXP(1)`      | `2.718281828459045`  | 返回e的指定次方    |
| `MOD`  | `MOD(5,2)`    | `1`                  | 返回除法的余数     |
| `RAND` | `RAND()`      | `0.7537623539136372` | 返回一个随机数     |
| `SIN`  | `SIN(PI()/2)` | `1`                  | 返回一个角度的正弦 |
| `SQRT` | `SQRT(9)`     | `3`                  | 返回一个数的平方根 |
| `TAN`  | `TAN(0)`      | `0`                  | 返回一个角度的正切 |

##### 聚集函数

| 函数名  | 描述             |
| ------- | ---------------- |
| `COUNT` | 返回某列的行数   |
| `MAX`   | 返回某列的最大值 |
| `MIN`   | 返回某列的最小值 |
| `SUM`   | 返回某列值之和   |
| `AVG`   | 返回某列的平均值 |

`COUNT`函数使用来统计行数的，它有下边两种使用方式：

1.  `COUNT(*)`：对表中行的数目进行计数，不管列的值是不是`NULL`。
2.  `COUNT(列名)`：对特定的列进行计数，会忽略掉该列为`NULL`的行。

##### 支持隐式类型转换

### 9、查询

`GROUP BY`分组字句

```sq
mysql> SELECT subject, AVG(score) FROM student_score GROUP BY subject;
```

`HAVING`条件子句

语句中可以书写条件表达式

`ORDER BY 条件 排序方式	 `

### 10、使用分组注意事项

使用分组来统计数据给我们带来了非常大的便利，但是要随时提防有坑的地方：

1.  如果分组列中含有`NULL`值，那么`NULL`也会作为一个独立的分组存在。

2.  如果存在多个分组列，也就是`嵌套分组`，聚集函数将作用在最后的那个分组列上。

3.  如果查询语句中存在`WHERE`子句和`ORDER BY`子句，那么`GROUP BY`子句必须出现在`WHERE`子句之后，`ORDER BY`子句之前。

4.  `非分组列`不能单独出现在检索列表中(可以被放到聚集函数中)。

5.  `GROUP BY`子句后也可以跟随`表达式`(但不能是聚集函数)。

    上边介绍的`GROUP BY`后跟随的都是表中的某个列或者某些列，其实一个表达式也可以，比如这样：

    ```sql
    sql复制代码mysql> SELECT concat('专业：', major), COUNT(*) FROM student_info GROUP BY concat('专业：', major);
    +-----------------------------------+----------+
    | concat('专业：', major)           | COUNT(*) |
    +-----------------------------------+----------+
    | 专业：电子信息                    |        1 |
    | 专业：计算机科学与工程            |        2 |
    | 专业：软件工程                    |        2 |
    | 专业：飞行器设计                  |        1 |
    +-----------------------------------+----------+
    4 rows in set (0.00 sec)

    mysql>
    ```

    `MySQL`会根据这个表达式的值来对记录进行分组，使用表达式进行分组的时候需要特别注意，查询列表中的表达式和`GROUP BY`子句中的表达式必须完全一样。不过一般情况下我们也不会用表达式进行分组，所以目前基本没啥用～

6.  `WHERE`子句和`HAVING`子句的区别。

    `WHERE`子句在分组前进行过滤，作用于每一条记录，`WHERE`子句过滤掉的记录将不包括在分组中。而`HAVING`子句在数据分组后进行过滤，作用于整个分组。

子句的顺序

1.  **SELECT** \[**DISTINCT**] 查询列表
2.  \[**FROM** 表名]
3.  \[**WHERE** 布尔表达式]
4.  \[**GROUP** **BY** 分组列表 ]
5.  \[HAVING 分组过滤条件]
6.  \[**ORDER** **BY** 排序列表]
7.  \[LIMIT 开始行, 限制条数]

### 11、子查询

|             个数             |                           查询语句                           |
| :--------------------------: | :----------------------------------------------------------: |
| `标量子查询`单纯的代表一个值 | **SELECT** \* **FROM** 表 **WHERE** 列\> (**SELECT** 列**FROM** 表2 **WHERE** 列=值);查询的单个值使用括号括起来 |
|           列子查询           | **SELECT** \* **FROM** 表 **WHERE** 列**IN** (**SELECT** number **FROM** 表2 WHERE\*\*  查询的多个值); |
|           行子查询           |                多个列返回一个值 使用limit限制                |
|           表子查询           |                           多行多列                           |
|         检测是否存在         |                    EXISTS and NOT EXISTS                     |
|          相关子查询          |                         值引用多个表                         |
|      对同一个表的子查询      |          聚集函数（avg,min,max）不能放到WHERE子句中          |

### 12、链接查询

同时查询会链接两张表，生成笛卡尔积  num\*num 的表，我们可以使用where限制范围，来减少查询结果，优化性能

`ON子句` WHERE子句和ON子句是等价的。`ON`子句是专门为外连接驱动表中的记录在被驱动表找不到匹配记录时应不应该把该记录加入结果集这个场景下提出的

**SELECT** \* **FROM** t1 **LEFT** \[**OUTER**] **JOIN** t2 **ON** 连接条件 \[**WHERE** 普通过滤条件];

内连接

*   SELECT \* FROM t1 JOIN t2;
*   SELECT \* FROM t1 INNER JOIN t2;
*   SELECT \* FROM t1 CROSS JOIN t2;
*   内连接中 WHERE 和 ON 等价

外连接

**SELECT** \* **FROM** t1 **LEFT** \[**OUTER**] **JOIN** t2 **ON** 连接条件 \[**WHERE** 普通过滤条件];

**SELECT** \* **FROM** t1 **RIGHT** \[**OUTER**] **JOIN** t2 **ON** 连接条件 \[**WHERE** 普通过滤条件];

```js
for each row in t1 {

    for each row in t2 which satisfies t1.m1 = t2.m2 {
        
        for each row in t3 which satisfies t1.m1 = t3.m3 {
            send to client;
        }
    }
}
查询过程 
```

自连接

可以使用AS别名 将一张表变为两张 再进行链接

| 关键字                                                       |                                                              |
| ------------------------------------------------------------ | ------------------------------------------------------------ |
| SELECT *column\_name(s)*<br/> FROM *table1*<br/>`INNER JOIN`*table2*<br/> ON *table1.column\_name*=*table2.column\_name*; | ![5615cbfc703fa.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1ac8fb03acc4c4aaa8c4b3a674d2983~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=200\&h=145\&s=6871\&e=gif\&b=85b859) |
| SELECT *column\_name(s)*<br/> FROM *table1*<br/> LEFT JOIN *table2*<br/> ON *table1.column\_name*=*table2.column\_name*; | ![5615cc03dc434.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/95fa3adde3c64073bae208a929850d59~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=200&h=145&s=7286&e=gif&b=85b859) |
| SELECT *column\_name(s)*<br/> FROM *table1*<br/> RIGHT JOIN *table2*<br/> ON *table1.column\_name*=*table2.column\_name*; | ![5615cc0991a29.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eff46028bc69482bbf6ac5a44584a61e~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=200&h=145&s=7477&e=gif&b=85b859) |
| SELECT *column\_name(s)*<br/> FROM *table1*<br/> FULL OUTER JOIN *table2*<br/> ON *table1.column\_name*=*table2.column\_name*; | ![5615cc0fd9031.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6826e2bc103f485ea9982ca724625012~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=200&h=145&s=8135&e=gif&b=85b859) |




### 13、UNION联合查询

因为使用`UNION`来合并多个查询的记录会默认过滤掉重复的记录

如果我们想要保留重复记录，可以使用`UNION ALL`来连接多个查询

末尾加上`ORDER BY`和`LIMIT`子句

### 14、数据

**ALTER** **TABLE** first\_table MODIFY **COLUMN** first\_column **INT** **UNIQUE**; 添加唯一约束

进行约束后 不覆盖原来的值 INSERT IGNORE INTO

进行约束后 覆盖原来的值 INSERT VALUE(作为后续修改值读取的VALUE) ON DUPLICATE KEY UPDATE 修改值

删除数据

```sql
DELETE FROM 表名 [WHERE 表达式];
```

更新数据

```sql
UPDATE 表名 SET 列1=值1, 列2=值2, ...,  列n=值n [WHERE 布尔表达式];
```

`LIMIT`子句来限制想要更新的记录数量，使用`ORDER BY`子句来指定符合条件的记录的更新顺序

### 15、视图

`视图`也可以被称为`虚拟表`，因为我们可以对`视图`进行一些类似表的增删改查操作，只不过我们对视图的相关操作都会被映射到那个又臭又长的查询语句对应的底层的表上。那一串又臭又长的查询语句的查询列表可以被当作`视图`的虚拟列

| 视图                                     | 语句                                                         |
| ---------------------------------------- | ------------------------------------------------------------ |
| 创建视图                                 | **CREATE** **VIEW** 视图名（自定义列名） **AS** 查询语句     |
| 查看视图的定义                           | **SHOW** **CREATE** **VIEW** 视图名;                         |
| 可更新的视图（由原数据进行计算不能更新） | UPDATE *table\_name*<br/> SET *column1*=*value1*,*column2*=*value2*,...<br/> WHERE *some\_column*=*some\_value*; |
| 删除视图                                 | **DROP** **VIEW** 视图名                                     |

### 16、自定义变量和语句结束

`SET`语句来自定义一些我们自己的变量，自定义变量前边必须加一个`@`符号

后面接sql语句时记得添加();

可以使用 INTO 在查询结束时赋值

`delimiter ` \$ 修改返回符号为; 默认结束为; 我们进行多行操作时可以进行修改 修改为其他符号，确保不冲突

### 17、函数

```sql
1418 - This function has none of DETERMINISTIC, NO SQL, or READS SQL DATA in its declaration and binary logging is enabled (you *might* want to use the less safe log_bin_trust_function_creators variable)
```

解决报错set global log\_bin\_trust\_function\_creators=TRUE;

set global log\_bin\_trust\_function\_creators=1;

```sql
CREATE FUNCTION 存储函数名称([参数列表])
RETURNS 返回值类型
BEGIN
    函数体内容
END
```

**SHOW** **CREATE** **FUNCTION** 函数名 查看某个函数的具体是怎么定义

**DROP** **FUNCTION** 函数名 删除某个存储函数

`SET`语句来自定义变量的方式，可以不用声明就为变量赋值。而在存储函数的函数体中使用变量前必须先声明这个变量

DECLARE 变量名1, 变量名2, ... 数据类型 **\[DEFAULT 默认值]***;*

DECLARE后 再使用set 设置值

##### 判断语句的编写

```sql
IF 表达式 THEN
    处理语句列表
[ELSEIF 表达式 THEN
    处理语句列表]
... # 这里可以有多个ELSEIF语句
[ELSE
    处理语句列表]
END IF;
```

##### 循环语句的编写

```sql
WHILE 表达式 DO
    处理语句列表
END WHILE;
```

```sql
REPEAT
    处理语句列表
UNTIL 表达式 END REPEAT;
```

```sql
LOOP
    处理语句列表
END LOOP;
循环终止的条件写到处理语句列表中然后使用RETURN语句直接让函数结束就可以达到停止循环的效果
可以使用LEAVE语句。不过使用LEAVE时需要在LOOP语句前边放置一个所谓的标记
  flag:LOOP
        IF i > n THEN
            LEAVE flag;
        END IF;
        SET result = result + i;
        SET i = i + 1;
    END LOOP flag;
    没分号跑不了
```

`存储函数`和`存储过程`都属于`存储例程`，都是对某些语句的一个封装。`存储函数`侧重于执行这些语句并返回一个值，而`存储过程`更侧重于单纯的去执行这些语句。先看一下`存储过程`的定义

### 18、过程

`存储函数`和`存储过程`都属于`存储例程`，都是对某些语句的一个封装。`存储函数`侧重于执行这些语句并返回一个值，而`存储过程`更侧重于单纯的去执行这些语句。

```sql
CREATE PROCEDURE 存储过程名称([参数列表])
BEGIN
    需要执行的语句
END
```

与`存储函数`最直观的不同点就是，`存储过程`的定义不需要声明`返回值类型`

存储过程的调用

```sql
CALL 存储过程([参数列表]);
IN arg INT
OUT arg INT
INOUT arg INT

SHOW PROCEDURE STATUS [LIKE 需要匹配的存储过程名称] 
SHOW CREATE PROCEDURE 存储过程名称
DROP PROCEDURE 存储过程名称
```

| 前缀    | 实际参数是否必须是变量 | 描述                                                         |
| ------- | ---------------------- | ------------------------------------------------------------ |
| `IN`    | 否                     | 用于调用者向存储过程传递数据，如果IN参数在过程中被修改，调用者不可见。(局部变量)默认就是`IN`参数 |
| `OUT`   | 是                     | 用于把存储过程运行过程中产生的数据赋值给OUT参数，存储过程执行结束后，调用者可以访问到OUT参数。 |
| `INOUT` | 是                     | 综合`IN`和`OUT`的特点，既可以用于调用者向存储过程传递数据，也可以用于存放存储过程中产生的数据以供调用者使用。 |

`存储过程`和`存储函数`非常类似，我们列举几个它们的不同点以加深大家的对这两者区别的印象：

*   存储函数在定义时需要显式用`RETURNS`语句标明返回的数据类型，而且在函数体中必须使用`RETURN`语句来显式指定返回的值，存储过程不需要。
*   存储函数只支持`IN`参数，而存储过程支持`IN`参数、`OUT`参数、和`INOUT`参数。
*   存储函数只能返回一个值，而存储过程可以通过设置多个`OUT`参数或者`INOUT`参数来返回多个结果。
*   存储函数执行过程中产生的结果集并不会被显示到客户端，而存储过程执行过程中产生的结果集会被显示到客户端。
*   存储函数直接在表达式中调用，而存储过程只能通过`CALL`语句来显式调用。

### 19、游标

#### 创建游标

```sql
DECLARE 游标名称 CURSOR FOR 查询语句;
```

#### 使用游标获取记录

```sql
FETCH 游标名 INTO 变量1, 变量2, ... 变量n
```

fetch获取不到时触发的时间

**DECLARE** **CONTINUE** HANDLER **FOR** NOT FOUND 处理语句;

**DECLARE** CONTINUE HANDLER **FOR** **NOT** FOUND **SET** not\_done = 0;

每调用一次 FETCH 语句，游标就移动到下一条记录的位置

### 20、触发器和事件

触发器

```SQL
CREATE TRIGGER 触发器名
{BEFORE|AFTER}
{INSERT|DELETE|UPDATE}
ON 表名
FOR EACH ROW
BEGIN
    触发器内容
END
```

**SHOW** **CREATE** **TRIGGER** 触发器名;

**DROP** **TRIGGER** 触发器名;

触发器内容中不能有输出结果集的语句。

触发器内容中NEW代表记录的列的值可以被更改，OLD代表记录的列的值无法更改。

在BEFORE触发器中，我们可以使用`SET NEW.列名 = 某个值`的形式来更改待插入记录或者待更新记录的某个列的值，但是这种操作不能在AFTER触发器中使用，因为在执行AFTER触发器的内容时记录已经被插入完成或者更新完成了。

如果我们的`BEFORE`触发器内容执行过程中遇到了错误，那这个触发器对应的具体语句将无法执行；如果具体的操作语句执行过程中遇到了错误，那与它对应的`AFTER`触发器的内容将无法执行。

#### 事件

有时候我们想让`MySQL`服务器在某个时间点或者每隔一段时间自动地执行一些语句，这时候就需要去创建一个`事件`。

```SQL
CREATE EVENT 事件名
ON SCHEDULE
{
    AT 某个确定的时间点 AT DATE_ADD(NOW(), INTERVAL 2 DAY)表达式| 
    EVERY 期望的时间间隔 [STARTS datetime][END datetime]
}
DO
BEGIN
    具体的语句
END
```

##### 查看和删除事件

```SQL
SHOW EVENTS;
SHOW CREATE EVENT 事件名;
DROP EVENT 事件名;
默认情况下，MySQL服务器并不会帮助我们执行事件，除非我们使用下边的语句手动开启
SET GLOBAL event_scheduler = ON;
```
### 21、索引

**CREATE INDEX** 的语法：

```
CREATE INDEX index_name
ON table_name (column1 [ASC|DESC], column2 [ASC|DESC], ...);
```

-   `CREATE INDEX`: 用于创建普通索引的关键字。
-   `index_name`: 指定要创建的索引的名称。索引名称在表中必须是唯一的。
-   `table_name`: 指定要在哪个表上创建索引。
-   `(column1, column2, ...)`: 指定要索引的表列名。你可以指定一个或多个列作为索引的组合。这些列的数据类型通常是数值、文本或日期。
-   `ASC`和`DESC`（可选）: 用于指定索引的排序顺序。默认情况下，索引以升序（ASC）排序。

##### 修改表结构(添加索引)

```
ALTER TABLE table_name
ADD INDEX index_name (column1 [ASC|DESC], column2 [ASC|DESC], ...);
```

-   `ALTER TABLE`: 用于修改表结构的关键字。
-   `table_name`: 指定要修改的表的名称。
-   `ADD INDEX`: 添加索引的子句。`ADD INDEX`用于创建普通索引。
-   `index_name`: 指定要创建的索引的名称。索引名称在表中必须是唯一的。
-   `(column1, column2, ...)`: 指定要索引的表列名。你可以指定一个或多个列作为索引的组合。这些列的数据类型通常是数值、文本或日期。
-   `ASC`和`DESC`（可选）: 用于指定索引的排序顺序。默认情况下，索引以升序（ASC）排序。

##### 创建表的时候直接指定

```
CREATE TABLE table_name (
  column1 data_type,
  column2 data_type,
  ...,
  INDEX index_name (column1 [ASC|DESC], column2 [ASC|DESC], ...)
);
```

##### 删除索引的语法

```
DROP INDEX index_name ON table_name;
ALTER TABLE employees
DROP INDEX idx_age;
```

##### 使用ALTER 命令添加和删除索引

-   ALTER TABLE tbl_name ADD PRIMARY KEY (column_list):

    该语句添加一个主键，这意味着索引值必须是唯一的，且不能为NULL。

-   **ALTER TABLE tbl_name ADD UNIQUE index_name (column_list):** 这条语句创建索引的值必须是唯一的（除了NULL外，NULL可能会出现多次）。

-   **ALTER TABLE tbl_name ADD INDEX index_name (column_list):** 添加普通索引，索引值可出现多次。

-   **ALTER TABLE tbl_name ADD FULLTEXT index_name (column_list):** 该语句指定了索引为 FULLTEXT ，用于全文索引。

```
mysql> ALTER TABLE testalter_tbl MODIFY i INT NOT NULL;
mysql> ALTER TABLE testalter_tbl ADD PRIMARY KEY (i);
mysql> ALTER TABLE testalter_tbl DROP PRIMARY KEY;
```

##### 显示索引信息

```
mysql> SHOW INDEX FROM table_name\G
①Table：当前索引属于那张表。
②Non_unique：目前索引是否属于唯一索引，0代表是的，1代表不是。
③Key_name：当前索引的名字。
④Seq_in_index：如果当前是联合索引，目前字段在联合索引中排第几个。
⑤Column_name：当前索引是位于哪个字段上建立的。
⑥Collation：字段值以什么方式存储在索引中，A表示有序存储，NULL表无序。
⑦Cardinality：当前索引的散列程度，也就是索引中存储了多少个不同的值。
⑧Sub_part：当前索引使用了字段值的多少个字符建立，NULL表示全部。
⑨Packed：表示索引在存储字段值时，以什么方式压缩，NULL表示未压缩，
⑩Null：当前作为索引字段的值中，是否存在NULL值，YES表示存在。
⑪Index_type：当前索引的结构（BTREE, FULLTEXT, HASH, RTREE）。
⑫Comment：创建索引时，是否对索引有备注信息。

```

唯一索引在创建时，需要通过`UNIQUE`关键字创建

唯一索引数据不能重复

主键索引其实是一种特殊的唯一索引，但主键索引却并不是通过`UNIQUE`关键字创建的，而是通过`PRIMARY`关键字创建

```
ALTER TABLE tableName ADD PRIMARY KEY indexName(columnName);

-- 方式②
CREATE TABLE tableName(  
  columnName1 INT(8) NOT NULL,   
  columnName2 ....,
  .....,
  PRIMARY KEY [indexName] (columnName(length))  
);

```

全文索引

```
-- 方式①
ALTER TABLE tableName ADD FULLTEXT INDEX indexName(columnName);

-- 方式②
CREATE FULLTEXT INDEX indexName ON tableName(columnName);
用来查询最小搜索长度和最大搜索长度
show variables like '%ft%';
ft_min_word_len：使用MyISAM引擎的表中，全文索引最小搜索长度。
ft_max_word_len：使用MyISAM引擎的表中，全文索引最大搜索长度。
ft_query_expansion_limit：MyISAM中使用with query expansion搜索的最大匹配数。
innodb_ft_min_token_size：InnoDB引擎的表中，全文索引最小搜索长度。
innodb_ft_max_token_size：InnoDB引擎的表中，全文索引最大搜索长度。
```

-   `5.6`版本的`MySQL`中，存储引擎必须为`MyISAM`才能创建。
-   创建全文索引的字段，其类型必须要为`CHAR、VARCHAR、TEXT`等文本类型。
-   如果想要创建出的全文索引支持中文，需要在最后指定解析器：`with parser ngram`。