#!/bin/bash

server_setup() {
  # Check if yarn is installed, if not, install it globally
  if ! command -v yarn &> /dev/null; then
    echo "Yarn not found. Installing yarn..."
    npm i -g yarn || { echo "Failed to install yarn. Exiting..."; exit 1; }
  fi

  # Install dependencies
  echo "Installing dependencies..."
  yarn install || { echo "Failed to install dependencies. Exiting..."; exit 1; }

  # Empty the .env file
  echo "Configuring environment variables..."
  echo "" > .env.local

  # Generate hash for API key
  md5="min-forum-random-hash"
  hash="$(echo -n "$md5" | openssl rand -hex 20)"

  # Insert values into .env file
  cat << EOF >> .env
DEFAULT_PORT="2323"
DB_HOST="localhost"
DB_NAME="min-forum"
DB_PORT="28015"
GEO_URL="https://get.geojs.io/v1/ip/geo"

NEXT_PUBLIC_API_URL="/api"
NEXT_PUBLIC_API_KEY="$hash"
NEXT_PUBLIC_CLIENT_ORIGINS="localhost:2323"
NEXT_PUBLIC_BASE_URL="localhost:2323"
EOF

  # Prompt for domain or subdomain
  echo -n "Enter domain or subdomain: "
  read domain

  # Configure Nginx
  echo "Configuring Nginx..."
  cat << EOF | sudo tee /etc/nginx/sites-available/min-forum.conf > /dev/null
server {
    listen 80;
    server_name $domain;

    location / {
        proxy_pass             http://127.0.0.1:2323;
        proxy_read_timeout     60;
        proxy_connect_timeout  60;
        proxy_redirect         off;

        # Allow the use of websockets
        proxy_http_version 1.1;
        proxy_set_header Upgrade "\$http_upgrade";
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }

    location ^~ /storage/ {
        alias /var/www/html/min-forum/public/storage/;
        sendfile           on;
        sendfile_max_chunk 5m;
    }
}
EOF

  # Create symbolic link for Nginx configuration
  sudo ln -sf /etc/nginx/sites-available/min-forum.conf /etc/nginx/sites-enabled/min-forum.conf

  # Test Nginx configuration
  echo "Testing Nginx configuration..."
  sudo nginx -t || { echo "Nginx configuration test failed. Exiting..."; exit 1; }

  # Restart Nginx to apply changes
  echo "Restarting Nginx..."
  sudo systemctl restart nginx || { echo "Failed to restart Nginx. Exiting..."; exit 1; }

  echo "Server setup completed successfully!"
}

# Function to display a loader (spinning animation)
show_loader() {
  local pid=$!
  local spin='-\|/'
  local i=0
  while kill -0 $pid 2>/dev/null; do
    i=$(( (i+1) % 4 ))
    printf "\r%s" "${spin:$i:1}"
    sleep 0.1
  done
  printf "\r" # Clear the loader
}

# Function to run commands silently
run_silently() {
  echo "Starting server setup..."
  server_setup &> /dev/null &
  show_loader
}

# Execute the script
run_silently

# Success message with folder path and instructions
echo "===================================================="
echo "Setup completed!"
echo "min-forum has been set up successfully!"
echo "Project folder: $(pwd)"
echo "To access your application, go to: http://$domain"
echo "===================================================="