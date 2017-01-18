datavis-tech
=============


# datavis-tech-app

The proprietary codebase of the Datavis.tech Web application.

This application is built using the [Derby framework](https://github.com/derbyjs/derby), and was started from [generator-derby](https://github.com/derbyparty/generator-derby). To get an overview of the directory structure, run the command `tree -I node_modules`.

# Features for 1.0

See [issue: Release 1.0 #14](https://github.com/datavis-tech/datavis-tech-app/issues/14) for progress status.

This Web application allows users to collaboratively create and evolve interactive data visualizations. Users may log in and manage their own collection of documents and access documents they are added as collaborators on. A "document" may be either a dataset or a visualization. Features common to all documents include:

 * Real-time synchronization - Anyone viewing a document will see the latest changes as they occur.
 * Access Control - Documents may be public or private, and collaborators may be managed.
 * Title - A human-readable short title for the document.
 * Description - A description of the document (supporting Markdown)
 * Creation Date & Last Updated Date
 * Display of who created the document
 * View count

Features specific to datasets include:

 * Interpretation of content as CSV data.
 * Datasets are validated as CSV in the editor.
 * Datasets are displayed as a spreadsheet in the dataset viewer.

Features specific to visualizations include:

 * Interpretation of content as HTML & Javascript - One may use the Web platform and any available libraries for creating visualizations.
 * Association of datasets - Any number of datasets may be associated with a visualization.
 * Access to live-updating datasets - Using a special piece of glue code, one may subscribe for real-time updates from any associated datasets.

Pricing

 * Free Plan - Unlimited public documents and unlimited collaborators
 * Basic - Unlimited private documents with unlimited collaborators

These are all the features to be included in the 1.0 release. With these features, it should be possible to establish a global platform for collaborative data visualization. Over time, the hope is that all public data of interest will eventually be imported into the system and be explorable visually.


# Issues

 * [ ] The navbar should be encapsulated as a component
 * [ ] Log in button as a component
 * [ ] Log out button as a component
 * [ ] There should be a component that lists a collection of documents. With Title, description, and thumbnail image.
 * [ ] Generic create page: Type selection "What do you want to create?" { Dataset, Visualization }
 * [ ] Change UX on create page - make description optional, show all fields at a time
 * [ ] Display a truncated version of the description in the document list
 * [ ] private - a boolean telling whether the document is public or private
 * [ ] collaborators - a listing of collaborators and their permissions


# Launching on AWS

```bash
ssh -i cy.pem ubuntu@ec2-52-53-180-21.us-west-1.compute.amazonaws.com

sudo apt-get update
sudo apt-get install build-essential git nginx -y

curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh | bash
source .bashrc 
nvm install stable

# See https://docs.mongodb.org/manual/tutorial/install-mongodb-on-ubuntu/
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.2.list
sudo apt-get update
sudo apt-get install -y mongodb-org

#follow nginx instructions at http://stackoverflow.com/questions/5009324/node-js-nginx-what-now
sudo vim /etc/nginx/sites-available/default

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

  ssl_certificate /home/ubuntu/dvt-ssl/dvt_combined.crt;
  ssl_certificate_key /home/ubuntu/dvt-ssl/datavis.tech;
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

sudo /etc/init.d/nginx restart

# from https://www.digitalocean.com/community/tutorials/how-to-install-and-use-redis
# sudo apt-get install tcl8.5 -y
wget http://download.redis.io/releases/redis-stable.tar.gz
tar xzf redis-stable.tar.gz
cd redis-stable
make
#make test
sudo make install
cd utils
sudo ./install_server.sh


ssh-keygen -t rsa -C "curran.kelleher@gmail.com"
cat ~/.ssh/id_rsa.pub

git clone git@gitlab.com:curran/datavis-tech.git
cd datavis-tech
npm install
npm start


npm install pm2 -g
pm2 start process.json
pm2 startup

# Deploying new code
ssh -i nv.pem ubuntu@datavis.tech
cd datavis-tech
git pull
npm install
pm2 reload all

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

The GitHub json data gives the following


"{
  "login": "curran",
  "id": 68416,
  "avatar_url": "https://avatars.githubusercontent.com/u/68416?v=3",
  "gravatar_id": "",
  "url": "https://api.github.com/users/curran",
  "html_url": "https://github.com/curran",
  "followers_url": "https://api.github.com/users/curran/followers",
  "following_url": "https://api.github.com/users/curran/following{/other_user}",
  "gists_url": "https://api.github.com/users/curran/gists{/gist_id}",
  "starred_url": "https://api.github.com/users/curran/starred{/owner}{/repo}",
  "subscriptions_url": "https://api.github.com/users/curran/subscriptions",
  "organizations_url": "https://api.github.com/users/curran/orgs",
  "repos_url": "https://api.github.com/users/curran/repos",
  "events_url": "https://api.github.com/users/curran/events{/privacy}",
  "received_events_url": "https://api.github.com/users/curran/received_events",
  "type": "User",
  "site_admin": false,
  "name": "Curran Kelleher",
  "company": "Available for consulting",
  "blog": "https://datavis.tech",
  "location": "Boston | Bangalore",
  "email": "curran@datavis.tech",
  "hireable": true,
  "bio": null,
  "public_repos": 110,
  "public_gists": 160,
  "followers": 707,
  "following": 12,
  "created_at": "2009-03-29T19:24:25Z",
  "updated_at": "2016-05-19T11:44:44Z"
}"

To display info:

    {{if _session.loggedIn}}
      <ul>
        <img src="{{_session.user.github._json.avatar_url}}">
        <li> Name: {{_session.user.github._json.name}} </li>
        <li> Username: {{_session.user.github._json.login}} </li>
        <li> Email: {{_session.user.github._json.email}} </li>
      </ul>
    {{/}}


To search:

ag console.log --ignore node_modules --ignore derby
