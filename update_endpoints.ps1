Get-ChildItem -Path .\site\src -Recurse -Filter "*.jsx" | 
ForEach-Object {
    (Get-Content $_.FullName) | 
    ForEach-Object {$_ -replace "http://92.63.179.227:8080", "http://localhost:8080"} | 
    Set-Content $_.FullName
}