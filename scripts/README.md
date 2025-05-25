# SlipUp Mobile Android - Infrastructure Automation Scripts

This directory contains automated scripts for setting up and verifying the SlipUp mobile Android infrastructure.

## 📋 Scripts Overview

### 1. `setup-infrastructure.sh` (Linux/Mac)
Automated infrastructure setup script that:
- Creates GitHub repository
- Configures branch protection rules
- Sets up repository secrets for CI/CD
- Initializes local git repository
- Pushes initial code to GitHub

### 2. `setup-infrastructure.ps1` (Windows)
PowerShell version of the setup script with the same functionality as the bash version.

### 3. `verify-infrastructure.sh` (Linux/Mac)
Comprehensive verification script that checks:
- GitHub CLI installation and authentication
- Repository existence and configuration
- Branch protection rules
- Repository secrets
- Local development setup
- Mobile app configuration
- TypeScript and ESLint setup

## 🚀 Quick Start

### Prerequisites
1. **Install GitHub CLI**:
   - Windows: `winget install --id GitHub.cli`
   - Mac: `brew install gh` 
   - Linux: See [GitHub CLI installation](https://github.com/cli/cli#installation)

2. **Authenticate with GitHub**:
   ```bash
   gh auth login
   ```

3. **Install pnpm** (if not already installed):
   ```bash
   npm install -g pnpm
   ```

### For Linux/Mac Users

1. **Make scripts executable**:
   ```bash
   chmod +x scripts/setup-infrastructure.sh
   chmod +x scripts/verify-infrastructure.sh
   ```

2. **Run setup**:
   ```bash
   ./scripts/setup-infrastructure.sh
   ```

3. **Verify setup**:
   ```bash
   ./scripts/verify-infrastructure.sh
   ```

### For Windows Users

1. **Run setup**:
   ```powershell
   .\scripts\setup-infrastructure.ps1
   ```

2. **For verification, use Git Bash or WSL**:
   ```bash
   ./scripts/verify-infrastructure.sh
   ```

## 🔧 What the Setup Script Does

### 1. GitHub Repository Creation
- Creates a new repository named `slipup-mobile`
- Sets up as public repository with MIT license
- Adds Node.js gitignore template

### 2. Branch Protection Configuration
- Protects the `main` branch
- Requires pull request reviews (1 approver)
- Requires status checks to pass:
  - "Mobile Android Build"
  - "Lint and Test"
- Prevents force pushes and deletions
- Dismisses stale reviews

### 3. Repository Secrets Setup
Configures the following secrets for CI/CD:
- `EXPO_TOKEN` - Your Expo access token
- `GROWTHBOOK_CLIENT_KEY` - GrowthBook client key
- `GROWTHBOOK_API_HOST` - GrowthBook API host (default)
- `EXPO_PUBLIC_APP_VERSION` - App version (default: 1.0.0)

### 4. Local Git Configuration
- Initializes git repository (if needed)
- Adds GitHub remote origin
- Creates initial commit with all project files
- Pushes to main branch

## 🔍 Verification Checks

The verification script performs **12 comprehensive checks**:

1. **GitHub CLI** - Installation and authentication
2. **Local Git** - Repository and remote configuration
3. **GitHub Repository** - Existence and accessibility
4. **Branch Protection** - Main branch protection rules
5. **Repository Secrets** - All required secrets configured
6. **Package.json** - Workspace configuration
7. **Mobile App** - Expo and EAS configuration
8. **TypeScript** - Configuration files
9. **Feature Flags** - Implementation and required flags
10. **CI/CD** - GitHub Actions workflows
11. **ESLint** - Mobile-specific linting rules
12. **pnpm** - Workspace functionality

## 🎯 Expected Outcome

After successful setup, you should have:
- ✅ GitHub repository with branch protection
- ✅ All repository secrets configured
- ✅ Local git repository linked to GitHub
- ✅ CI/CD pipeline ready for Android builds
- ✅ Mobile development environment configured

## 🛠️ Troubleshooting

### Common Issues

1. **GitHub CLI not authenticated**:
   ```bash
   gh auth login
   ```

2. **Permission denied on scripts** (Linux/Mac):
   ```bash
   chmod +x scripts/*.sh
   ```

3. **Repository already exists**:
   - The script will ask if you want to continue with existing repo
   - Choose 'y' to proceed with configuration

4. **Branch protection fails**:
   - May need to be configured manually in GitHub UI
   - Go to Settings > Branches in your repository

5. **Secrets setup fails**:
   - Ensure you have admin access to the repository
   - Check GitHub CLI authentication

### Manual Fallback

If automated setup fails, you can configure manually:

1. **Create GitHub repository** via GitHub web interface
2. **Set up branch protection** in repository Settings > Branches
3. **Add secrets** in repository Settings > Secrets and variables > Actions
4. **Configure local git**:
   ```bash
   git init
   git remote add origin https://github.com/USERNAME/slipup-mobile.git
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

## 📞 Support

If you encounter issues:
1. Run the verification script to identify specific problems
2. Check the troubleshooting section above
3. Review GitHub CLI documentation: https://cli.github.com/manual/
4. Ensure all prerequisites are properly installed

## 🎉 Next Steps

Once infrastructure is set up:
1. **Install dependencies**: `pnpm install`
2. **Start development**: `cd apps/mobile && expo start`
3. **Build Android**: `cd apps/mobile && eas build --platform android --profile preview`
4. **Proceed to Stage 1** of the SlipUp development process 