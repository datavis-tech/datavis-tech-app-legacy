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

# References

 * [Example Node Server w/ Babel](https://github.com/babel/example-node-server)
 * [NGINX Beginners Guide: Setting Up a Simple Proxy Server](http://nginx.org/en/docs/beginners_guide.html#proxy)
