# BTSOW资源
### 一、设计功能实现
1. BTSOW搜索功能(爬虫)，列表（防止广告，提高下载效率）
2. 爬取电影榜单，自动检索并，批量生成磁链
3. 存储用户选定磁链，批量下载
4. 与百度云绑定，离线下载到百度云，通过群晖同步到本地NAS
5. 设置导入下载列表，下载过滤器，状态监控

### 二、项目进度
- BTSOW 搜索功能  - ✔
    - 搜索请求，列表显示获取 ✔
    - 主界面右键栏目可以直接复制磁链✔
    - 获取BTSOW文件列表并显示✔
    - 保存搜索历史✔
        - 完成搜索历史展示✔
        - 搜索历史可清除✔
        - 搜索历史可以选择是否显示✔
        - 搜索历史改成cookie保存方式,默认保存7天✔
    - 完善UI布局界面✔
- 导入百度云盘
    - 云盘登录
    - 
---
### 三、开发
> 技术路线：Electron + Vue + Element + Nodejs

#### 构建方法

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---