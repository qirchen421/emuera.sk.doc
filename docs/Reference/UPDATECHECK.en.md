---
hide:
  - toc
---

# UPDATECHECK

| Function name                                                     | Arguments | Return |
| :--------------------------------------------------------------- | :-------- | :----- |
| ![](../assets/images/IconEE.webp)[`UPDATECHECK`](./UPDATECHECK.md) | `void`    | `int`  |

!!! info "API"

	``` { #language-erbapi }
	UPDATECHECK
	```

	Gets version information from the URL listed in `GameBase.csv` and prompts for update via dialog box if an update is available.

	- 1, Add "Version Name" and "Version Info URL" to GameBase.csv
		- The version name can be any version string, and the URL should be a URL for version checking
	- 2, Upload a text file with version info and latest version link to the above URL
		- Write the latest version name on the first line, and the link on the second line. Third line and beyond can be comments etc.
		- If using a public Git, you can push to the repository and reference via raw
	- 3, When UPDATECHECK is executed, access the URL in GameBase.csv; if the current version differs from the latest, ask the player via dialog box whether to open the server-side link
		- If already at the latest version, RESULT is set to 0 and ends
	- 4, If "Yes" is selected, open the browser and RESULT is set to 2. If "No" is selected, do nothing and RESULT is set to 1. If the link is not found, or the link doesn't contain version info/latest link, RESULT is set to 3 on failure.

	Also, a "Disable Update Check" option is added to config; if this is on when UPDATECHECK is executed, nothing happens but RESULT is set to 4.
	
	In 11fix, RESULT is set to 5 if not connected to the network.

!!! hint "Hint"

    Command only.

!!! example "Example"
	``` { #language-csv title="GameBase.csv" }
	Version Info URL, C:\test.txt
	Version.1.00
	```

	``` title="C:\test.txt"
	1.01
	https://evilmask.gitlab.io/emuera.em.doc/
	```

	``` { #language-erb title="MAIN.ERB" }
	@SYSTEM_TITLE
		UPDATECHECK
	```

	![](../assets/images/UPDATECHECK.png)
