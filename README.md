# BSSE-2 2nd Semester Final Project
## Team No Name
- Mykiell Pagayonan
- Teddie John Rajeev
- Matthew B. Ledesma

## Install all dependencies

To begin, install all the dependencies in the root, frontend, and backend directories with this script:

```bash
npm run i-all
```

## Setting up the local database

After installing the dependencies, create a .env file in both the frontend and backend directories. ------------

Inside the .env, paste the database URL which is structured as follows:

```bash
DATABASE_URL="protocol://username:password@host:port/database_name?options"
```

Note that you need to create a new postgres database (pgAdmin 4 is recommended) and replace the DATABASE_URL with the database credentials. If the database is on your local machine, include sslmode=disable for the options.

Refer to the [official dbmate documentation](https://github.com/amacneil/dbmate#usage) for more info.

After the URL has been properly set up, run the pre-made package script for the migration:

```bash
npm run migrate-up
```

## Admin Credentials

Currently, all the users that sign up will only be labelled as a "regular" user. But we created an Admin Account to test out all admin features. This Admin Account should be present in the database after you perform the database migration.

```bash
username: admin-account
password: software-testing-lab
```

## Run both frontend and backend (Using Concurrently)

After installing dependencies and setting up the database, run this command on the root directory:

```bash
npm start
```

This should run the dev script on both frontend and backend simultaneously using concurrently. Visit http://localhost:3000 to check it out! Log in with the Admin Account or sign up to check out regular user features.

## Perform the tests using Jest

This project uses Jest as a Testing Framework. Run this command on root directory to run the tests for both frontend and backend:

```bash
npm test
```
