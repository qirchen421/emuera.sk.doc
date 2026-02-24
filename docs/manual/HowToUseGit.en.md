# What is git?

Original source page
[eratoho Summary V3 Git Usage](https://seesaawiki.jp/eratoho/d/Git%a4%ce%bb%c8%a4%a4%a4%ab%a4%bf)

---

<!--
// Draft
// This probably has some difficult or unclear parts - please fix if you can
-->

git is a tool for managing the revision history of folders and their contents, and is one of the most sophisticated such tools currently available.

For the era community, git is useful for:

- Recording variant versions and integrating patches, which automates much of that work and reduces effort
- Recording your work during development, and automating the extraction of patch diff files based on those recordings

Additionally, with remote repositories where you can publish and manage projects:

- Players can check the progress of variant development
- Requests and suggestions can be managed centrally through issues
- Full releases of the latest version are easily downloadable

<!--
// Removed server-related features from explanation as they add complexity - can add as advanced content later
//- Can develop using local repositories without setting up a server
//- When developing in a public repository, users can track progress
-->

These benefits are expected.
Although it's sometimes written as if it can't be used alone, git can be used starting from a single person.
It may be difficult to understand what you can use it for, but if your situation matches the useful scenarios mentioned above, please give it a try.

**Advantages**
- Can check and revert past versions of variants without having to create separate folders
- Making patch compilation easier than winmerge
- Can review what work you've done up to now

<!--
// Changed to "no need to change" - lack of disadvantages isn't an advantage
//- Can be introduced without changing your existing development methods
-->

**Disadvantages**
- High learning cost to learn git
- If you don't need to manage past versions or compile patches, there are almost no advantages

---

## Q&A
Questions are welcome for clarity
<!--Need to add link once the editing base is established-->

## Git Clients
Software for saving and manipulating history. All can do roughly similar things.
There are many options, but here are some commonly used in the era community:

### [SourceTree](https://www.sourcetreeapp.com/)
One of the GUI git clients with an excellent UI.
Easy to see and operate, with official Japanese language support.

### [TortoiseGit](https://tortoisegit.org/)
GUI git client.
The official version is in English, but a Japanese language file is distributed by a separate author, and it works on Vista.

### [Git for Windows](https://gitforwindows.org/)
The most official Windows git. Command line is the main interface, but it comes with a GUI as a bonus.
Since git was originally operated on a screen like Windows Command Prompt (as distributed on this site),
using this git client directly may let you access git's more complex features.

<!--Server is dead, so commented out
## era Hosting Server
https://emuera.git-server.com:8443/
A server built specifically for era, where you can share folder history using git.
User registration is required to create dedicated repositories.
-->

---

## Tutorial Sites
### [Git Tutorial for Beginners](https://backlog.com/ja/git-tutorial/) Difficulty:★
A tutorial created by the company that operates the Backlog service to promote their own service.
The content is aimed at people with absolutely no knowledge, with illustrations and key points, making it easy to read.
You can learn the general basics here. Note that it recommends using the Backlog service during the tutorial.
Uses TortoiseGit.

### [Git Fundamentals](http://tracpath.com/bootcamp/learning_git_firststep.html) Difficulty:★★
Explains git's mechanism overview with diagrams.
Based on the command line but uses diagrams and simple language to explain each term - relatively easy to understand.

### [SourceTree Setup Guide](https://ux.getuploader.com/buppa3/download/183) Difficulty:★★★
Written for the era community.
Content explains how to operate SourceTree and which commands to use.
Assumes understanding of git terminology from other tutorials, but helpful when setting up SourceTree.

### [OSDNMagazine](https://osdn.jp/magazine/09/06/19/0340248) Difficulty:★★★
TortoiseGit installation procedure.
Explains how to download TortoiseGit and perform various operations.
Most terms are not explained, so you need to understand them from other tutorials.

### [Dotinstall](https://dotinstall.com/lessons/basic_gitgithub) Difficulty:★★★★
Git tutorial with video explanations.
The content is easy since it uses the command-line format close to the original, but it may look intimidating.
If you want to try git for Windows, use this as a basis for studying.

### [LearnGitBranching](http://k.swd.cc/learnGitBranching-ja/) Difficulty:★★★★
A site where you can simulate git commands.
You can develop a feel for operating in a command-line style git by solving puzzles in a simulated git screen.
There's a menu in the bottom right - rely on it if needed.
<!--
// I used this before and got stuck at weird places - uppercase/lowercase, commit order, etc.
-->

### [Git Tutorial](https://www.atlassian.com/ja/git/) Difficulty:★★★★
Atlassian's (company that makes SourceTree) Git tutorial. Command line format.
Provides cheat sheets for people who have used another version control system.
The tutorial isn't really for complete beginners, but the content is concise and well-organized.
This site also offers specific ideas for git branch and server usage - different from others.
Read this once you're familiar with git.

### [Introduction to Version Control with Git](http://www.plowman.co.jp/school/Git/Git.html) Difficulty:★★★★★
Tutorial using TortoiseGit.
<!--The writing style is a bit annoying but-->
The content is extensive and plentiful, and the language is easy to understand.
Recommended if you want to learn everything from what version control is to complex commands.

---

## Other Reference Materials
### [Pro Git](https://git-scm.com/book/ja/v2)
The git creators' explanation of git.
While it's aimed at people starting with git,
it's quite lengthy and written for people already proficient with similar tools, so it's better suited for those already familiar with git.

## era Community Glossary
<!--
// Created a glossary in case we can explain things more clearly than tutorial sites
-->
Term explanations welcome

### Client
A tool for communicating with a server.
In the context of git, it's software used to access repositories.

### Repository
Simply put, a save data vault.
Created for each folder you want to save, and that folder's history is saved.

### Working Tree
The folder and its contents that are targets for saving.
Refers to the directory where you actually work.

### INDEX, INDEX Tree
Content extracted from the working tree for saving.
When saving, you can adjust what to save here by adding what you've actually worked on in the directory.
This is probably the most confusing part of learning git - think of it as tracking how much has changed from the previous save data to now.

### Commit
The act of saving.
You can save the files in the INDEX.
