# CryptoGinko
This program is a crypto asset tracking program. However this program can be addapted to be used for stock tracking just as well.
this version is targed squarly at crypto currencies. 

##program features:
1. tracking of address/account and wallet balances. 
2. calculation of avage cost basis
3. calculation of capital gains
4. portfolio balance and value tracking.
5. csv import of transaction data from some wallets like exodus and electrum

This code is in the prototype stage. I am using it to improve blockchain programming, and web3 development

## Installing ginko

## configuration


## Installing MySQL docker image
https://hub.docker.com/_/mysql/
Create a docker image with data held internally

```
$ docker volume create mysql5_volume
$ docker run --name=MySQLdb5_instance -p3306:3306 -v mysql5_volume:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=somerootpassword -d mysql/mysql-server:5.7.31
```
note the version of node Js does not work with MySQL 8 on ubuntu because ubuntu does not have a 'root' account and the authentication is getting messed up. so I am using a MySQL 5 version instead. 

### configure
you can access the database directly from within the docker. you need to setup the backup admin user inside the docker. After than you can continue to
use the docker access directly or setup a mysql client on the host machine see below ("set up local mysql client").

```
$ docker exec -it MySQLdb5_instance mysql -uroot -p<somerootpassword>
mysql> update mysql.user set host = ‘%’ where user=’root’;
```
create a backup admin account for MySQL:
```
mysql> CREATE USER 'admin'@'localhost' IDENTIFIED BY 'some_pass';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'admin'@'localhost'
    ->     WITH GRANT OPTION;
mysql> CREATE USER 'admin'@'%' IDENTIFIED BY 'some_pass';
mysql> GRANT ALL PRIVILEGES ON *.* TO 'admin'@'%'
    ->     WITH GRANT OPTION;
```
### create the cryptoginko database
create a database for this application. the name can be what ever you want but the dbname, passwords have to match
in the config.json file. 

```
mysql> CREATE DATABASE cryptoginko;
```

create a normal user
```
mysql> CREATE USER 'satoshi'@'localhost' IDENTIFIED BY 'some_other_pass';
mysql> GRANT ALL PRIVILEGES ON cryptoginko.* TO 'satoshi'@'localhost'
    ->     WITH GRANT OPTION;
mysql> CREATE USER 'satoshi'@'%' IDENTIFIED BY 'some_other_pass';
mysql> GRANT ALL PRIVILEGES ON cryptoginko.* TO 'satoshi'@'%'
    ->     WITH GRANT OPTION;
```

### set up local mysql client.
after the admin user is setup you can configure using host’s mysql-client. Install the client:

```
$ sudo apt-get install mysql-client
```

The mysql docker instance (MySQLdb5_instance) runs as background process. By default MySQLdb5_instance will listen on port 3306 for request. The IP address of this docker instance is not the same as the local host. 
In order to get the IP MySQLdb5_instance listens on run:
```
mysql> CREATE DATABASE cryptoginko;
```
use this command to connect locally:
```
$ mysql -h172.17.0.2 -uroot -p<somerootpassword> cryptoginko
```


## creating the database
need to create users first, (see "create a normal user" above)

### database tables
address table. this table tracks
```
+-------------+--------------+------+-----+-------------------+-----------------------------+
| Field       | Type         | Null | Key | Default           | Extra                       |
+-------------+--------------+------+-----+-------------------+-----------------------------+
| address     | varchar(255) | NO   | PRI | NULL              |                             |
| currency    | varchar(20)  | NO   | PRI | NULL              |                             |
| walletname  | varchar(30)  | NO   |     | NULL              |                             |
| coinbalance | float        | YES  |     | 0                 |                             |
| memo        | varchar(255) | YES  |     | NULL              |                             |
| lastupdate  | timestamp    | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-----------------------------+
```

current price table:
```
+------------+-------------+------+-----+-------------------+-----------------------------+
| Field      | Type        | Null | Key | Default           | Extra                       |
+------------+-------------+------+-----+-------------------+-----------------------------+
| currency   | varchar(20) | NO   | PRI | NULL              |                             |
| jpy        | float       | YES  |     | 0                 |                             |
| usd        | float       | YES  |     | 0                 |                             |
| nzd        | float       | YES  |     | 0                 |                             |
| gbp        | float       | YES  |     | 0                 |                             |
| eur        | float       | YES  |     | 0                 |                             |
| aud        | float       | YES  |     | 0                 |                             |
| lastupdate | timestamp   | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+------------+-------------+------+-----+-------------------+-----------------------------+
```

## running the server
need to start the database server. 
for the docker version
```
$ docker start <mysqlInstance>
```


## Development notes ------------------------------------
This is the React version of the this program.
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This project was created with the command:

`npx create-react-app cryptoginko-react`

The program is written in React, JavaScript and node JS

### dependancies
$ npm --version
6.14.8
$ node --version
v12.18.3
$ npx --version
6.14.8

$ npm install --save styled-components

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
