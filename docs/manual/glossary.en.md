# Glossary

For items you'd like to add, contact us on [Discord](https://discord.com/channels/428432103042973706/1236190714954514452).

## Programming Terms

### git
A version control system. It maintains change history locally and can upload to and back up online projects called remote repositories.
It particularly excels in collaborative development, but even for individual projects, it has useful features like checking changed areas and rolling back, so learning how to use it is worthwhile.
See [this page](HowToUseGit.md) for details.

### VSCode (VSC)
An IDE (Integrated Development Environment) for programming. It's essentially an application.
Free and feature-rich. Can be made even more convenient by installing extensions.
See [this page](erawiki-ERBmanual.md#vscode-installation-guide) for detailed installation instructions.

### Uploader
Also called "loda." A service that lets you upload files so anyone can download them. Of course, also used for distributing free games.
**There is no guarantee of constant service, and in the era community, major uploaders have gone offline or had issues multiple times in the past, resulting in the loss of many variants, dialogue, and patches.**
It's important to keep data on your own computer, and you can also spread risk by using multiple uploaders. Recently, there's also a method to create download links from git repositories.

### Indent
Spaces used to make source code look better. Can be entered with the Tab key in most text editors.
It doesn't affect actual operation, but is used to make pairs clear in statements that need to be closed with ENDIF, ENDSELECT, etc., like IF and SELECTCASE statements.

### Esper
Refers to someone with the ability to understand the background behind insufficient explanations from questioners like "This doesn't work" or "How do I do this?"
Of course, there are almost no espers in the real world. When asking questions, please provide detailed explanations including your environment, error logs, etc.

### Function
One unit for dividing source code. It's similar to dividing files into folders and then further dividing the files.
In Emuera, there are no concepts like classes or namespaces - functions starting with `@~` are the only and smallest units of source code.

### Sakura Editor
A text editor. Much more feature-rich and lightweight than the standard Windows Notepad.
Can be used for programming with proper settings, so it's sometimes used for era development.
Download and detailed explanation are on the [official page](https://sakura-editor.github.io/).

### Spaghetti (Code)
Source code with significantly low readability caused by excessively using verbose expressions, `CALL`, and magic numbers.
A derogatory term comparing the elements to spaghetti that are entangled in a bad way and can't be unraveled.
Of course, cleaner source code is always better, but as mentioned, it's a derogatory term, so saying "that's spaghetti code" to others isn't good manners.
As a patch author, refactoring is the smoothest way to avoid waves.

### Black Box
Refers to a program that works despite the source code content being unclear.
In era, there are many cases where you base on other variants or port functions, resulting in "I don't understand the content but I can use the functionality."
This is convenient in open-source era, but the flip side is that when "unknown bugs are discovered," "the author didn't anticipate this usage and normal results aren't obtained," or "further modifications are desired," the creator can't handle it because they don't understand the content.
It's worth noting that the term "black box" itself has almost no negative connotation.

### Variable
A concept for holding data. There are various types called "types" that handle different data.
In Emuera, types are only "integer (int)" and "string (str)."
Integer type also serves as bool type - 0 is treated as false, and any other value as true.

### Magic Number
Refers to insufficiently explained numbers or variables whose purpose is only known to the person who wrote the code. And often even the author themselves forget the meaning when reading their own code later.
This includes single-character variables, `LOCAL`, `ARG`, etc. from other sections. Using these excessively makes it unclear which process uses which variable, and can cause black boxes.
Basically not recommended, and now that you can name variables, it's desirable to declare with appropriate names matching their purpose before using.
Also, there's a troublesome aspect that source code with many magic numbers that humans can't decode works fine from a program perspective - one reason why refactoring is often undervalued in the programming field.

### Command
Something that executes an action in era source code - calling functions, adding characters, displaying text, etc.
See [this page](../Reference/README.md) for a list of available commands.

### Infinite Loop
A phenomenon where loops don't end due to some cause when using loop commands. Most are due to program errors.
Emuera has a fail-safe that stops operation as an infinite loop when a loop continues beyond a certain time.
Rarely, it can also be triggered when running heavy code on low-spec PCs, or when source code is messy and has very high loop counts.
Since fewer loop iterations is always better, how much you can optimize this is a skill to show.

### Refactoring
The work of organizing source code.
This improves maintainability and readability of source code, making it very important for continuous variant development.
Specific examples include "combining the same process into one function," "naming variables to make purposes clear," "reducing loop processing waste to lighten operation," "replacing existing processing with clear-purpose commands/expression functions," and "changing filenames to match file contents."
However, refactoring requires almost as much effort as creating source code from scratch, and since operation doesn't change and players can hardly feel the difference, it tends to be neglected relative to its importance.
~~Additionally, in many cases file size decreases. Not a good match with users who judge variant/dialogue scale by file size.~~
Can be considered an eternal challenge for programmers.

### Exception
One type of program error. Occurs when referencing a variable with no value, etc.
In era development, errors aren't called exceptions - when this word appears, it refers to Emuera itself's errors.

## era Terms

### CSV
A file extension standing for "Comma Separated Value." Unlike ERB, this file format is used in various applications.
Therefore it can be edited with Excel and other applications, but since extra symbols may get mixed in, it's not recommended.
While ERB describes source code, this is used to define various data in advance (character data, variable names, etc.).

### Emuera
A derived game engine based on eramaker below, with additional features. It's now the mainstream.
Open source, and besides Emuera.NET EM+EE which this wiki mainly covers, there are various versions in Japan and abroad.
[Official Emuera OSDN](https://ja.osdn.net/projects/emuera/wiki/FrontPage) (may have connectivity issues)

### eramaker
The original era. A game creation engine created by circle 獏 (Baku).
**First release was December 12, 2005.**
[漠々と、獏/erakanon's page](https://cbaku.com/b/2010/eramaker/)

### ERB
A file extension (variously said to be) standing for "ERaBasic." Era source code is mainly written in files with this extension.
Since it's basically an extension unique to era, it's not used in other applications. Change it from Windows settings to show file extensions.
In IDEs like Visual Studio Code, you can create files without extensions, so use by adding the ".ERB" extension.

### NO
The character number listed in character CSVs. A unique number for each character, also used in [CSV reference commands](../Reference/CSV_STATUS.md).
Basically fixed values and don't change. Sometimes confused with registration number (ID), but they're different. Beginners should be careful.

### SHOP
When you first start the game, the screen shown is the title screen, and then after starting the game, the main menu shown is conventionally called the SHOP screen.
This comes from the function name that makes up this screen being "SHOP" since the eramaker era.

### あなた (You)
The character registered as character number 0 in most variants. Usually male, but sometimes female or customizable.
In second-generation ero, the man often becomes a mob, and era follows this. Also, in dream genres, it's important that the protagonist is "あなた."
Becomes almost unnecessary in plays that enjoy character couplings.

### Single-Character Variable
Variables using single letters A-Z. Integer type.
Since they can maintain values across functions, they were valued in restrictive eramaker.
However, in Emuera where return value specifications via `RETURN` expanded and variables can be declared, they significantly reduce source code readability, so usage is now avoided in many variants.
This is due to lack of uniqueness - "unclear variable purpose" and "after all only 26 types, so when creating complex processing, variable name collisions occur somewhere."
~~Single-character variables are still heavily used in variants based on old variants, but refactoring requires enormous effort, so demanding too much from variant authors is strictly prohibited.~~

### "Character registration number is out of range"
Probably the most frequent error in era. Occurs when referencing a status of a non-existent character.
Causes include `TARGET` being -1, loops running too far, wrong variables used for character reference, character reference variables having unexpected values, etc.
Can be prevented in advance by comparing `TARGET` or character reference variables with `CHARANUM` (character count).

### Dialogue (Koujou/Kokusho)
In default era, only narration is often implemented. A system that gives characters dedicated dialogue in such games is called "koujou" (dialogue).
There are two types: general dialogue and character-specific dialogue. General dialogue, as the name suggests, references character traits and such to display from several patterns. Because of this, "this character wouldn't say this" occasionally happens.
Character-specific dialogue is made for that character, and (despite interpretation differences) creates an atmosphere comparable to commercial erotic games where the character actually speaks.
The problem is that both require **enormous effort and time, plus writing skill**, making dialogue authors who can create these very in demand.

### Expression Function
In erabasic, functions are normally called with `CALL`, but functions that can return numbers or strings in expressions without using `CALL` are called expression functions.
Bundling frequently used verbose processes into functions is the same as regular functions, used for situations like getting only the result (number) from complex calculations, or getting text (string) that changes depending on the scene.
See [this page](../Emuera/in_expression_function.md) for detailed expression function specifications.

### Registration Number (ID)
Numbers assigned to characters added with ADDCHARA system commands. Starts from 0 and is always processed front-packed.
Specified by registration number for TARGET and ASSI. Unlike NO, it's not unique to characters and changes with DELCHARA or SORTCHARA.

### Variant
A general term for games that run on eramaker or Emuera. Everything ultimately traces back to and is derived (Variant) from a base game called erakanon, hence called variants.
Often called eragame(s) in English-speaking regions.
