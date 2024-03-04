Dim WinScriptHost
Set WinScriptHost = CreateObject("WScript.Shell")
WinScriptHost.Run Chr(34) & "E:\programing\projects\donate_manger\Server\dist\start.bat" & Chr(34), 0
Set WinScriptHost = Nothing