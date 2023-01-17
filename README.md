# Server
##Deployment
Spin up 20.04 EC2 (micro is fine)
```
sudo apt update
sudo apt upgrade
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
nvm install 16.18.0
git clone this repo
npm install
```
Create .env file according to sample with spotify app details
```
npm run start
```
