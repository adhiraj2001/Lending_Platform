# Crypto Self-Repaying Lending Platform

## About

Crypto Lending Platform based Alchemix DeFi Protocol which allows user to take self-repaying loans.

User can post public requests for crypto loans.

Which would be self-repaying.

## Build

### Node

* For Linux:
```
curl -sL https://deb.nodesource.com/setup_13.x | sudo -E bash -
sudo apt-get install -y nodejs
```

* For Mac:
```
brew install node
```

### MongoDB

Install the community edition [here](https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials).


### React

```
npm install -g create-react-app
```

* To create a new React app:
```
create-react-app name_of_app
```

* To run the app, cd into the directory and do:
```
npm start
```

## Running the App

* Run Mongo daemon:
```
sudo systemctl start mongod
```
Mongo will be running on port 27017.


* Run Express Backend:
```
cd backend
npm install
npm start
```

* Run React Frontend:
```
cd frontend
npm install
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser.

