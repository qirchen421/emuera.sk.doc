# 使用VSCode进行git操作

本页面总结了Discord某个服务器的发言

- [Discord - eraEVENT_KXX](https://discord.gg/cuSh6y5j93)  

在[ERB制作实践篇](erawiki-ERBmanual.md)中说明了使用VSCode进行git操作的方法
会涉及到一些git术语，可以将其理解为以下内容：
- 仓库→项目
- 拉取→下载
- 推送→上传

## 什么是git
git是稍微懂点程序的人都知道的版本管理系统。它能自动合并各自环境下编辑的代码，告知冲突，保持始终是最新版状态，对于多人开发来说是必需的。  
即使是个人开发，也可以在本地创建差异历史记录，方便查找问题点和回滚，非常实用。  

使用git需要注册到GitHub等git服务并上传源代码。同时自己的PC也需要访问git的应用程序。  
VSCode内置了git功能，因此不需要其他应用程序。而Sakura Editor等没有内置，需要另行安装GitBash或SourceTree等git管理应用。本次不介绍这些应用的使用方法。  

git是一种项目，当然需要管理员。大多数情况下管理员(Admin)＝变体作者，补丁作者或口上作者是贡献者(Contributor)。  
管理员和贡献者的推送(上传)方式略有不同，分别说明。  

## 管理者(变体作者)的git操作
首先必须创建git项目。提供git服务的知名平台有GitHub、GitLab等，虽然浏览器上的界面不同，但在VSCode和git应用中的操作是相同的。  
首先在GitHub上创建账户。  

- [GitHub](https://github.com)  

账户创建后，在VSCode中打开平时制作变体的文件夹，从左侧菜单选择git功能。  
![](../assets/images/erawiki-vscode-git/admin_1.png)  

如果尚未创建git仓库，会显示如下内容，选择"公开到GitHub"  
![](../assets/images/erawiki-vscode-git/admin_2.png)  

确认后允许。在浏览器上登录并认证VSCode。  
![](../assets/images/erawiki-vscode-git/admin_3.png)  

这样会选出变体文件并推送到git仓库，但请稍等。设置".gitignore"文件，可以指定推送时忽略的文件，更加方便。  
保存数据、错误日志文件、debug文件夹等发布时应删除的，或共享时有不便的内容，都应设置在".gitignore"中。  

创建名为  
".gitignore"  

的文件，用VSCode或文本编辑器编辑。  
根据变体不同排除的文件也不同，但基本如下：  

- 使用_default.config或_fixed.config时，根据需要排除  
`emuera.config`  

- 图片由玩家侧准备的情况  
`resources/`  

- 但用CSV文件指定精灵图的情况  
`!resources/*.csv`  

- 以下应排除  
`*.sav`  
`*.log`  
`*.lnk`  
`sav/`  
`debug/`  
`macro.txt`  

输入仓库名，选择推送的文件
![](../assets/images/erawiki-vscode-git/admin_4.png)  

![](../assets/images/erawiki-vscode-git/admin_5.png)  

这样就在GitHub上创建了仓库  
![](../assets/images/erawiki-vscode-git/admin_6.png)  

接下来说明向该仓库推送更改的方法。如果做到这里就不难了。  
和平常一样编辑源代码，整理到一定程度后提交更新点。例如按bug修复或功能添加等方法分别提交会更清晰，但这取决于个人做法，没有明确答案。  
但如果变体作者有"请这样提交"的指示，遵循是明智的选择。  

与创建仓库时一样打开git功能，会显示上次提交以来的更改文件列表。选择文件可以查看更改部分。  
将此更改命名并提交。  
![](../assets/images/erawiki-vscode-git/admin_7.png)  

选择更改同步，就会将更改推送到GitHub上的仓库。  
这就是作为管理员的基本流程。  
![](../assets/images/erawiki-vscode-git/admin_8.png)  

如果要接受下一节说明的贡献者操作，将Settings最下方的Change Visibility设置为公共(公开)仓库。  
确认仔细后公开，承担风险。  
![](../assets/images/erawiki-vscode-git/admin_9.png)  

## 贡献者(补丁作者)的git操作  
虽然说明了管理员的git操作，但贡献者的情况如何？  
没有直接访问主要git仓库的权限，需要通过pull request(也称为merge request)的形式推送。  
以下说明基于pull request的推送，但如果管理员信任的制作者，可以通过授予仓库访问权限，使用与管理员相同的步骤推送。  
虽然可以详细设置权限，但仓库出现问题请自行承担责任。  

贡献者同样在GitHub上创建账户，访问想要制作补丁的变体仓库，选择右上角的Fork。  
![](../assets/images/erawiki-vscode-git/cont_1.png)  

按照确认画面继续  
![](../assets/images/erawiki-vscode-git/cont_2.png)  

稍等片刻，会在自己的账户中创建一个与fork来源完全相同的仓库  
![](../assets/images/erawiki-vscode-git/cont_3.png)  

打开VSCode，从git菜单选择克隆仓库，与管理员一样继续GitHub登录认证  
![](../assets/images/erawiki-vscode-git/cont_4.png)  

![](../assets/images/erawiki-vscode-git/cont_5.png)  

选择目标仓库，选择保存到PC的何处，源代码就会下载并可以编辑  
![](../assets/images/erawiki-vscode-git/cont_6.png)  

提交～推送的方法与管理员相同，但推送到fork的仓库，不会反映到原仓库。  
为此需要进行pull request。  

这是用于pull request测试的仓库。可以通过浏览器将提交的内容发送到原仓库  
![](../assets/images/erawiki-vscode-git/cont_7.png)  

添加说明以便管理员了解做了什么更改，创建pull request  
![](../assets/images/erawiki-vscode-git/cont_8.png)  

管理员收到pull request，通过管理员侧的批准完成合并。最好通知"发送了pull request"等  
![](../assets/images/erawiki-vscode-git/cont_9.png)  

![](../assets/images/erawiki-vscode-git/cont_10.png)  

管理员可能会接受pull request并合并，仓库始终保持最新内容，但贡献者不一定如此。  
需要定期从原仓库拉取更新内容。  
虽然可以通过git操作完成，但稍微复杂，建议使用GitHub提供的Sync fork功能。  
这样仓库与原仓库同步，通过VSCode拉取就可以获得最新代码。  
![](../assets/images/erawiki-vscode-git/cont_11.png)  

制作补丁发送pull request时，为了避免冲突和与旧规格的冲突，应确认最新版本。  