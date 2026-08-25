# Debug Mode

Debug mode is a mode added in ver 1.750.  
This feature is independent of the `Use debug commands` option.

## Starting Emuera in Debug Mode

To start Emuera in debug mode, pass `-Debug` as a command line argument.

An easy way to pass command line arguments is to right-click `EmueraXXXX.exe` and select `Create shortcut`, then right-click the created shortcut and select `Properties`, then add ` -Debug` to the end of the string in `Target`.  
(If the target is enclosed in `""` like `"C:\~~\EmueraXXX.exe"`, add ` -Debug` after the `"`)  
Double-clicking the shortcut will start it in debug mode.

## Behavior in Debug Mode

When started in debug mode, a folder named `debug` is automatically created.  
The variable watch list and debug console log described below are saved in the `debug` folder.

In debug mode, lines starting with `;#;` and lines between `[IF_DEBUG]` and `[ENDIF]` are executed in addition to normally executed lines.  
When not in debug mode, these lines are treated as comments and not executed.  
Conversely, in debug mode, lines between `[IF_NDEBUG]` and `[ENDIF]` are treated as comments and not executed.

	;#;PRINTL This line is executed only in debug mode.
	[IF_DEBUG]
		PRINTL This line is executed only in debug mode.
	[ENDIF]
	[IF_NDEBUG]
		PRINTL This line is executed only when not in debug mode.
	[ENDIF]

Also, there are commands that only function in debug mode.  
The `DEBUGPRINT`, `DEBUGPRINTFORM`, `DEBUGPRINTL`, and `DEBUGPRINTFORML` commands function similarly to [`PRINT`](../Reference/PRINT.en.md) statements, but output to the debug window.  
The `ASSERT` command throws an error when its argument is 0. When the argument is non-zero, it does nothing.  
The `DEBUGCLEAR` command clears all text in the debug window. It takes no arguments.  
These commands do nothing in non-debug mode.  
Arguments are not parsed either, so even if there are problems with the format in `DEBUGPRINTFORM`, nothing happens in non-debug mode.  
These are treated as no-op commands, not as comment lines, so they are safe to use immediately after an [`SIF`](../Reference/IF.en.md) statement.

Also, the variables `__FILE__`, `__LINE__`, and `__FUNCTION__` return meaningful values only in debug mode.  
In non-debug mode, they return 0 or an empty string.

## Debug Window

In debug mode, you can open the debug window.  
Open it from the Debug menu, or type `@DEBUG` in the console.  
You can also open the debug window with the shortcut key `Ctrl+D` in the main console.  
Depending on config options, the debug window may open automatically at startup.

The debug window is resizable. Adjust the size to suit your needs.  
The initial size and position of the debug window can be changed from the `Debug` section of the settings dialog.  
You can get the current size and position by opening the settings dialog with the debug window open.

The information displayed in the debug window can be switched using tabs within the window.  
Information is updated when the debug window gains focus or when tabs are switched.  
You can also update information with the shortcut key `Ctrl+R` from the main console, or clear all text with the `DEBUGCLEAR` command.

### Console
This is the debug console.  
It is the output destination for `DEBUGPRINT`, `DEBUGPRINTFORM`, etc.  
Errors and warnings from information output to the main console are also output to the debug console.  
You can enter debug commands from the text box at the bottom of the console.  
Unlike debug commands in the main console, you do not need to prefix with `@`.  
This feature works even when the `Use debug commands` option is NO.  
Also, `MASTER`'s name will not become `CHEATER`.

### Variable Watch
Click around the area below the column labeled `Target`. You should enter edit mode.  
Enter variable names whose values you want to know, such as `TALENT:MASTER:2` or `NAME:TARGET`, and the value will be displayed in the `Value` column.  
If an error occurs while getting the value, the error content will be displayed.  
To delete a target, edit it to an empty string.  
The row will be deleted when the variable watch is updated.  
Targets added to the variable watch are saved when the debug window is closed and loaded when opened.  
If you want to save/load at other times, use Save/Load from the File menu.

Checking the `Lock` column's checkbox pins that row's value as the actual value: a built-in **200 ms timer** inside the debug window writes the pinned value back (only at safe moments when the game is not executing) — even if scripts change it, the variable is pulled back to the pinned value within a few cycles, letting you isolate variables during testing.  
Targets that cannot be assigned (expressions, functions, constants, read-only variables) show an error at check time and are not locked.  
Lock state is session-only and is not saved; unchecking stops the write-back and resumes live refreshing.  
During game startup or before loading a save, values may not be valid yet — keep rows unlocked until values become valid, then lock.  

Click, double-click, or press F2 on the `Target` cell to edit the expression.

Clicking or double-clicking the `Value` cell lets you edit it; confirming executes the assignment `Target = input`.  
Assignment uses the same execution path as the debug console and only works for assignable variables (variables, array elements, etc.).  
For non-assignable targets such as expressions, functions, constants, or read-only variables, the error message is shown in the `Value` cell.  
Like the debug console, assignment is not executed while the game is running.  

You can use constants and expressions as `Target`, not just variables, but be careful when calling expression functions.  
Variable watch actually calls that expression function each time it updates the value.  
If the called expression function has side effects such as changing other variables, side effects will occur each time the variable watch is updated.

### Stack Trace
Information about currently called functions.  
The top is the current function, followed by the function that called the current function, and the function that called that function, and so on.
