---
hide:
  - toc
---

# CALLSHARP

制作者：Neo_Kesha

| 函数名                                                          | 参数           | 返回值 |
| :-------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconetc.webp)[`CALLSHARP`](./CALLSHARP.md) | `functionName` | `void` |

!!! info "API"

	``` { #language-erbapi }
	CALLSHARP funcName
	```

    当仅使用EraBasic感到不足时，可以创建用于Emuera的C#插件。  
    要添加插件，请在Emuera的安装文件夹中创建Plugins/文件夹，并将插件的DLL文件放置其中。  

    请务必注意，还需在Emuera.exe所在的文件夹中添加一个`pluginsAware.txt`文件。否则，启动时会发生崩溃。

    插件创建方法（简单示例 [https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample](https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample)）  
    1. 克隆 Emuera 仓库 https://gitlab.com/EvilMask/emuera.em  
    2. 在 Visual Studio 中打开项目  
    3. 向解决方案添加新项目。选择类库类型。  
    4. 将 Emuera 添加为依赖项目。  
    5. 创建 `.cs` 文件（例如："`Manifest.cs`"）。  
    6. 创建一个名为 `PluginManifest` 的类，继承自 `PluginManifestAbstract`。  
    7. `PluginName`、`PluginDescription`、`PluginAuthor`、`PluginVersion` 字段是可选的，目前尚未使用。  
    8. 创建 `.cs` 文件（例如："`MyCoolCode.cs`"）。  
    9. 每个方法都是一个继承自 `IPluginMethod` 的类。  
    10. 创建类（例如：`MyCoolNativeMethod : IPluginMethod`）  
    11. 重写 "`Name`" 字段。这将是 ERB 端调用时使用的方法名。例如："`MyCoolMethod1`"  
    12. 用任意代码重写 `Execute` 方法。  
    13. 在 `PluginManifest` 的构造函数中，将类添加到方法列表，如下所示：  
    `methods.Add(new MyCoolNativeMethod ())`  
    14. 使用 `CALLSHARP MyCoolMethod1()` 从 ERB 调用 C# 代码。

    ## 关于参数

    可以在 ERB 与 Plugin 之间传递参数。将变量作为参数传递时，可以从 Plugin 中修改该变量的值。  
    `Execute` 方法以 `PluginMethodParameter` 数组的形式接收参数。参数可以指定为字符串类型或数值类型。  
    扩展示例（基于 [https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample](https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample) 的示例）：

    ```c#
            public void Execute(PluginMethodParameter[] args)
                {
                    // 展开变量
                    var characterId = args[0].intValue；
                    var characterName = args[1].strValue；
                    // 调用代码
                    var result = SET_CHAR_NAME(characterId, characterName)；
                    // 更新返回值
                    if (args.Length > 2) {
                    args[2].intValue = result；
                    }
                }
            
            internal static int SET_CHAR_NAME(int charId, string charName) { // 执行代码。
                // 执行代码
            }
    ```

    ## 插件API
    插件系统中存在`PluginManager`调用，它作为代理Emuera便捷功能给插件的API运行。

    ```c#
    var api = PluginManager.GetInstance()；
    ```

    可以执行如下基本处理：

    ```c#
    api.Print("Hiiiii")；
    ```

    也可以处理变量：

    ```c#
    api.FLAG[intKey] = 11；
    api.FLAG[strKey] = 15; // 通过字符串访问比通过intKey访问要慢。
    api.FLAG[FlagsEnum.CoolFlagIUseALot] = 17; // 使用枚举类型代替字符串。
    ```

    可以使用PluginAPICharContext来处理字符串变量。

    ```c#
    PluginAPICharContext ctx = api.CreateCharContext(charId);
    for (int i = 1; i <= 24; ++i)
    {
        ctx.CFLAG[200 + i] = ctx.EQUIP[i];
    }
    ctx.UserDefined["UDArray", 0] = 13;
    ```