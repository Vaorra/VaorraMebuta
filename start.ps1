$prefix = "[Start-Script]"
function Start-NodeProcess {
    foreach ($file in (Get-ChildItem -Recurse)) {
        if ($file.FullName -like '*index.mjs') {
            Write-Host $prefix "Executing $($file.Name)" -ForegroundColor Blue
            $command = "node --experimental-modules '" + $file.FullName + "'"
            Invoke-Expression $command
            Write-Host $prefix "Successfully executed" -ForegroundColor Green
            return
        }
    }
    Write-Host $prefix 'No index.mjs file found' -ForegroundColor Red
}

Start-NodeProcess