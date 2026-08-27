Set shell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")
currentDir = fso.GetParentFolderName(WScript.ScriptFullName)
shell.CurrentDirectory = currentDir
shell.Run "cmd /c start_proyecto.bat", 0, False
MsgBox "Iniciando aplicacion... Por favor espere unos segundos.", vbInformation, "UTN FullTech"

