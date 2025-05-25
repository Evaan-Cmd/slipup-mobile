# SlipUp Mobile Android - Infrastructure Setup Automation (PowerShell)
# This script automates GitHub repository setup and configuration for Windows

param(
    [string]$RepoName = "slipup-mobile",
    [string]$RepoDescription = "SlipUp Mobile Android App - React Native with Expo",
    [string]$DefaultBranch = "main"
)

# Set error action preference
$ErrorActionPreference = "Stop"

Write-Host "🚀 SlipUp Mobile Android - Infrastructure Setup" -ForegroundColor Cyan
Write-Host "=================================================" -ForegroundColor Cyan

# Function to print colored output
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Check if GitHub CLI is installed
function Test-GitHubCLI {
    Write-Status "Checking GitHub CLI installation..."
    
    if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
        Write-Error "GitHub CLI is not installed. Please install it first:"
        Write-Host "  - Windows: winget install --id GitHub.cli" -ForegroundColor White
        Write-Host "  - Or download from: https://github.com/cli/cli#installation" -ForegroundColor White
        exit 1
    }
    
    # Check if user is authenticated
    try {
        gh auth status 2>$null
        Write-Success "GitHub CLI is installed and authenticated"
    }
    catch {
        Write-Warning "Please authenticate with GitHub CLI first:"
        Write-Host "  gh auth login" -ForegroundColor White
        exit 1
    }
}

# Create GitHub repository
function New-GitHubRepository {
    Write-Status "Creating GitHub repository..."
    
    # Check if repo already exists
    try {
        gh repo view $RepoName 2>$null
        Write-Warning "Repository '$RepoName' already exists"
        $continue = Read-Host "Do you want to continue with existing repo? (y/n)"
        if ($continue -notmatch '^[Yy]$') {
            exit 1
        }
    }
    catch {
        # Create new repository
        gh repo create $RepoName `
            --description $RepoDescription `
            --public `
            --clone=false `
            --gitignore=Node `
            --license=MIT
        
        $repoOwner = gh api user --jq .login
        Write-Success "Repository created: https://github.com/$repoOwner/$RepoName"
    }
}

# Configure branch protection
function Set-BranchProtection {
    Write-Status "Setting up branch protection for '$DefaultBranch'..."
    
    # Get the repository owner
    $repoOwner = gh api user --jq .login
    
    # Configure branch protection using GitHub CLI
    try {
        # Simplified branch protection configuration
        $protectionConfig = @"
{
  "required_status_checks": {
    "strict": true,
    "contexts": ["Mobile Android Build", "Lint and Test"]
  },
  "enforce_admins": true,
  "required_pull_request_reviews": {
    "required_approving_review_count": 1,
    "dismiss_stale_reviews": true
  },
  "restrictions": null,
  "allow_force_pushes": false,
  "allow_deletions": false
}
"@
        
        # Create a temporary file for the JSON data
        $tempFile = [System.IO.Path]::GetTempFileName()
        $protectionConfig | Out-File -FilePath $tempFile -Encoding UTF8 -NoNewline
        
        # Use the temporary file with GitHub CLI
        gh api repos/$repoOwner/$RepoName/branches/$DefaultBranch/protection `
            --method PUT `
            --input $tempFile
        
        # Clean up temporary file
        Remove-Item $tempFile -Force
        
        Write-Success "Branch protection configured for '$DefaultBranch'"
    }
    catch {
        Write-Warning "Branch protection setup failed - may need to be done manually"
        Write-Host "You can set this up manually in GitHub repository Settings > Branches" -ForegroundColor Yellow
    }
}

# Set up repository secrets
function Set-RepositorySecrets {
    Write-Status "Setting up repository secrets..."
    
    Write-Host ""
    Write-Host "Please provide the following secrets for CI/CD:" -ForegroundColor Yellow
    Write-Host "================================================" -ForegroundColor Yellow
    
    $expoToken = Read-Host "Enter your Expo token (from expo.dev)" -AsSecureString
    $expoTokenPlain = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($expoToken))
    
    $growthbookKey = Read-Host "Enter your GrowthBook client key"
    
    # Set secrets using GitHub CLI (correct syntax: -b for body)
    gh secret set EXPO_TOKEN -b $expoTokenPlain
    gh secret set GROWTHBOOK_CLIENT_KEY -b $growthbookKey
    gh secret set GROWTHBOOK_API_HOST -b "https://cdn.growthbook.io"
    gh secret set EXPO_PUBLIC_APP_VERSION -b "1.0.0"
    
    Write-Success "Repository secrets configured"
}

# Configure git user if not set
function Set-GitUser {
    try {
        git config user.name 2>$null
        git config user.email 2>$null
    }
    catch {
        Write-Status "Configuring git user..."
        $userName = Read-Host "Enter your Git username"
        $userEmail = Read-Host "Enter your Git email"
        
        git config --global user.name $userName
        git config --global user.email $userEmail
        
        Write-Success "Git user configured"
    }
}

# Set up local git repository
function Initialize-LocalGit {
    Write-Status "Setting up local git repository..."
    
    # Configure git user if needed
    Set-GitUser
    
    # Initialize git if not already done
    if (-not (Test-Path ".git")) {
        git init
        Write-Success "Git repository initialized"
    }
    
    # Get repository URL
    $repoOwner = gh api user --jq .login
    $repoUrl = "https://github.com/$repoOwner/$RepoName.git"
    
    # Add remote origin if not exists
    try {
        git remote get-url origin 2>$null
        Write-Warning "Remote origin already exists"
    }
    catch {
        git remote add origin $repoUrl
        Write-Success "Remote origin added: $repoUrl"
    }
    
    # Create and checkout main branch
    git checkout -b $DefaultBranch 2>$null
    
    # Add all files
    git add .
    
    $commitMessage = @"
feat: initial SlipUp mobile Android setup

- Add Expo React Native configuration
- Add feature flags with GrowthBook
- Add CI/CD pipeline for Android builds
- Add TypeScript and ESLint configuration
- Mobile Android focused development setup
"@
    
    try {
        git commit -m $commitMessage
        Write-Success "Initial commit created"
    }
    catch {
        Write-Warning "Nothing to commit or commit failed"
    }
    
    # Push to remote
    try {
        git push -u origin $DefaultBranch
        Write-Success "Local git repository configured and pushed"
    }
    catch {
        Write-Warning "Push failed - may need manual intervention"
        Write-Host "You can push manually with: git push -u origin $DefaultBranch" -ForegroundColor Yellow
    }
}

# Main execution
function Main {
    Write-Status "Starting SlipUp Mobile Android infrastructure setup..."
    
    # Pre-flight checks
    Test-GitHubCLI
    
    # Setup steps
    New-GitHubRepository
    Set-BranchProtection
    Set-RepositorySecrets
    Initialize-LocalGit
    
    Write-Host ""
    Write-Success "🎉 Infrastructure setup completed!"
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    $repoOwner = gh api user --jq .login
    Write-Host "1. Verify repository at: https://github.com/$repoOwner/$RepoName" -ForegroundColor White
    Write-Host "2. Run: pnpm install" -ForegroundColor White
    Write-Host "3. Run: cd apps/mobile && expo start" -ForegroundColor White
    Write-Host "4. Test Android build: cd apps/mobile && eas build --platform android --profile preview" -ForegroundColor White
    Write-Host ""
}

# Run main function
Main 