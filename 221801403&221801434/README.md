## 作业链接
[博客](https://www.cnblogs.com/hxh76/p/14589350.html)
## 结对学号
[221801403](https://www.cnblogs.com/hxh76/)
[221801434](https://www.cnblogs.com/ye33/) 
## 项目介绍
[一个简单的论文爬取网站](http://120.27.25.50/tp5/public/test/index/see)

1.用户功能

用户填写注册信息，前端将其发送至后端，由后端进行验证，验证通过则返回注册成功；用户填写登陆用户名，前端发送至后端验证，通过则返回
登陆成功并跳转至主页面。用户可在使用过程中任意时刻点击退出。

2.论文管理

用户输入所要搜索的标题，前端发送至后端，后端thinkphp通过模糊搜索语句（%搜索内容%），将所搜索到的数据返回至前端页面，
前端使用bootstrap-Table解析数据并展示。使用table的分页器，同时自带的搜索功能能够对搜索到的论文进行更进一步的搜索。
在表格右端设置查看以及删除按钮，查看能够出现弹窗并展示出改论文的大致信息，并可以点击跳转链接到原文。点击删除可对表格对应
一行数据进行删除，并且信息发送至后端进行数据库删除。论文添加功能，将输入数据发送至后端，由后端在对应表存储数据。

3.统计与分析

一是在搜索页面处设置热词热度排行表，进去页面后向后端接口请求数据，然后展示出，可以直观地看到所有大会热门领域，点击后向后端
发送对应热词，后端返回有关热词论文并展示
二是在统计页面设置动态图，页面设置EVPR，ICCV,ECCV,ALL按钮，点击EVPR，ICCV,ECCV任意一个可出现对应大会不同年份的热门领域
动态对比图，该对比图使用ECHARTS的“经济指标图”，可以随着年份的变化展示出每年对应的热词，形成对比
三是展示出所有大会所有年份的总热词，通过饼状图展示，可以直观看出对应热度，点击相应热词可向后端发送热词数据，后端返回热词的
相关论文

4.收藏夹

在搜索结果页面的论文展示表格设置收藏按钮，点击收藏前端将对应数据发送至后端，由后端将数据存储至数据库。进入收藏夹页面能够展示
出所收藏的所有论文（bootstrap—table），可以进行查看与取消收藏。