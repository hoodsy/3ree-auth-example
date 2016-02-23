# 3Ree Auth

An example full stack Javascript app with **React**, **universal Redux**, **RethinkDB**, and **Express** (3REE). Oh, and **Webpack** with **HMR** and **Babel** behind the scenes, too.

Also includes authentication via Passport, realtime updating via RethinkDB Changefeeds and Socket.io, and server side rendering.

### App Overview

##### Description
This application allows *Users* to create *Organizations*, which can hold *Dashboards* full of *Lists* of *Resources (URLs)*, which update in realtime.

This application is still a WIP - as a result, actions such as editing/deleting resources or lists individually are incomplete.

##### App Architecture
![App Architecture](https://s3.amazonaws.com/3ree-auth/App+Architecture+2.png)
##### DB Table Relationships
![Table Relations](https://s3.amazonaws.com/3ree-auth/Table+Relations+2.png)

### Installation and Setup

##### Repo and Dependencies
1. Download the project: ```git clone git@github.com:hoodsy/3ree-auth-example.git```

2. Install dependencies: ```npm install```

##### RethinkDB
3. Install [RethinkDB](https://www.rethinkdb.com/docs/install/)

4. Run RethinkDB from outside the project: ```rethinkdb```
*RethinkDB will create a data folder in place - these files shouldn't be included in the project*

5. Open a new terminal window and init the DB, tables, indexes: ```npm run init```

##### Running
6. Simply run: ```npm start``` and navigate to localhost:3000

##### OAuth
OAuth keys for Google and Facebook do not come included in this project - simply add your keys to ```server/config/passport/keys.example.js``` and rename the file to ```keys.js``` to use OAuth.

### TODO

All the things! Including:

- Tests
- Password encryption
- Server with: generators, promises
- Finished/polished app functionality (edit/delete)
- Webpack split into prod/dev
- True HMR (affected by stateless components)

... And many other things.
