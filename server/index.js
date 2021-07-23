require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

// change to include ':userId'
// where "userId" = above param
app.get('/api/ideas', (req, res, next) => {
  const sql = `
    select "idea"."title",
           "idea"."description",
           "location"."address"
    from "ideas" as "idea"
    join "locations" as "location" using ("locationId")
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.post('/api/ideas', (req, res, next) => {
  const { address, latitude, longitude } = req.body;
  const locationSql = `
    insert into "locations"
      ("address", "latitude", "longitude", "userId")
      values
        ($1, $2, $3, $4)
        returning *
`;
  // change userID later
  const locationParams = [address, latitude, longitude, 1];

  db.query(locationSql, locationParams)
    .then(locationResults => {
      const [location] = locationResults.rows;
      const { title, description } = req.body;
      const ideaSql = `
            insert into "ideas"
              ("locationId", "title", "description", "userId")
              values
                ($1, $2, $3, $4)
                returning *
        `;
      // change userId later
      const ideaParams = [location.locationId, title, description, 1];

      return db.query(ideaSql, ideaParams)
        .then(ideaResult => {
          const [idea] = ideaResult.rows;
          const output = {
            idea: {
              title: idea.title,
              description: idea.description
            },
            location: location.address
          };
          res.status(201).json(output);
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
