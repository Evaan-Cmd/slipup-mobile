#!/bin/bash

# SlipUp Mobile Android - Infrastructure Setup Automation
# This script automates GitHub repository setup and configuration

set -e

echo "🚀 SlipUp Mobile Android - Infrastructure Setup"
echo "================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
REPO_NAME="slipup-mobile"
REPO_DESCRIPTION="SlipUp Mobile Android App - React Native with Expo"
DEFAULT_BRANCH="main"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if GitHub CLI is installed
check_gh_cli() {
    if ! command -v gh &> /dev/null; then
        print_error "GitHub CLI is not installed. Please install it first:"
        echo "  - Windows: winget install --id GitHub.cli"
        echo "  - Mac: brew install gh"
        echo "  - Linux: https://github.com/cli/cli#installation"
        exit 1
    fi
    
    # Check if user is authenticated
    if ! gh auth status &> /dev/null; then
        print_warning "Please authenticate with GitHub CLI first:"
        echo "  gh auth login"
        exit 1
    fi
    
    print_success "GitHub CLI is installed and authenticated"
}

# Create GitHub repository
create_github_repo() {
    print_status "Creating GitHub repository..."
    
    # Check if repo already exists
    if gh repo view "$REPO_NAME" &> /dev/null; then
        print_warning "Repository '$REPO_NAME' already exists"
        read -p "Do you want to continue with existing repo? (y/n): " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            exit 1
        fi
    else
        # Create new repository
        gh repo create "$REPO_NAME" \
            --description "$REPO_DESCRIPTION" \
            --public \
            --clone=false \
            --gitignore=Node \
            --license=MIT
        
        print_success "Repository created: https://github.com/$(gh api user --jq .login)/$REPO_NAME"
    fi
}

# Configure branch protection
setup_branch_protection() {
    print_status "Setting up branch protection for '$DEFAULT_BRANCH'..."
    
    # Get the repository owner
    REPO_OWNER=$(gh api user --jq .login)
    
    # Configure branch protection using GitHub CLI
    cat <<EOF | gh api repos/"$REPO_OWNER"/"$REPO_NAME"/branches/"$DEFAULT_BRANCH"/protection \
        --method PUT \
        --input - || print_warning "Branch protection setup failed - may need to be done manually"
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
EOF
    
    print_success "Branch protection configured for '$DEFAULT_BRANCH'"
}

# Set up repository secrets
setup_repository_secrets() {
    print_status "Setting up repository secrets..."
    
    # Read secrets from user input
    echo ""
    echo "Please provide the following secrets for CI/CD:"
    echo "================================================"
    
    read -p "Enter your Expo token (from expo.dev): " -s EXPO_TOKEN
    echo
    read -p "Enter your GrowthBook client key: " GROWTHBOOK_CLIENT_KEY
    echo
    
    # Set secrets using GitHub CLI (correct syntax: -b for body)
    gh secret set EXPO_TOKEN -b "$EXPO_TOKEN"
    gh secret set GROWTHBOOK_CLIENT_KEY -b "$GROWTHBOOK_CLIENT_KEY"
    gh secret set GROWTHBOOK_API_HOST -b "https://cdn.growthbook.io"
    gh secret set EXPO_PUBLIC_APP_VERSION -b "1.0.0"
    
    print_success "Repository secrets configured"
}

# Configure git user if not set
setup_git_user() {
    if ! git config user.name &> /dev/null || ! git config user.email &> /dev/null; then
        print_status "Configuring git user..."
        read -p "Enter your Git username: " GIT_USER_NAME
        read -p "Enter your Git email: " GIT_USER_EMAIL
        
        git config --global user.name "$GIT_USER_NAME"
        git config --global user.email "$GIT_USER_EMAIL"
        
        print_success "Git user configured"
    fi
}

# Set up local git repository
setup_local_git() {
    print_status "Setting up local git repository..."
    
    # Configure git user if needed
    setup_git_user
    
    # Initialize git if not already done
    if [ ! -d ".git" ]; then
        git init
        print_success "Git repository initialized"
    fi
    
    # Get repository URL
    REPO_OWNER=$(gh api user --jq .login)
    REPO_URL="https://github.com/$REPO_OWNER/$REPO_NAME.git"
    
    # Add remote origin if not exists
    if ! git remote get-url origin &> /dev/null; then
        git remote add origin "$REPO_URL"
        print_success "Remote origin added: $REPO_URL"
    else
        print_warning "Remote origin already exists"
    fi
    
    # Create and checkout main branch
    git checkout -b "$DEFAULT_BRANCH" 2>/dev/null || git checkout "$DEFAULT_BRANCH"
    
    # Add all files
    git add .
    git commit -m "feat: initial SlipUp mobile Android setup

- Add Expo React Native configuration
- Add feature flags with GrowthBook
- Add CI/CD pipeline for Android builds
- Add TypeScript and ESLint configuration
- Mobile Android focused development setup" || print_warning "Nothing to commit"
    
    # Push to remote
    git push -u origin "$DEFAULT_BRANCH" || print_warning "Push failed - may need manual intervention"
    
    print_success "Local git repository configured and pushed"
}

# Main execution
main() {
    print_status "Starting SlipUp Mobile Android infrastructure setup..."
    
    # Pre-flight checks
    check_gh_cli
    
    # Setup steps
    create_github_repo
    setup_branch_protection
    setup_repository_secrets
    setup_local_git
    
    echo ""
    print_success "🎉 Infrastructure setup completed!"
    echo ""
    echo "Next steps:"
    echo "1. Verify repository at: https://github.com/$(gh api user --jq .login)/$REPO_NAME"
    echo "2. Run: pnpm install"
    echo "3. Run: cd apps/mobile && expo start"
    echo "4. Test Android build: cd apps/mobile && eas build --platform android --profile preview"
    echo ""
}

# Run main function
main "$@" 