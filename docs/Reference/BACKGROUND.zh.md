---
hide:
  - toc
---

# BACKGROUND操作系

制作者：Neo_Kesha

| 函数名                                                               | 参数                     | 返回值 |
| :------------------------------------------------------------------- | :----------------------- | :----- |
| ![](../assets/images/Iconetc.webp)[`SETBGIMAGE`](./BACKGROUND.zh.md)    | `string`(, `int`, `int`) | 无     |
| ![](../assets/images/Iconetc.webp)[`REMOVEBGIMAGE`](./BACKGROUND.zh.md) | `string`                 | 无     |
| ![](../assets/images/Iconetc.webp)[`CLEARBGIMAGE`](./BACKGROUND.zh.md)  | 无                       | 无     |

!!! info "API"
	```  { #language-erbapi }
	SETBGIMAGE resourceName(, depth, opacity)
	REMOVEBGIMAGE resourceName
	CLEARBGIMAGE
	```

	`SETBGIMAGE` 将参数指定的图像设置为 Emuera 的背景图像。Depth（深度）和 Opacity（透明度）为可选参数。
	Depth 的默认值为 0，也可以指定负值。
	Opacity 可以用 0 到 255 的数值指定。

	`REMOVEBGIMAGE` 用于删除由 `SETBGIMAGE` 设置的背景图像。
	`CLEARBGIMAGE` 用于删除所有背景图像。

	这是一组用于向 Emuera 控制台窗口添加背景的命令。不支持 WINAPI。
	背景必须在资源 CSV 文件中定义。背景支持透明度和图层。
	背景会动态调整大小以适合控制台窗口，同时保持宽高比。

!!! note "参数解析说明"

	`resourceName` 参数的解析方式因版本而异：

	| 版本 | 解析方式 | 变量参数行为 |
	|:---|:---|:---|
	| emuera.em | `FORM_STR_ANY` | ❌ 变量名被当作字面量字符串查找，静默失败 |
	| lazyloading 变体 | 类型化字符串表达式 | ✅ 正确读取变量值 |

	**示例**：
	```erb
	#DIMS temp_name
	temp_name = "小帽_笑_3"
	SETBGIMAGE temp_name  ; lazyloading 正常工作，emuera.em 静默失败
	SETBGIMAGE %temp_name%  ; emuera.em 正确写法
	```

!!! hint "提示"

	仅支持命令形式。