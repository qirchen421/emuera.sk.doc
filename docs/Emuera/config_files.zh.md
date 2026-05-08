# 配置设置的强制设定
当Emuera检测到csv文件夹内存在名为`_fixed.config`和/或`_default.config`的文件时，将会读取这些文件。
各个`.config`文件的格式与`emuera.config`相同。各项配置的具体含义请参见[配置项目](config.md)。  

各文件的优先级取决于Emuera读取配置文件的顺序。  
Emuera读取配置文件的顺序如下：  

	csv\_default.config
	emuera.config
	csv\_fixed.config

按照此顺序，后读取的设置将覆盖先前的设置。也就是说，`_default.config`中的设置会被`emuera.config`覆盖，而`emuera.config`中的设置则会被`_fixed.config`覆盖。请注意，只有使用上述路径和文件名的文件才会被加载。
也就是说，如果将`_fixed.config`或`_default.config`放在csv文件夹下的子文件夹中，或者使用缺少下划线的文件名如`default.config`等，这些文件都不会被读取。

## `_fixed.config`
在`_fixed.config`中设置的选项优先于`emuera.config`中的设置。
此外，在`_fixed.config`中指定的项目将无法通过Emuera的设置对话框进行修改。
请仅在某些特定选项对于期望的功能是必需的情况下使用`_fixed.config`。
依赖Emuera换行位置的脚本需要将"不在按钮中间换行"选项设为"YES"。
另外，如果需要使用`_Replace.csv`和`_Rename.csv`，则必须设置相关的选项。
除此之外，如果使用`SETCOLOR`，可能需要固定背景色、文字颜色等。
但是，如果连非必需的选项也在`_fixed.config`中设置，将会导致用户无法进行自定义。
请尽量减少在`_fixed.config`中设置的项目数量。

## `_default.config`
如果有不是必须强制设定但推荐使用的选项，可以使用`_default.config`代替`_fixed.config`。
当`emuera.config`不存在时，`_default.config`将作为初始设置使用。
如果`emuera.config`存在，则以`emuera.config`中设置的选项为准，因此不会覆盖用户的设置。