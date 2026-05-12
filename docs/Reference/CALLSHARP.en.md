---
hide:
  - toc
---

# CALLSHARP

Added by Neo_Kesha

| Function name                                                          | Arguments           | Return |
| :-------------------------------------------------------------- | :------------- | :----- |
| ![](../assets/images/Iconetc.webp)[`CALLSHARP`](./CALLSHARP.md) | `functionName` | `void`¹ |

!!! info "API"

	``` { #language-erbapi }
	CALLSHARP funcName
	```

	C# Plugins
	
	You can write C# Plugins for EmuEra when EraBasic is not enough.  
	To add Plugin, create `plugins/` folder at your Emuera installation folder and put DLL file of plugin there.  
	Make sure to also include a note to add a `pluginsAware.txt` file to the folder where Emuera.exe resides, else there will be a crash on start up.

	How to create Plugins (Simple example at [https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample](https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample))
	
	1. Clone\Fork [EmuEra repository](https://gitlab.com/EvilMask/emuera.em)  
	2. Open project at Visual Studio  
	3. Add new Project to solution. Make it Class Librarry  
	4. Add EmuEra as dependency project  
	5. Create .cs file e.g. "Manifest.cs"  
	6. Create class named exactly PluginManifest that inherits PluginManifestAbstract  
	7. PluginName, PluginDescription, PluginAuthor and PluginVersion fields are optional and have no use yet.  
	8. Create .cs file e.g. "MyCoolCode.cs"  
	9. Each method is a class inherited from IPluginMethod  
	10. Create class e.g. MyCoolNativeMethod : IPluginMethod  
	11. Override "Name" field. This will be method name that will be used by ERB interpreter to find your Method. E.g. "MyCoolMethod1"  
	12. Override Execute method with your code.  
	13. In the constructor of PluginManifest, add your class to methods list with   
	```methods.Add(new MyCoolNativeMethod ())```  
	14. Use CALLSHARP MyCoolMethod1() to call your native code from ERB  


	## Arguments

	You can pass arguments from ERB to Plugin and from Plugin to ERB. If you pass variable as an argument, you will be able to change it's value from Plugin  
	Execute method recieves arguments as array of PluginMethodParameter. It can either be string, or int.  
	Extended example (example based on [https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample](https://gitlab.com/EvilMask/emuera.em/-/tree/master/EmueraPluginExample)):  

	```c#
       public void Execute(PluginMethodParameter[] args)
        {
            //Unpack your variables
            var characterId = args[0].intValue;
            var characterName = args[1].strValue;
            //Call code
            var result = SET_CHAR_NAME(characterId, characterName);
            //Update return values
            if (args.Length > 2) {
              args[2].intValue = result;
            }
        }
      
      internal static int SET_CHAR_NAME(int charId, string charName) {
        //Do code
      }
	```

	## Plugin API
	Plugin system have PluginManager call, that acts as an API to proxy useful features of EmuEra to plugins.

	```c#
	var api = PluginManager.GetInstance();
	```

	You can call basic system calls such as

	```c#
	api.Print("Hiiiii");
	```

	You can work with variables:

	```c#
	api.FLAG[intKey] = 11;
	api.FLAG[strKey] = 15; //Access by string is much slower than by int ID.
	api.FLAG[FlagsEnum.CoolFlagIUseALot] = 17; //Use enums instead of strings
	```

	You can work with Character variables using  PluginAPICharContext 

	```c#
	PluginAPICharContext ctx = api.CreateCharContext(charId);
	for (int i = 1; i <= 24; ++i)
	{
	ctx.CFLAG[200 + i] = ctx.EQUIP[i];
	}
	ctx.UserDefined["UDArray", 0] = 13;
	```
