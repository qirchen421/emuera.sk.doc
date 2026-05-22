# 资源文件（历史文档）

!!! warning "历史文档"

    本页描述的是原版 Emuera 的资源设置方法。Skia 版已全面重构图像资源管理（懒加载索引、SharedBitmapCache、AnimSpriteCache），资源设置说明已迁移至 [资源设置 — 图像资源的准备方法](../tutorial/resources.zh.md)。

这里介绍在Emuera中显示图像所需的资源文件的准备方法。

资源文件需要在可执行文件所在的文件夹中创建`resources`文件夹并将其放入其中。  
文件在`resources`文件夹内，即使是子文件夹也没关系（1.823及以上版本）。  

## 资源指定文件(csv)  
在`resources`文件夹中放置csv格式的文本时，会作为资源指定文件读取。格式如下。  

	;注释行  
	资源名A, 原文件名, x, y, width, height, posx, posy  
	资源名B, 原文件名, x, y, width, height, posx, posy  

	资源名C, ANIME, width, height  
	资源名C, 原文件名, x, y, width, height, posx, posy, delay  
	资源名C, 原文件名, x, y, width, height, posx, posy, delay  

- 注释行  
	以分号开头的行作为注释行被忽略。  

- 精灵  

		资源名A, 原文件名, x, y, width, height, posx, posy  

	通过上述格式可以创建具有`资源名A`的精灵。  
	资源名是作为`<img src='资源名A'>`的`src`属性的属性值使用的名称。  
	另外，也可以以`SPRITECREATED("资源名A")`这样的形式使用。  
	资源名不能与其他资源名称重复。  
	原文件名是图像文件的名称。包含扩展名指定。使用相对于csv文件的路径指定。  
	不能指定csv文件上级目录的图像文件。  
	请指定与csv文件同级或其子文件夹中的图像文件。  
	`x, y, width, height`以像素为单位指定原图像中使用的部分。  
	`x, y, width, height`可以省略，此时使用整个图像。  
	`posx, posy`指定图像的相对位置。该值可以通过`SPRITEPOS`或`SPRITEMOVE`指令动态更改。  
	`posx, posy`可以省略，此时等同于指定了`0,0`。  

- 动画精灵  

		资源名C, ANIME, width, height  
		资源名C, 原文件名, x, y, width, height, offsetx, offsety, delay  
		资源名C, 原文件名, x, y, width, height, offsetx, offsety, delay  
		……  

	通过上述格式可以创建具有`资源名C`的动画精灵。  
	要创建动画精灵，需要在文件名处写`ANIME`并指定精灵整体的尺寸。  
	此`width, height`必须是正整数。不能省略。  
	从下一行开始，指定动画的各个帧图像。  
	各帧的定义方法与普通精灵相同。  
	`delay`以毫秒为单位指定该帧的显示时间。省略时为`1000ms`。  
	注意，Emuera标准情况下在[`INPUT`](../Reference/INPUT.zh.md)等等待时间内不进行重绘，因此动画精灵看起来像是静止在特定帧。  
	请执行`SETANIMETIMER`指令以在INPUT中进行重绘。  
	`SETANIMETIMER`指令的详细信息请参考指令说明。  

## 图像文件  
显示图像需要图像文件。  
图像文件准备为`bmp`、`jpg`、`png`格式之一并放入`resources`文件夹中。  
EM+EE中通过捆绑库也可以使用`webp`格式  
在ERB内可以通过`GCREATEFROMFILE`生成图形  

## 注意事项
csv文件中指定的所有图像文件会在Emuera启动时展开到内存中并占用内存直至结束。
比起读取大量图像文件，建议将图像合成为一个单一文件并指定范围使用，这样在内存和速度上都有利。
另外，适当时机进行`GCREATEFROMFILE`与`GDISPOSE`、`SPRITECREATE`与`SPRITEDISPOSE`的处理也很有效
在配置的绘制接口中指定`WINAPI`时，通过`GDI`处理，不进行Alpha混合。
绘制接口为`Graphics`或`TextRenderer`时，通过`GDI+`处理，进行Alpha混合。
放大缩小也因`WINAPI(GDI)`与`Graphics`或`TextRenderer(GDI+)`而略有不同。

!!! info "Skia 版特性变更"

    以上注意事项仅适用于原版 Emuera（GDI/GDI+ 渲染）。Skia 版采用以下新机制：

    - **懒加载**：CSV 预加载仅建立索引，图片首次渲染时才解码，不再启动时全量加载
    - **SharedBitmapCache**：全局 LRU 位图池（max 200），同一文件只解码一次
    - **AnimSpriteCache**：动画精灵 LRU 缓存（max 6），超出自动释放
    - **SPRITECREATEFROMFILE**：运行时动态加载，无需 CSV 预定义

    详见 [HTML 与图形 — 资源设置](../tutorial/html-syntax.zh.md#skia-版的资源管理机制)