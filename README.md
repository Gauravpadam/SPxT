# BorderlessBiz
![BorderlessBiz logo](assets/logo-theme.png)
Simplifying cross-border regulations for e-commerce sellers

## Live Deployment
The solution is E2E deployed and hosted on AWS, You can access it using the following link:
http://smbhavfrontend.s3-website-us-east-1.amazonaws.com/

## To run this application locally
1. Install and setup docker
  ### On Windows
  1. Download Docker Desktop: [Docker Desktop](https://www.docker.com/products/docker-desktop).
  2. Install and enable WSL 2 during setup.
  3. Launch Docker Desktop and verify with docker --version.

  ### On macOS
  1. Download Docker Desktop: [Docker Desktop](https://www.docker.com/products/docker-desktop).
  2. Install by dragging Docker to Applications.
  3. Launch Docker Desktop and verify with docker --version.

  ### Linux
  1. Add Docker's official GPG key:
  ```
  sudo apt-get update
  sudo apt-get install ca-certificates curl
  sudo install -m 0755 -d /etc/apt/keyrings
  sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
  sudo chmod a+r /etc/apt/keyrings/docker.asc
  ```

  2. Add the repository to Apt sources:
  ```
  echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
    $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update
  ```

  3. Use the following command to install latest version:
  ```
  sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
  ```

2. Check the installation by running
  ```
  docker-compose --version
  ```

3. Set env variables by changing `.env.sample` files in root directory and frontend directory

4. Navigate to the root of the project and run:
  ```
  docker-compose --profile dev up --build
  ```
