This is the repository for the [datavis.tech](datavis.tech) Web application.

The client portion was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). See the [Create React App Guide](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) for documentation.

# Initial Setup

First, clone the repository.

```
git clone git@gitlab.com:curran/datavis-tech.git
cd datavis-tech
```

There is a Git submodule for static assets under `/public`. Initialize it as follows:

```
git submodule init
git submodule update
```

Install dependencies.

```
npm install
```

## NGINX

Set up the NGINX proxy server. This configuration:

 * serves on port 80,
 * proxies requests under `/api` to the API server running on port 8080,
 * proxies all other requests to the Webpack dev server running on port 3000,
 * supports WebSockets for the dev server live-reloading, and
 * supports WebSockets API connections under `/api`.

```
sudo apt-get install nginx
sudo cp ./nginx.conf /etc/nginx/sites-enabled/default
sudo service nginx restart
```

## Redis

Redis is used for two things in this app:

 * Storing Express user sessions
 * Providing Publish/Subscribe functionality for ShareDB

Install Redis, from [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis](Digital Ocean: How to Install and Use Redis).

```
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make
sudo make install
cd utils
sudo ./install_server.sh
```

Choose all the default settings.

## MongoDB

MongoDB stores the persistent ShareDB documents for this app.

Install MongoDB, from [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/).

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

## Starting the Server

Start the API server on port 8080 (in the background).

```
npm run serve &
```

Start the WebPack dev server on port 3000.
```
npm start
```

The tab opened by `npm start` will be broken, as it is using port 3000 and does not have access to the API server.

Access [http://localhost](http://localhost). Note that this is running on port 80, which is proxied by NGINX to both the dev server and API server.

# Production Setup

On a fresh Ubuntu instance on AWS:

```bash
ssh -i cy.pem ubuntu@ec2-52-53-180-21.us-west-1.compute.amazonaws.com

sudo apt-get update
sudo apt-get install build-essential git nginx -y

wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash
source .bashrc 
nvm install stable

# See https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install -y mongodb-org

# from https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make
sudo make install
cd utils
sudo ./install_server.sh

# setup GitLab SSH key
ssh-keygen -t rsa -C "curran.kelleher@gmail.com"
cat ~/.ssh/id_rsa.pub

git clone git@gitlab.com:curran/datavis-tech.git
cd datavis-tech
npm install

npm install pm2 -g
pm2 start process.json
pm2 startup

# Deploying new code
ssh -i nv.pem ubuntu@datavis.tech
cd datavis-tech
git pull
npm install
pm2 reload all

# Using an EBS volume for MongoDB storage
# see http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html
lsblk
sudo file -s /dev/xvdf
sudo mkdir /data
sudo mount /dev/xvdf /data
sudo cp /etc/fstab /etc/fstab.orig
sudo vim /etc/fstab
# paste this: /dev/xvdf       /data   ext4    defaults,nofail        0       2
sudo mount -a

sudo service mongod stop
sudo vim /etc/mongod.conf
# default is: /var/lib/mongodb
#   dbPath: /data/mongodb
sudo service mongod start
tail -f /var/log/mongodb/mongod.log

# To transfer between VMs
# Old VM
sudo service mongod stop
sudo umount /data
```

# References

 * [Example Node Server w/ Babel](https://github.com/babel/example-node-server)
 * [NGINX Beginners Guide: Setting Up a Simple Proxy Server](http://nginx.org/en/docs/beginners_guide.html#proxy)
