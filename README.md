# MDT Server - REST API using Node.js, Express, Sequelize and MySQL + JWT Authentication and Authorization

2. Install the npm packages

   ```bash
   npm install
   ```

   Also install `nodemon` globally, if you don't have it yet.

   ```bash
   npm install -g nodemon
   ```

3. Congfigure environment settings

   Create a file with the following name and location `.env` and copy the below contents and modify it accordingly.

   ```bash
    NODE_ENV=development
    PORT=3001

    # Database
    DB_HOST=your-db-host
    DB_USER=your-db-mobile
    DB_PASS=your-db-password
    DB_NAME=your-db-name
   ```

4. Running the app locally

   Run this command, which is located in npm script in `package.json` file.

   ```bash
   npm run dev
   ```
