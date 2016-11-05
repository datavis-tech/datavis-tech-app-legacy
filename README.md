This is the repository for the [datavis.tech](datavis.tech) Web application.

# Client

The client portion was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). See the [Create React App Guide](https://github.com/facebookincubator/create-react-app/blob/master/template/README.md) for documentation.

# Server

```
# Install dependencies
cd datavis-tech
npm install

# Set up NGINX proxy server on port 80 that forwards to ports 8080 and 3000.
sudo apt-get install nginx
sudo cp ./nginx.conf /etc/nginx/sites-enabled/default
sudo service nginx restart

# Start the API server on port 8080 (in the background)
npm run serve &

# Start the WebPack dev server on port 3000
npm start

```

References:

 * [Example Node Server w/ Babel](https://github.com/babel/example-node-server)
 * [NGINX Beginners Guide: Setting Up a Simple Proxy Server](http://nginx.org/en/docs/beginners_guide.html#proxy)

# Workflow

There is a Git submodule for static assets, so when you first check out the repository, the following commands are necessary:

```
git@gitlab.com:curran/datavis-tech.git
git submodule init
git submodule update
```
