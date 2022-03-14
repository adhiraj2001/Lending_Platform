# Crypto Self-Repaying Lending Platform

## About

Crypto Lending Platform based Alchemix DeFi Protocol which allows user to take self-repaying loans.
User can post public requests for crypto loans, which would be self-repaying.

Current working functionalities:
1. Users can create their accounts in 'Register' page, and log into the website using 'Login' page.
2. Users can update their profiles and add funds to their wallets using 'Profile' page.
3. Users can create public requests for obtaining loans as borrower using 'Add Request' page.
4. Users can see publicly requests of other users using 'Requests List' page.
5. Users can accept public requests and provide loans to borrowers as lenders using the same page on click 'Lend' button.
6. Users can see the status of their requests in 'My Requests' page.
7. Users can see their transactions as borrowers and lenders to other users using 'My Borrower Transactions' and 'My Lender Transactions' page respectively.
8. Users can log out of the website using 'Logout' button.

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

