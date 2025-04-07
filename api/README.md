
### Scripts

|                    Script | Target                                             |
| ------------------------- | -------------------------------------------------- |
|                    `npm run dev` | Run API in **development** environment      |
|                    `npm start` | Run API in **production** environment         |
|                    `npm run migrate` | Create database tables                  |
|                    `npm run seed` | Populate database tables                   |


### API Docs
To view the API documentation, run the API and access [http://localhost:3333/api-docs](http://localhost:3333/api-docs) in your browser

update db:

npx knex migrate:make create_exercises_table
npx knex migrate:latest
npx knex seed:run