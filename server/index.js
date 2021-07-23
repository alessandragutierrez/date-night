require('dotenv/config');
const express = require('express');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

app.post('/api/ideas', (req, res, next) => {
  const { location } = req.body;
  const locationSql = `
    insert into "locations"
      ("address", "line2", "city", "state", "zipCode", "userId")
      values
        ($1, $2, $3, $4, $5, $6)
        returning *
`;
  const locationParams = [location, 'somewhere', 'some city', 'some state', 12345, 1];

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
      const ideaParams = [location.locationId, title, description, 1];

      return db.query(ideaSql, ideaParams)
        .then(ideaResult => {
          const [idea] = ideaResult.rows;

          const output = {
            idea: {
              title: idea.title,
              description: idea.description
            },
            location: {
              address: location.address,
              line2: location.line2,
              city: location.city,
              state: location.state,
              zipCode: location.zipCode
            }
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
