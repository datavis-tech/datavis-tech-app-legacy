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

```
git clone git@gitlab.com:curran/data-vis-tech.git
cd datavis-tech
```

The repository uses [Git submodules](https://github.com/blog/2104-working-with-submodules) for static content like images (so the large files don't bloat the main repository).

```
git submodule init
git submodule update
```

Use NPM to install dependencies.

```
npm install
```

Start Redis and MongoDB locally using the default ports.

Start the server locally for development with:

```
npm start
```

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

## Set up SSH Keys & Clone the Repository

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

Clone the repository:

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
