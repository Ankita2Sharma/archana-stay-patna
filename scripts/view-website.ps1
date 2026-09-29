$ErrorActionPreference = 'Stop'

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot "..")).Path
$appDir = Join-Path $repoRoot "artifacts\archana-stay"
$hostName = "0.0.0.0"
$port = 4173
$gitBin = Join-Path $env:ProgramFiles "Git\bin"

Write-Host "Starting Archana Stay website preview..."
Write-Host "Repo root: $repoRoot"

if (Test-Path $gitBin) {
    $env:PATH = "$gitBin;$env:PATH"
}

$pnpmCommand = Get-Command pnpm -ErrorAction SilentlyContinue
if (-not $pnpmCommand) {
    if (Get-Command corepack -ErrorAction SilentlyContinue) {
        Write-Host "Enabling pnpm via Corepack..."
        corepack enable
        corepack prepare pnpm@latest --activate
    } else {
        Write-Host "Installing pnpm via npm..."
        npm install -g pnpm
    }
}

if (Test-Path (Join-Path $repoRoot "node_modules")) {
    Write-Host "Removing stale workspace install..."
    Remove-Item (Join-Path $repoRoot "node_modules") -Recurse -Force
}

$rootPackageJsonPath = Join-Path $repoRoot "package.json"
$rootPackageJson = Get-Content -Raw -Path $rootPackageJsonPath | ConvertFrom-Json
if (-not $rootPackageJson.devDependencies."@rollup/rollup-win32-x64-msvc") {
    Write-Host "Installing Windows Rollup native dependency..."
    pnpm add -Dw @rollup/rollup-win32-x64-msvc
}

Write-Host "Installing workspace dependencies..."
Set-Location $repoRoot
pnpm install
pnpm approve-builds --all
pnpm install

Set-Location $appDir
$env:PORT = "$port"
$env:BASE_PATH = "/"
$env:NODE_ENV = "development"
Write-Host "Opening local preview at http://localhost:$port"
pnpm dev --host $hostName --port $port
