# Debug Commands  
※Debug commands are not available by default.  
Check "Allow debug commands" from the Environment Settings menu if you want to use them.  

**※This function is a simple function of the version without debug mode.**  
**We recommend that you start in debug mode for debugging with the current version.**  

During script execution (in game), if you enter a string beginning with "@", it will be accepted as a debug command.  
Case sensitivity depends on the "Ignore capitalization" config in emuera.config.  

Debug commands are in the same format as ERB.  
For example, you can write like this:  

	@MONEY = 10000  
	@PRINTV FLAG:200  
	@PRINTFORM %NAME:MASTER% CFLAG(1) = {CFLAG:MASTER:1}  
	@ADDCHARA 1  

Also, if you simply enter a variable or a formula, those values will be output  
（The following space after @ is not required）  

	@ FLAG:200  
	@ @"%NAME:MASTER% CFLAG(1) = {CFLAG:MASTER:1}"  

However, you can not use instructions that change the execution flow such as IF and CALL, and instructions that require input such as INPUT and WAIT.  

There are some instructions not in ERB.  

- @REBOOT  
Restart and reread emuera.config, csv, and erb files.  

- @OUTPUT  
Outputs the current log to emuera.log. If it already exists, it will be overwritten.  
This is the same operation as the OUTPUTLOG instruction.  

- @EXIT  
Quit Emuera. Same operation as QUIT instruction.  

- @CONFIG  
Opens the Settings dialog.  

- @DEBUG  
Opens the debug dialog. This is valid only when started in debug mode.  

Other than the above, if a normal ERB instruction is executed, MASTER's NAME and CALLNAME are changed to "CHEATER".  
This is a measure to prevent abuse, as debug commands are cheats.  
