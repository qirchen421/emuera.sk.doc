# Using git with VSCode

This page summarizes posts from a Discord server

- [Discord - eraEVENT_KXX](https://discord.gg/cuSh6y5j93)

This explains how to use git with VSCode, which was described in [ERB Production Practice](erawiki-ERBmanual.en.md).
Some git terminology appears below, which can be interpreted as follows:
- Repository → Project
- Pull → Download
- Push → Upload

## What is git?

git is a version control system that anyone with some programming knowledge knows. It automatically merges code edited in each user's environment, notifies of conflicts, and keeps everything at the latest version, making it almost essential for collaborative development.

Even for individual use, creating diff history locally is useful for identifying issues when problems occur, such as bugs, and for rolling back.

To use git, you need to register with a git service like GitHub to upload your source code. You also need an application on your PC to access git.

VSCode has git functionality built-in, so no additional apps are needed. Text editors like Sakura Editor don't have this, so you'd need to install separate git management apps like GitBash or SourceTree. We'll skip explaining those here.

git is essentially a project, so of course it needs an administrator. In most cases, the administrator (Admin) is the variant author, and patch authors or dialogue authors are Contributors.

The push (upload) method differs slightly between administrators and contributors, so we'll explain each separately.

## git Operations for Administrators (Variant Authors)

First, you need to create a git project. Popular git hosting services include GitHub and GitLab. While their browser interfaces differ, operations in VSCode and git apps are the same.

Create a GitHub account first:

- [GitHub](https://github.com)

After creating an account, open the folder where you normally create your variant in VSCode, and select the git feature from the left menu.
![](../assets/images/erawiki-vscode-git/admin_1.png)

If you haven't created a git repository yet, it will display like this. Select "Publish to GitHub".
![](../assets/images/erawiki-vscode-git/admin_2.png)

You'll be asked for confirmation. Allow it and log in via browser to authenticate VSCode.
![](../assets/images/erawiki-vscode-git/admin_3.png)

Now you can select the variant files to push to the git repository, but wait first. It will be more convenient to set up a `.gitignore` file, which specifies files to ignore when pushing.

Configure `.gitignore` for save data, error log files, debug folders, and other files that should be removed before distribution or would cause issues if shared.

Create a file named `.gitignore` and edit it with VSCode or a text editor.

While files to exclude vary by variant, the basics are:

- Exclude `_default.config` or `_fixed.config` as needed
`emuera.config`

- If images are provided by the player
`resources/`

- However, if sprites are specified in CSV files
`!resources/*.csv`

- The following should be excluded
`*.sav`
`*.log`
`*.lnk`
`sav/`
`debug/`
`macro.txt`

Then enter a repository name and select the files to push.
![](../assets/images/erawiki-vscode-git/admin_4.png)

![](../assets/images/erawiki-vscode-git/admin_5.png)

Now the repository is created on GitHub.
![](../assets/images/erawiki-vscode-git/admin_6.png)

Next, let me explain how to push changes to this repository. If you've gotten this far, it's not difficult.

Edit your source code as usual, and when you have a decent amount of changes, commit the updates. For example, you can commit separately for bug fixes and feature additions - it's easier to understand when you divide commits by approach, but there's no clear answer as it's up to each person's preference.

However, if the variant author has specified "please commit like this," it's safest to follow their instructions.

Just like when creating a repository, open the git feature, and you'll see a list of files changed since the last commit. Select a file to see the changes.
Give this change a name and commit it.
![](../assets/images/erawiki-vscode-git/admin_7.png)

Then select "Sync Changes" to push the changes to the repository on GitHub.
This is the basic flow for administrators.
![](../assets/images/erawiki-vscode-git/admin_8.png)

To accept contributor operations explained in the next section, go to Settings, select "Change Visibility" at the bottom, and set the repository to Public.
You'll get strict warnings, so consider the risks before making it public.
![](../assets/images/erawiki-vscode-git/admin_9.png)

## git Operations for Contributors (Patch Authors)

We've explained administrator git operations, but how about contributors?
Since contributors don't have direct access to the main git repository, they need to push via a Pull Request (also called Merge Request).

Below explains pushing using Pull Requests. However, if the administrator is a trusted creator, they can grant repository access to allow pushing using the same steps as administrators.
You can set detailed permissions, but please note that any issues with the repository are at your own risk.

Contributors also create a GitHub account, access the variant repository they want to patch, and select "Fork" in the top right.
![](../assets/images/erawiki-vscode-git/cont_1.png)

A confirmation screen will appear - follow it.
![](../assets/images/erawiki-vscode-git/cont_2.png)

After a moment, an exact copy of the source repository will be created under your account.
![](../assets/images/erawiki-vscode-git/cont_3.png)

Open VSCode, select "Clone Repository" from the git menu, and proceed with GitHub authentication just like the administrator.
![](../assets/images/erawiki-vscode-git/cont_4.png)

![](../assets/images/erawiki-vscode-git/cont_5.png)

Select the target repository and choose where to save it on your PC. The source code will be downloaded and become editable.
![](../assets/images/erawiki-vscode-git/cont_6.png)

The commit-push method is the same as for administrators, but since you're pushing to your forked repository, it won't reflect in the original repository.
To reflect this, you make a Pull Request.

This is a test repository for Pull Requests. You can send your committed changes to the original repository via Pull Request from the browser.
![](../assets/images/erawiki-vscode-git/cont_7.png)

Add an explanation of what changes you made so the administrator can understand, and create the Pull Request.
![](../assets/images/erawiki-vscode-git/cont_8.png)

The Pull Request has been sent to the administrator. Once the administrator approves it, the merge is complete. You can notify them like "I sent a Pull Request."
![](../assets/images/erawiki-vscode-git/cont_9.png)

![](../assets/images/erawiki-vscode-git/cont_10.png)

While the administrator receives Pull Requests and merges them, keeping the repository always up-to-date, this isn't always the case for contributors.
You need to periodically pull updates from the original repository.

This can be done with git operations, but it's a bit difficult, so using the "Sync fork" feature provided by GitHub is recommended.
This syncs the repository with the original, so pulling in VSCode will give you the latest code.
![](../assets/images/erawiki-vscode-git/cont_11.png)

When creating patches and sending Pull Requests, check the latest version to avoid conflicts or clashes with outdated specifications.
