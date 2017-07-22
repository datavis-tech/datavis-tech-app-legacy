This repository contains the Web application deployed at [https://datavis.tech](https://datavis.tech).

# Technology Stack

 * [Semantic-UI-React](https://github.com/Semantic-Org/Semantic-UI-React)
 * [Nextjs](https://github.com/zeit/next.js)
 * [ShareDB](https://github.com/share/sharedb)
 * [Express](https://github.com/expressjs/express)
 * [Passport](http://passportjs.org/)
 * [Redis](https://redis.io/)
 * [MongoDB](https://docs.mongodb.com/getting-started/shell/)

# Getting Started

This section is for getting started with Datavis.tech on your development environment.

First [set up SSH keys](#set-up-ssh-keys), then clone the repository with the following command.

```
git clone git@gitlab.com:curran/data-vis-tech.git
cd datavis-tech
```

The repository uses [Git submodules](https://github.com/blog/2104-working-with-submodules) for static content like images (so the large files don't bloat the main repository). Run the following commands to initialize the Git submodule under `/static`.

```
git submodule init
git submodule update
```

Use NPM to install dependencies. See also [Install Node.js](#install-nodejs).

```
npm install
```

Start Redis and MongoDB locally using the default ports. See also [Install MongoDB](#install-mongodb) and [Install Redis](#install-redis).

Start the server locally for development with:

```
npm start
```

Now access the app at http://localhost:3000/

# Contributing

We use [Milestones](https://gitlab.com/curran/datavis-tech/milestones) to track issues. Take a look there at the current milestone to see what's currently being worked on.

All work should be based on issues. If you're working on something that doesn't have an issue yet, please create a new issue for it and put it in the current milestone.

To work on an issue:

 * Assign yourself to that issue (Under "Assignee", click "Assign yourself"), so others know you're working on it.
 * Create a new branch for your commits on this issue. See also [git: Basic Branching and Merging](https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging).
 * After your first commit to the branch, [create a "Merge Request"](https://docs.gitlab.com/ee/gitlab-basics/add-merge-request.html)
 * Put "WIP" (short for "Work in Progress") in the merge request title if the issue is not resolved yet.
 * For the last commit that closes the issue, e.g. issue #42, put the text "Closes #42" in the commit message. This will cause the issue to be closed automatically when the branch gets merged.
 * When the issue is resolved and the code is ready for review, remove "WIP" from the merge request title.
 * To direct a reviewer's attention to the merge request, add a comment with a "@" mention (which triggers an email notification to be sent), for example "@curran This is ready for review.".

# Production

This section contains detailed information on how to launch the application in production on Amazon Web Services.

## Launching the Virtual Maching

In Amazon EC2, click "launch instance"

 * Select "Ubuntu Server"
 * Select "t2.small" -> "Next: Configure Instance Details"
 * Check "Enable CloudWatch detailed monitoring" -> "Next: Add Storage"
 * Use defaults -> "Next: Add Tags"
 * Click on "Click to add a Name tag", choose a name -> "Next: Configure Security Group"
 * Click "Add rule", select "HTTP" -> "Review and Launch" -> "Launch Instance"

## Assigning the Elastic IP

We map datavis.tech to an Amazon Elastic IP, which can be moved between virtual machines.

To move the IP from one instance to another:

 * Go to "Elastic IPs" on the left
 * Select the Elastic IP 52.2.27.108
 * Click "Actions" -> "Dissociate Address" -> "Dissociate Address"
 * Click "Actions" -> "Associate Address"
 * Select the instance -> "Associate"

After doing this, you can SSH into the server using the following command (replace `secret.pem` with your key file name):

```
ssh -i secret.pem ubuntu@datavis.tech
```

To prepare the maching for installations:

```
sudo apt-get update
```

## Set up SSH Keys

Set up SSH keys for this machine in GitLab, which you'll need in order to clone the repository.

When logged into the virtual machine, generate a new key pair with the following command (use your email):

```
ssh-keygen -t rsa -C "your.email@example.com" -b 4096
```

 * Press enter to accept the default "Enter file in which to save..."
 * Enter a passphrase
 * Copy the text output by `cat ~/.ssh/id_rsa.pub`
 * Go to [https://gitlab.com/curran/datavis-tech](https://gitlab.com/curran/datavis-tech)
 * Click on your avatar in upper right -> "Settings" -> "SSH Keys"
 * Paste the text in the "Key" box -> click "Add Key"

## Clone the Repository

```
git clone git@gitlab.com:curran/datavis-tech.git
cd datavis-tech
```

## Set up SSL Keys (needed for HTTPS & WSS protocols)

After SSHing into the virtual machine (VM), at the home directory:

```
mkdir ssl
```

In the super secret directory with the SSL keys:

```
scp -i secret.pem ./SSL/upload/* ubuntu@datavis.tech:ssl/
```

## Configure NGINX

After SSHing into the machine:

```
sudo apt-get install nginx -y
```

Paste the following configuration into `/etc/nginx/sites-available/default`:

```
upstream app_datavistech {
  server 127.0.0.1:3000;
  keepalive 8;
}

server {
  listen 80 default_server;
  listen [::]:80 default_server;
  server_name _;
  return 301 https://$host$request_uri;
}

server {
  server_name datavis.tech;
  access_log /var/log/nginx/datavistech.log;

  ssl_certificate /home/ubuntu/ssl/dvt_combined.crt;
  ssl_certificate_key /home/ubuntu/ssl/datavis.tech;
  listen 443 ssl;

  location / {
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";

    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-NginX-Proxy true;

    proxy_pass http://app_datavistech/;
    proxy_redirect off;
  }
}
```

```
sudo vim /etc/nginx/sites-available/default
sudo /etc/init.d/nginx restart
tail /var/log/nginx/error.log
```

## Install Node.js

Check the latest version of NVM at [github.com/creationix/nvm](https://github.com/creationix/nvm)

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
source ~/.bashrc
nvm install node
```

## Install Redis

Install Redis, from [Digital Ocean: How to Install and Use Redis](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis).

```
cd ~
sudo apt-get install build-essential -y
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make
sudo make install
cd utils
sudo ./install_server.sh
```

Choose all the default settings.

## Install MongoDB

MongoDB stores the persistent ShareDB documents for this app. Steps from [Install MongoDB Community Edition on Ubuntu](https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/).

```
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
sudo apt-get update
sudo apt-get install mongodb-org -y
sudo service mongod start
```

## Deploy with PM2

```
npm install pm2 -g
pm2 start process.yml
```

Generate a startup script:

```
pm2 startup
```

(follow the directions output there - run the command it generates as sudo)

## Update Deployment

```
git pull
git submodule update
npm install
npm run build
pm2 restart all
```

The above commands are also in `deploy.sh`, which you can run with `sh ./deploy.sh`.

## Using Elastic Block Store

We use [Amazon Elastic Block Store](https://aws.amazon.com/ebs/) for permanent storage of the MongoDB database content.

To set up, in AWS Web UI, create volume, attach to VM (use default of `dev/sdf`).

See also http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-using-volumes.html

```
lsblk
sudo file -s /dev/xvdf # should say "data"
sudo mkfs -t ext4 /dev/xvdf # Only run this if previous command said "data"
sudo mkdir /data
sudo mount /dev/xvdf /data
sudo cp /etc/fstab /etc/fstab.orig
sudo vim /etc/fstab
# paste this: /dev/xvdf       /data   ext4    defaults,nofail        0       2
sudo mount -a

sudo mkdir /data/mongodb
sudo chmod go+w /data/mongodb

sudo service mongod stop
sudo vim /etc/mongod.conf
# default dbPath is:
#   dbPath: /var/lib/mongodb
# change it to:
#   dbPath: /data/mongodb
sudo service mongod start
tail -f /var/log/mongodb/mongod.log
```
