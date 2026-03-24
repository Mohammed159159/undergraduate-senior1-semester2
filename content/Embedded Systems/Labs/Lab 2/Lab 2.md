- [[Registers]]
> [!success] Fix `CubeMX` cannot be found although it is installed
> Paste the following code in a `.reg` file and open it
> ```reg
> Windows Registry Editor Version 5.00
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\STM32CubeMX.exe]
@="C:\Users\Mohammed Hany\AppData\Local\Programs\STM32CubeMX"
"C:\Users\Mohammed Hany\AppData\Local\Programs\STM32CubeMX"
[HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\App Paths\STM32CubeMX.exe]
@="C:\Users\Mohammed Hany\AppData\Local\Programs\STM32CubeMX"
"C:\Users\Mohammed Hany\AppData\Local\Programs\STM32CubeMX"
> ```

