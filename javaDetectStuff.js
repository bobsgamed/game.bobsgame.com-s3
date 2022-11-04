
		//detectJava_OTF_NOTF.js v0.4.0 //By Eric Gerds   http://www.pinlady.net/PluginDetect/

		var docWrite = function(text)
		{
			out = document.getElementById("javaResultContainer");
			if(out)
			{
				if (text)
				{
				text = text.replace(/&nbsp;/g,"\u00a0");//search for all "&nbsp;" and replace it with unicode non-breaking-space char
				out.appendChild(document.createTextNode(text));
				}
				out.appendChild(document.createElement("br"));
			}
		};

		function doJavaCheck(pluginResults)
		{


			if(debug=="false")docWrite = function(text){};

			//---------------------------------------
			// get java info
			//---------------------------------------

			myJavaVersion = pluginResults.getVersion("Java");

			myJavaStatus = pluginResults.isMinVersion("Java", minimumJavaVersion);
			newestJavaStatus = pluginResults.isMinVersion("Java", newestJavaVersion);



			// Note that pluginResults.isMinVersion("Java") is equivalent to pluginResults.isMinVersion("Java", "0").
			docWrite("Java (using <applet> and/or <object> tag) installed & enabled: " + (pluginResults.isMinVersion("Java") >= 0 ? "true" : "false"));

			docWrite("Highest Installed Java Version: " + pluginResults.getVersion("Java"));


			// Check if some minimum Java version is installed
			var JavaStatus = pluginResults.isMinVersion("Java", minimumJavaVersion);

			if (JavaStatus == 1){docWrite("Java " + minimumJavaVersion + " or higher (using <applet> and/or <object> tag) is installed & enabled.");}
			else if (JavaStatus == 0){docWrite("Java installed & enabled but version is unknown");}
			else if (JavaStatus == -0.1){docWrite("Java installed & enabled but version is < " + minimumJavaVersion);}
			else if (JavaStatus == -0.2){docWrite("Java installed but not enabled");}
			else if (JavaStatus == -1){docWrite("Java not installed / not enabled");};


			//var INFO = pluginResults.getInfo ? pluginResults.getInfo("Java") : null;

			var INFO = null;

			if(pluginResults.getInfo) INFO = pluginResults.getInfo("Java");


			if (INFO && typeof INFO.vendor != "undefined")// verify that INFO object has information
			{

				if (INFO.OTF==0) docWrite("Java detection: completed ON THE FLY (OTF)")
				else if (INFO.OTF==2) docWrite("Java detection: completed NOT ON THE FLY (NOTF)")

				docWrite("Deployment Toolkit browser plugin installed & enabled: " + (INFO.DeploymentToolkitPlugin ? "true" : "false"));

				docWrite("Next-Generation Java Plugin2 installed & enabled: " + (INFO.isPlugin2 ==1 ? "true": (INFO.isPlugin2==-1 ? "false" : "unknown")));

				// INFO.All_versions array lists ALL Java versions found from all sources
				if (INFO.All_versions.length>1) docWrite("Multiple Java versions detected: " + INFO.All_versions.join(" & "));

				if (INFO.vendor.length > 0) docWrite("Java vendor: " + INFO.vendor);

				// Data from navigator.plugins array
				if (INFO.name.length > 0) docWrite("Java plugin name: " + INFO.name);
				if (INFO.description.length > 0) docWrite("Java plugin description: " + INFO.description);
				if (INFO.objectTag!==null)docWrite("Java (using HTML5 compatible <object> tag) installed & enabled: " + (INFO.objectTag>=0?"true":"false") + (INFO.objectTag==0 ? "  [but Javascript/Java bridge was not verified for this tag]" : ""));
				if (INFO.appletTag!==null)docWrite("Java (using <applet> tag) installed & enabled: " + (INFO.appletTag>=0?"true":"false") +(INFO.appletTag==0 ? "  [but Javascript/Java bridge was not verified for this tag]" : ""));

				// For IE, you can also use the
				//  <object> tag with classid="clsid:8AD9C840-044E-11D1-B3E9-00805F499D93"
				// to display a Java applet.
				if (pluginResults.isIE && INFO.objectTagActiveX!==null)docWrite("Java (using <object> tag with Oracle/Sun Java ActiveX) installed & enabled: " + (INFO.objectTagActiveX>=0?"true":"false") +(INFO.objectTagActiveX==0 ? "  [but Javascript/Java bridge was not verified for this tag]" : ""));

				var out, e, x, PLUGIN = INFO.PLUGIN, T =
				["file.encoding", "file.encodinpkg", "file.separator", "java.class.path",
				"java.class.version", "java.compiler", "java.home", "java.io.tmpdir",
				"java.version", "java.vendor", "java.vendor.url", "user.dir", "user.home",
				"java.vm.name", "java.vm.specification.name", "java.vm.specification.vendor",
				"java.vm.specification.version", "java.vm.vendor", "java.vm.version",
				"java.runtime.name", "java.runtime.version", "path.separator", "java.specification.name",
				"java.specification.version", "java.specification.vendor",
				"os.version", "os.name", "os.arch"];

				// Query instantiated Java applet to get extra info
				if (PLUGIN)
				{
				docWrite("");
				docWrite("JAVA APPLET QUERY USING java.lanSystem.getProperty(): ")
				for (x=0;x<T.length;x++)
				{
					out=null;
					try{out = PLUGIN.getProp(T[x]) + " "}
					catch(e){};
					if (typeof out=="string" && out.length>1) docWrite(T[x] + ": " + out);
				};
				docWrite("");
				};

			};

			docWrite("navigator.javaEnabled(): " + navigator.javaEnabled());

			if (pluginResults.isIE) docWrite("ActiveX / ActiveX scripting enabled: " + $pluginResults.ActiveXEnabled);

		}


		
	
		

		function doBrowserCheck()
		{

			//---------------------------------------
			// get browser info
			//---------------------------------------


			var nVer = navigator.appVersion;
			var nAgt = navigator.userAgent;
			browserName  = navigator.appName;
			fullVersion  = ''+parseFloat(navigator.appVersion);
			majorVersion = parseInt(navigator.appVersion,10);
			var nameOffset,verOffset,ix;

			// In Opera, the true version is after "Opera" or after "Version"
			if ((verOffset=nAgt.indexOf("Opera"))!=-1)
			{
				browserName = "Opera";
				fullVersion = nAgt.substring(verOffset+6);
				if ((verOffset=nAgt.indexOf("Version"))!=-1)
				fullVersion = nAgt.substring(verOffset+8);
			}
			// In MSIE, the true version is after "MSIE" in userAgent
			else if ((verOffset=nAgt.indexOf("MSIE"))!=-1)
			{
				browserName = "Microsoft Internet Explorer";
				fullVersion = nAgt.substring(verOffset+5);
			}
			// In Chrome, the true version is after "Chrome"
			else if ((verOffset=nAgt.indexOf("Chrome"))!=-1)
			{
				browserName = "Chrome";
				fullVersion = nAgt.substring(verOffset+7);
			}
			// In Safari, the true version is after "Safari" or after "Version"
			else if ((verOffset=nAgt.indexOf("Safari"))!=-1)
			{
				browserName = "Safari";
				fullVersion = nAgt.substring(verOffset+7);
				if ((verOffset=nAgt.indexOf("Version"))!=-1)
				fullVersion = nAgt.substring(verOffset+8);
			}
			// In Firefox, the true version is after "Firefox"
			else if ((verOffset=nAgt.indexOf("Firefox"))!=-1)
			{
				browserName = "Firefox";
				fullVersion = nAgt.substring(verOffset+8);
			}
			// In most other browsers, "name/version" is at the end of userAgent
			else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) <(verOffset=nAgt.lastIndexOf('/')) )
			{
				browserName = nAgt.substring(nameOffset,verOffset);
				fullVersion = nAgt.substring(verOffset+1);
				if (browserName.toLowerCase()==browserName.toUpperCase())
				{
					browserName = navigator.appName;
				}
			}
			// trim the fullVersion string at semicolon/space if present
			if ((ix=fullVersion.indexOf(";"))!=-1)fullVersion=fullVersion.substring(0,ix);
			if ((ix=fullVersion.indexOf(" "))!=-1)fullVersion=fullVersion.substring(0,ix);

			majorVersion = parseInt(''+fullVersion,10);

			if (isNaN(majorVersion))
			{
				fullVersion  = ''+parseFloat(navigator.appVersion);
				majorVersion = parseInt(navigator.appVersion,10);
			}





			if (navigator.appVersion.indexOf("Win")!=-1) OSName="Windows";
			if (navigator.appVersion.indexOf("Mac")!=-1) OSName="MacOS";
			//if (navigator.appVersion.indexOf("X11")!=-1) OSName="UNIX";
			if (navigator.appVersion.indexOf("Linux")!=-1) OSName="Linux";

			if(debug=="true")
			{
				writeIntoDiv(''
				+'Browser name  = '+browserName+'<br>'
				+'Full version  = '+fullVersion+'<br>'
				+'Major version = '+majorVersion+'<br>'
				+'navigator.appName = '+navigator.appName+'<br>'
				+'navigator.userAgent = '+navigator.userAgent+'<br>'
				)

				writeIntoDiv('Your OS: '+OSName);
			}



		}



		function writeIntoDiv(text)
		{

			var oldHTML = document.getElementById('javaResultContainer').innerHTML;
			document.getElementById('javaResultContainer').innerHTML = ''+ oldHTML + text;

		}



		function doWarnings()
		{

			var javaNotDetected = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Java could not be detected.<br>'
			+'<br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			;


			var javaStillGoodShouldUpdate = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Your version of Java is outdated.<br>'
			+'<br>'
			+'<br>'
			+'Your version is:'+myJavaVersion+'<br>'
			+'The newest version is:'+newestJavaVersionPrettyPrint+'<br>'
			+'<br>'
			+'<br>'
			+'Yours <i>may</i> work, but you should install the newest version.<br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			;


			var	javaMustUpdate	 = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Your version of Java is very outdated.<br>'
			+'<br>'
			+'<br>'
			+'Your version is:'+myJavaVersion+'<br>'
			+'The newest version is:'+newestJavaVersionPrettyPrint+'<br>'
			+'<br>'
			+'<br>'
			+'You have to install the newest version.<br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			;

		//------------------------------
		//mac
		//------------------------------
			var chromeOnMacWarning = ''
			+'<br>'
			+'<b>Uh Oh! You are running Google Chrome on Mac, the trickiest combination!</b><br>'
			+'<br>'
			+'<br>'
			;



			var javaNotDetectedOnChromeOnMacWarning = 	''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Java could not be detected.<br>'
			+'<br>'
			+'<br>'
			+'<b>The newest version of Java does not run on Google Chrome for Mac</b>.<br>'
			+'<br>'
			+'<br>'
			+'(Chrome for Mac is <b>32</b>-bit. Java is <b>64</b>-bit.)<br>'
			+'(Google will fix this soon.)<br>'
			+'<br>'
			+'<br>'
			+'For now, please use the built-in <b>Safari</b> browser, or <a href="http://www.mozilla.org/en-US/firefox/new/">download Firefox</a>.<br>'
			+'<br>'
			+'<br>'
			+'You may still have to install Java after you switch browsers, I have no way to tell from here.<br>'
			+'<br>'
			+'<b>Please try a different browser.</b><br>'
			+'<br>'
			;


			var javaStillGoodShouldUpdateOnChromeOnMac = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Your version of Java is outdated.<br>'
			+'<br>'
			+'<br>'
			+'Your version is:'+myJavaVersion+'<br>'
			+'The newest version is:'+newestJavaVersionPrettyPrint+'<br>'
			+'<br>'
			+'<br>'
			+'Yours <i>may</i> work. <b>Try it first</b> by clicking continue.<br>'
			+'<br>'
			+'<br>'
			+'I\'d like to tell you to download the latest version, however...<br>'
			+'The newest version of Java does <b>not</b> run on Google Chrome for Mac.<br>'
			+'<br>'
			+'(Chrome for Mac is <b>32</b>-bit. Java is <b>64</b>-bit.)<br>'
			+'<br>'
			+'Upgrading your Java will <b>overwrite</b> the current version- <b>preventing Java from working in Chrome at all</b>, however, <b>it will start working in other browsers.</b><br>'
			+'(Google will fix this soon.)<br>'
			+'<br>'
			+'<br>'
			+'If you do upgrade, please use the built-in Apple <b>Safari</b> browser, or <a href="http://www.mozilla.org/en-US/firefox/new/">download Firefox</a>.<br>'
			+'<br>'
			+'<br>'
			;


		//------------------------------
		//linux
		//------------------------------

			var icedTeaWarning = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'You are using the IcedTea/OpenJDK version of Java on Linux.<br>'
			+'This is not compatible with LWJGL and won\'t be fixed until IcedTea 2.0 according to <a href="http://icedtea.classpath.org/wiki/IcedTea-Web#IcedTea-Web_2.0">their roadmap</a>.<br>'
			+'<br>'
			+'You must use the Oracle/Sun JDK instead. Follow all of these steps:<br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'Downloading and installing it: '+'<a href="https://help.ubuntu.com/community/Java#Oracle_Java_7"/a>'+'<br>'
			+'<br>'
			+'Setting the default Java in your system: '+'<a href="https://help.ubuntu.com/community/Java#Choosing_the_default_Java_to_use"/a>'+'<br>'
			+'<br>'
			+'<br>'
			;


		//------------------------------
		//unknown
		//------------------------------

			var unknownOSHasCurrentJava = ''
			+'Couldn\'t determine your OS.<br>'
			+'<br>'
			+'"bob\'s game" uses Java and only runs on Windows, Mac, and Linux so far.<br>'
			+'<br>'
			+'You appear to have Java but it still might not work.<br>'
			+'If you are running Windows, Mac, or Linux and think it\'ll work anyway, go ahead and try.<br>'
			+'<br>'
			;

			var unknownOSHasJavaStillGoodShouldUpdate = ''
			+'Couldn\'t determine your OS.<br>'
			+'<br>'
			+'"bob\'s game" uses Java and only runs on Windows, Mac, and Linux so far.<br>'
			+'<br>'
			+'You appear to have Java but it still might not work.<br>'
			+'If you are running Windows, Mac, or Linux and think it\'ll work anyway, go ahead and try.<br>'
			+'<br>'
			+'Additionally, your version of Java is outdated.<br>'
			+'<br>'
			+'<br>'
			+'Your version is:'+myJavaVersion+'<br>'
			+'The newest version is:'+newestJavaVersionPrettyPrint+'<br>'
			+'<br>'
			+'<br>'
			+'Yours <i>may</i> work, but you should install the newest version.<br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			;


			var	unknownOSHasJavaMustUpdate = ''
			+'Couldn\'t determine your OS.<br>'
			+'<br>'
			+'"bob\'s game" uses Java and only runs on Windows, Mac, and Linux so far.<br>'
			+'<br>'
			+'If you are running Windows, Mac, or Linux and think it\'ll work, go ahead and try.<br>'
			+'<br>'
			+'<br>'
			+'You appear to have Java but it is too old.<br>'
			+'<br>'
			+'<br>'
			+'Your version is:'+myJavaVersion+'<br>'
			+'The newest version is:'+newestJavaVersionPrettyPrint+'<br>'
			+'<br>'
			+'<br>'
			+'You have to install the newest version.<br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			;


			var unknownOSHasNoJava = ''
			+'Couldn\'t determine your OS.<br>'
			+'<br>'
			+'"bob\'s game" uses Java and only runs on Windows, Mac, and Linux so far.<br>'
			+'<br>'
			+'Java could not be detected.<br>'
			+'If you are running Windows, Mac, or Linux try installing Java.<br>'
			+'<br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			;



		//------------------------------
		//windows
		//------------------------------

			var myBrowserBits = '32';

			if(window.navigator.platform=='Win32')myBrowserBits = '32';
			if(window.navigator.platform=='Win64')myBrowserBits = '64';



			var windowsHasJavaStillGoodShouldUpdate = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Your version of Java is outdated.<br>'
			+'<br>'
			+'<br>'
			+'Your version is:'+myJavaVersion+'<br>'
			+'The newest version is:'+newestJavaVersionPrettyPrint+'<br>'
			+'<br>'
			+'<br>'
			+'Yours <i>may</i> work, but you should install the newest version.<br>'
			+'<b>This browser is '+myBrowserBits+'-bit. Make sure to get the '+myBrowserBits+'-bit Java!</b><br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			+'<br>'
			+'P.S. You probably don\'t have to, but it is a good idea to uninstall any old versions of "Sun Java" or "Oracle Java" before installing a new version.<br>'
			+'<br>'
			+'Windows XP: Control Panel -> Add/Remove Programs .<br>'
			+'<br>'
			+'Windows Vista/7/8: Control Panel -> Programs And Features.<br>'
			+'<br>'
			;



			var windowsHasJavaMustUpdate = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Your version of Java is very outdated.<br>'
			+'<br>'
			+'<br>'
			+'Your version is:'+myJavaVersion+'<br>'
			+'The newest version is:'+newestJavaVersionPrettyPrint+'<br>'
			+'<br>'
			+'<br>'
			+'You have to install the newest version.<br>'
			+'<b>This browser is '+myBrowserBits+'-bit. Make sure to get the '+myBrowserBits+'-bit Java!</b><br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			+'<br>'
			+'P.S. You probably don\'t have to, but it is a good idea to uninstall any old versions of "Sun Java" or "Oracle Java" before installing a new version.<br>'
			+'<br>'
			+'Windows XP: Control Panel -> Add/Remove Programs .<br>'
			+'<br>'
			+'Windows Vista/7/8: Control Panel -> Programs And Features.<br>'
			+'<br>'
			;


			var windowsHasNoJava = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Java could not be detected.<br>'
			+'<br>'
			+'<b>This browser is '+myBrowserBits+'-bit. Make sure to get the '+myBrowserBits+'-bit Java!</b><br>'
			+'<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			;



		//------------------------------
		//misc
		//------------------------------


			var installedButNotEnabled = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Java is installed but the plugin is not enabled.<br>'
			+'Please enable the plugin and restart your browser.<br>'
			+'<br>'
			;



			var installedButCantGetVersion = ''
			+'"bob\'s game" uses Java.<br>'
			+'<br>'
			+'Java is installed but the version could not be detected.<br>'
			+'<br>'
			+'You can try proceeding but it might not work.<br>'
			+'<br>'
			+'Get the newest version here just to be safe!<br>'
			+javaDownloadLink
			+'<br>'
			+'<br>'
			;





			//-----------------------------------
			// mac
			//-----------------------------------
			if(OSName=="MacOS")
			{
				if(browserName=="Chrome")
				{

					writeIntoDiv(chromeOnMacWarning);
						writeIntoDiv(javaNotDetectedOnChromeOnMacWarning);
						noWarnings = false;
						
						
						
					// if(myJavaStatus == -1)//Java not installed / not enabled
					// {
						// writeIntoDiv(javaNotDetectedOnChromeOnMacWarning);
						// noWarnings = false;

					// }

					// if(newestJavaStatus != 1)//doesn't have newest Java
					// {
						// if(myJavaStatus == 1)//if java is installed and version is less than newest but still valid
						// {
						
							// writeIntoDiv(javaNotDetectedOnChromeOnMacWarning);
							// writeIntoDiv(javaStillGoodShouldUpdateOnChromeOnMac);
							// writeIntoDiv(clickToContinueHTML);

							// noWarnings = false;
						// }
					// }

				}
				else
				{
					if(myJavaStatus == -1)//Java not installed / not enabled
					{
						writeIntoDiv(javaNotDetected);
						noWarnings = false;
					}

					if(newestJavaStatus != 1)//doesn't have newest Java
					{
						if(myJavaStatus == 1)//if java is installed and version is less than newest but still valid
						{
							writeIntoDiv(javaStillGoodShouldUpdate);
							writeIntoDiv(clickToContinueHTML);
							noWarnings = false;
						}
					}

					if (myJavaStatus == -0.1)//Java installed & enabled but version is < " + minimumJavaVersion
					{
						writeIntoDiv(javaMustUpdate);
						noWarnings = false;
					}

				}



			}


			//-----------------------------------
			// linux
			//-----------------------------------
			if(OSName=="Linux")
			{
				if(
					INFO &&
					(
						INFO.vendor.indexOf("IcedTea")!=-1||
						INFO.vendor.indexOf("OpenJDK")!=-1||
						INFO.name.indexOf("IcedTea")!=-1||
						INFO.name.indexOf("OpenJDK")!=-1||
						INFO.description.indexOf("IcedTea")!=-1||
						INFO.description.indexOf("OpenJDK")!=-1
					)
				)
				{
					writeIntoDiv(icedTeaWarning);
					noWarnings = false;
				}
				else
				{
					if(newestJavaStatus != 1)//doesn't have newest Java
					if(myJavaStatus == 1)//if java is installed and version is less than newest but still valid
					{
						writeIntoDiv(javaStillGoodShouldUpdate);
						writeIntoDiv(clickToContinueHTML);
						noWarnings = false;
					}

					if (myJavaStatus == -0.1)//Java installed & enabled but version is < " + minimumJavaVersion
					{
						writeIntoDiv(javaMustUpdate);
						noWarnings = false;
					}

					if(myJavaStatus == -1)//Java not installed / not enabled
					{

						writeIntoDiv(javaNotDetected);
						noWarnings = false;
					}
				}
			}


			//-----------------------------------
			// unknown
			//-----------------------------------
			if(OSName=="Unknown OS")
			{
				if(newestJavaStatus == 1)//has newest Java
				{

					writeIntoDiv(unknownOSHasCurrentJava);
					writeIntoDiv(clickToContinueHTML);
					noWarnings = false;
				}

				if(newestJavaStatus != 1)//doesn't have newest Java
				if(myJavaStatus == 1)//if java is installed and version is less than newest but still valid
				{

					writeIntoDiv(unknownOSHasJavaStillGoodShouldUpdate);
					writeIntoDiv(clickToContinueHTML);
					noWarnings = false;

				}

				if (myJavaStatus == -0.1)//Java installed & enabled but version is < " + minimumJavaVersion
				{

					writeIntoDiv(unknownOSHasJavaMustUpdate);
					noWarnings = false;
				}

				if(myJavaStatus == -1)//Java not installed / not enabled
				{

					writeIntoDiv(unknownOSHasNoJava);
					noWarnings = false;
				}
			}


			//-----------------------------------
			// windows
			//-----------------------------------
			if(OSName=="Windows")
			{
				if(newestJavaStatus != 1)//doesn't have newest Java
				if(myJavaStatus == 1)//if java is installed and version is less than newest but still valid
				{

					writeIntoDiv(windowsHasJavaStillGoodShouldUpdate);
					writeIntoDiv(clickToContinueHTML);
					noWarnings = false;
				}

				if (myJavaStatus == -0.1)//Java installed & enabled but version is < " + minimumJavaVersion
				{

					writeIntoDiv(windowsHasJavaMustUpdate);
					noWarnings = false;
				}

				if(myJavaStatus == -1)//Java not installed / not enabled
				{

					writeIntoDiv(windowsHasNoJava);
					noWarnings = false;
				}
			}



			//-----------------------------------
			// misc
			//-----------------------------------

			if(myJavaStatus == 0)//java installed but cant tell what version
			{
				writeIntoDiv(installedButCantGetVersion);
				writeIntoDiv(clickToContinueHTML);


				noWarnings = false;

			}

			if(myJavaStatus == -0.2)//installed but not enabled
			{
				writeIntoDiv(installedButNotEnabled);
				noWarnings = false;
			}



		};
		
		