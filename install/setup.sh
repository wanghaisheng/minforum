#!/bin/bash

# Function to check if RethinkDB exists
check_rethinkdb_installed() {
    if command -v rethinkdb &> /dev/null; then
        echo "RethinkDB is already installed. Skipping installation."
        return 0
    else
        echo "RethinkDB not found. Proceeding with installation."
    fi
}

# Function to install RethinkDB on macOS using Homebrew
install_on_macos() {
    echo "Installing RethinkDB on macOS..."
    # Check if Homebrew is installed 
    if ! command -v brew &> /dev/null; then
        echo "Homebrew not found. Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi

    # Install RethinkDB
    brew install rethinkdb
    rethinkdb --bind all &> /dev/null &
}

# Function to install RethinkDB on Debian-based systems (Ubuntu, Debian)
install_on_debian() {
    sudo apt-get update

    echo "Installing RethinkDB on Debian-based system..."

    # Add RethinkDB official repository
    echo "Adding RethinkDB repository..."
    source /etc/os-release
    codename=$(lsb_release -c -s) # Get the codename for the distro (e.g., bionic, focal)

    echo "deb https://download.rethinkdb.com/repository/debian/ $codename main" | sudo tee /etc/apt/sources.list.d/rethinkdb.list
    wget -qO- https://download.rethinkdb.com/repository/raw/pubkey.gpg | sudo apt-key add -

    # Update package lists and install RethinkDB
    sudo apt-get update
    sudo apt-get install -y rethinkdb
    rethinkdb --bind all &> /dev/null &
}

# Function to install RethinkDB on Fedora-based systems
install_on_fedora() {
    echo "Installing RethinkDB on Fedora-based system..."

    # Add RethinkDB official repository
    sudo tee /etc/yum.repos.d/rethinkdb.repo <<EOF
[rethinkdb]
name=RethinkDB
baseurl=https://download.rethinkdb.com/repository/fedora/\$releasever/\$basearch/
enabled=1
gpgcheck=0
EOF

    # Install RethinkDB
    sudo dnf install -y rethinkdb
    rethinkdb --bind all &> /dev/null &
}

# Function to install Nginx
install_nginx() {
    echo "Installing Nginx..."
    if command -v nginx &> /dev/null; then
        echo "Nginx is already installed. Skipping installation."
    else
        # Install Nginx
        if [[ "$(uname)" == "Darwin" ]]; then
            brew install nginx
        elif [[ -f /etc/os-release ]]; then
            . /etc/os-release
            if [[ "$ID" == "debian" || "$ID_LIKE" == *"debian"* ]]; then
                sudo apt-get update
                sudo apt-get install -y nginx
            elif [[ "$ID" == "fedora" || "$ID_LIKE" == *"fedora"* ]]; then
                sudo dnf install -y nginx
            else
                echo "Unsupported Linux distribution for Nginx installation."
                return 1
            fi
        else
            echo "Unknown OS for Nginx installation."
            return 1
        fi
        echo "Nginx installed successfully."
    fi
}

# Function to install Node.js
install_nodejs() {
    echo "Installing Node.js..."
    if command -v node &> /dev/null; then
        echo "Node.js is already installed. Skipping installation."
    else
        # Install Node.js using nvm (Node Version Manager)
        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
        export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        nvm install node
        echo "Node.js installed successfully."
    fi
}

# Function to install global npm packages
install_global_npm_packages() {
    echo "Installing global npm packages..."
    if command -v yarn &> /dev/null; then
        echo "Yarn is already installed. Skipping installation."
    else
        # Install Yarn using npm (which comes with Node.js)
        npm install -g yarn pm2 nodemon
        echo "Yarn installed successfully."
    fi
}



# Detect the OS and install RethinkDB accordingly
detect_os_and_install() {
    uname_out="$(uname)"
    if [[ "$uname_out" == "Darwin" ]]; then
        install_on_macos
    elif [[ -f /etc/os-release ]]; then
        . /etc/os-release
        if [[ "$ID" == "debian" || "$ID_LIKE" == *"debian"* ]]; then
            install_on_debian
        elif [[ "$ID" == "fedora" || "$ID_LIKE" == *"fedora"* ]]; then
            install_on_fedora
        else
            echo "Unsupported Linux distribution."
            return 1
        fi
    else
        echo "Unknown OS."
        return 1
    fi
}

# Function to set up the project
setup_project() {
    # Step 1: Download the zip file using curl
    #
    cd /var/www/html

    echo "Downloading minforum project..."
    curl -L -o minforum.zip https://github.com/minforum/minforum/archive/refs/tags/v1.18.7.zip

    # Step 2: Unzip into a temporary directory
    echo "Unzipping minforum project..."
    unzip minforum.zip -d minforum_temp

    # Step 3: Create the 'minforum' folder and move the contents into it
    echo "Setting up minforum directory..."
    mkdir -p minforum
    mv minforum_temp/minforum-1.18.7/* minforum/

    # Step 4: Clean up the temporary folder and zip file
    echo "Cleaning up temporary files..."
    rm -rf minforum_temp
    rm minforum.zip

    # Step 5: Navigate into the minforum directory and run yarn setup and yarn live
    echo "Setting up the project..."
    cd minforum
    yarn setup
    yarn live
}

# Main execution
check_rethinkdb_installed
detect_os_and_install
install_nginx
install_nodejs
install_global_npm_packages
setup_project
