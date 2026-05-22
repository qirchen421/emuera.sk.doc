# Forcing Config Settings

Emuera reads files named `_fixed.config` and/or `_default.config` if they exist in the csv folder.  
The format of each `.config` file is the same as `emuera.config`. See [Config Items](config.en.md) for the meaning of each item.

The priority of each file depends on the order in which Emuera reads config files.  
Emuera reads config files in the following order:

	csv\_default.config
	emuera.config
	csv\_fixed.config

Settings are overwritten by later files. That is, settings in `_default.config` are overwritten by `emuera.config`, and settings in `emuera.config` are overwritten by `_fixed.config`.  
Note that these files will only be read if they exist at the above paths with the exact filenames.  
In other words, if you create a subfolder in the csv folder and place `_fixed.config` or `_default.config` there, or name the file `default.config` without the underscore, it will not be read.

## `_fixed.config`
Options set in `_fixed.config` take priority over `emuera.config`.
Also, items specified in `_fixed.config` cannot be changed via Emuera's settings dialog.
Use `_fixed.config` only when specific options are required for the intended behavior.  
For scripts that depend on Emuera's line break position, the `Do not wrap lines in the middle of buttons` option must be set to `YES`.  
Also, if `_Replace.csv` or `_Rename.csv` needs to be used, options related to these are required.  
If `SETCOLOR` is used, the background color and text color may need to be fixed.  
However, setting options that are not particularly required in `_fixed.config` will prevent user customization.  
Keep the items set in `_fixed.config` to a minimum.

## `_default.config`
If you have options you want to recommend but not enforce, use `_default.config` instead of fixed.  
`_default.config` is used as the initial setting when `emuera.config` does not exist.  
If `emuera.config` exists, the options set in `emuera.config` take priority, so user settings will not be overwritten.
