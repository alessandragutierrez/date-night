require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error');
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
           "idea"."ideaId",
           "location"."address",
           "location"."latitude",
           "location"."longitude"
    from "ideas" as "idea"
    join "locations" as "location" using ("locationId")
    order by "ideaId"
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
    .then(locationResult => {
      const [location] = locationResult.rows;
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
            title: idea.title,
            description: idea.description,
            ideaId: idea.ideaId,
            address: location.address
          };
          res.status(201).json(output);
        });
    })
    .catch(err => next(err));
});

app.put('/api/ideas/:ideaId', (req, res, next) => {
  const ideaId = parseInt(req.params.ideaId, 10);
  if (!Number.isInteger(ideaId) || ideaId < 1) {
    throw new ClientError(400, 'ideaId must be a positive integer');
  }

  const { title, description } = req.body;
  const ideaSql = `
    update "ideas"
       set "title" = $1,
           "description" = $2
     where "ideaId" = $3
    returning *
  `;
  const ideaParams = [title, description, ideaId];

  db.query(ideaSql, ideaParams)
    .then(ideaResult => {
      const [idea] = ideaResult.rows;
      const { address, latitude, longitude } = req.body;
      const locationSql = `
        update "locations"
           set "address" = $1,
               "latitude" = $2,
               "longitude" = $3
         where "locationId" = $4
        returning *
      `;
      const locationParams = [address, latitude, longitude, idea.locationId];

      return db.query(locationSql, locationParams)
        .then(locationResult => {
          const [location] = locationResult.rows;
          const output = {
            title: idea.title,
            description: idea.description,
            ideaId: idea.ideaId,
            address: location.address
          };
          res.json(output);
        });
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
