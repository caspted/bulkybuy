# BSSE-2 2nd Semester Final Project: BulkyBuy
## Team No Name
- Mykiell Pagayonan
- Teddie John Rajeev
- Matthew B. Ledesma

## Install all dependencies

To begin, install all the dependencies in the root, frontend, and backend directories with the following script:

```bash
npm i

cd frontend
npm i

cd backend
npm i
```

## Setting up the local database

After installing the dependencies, create a .env file in both the frontend and backend directories. ------------

Inside the .env for the "frontend" directory, paste the following:

```bash
NEXT_PUBLIC_SERVER_URL=http://localhost:8080
NEXT_PUBLIC_CLIENT_URL=http://localhost:3000
```

Inside the .env for the "backend" directory, paste the following:

```bash
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/DATABASE-NAME?schema=public"
BUCKET=bulkybuy1
PORT=8080
```

To be sent personally:
```
JWT ACCESS SECRET
AWS ACCESS KEY ID
AWS SECRET ACCESS KEY
```

Note that you need to create a new postgres database (pgAdmin 4 is recommended) and replace the DATABASE_URL with the database credentials. If the database is on your local machine, include sslmode=disable for the options.

Refer to the [official dbmate documentation](https://github.com/amacneil/dbmate#usage) for more info.

After the URL has been properly set up, run the following scripts for the migration (go into the backend directory first):

```bash
cd backend
npx prisma migrate dev
npx prisma db seed
```

## Run both frontend and backend (Using Concurrently)

After installing dependencies and setting up the database, run this command on the root directory:

```bash
npm start
```

This should run the dev script on both frontend and backend simultaneously using concurrently. Visit http://localhost:3000 to check it out! Log in with the Admin Account or sign up to check out regular user features.

## User Login

You can register a new user account by pressing the register button, or login with a given account with the following details:

```bash
email: teddie@gmail.com
password: hashedpassword
```

## Perform the tests using Jest

This project uses Jest as a Testing Framework. Run this command on both the frontend and backend directory separately:

```bash
cd frontend
npm test

cd backend
npm test
```
