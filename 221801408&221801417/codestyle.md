1、源文件
（1）、纯PHP代码源文件只使用 <?php 标签，省略关闭标签 ?> ；

（2）、源文件中PHP代码的编码格式必须是无BOM的UTF-8格式；

（3）、使用 Unix LF(换行符)作为行结束符；

（4）、一个源文件只做一种类型的声明，即，这个文件专门用来声明Class, 那个文件专门用来设置配置信息，别混在一起写；
2、缩进
使用Tab键来缩进，每个Tab键长度设置为4个空格；
3、行
一行推荐的是最多写120个字符，多于这个字符就应该换行了，一般的编辑器是可以设置的。
4、关键字 和 True/False/Null
PHP的关键字，必须小写，boolean值：true，false，null 也必须小写。
5、命名
（1）、类名 使用大驼峰式（StudlyCaps）写法；

（2）、（类的）方法名 使用小驼峰（cameCase）写法；

（3）、函数名使用 小写字母 + 下划线 写法，如 function http_send_post()； 

（4）、变量名 使用小驼峰写法，如 $userName；

6、代码注释标签
如 函数注释、变量注释等，常用标签有 @package、@var、@param、@return、@author、@todo、@throws

必须遵守 phpDocument 标签规则，不要另外去创造新的标签
7、注释
（1）、行注释

// 后面需要加一个空格；

如果 // 前面有非空字符，则 // 前面需要加一个空格；

（2）、函数注释

参数名、属性名、标签的文本 上下要对齐；
8、空格
（1）、赋值操作符（=，+= 等）、逻辑操作符（&&，||）、等号操作符（==，!=）、关系运算符（<，>，<=，>=）、按位操作符（&，|，^）、连接符（.） 左右各有一个空格；

（2）、if，else，elseif，while，do，switch，for，foreach，try，catch，finally 等 与 紧挨的左括号“(”之间有一个空格；

（3）、函数、方法的各个参数之间，逗号（","）后面有一个空格；

9、空行
（1）、所有左花括号 { 都不换行，并且 ｛ 紧挨着的下方，一定不是空行；

（2）、同级代码（缩进相同）的 注释（行注释/块注释）前面，必须有一个空行；

（3）、各个方法/函数 之间有一个空行；

（4）、namespace语句、use语句、clase语句 之间有一个空行；

（5）、return语句

如果 return 语句之前只有一行PHP代码，return 语句之前不需要空行；

如果 return 语句之前有至少二行PHP代码，return 语句之前加一个空行；

（5）、if，while，switch，for，foreach、try 等代码块之间 以及 与其他代码之间有一个空行；

在第一个标签前加一个空行；