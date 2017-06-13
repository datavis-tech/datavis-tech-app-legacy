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
cd data-vis-tech/
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

SSH into the server using the following command (replace `secret.pem` with your key file name):

```
ssh -i secret.pem ubuntu@datavis.tech
```

## Assigning the Elastic IP

We map datavis.tech to an Amazon Elastic IP, which can be moved between virtual machines.

To move the IP from one instance to another:

 * Go to "Elastic IPs" on the left
 * Select the Elastic IP 52.2.27.108
 * Click "Actions" -> "Dissociate Address" -> "Dissociate Address"
 * Click "Actions" -> "Associate Address"
 * Select the instance -> "Associate"
