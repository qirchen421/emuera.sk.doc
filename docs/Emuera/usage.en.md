# Usage  
## Operating Environment  
.NET Framework 2.0 environment is required.  
Only Windows XP and Vista have been tested.  

If you get the error "Application could not be initialized properly" and cannot start, .NET Framework 2.0 is not installed.  
Download and install the .NET Framework 2.0 runtime from Microsoft's site.  

## Usage  
Please put EmueraXXX.exe in the same folder as eramaker.exe and start it.  
(XXX is the number that represents the version. Also, depending on your environment, .exe may not be displayed)  
If it does not start, please read the "System Requirements" section.  
It generates emuera.config immediately after startup and emuera.log when an error occurs.  

The basic operation is almost the same as eramaker.exe, but it is possible to operate with the mouse.  
Point and click on the choices (the numbers surrounded by []) with the mouse.  
You can skip to the next choice by using escape key or right-clicking, and if you keep right-clicking to select a choice, you can skip to the next choice as soon as you select it.  
In addition, you can use Ctrl+V to paste the contents of the clipboard, or (like eramaker.exe) press the up and down keys to recall the previous input.  

!You can also run the file that you have converted in EraMakerEx as it is.  
However, this feature is disabled by default, so if you need it, please check the "Use _Rename.csv" checkbox in the help settings.  

## Macros  
Emuera has a simple macro function.  
For example, typing "\e" will skip to the next option, just as if you were using the Esc key or right-clicking.  
If you type "\n", it will separate the input and become the next input.  
For example, if you enter "0\e\n1\e\n", you will enter 0 and skip to the next option, and 1 and skip to the next option.  
Also, (~~)*n repeats the input in parentheses n times.  
"(0\e\n)*3" is the same thing as "0\e\n0\e\n0\e\n".  
You can stop the macro execution by pressing the Esc key while it is running.  

The macro you create can be saved in association with the F1-F12 key.  
Press the F1 to F12 keys while holding down the Shift key to save the current input content in the F1 to F12 keys.  
Then press F1-F12 keys to input the macro you saved.  
The saved macro will be stored in macro.txt.  
(The configuration option "Use keyboard macros" must be enabled.)  

In addition, you can switch between macro groups by holding down the Ctrl key and pressing the numeric 0-9 keys.  
(Group 0 is selected by default when starting Emuera.)  
F1 to F12 of the Group 0 and F1 to F12 of the Group 1 can store different macros, so more macros can be stored.  
You can also change the group from the contextual menu that comes up when you right-click on the input box  

You can also edit macro.txt directly in a text editor  
To the right of the colon of "マクロキーF○:" (Macro key F○), write the macro you want to input when you press the F○ key.  
"G×:マクロキーF○:" (G×:Macro key F○) is a macro for selecting group X.  
If you change the message to the right of the column "グループ×:マクログループ×に設定" (Group x: Set to macro group x)",  
you can also change the text displayed when you switch to Group X.  

## Menu  
To use this feature, the "Use menu" item in the configuration must be enabled.  
It is enabled by default.  

## File  
### Restart  
Restarts Emuera  
Keep in mind that if you don't save, you will lose information about the running game.  

### Save Log  
Saves the past log to a file with a name.  
The maximum number of rows saved is the same as the number of rows in the history log.  

### Return to Title Screen  
Back to the title.  
Keep in mind that if you don't save, you will lose information about the running game.  

### Reload Code  
Reread the .erb file with the game information intact.  
For functions that have already been called, the previous code will be executed.  
The previous code remains in the memory until the called function runs out, so it may run out of memory if it is used consecutively.  

### Exit  
Quit Emuera  

## Help  
### Settings  
Configure the settings. See config for configuration details.  
