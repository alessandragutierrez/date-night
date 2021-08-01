require('dotenv/config');
const express = require('express');
const ClientError = require('./client-error');
const db = require('./db');
const errorMiddleware = require('./error-middleware');
const jsonMiddleware = express.json();
const staticMiddleware = require('./static-middleware');
const uploadsMiddleware = require('./uploads-middleware');

const app = express();

app.use(staticMiddleware);
app.use(jsonMiddleware);

// change to include ':userId'
// where "userId" = above param
app.get('/api/ideas', (req, res, next) => {
  const sql = `
    select "idea"."title",
           "idea"."description",
           "idea"."scheduled",
           "idea"."ideaId",
           "location"."address",
           "location"."latitude",
           "location"."longitude",
           "location"."locationId"
    from "ideas" as "idea"
    join "locations" as "location" using ("locationId")
    where "idea"."scheduled" = false
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
              ("locationId", "title", "description", "scheduled", "userId")
              values
                ($1, $2, $3, $4, $5)
                returning *
        `;
      // change userId later
      const ideaParams = [location.locationId, title, description, false, 1];

      return db.query(ideaSql, ideaParams)
        .then(ideaResult => {
          const [idea] = ideaResult.rows;
          const output = {
            title: idea.title,
            description: idea.description,
            ideaId: idea.ideaId,
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude
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
            address: location.address,
            latitude: location.latitude,
            longitude: location.longitude
          };
          res.json(output);
        });
    })
    .catch(err => next(err));
});

app.delete('/api/ideas/:locationId', (req, res, next) => {
  const locationId = parseInt(req.params.locationId, 10);
  if (!Number.isInteger(locationId) || locationId < 1) {
    throw new ClientError(400, 'locationId must be a positive integer');
  }

  const ideaSql = `
    delete from "ideas"
      where "locationId" = $1
      returning *
  `;
  const locationSql = `
    delete from "locations"
      where "locationId" = $1
      returning *
  `;
  const sqlParams = [locationId];
  db.query(ideaSql, sqlParams)
    .then(ideaResult => {
      const idea = ideaResult.rows[0];
      if (!idea) {
        throw new ClientError(404, `Cannot find idea with 'locationId' of ${locationId}`);
      }
      return db.query(locationSql, sqlParams)
        .then(locationResult => {
          const location = locationResult.rows[0];
          if (!location) {
            throw new ClientError(404, `Cannot find idea with 'locationId' of ${locationId}`);
          } else {
            res.sendStatus(204);
          }
        });
    })
    .catch(err => next(err));
});

app.post('/api/upcoming', (req, res, next) => {
  const { date, time } = req.body;
  const ideaId = parseInt(req.body.ideaId, 10);
  if (!date || !time || !ideaId) {
    throw new ClientError(400, 'date, time, and ideaId are required fields');
  }
  if (!Number.isInteger(ideaId) || ideaId < 1) {
    throw new ClientError(400, 'ideaId must be a positive integer');
  }
  const scheduleSql = `
    insert into "schedule"
      ("date", "time", "ideaId", "canceled")
      values
        ($1, $2, $3, $4)
        returning *
  `;
  const scheduleParams = [date, time, ideaId, false];
  db.query(scheduleSql, scheduleParams)
    .then(scheduleResult => {
      const [schedule] = scheduleResult.rows;
      const ideaSql = `
        update "ideas"
           set "scheduled" = $1
         where "ideaId" = $2
        returning *
      `;
      const ideaParams = [true, schedule.ideaId];

      return db.query(ideaSql, ideaParams)
        .then(ideaResults => {
          const [idea] = ideaResults.rows;
          const locationSql = `
            select "address",
                   "latitude",
                   "longitude"
            from "locations"
            where "locationId" = $1
          `;
          const locationParams = [idea.locationId];

          return db.query(locationSql, locationParams)
            .then(locationResults => {
              const [location] = locationResults.rows;
              const output = {
                ideaId: idea.ideaId,
                title: idea.title,
                description: idea.description,
                locationId: location.locationId,
                address: location.address,
                latitude: location.latitude,
                longitude: location.longitude,
                scheduleId: schedule.scheduleId,
                date: schedule.date,
                time: schedule.time
              };
              res.status(201).json(output);
            });
        });
    })
    .catch(err => next(err));
});

// change to include ':userId'
// where "userId" = above param
app.get('/api/upcoming', (req, res, next) => {
  const sql = `
    select "i"."title",
           "i"."description",
           "i"."ideaId",
           "l"."address",
           "l"."latitude",
           "l"."longitude",
           "l"."locationId",
           "s"."date",
           "s"."time",
           "s"."canceled",
           "s"."scheduleId"
    from "ideas" as "i"
    join "locations" as "l" using ("locationId")
    join "schedule" as "s" using ("ideaId")
    where "s"."canceled" = false
    order by "s"."date" asc
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.put('/api/my-dates/:ideaId', (req, res, next) => {
  const ideaId = parseInt(req.params.ideaId, 10);
  if (!Number.isInteger(ideaId) || ideaId < 1) {
    throw new ClientError(400, 'ideaId must be a positive integer');
  }
  if (!ideaId) {
    throw new ClientError(400, 'ideaId is a required field');
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
      if (!address) {
        throw new ClientError(400, 'address is a required field');
      }
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
          const { date, time } = req.body;
          if (!date || !time) {
            throw new ClientError(400, 'date and time are required fields');
          }
          const scheduleSql = `
            update "schedule"
               set "date" = $1,
                   "time" = $2
             where "ideaId" = $3
            returning *
          `;
          const scheduleParams = [date, time, idea.ideaId];

          return db.query(scheduleSql, scheduleParams)
            .then(scheduleResult => {
              const [schedule] = scheduleResult.rows;
              const { note } = req.body;
              const notesSql = `
                insert into "notes"
                  ("note", "scheduleId", "userId")
                  values
                    ($1, $2, $3)
                    returning *
              `;
              const notesParams = [note, schedule.scheduleId, 1];

              return db.query(notesSql, notesParams)
                .then(notesResult => {
                  const [note] = notesResult.rows;
                  const output = {
                    title: idea.title,
                    description: idea.description,
                    ideaId: idea.ideaId,
                    locationId: location.locationId,
                    address: location.address,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    scheduleId: schedule.scheduleId,
                    date: schedule.date,
                    time: schedule.time,
                    canceled: schedule.canceled,
                    noteId: note.noteId,
                    note: note.note
                  };
                  res.json(output);
                });
            });
        });
    })
    .catch(err => next(err));
});

app.post('/api/images/:scheduleId', uploadsMiddleware, (req, res, next) => {
  const scheduleId = parseInt(req.params.scheduleId, 10);
  if (!Number.isInteger(scheduleId) || scheduleId < 1) {
    throw new ClientError(400, 'ideaId must be a positive integer');
  }
  if (!scheduleId) {
    throw new ClientError(400, 'ideaId is a required field');
  }

  const url = `/images/${req.body.url}`;
  const imageSql = `
    insert into "images"
      ("url", "scheduleId", "userId")
      values
        ($1, $2, $3)
        returning *
  `;
  // change userId later
  const imageParams = [url, scheduleId, 1];
  db.query(imageSql, imageParams)
    .then(imageResult => {
      const [image] = imageResult.rows;
      const output = {
        url: image.url,
        imageId: image.imageId,
        scheduleId: image.scheduleId
      };
      res.status(201).json(output);
    })
    .catch(err => next(err));
});

app.get('/api/images', (req, res, next) => {
  const sql = `
    select *
      from "images"
  `;
  db.query(sql)
    .then(result => {
      res.json(result.rows);
    })
    .catch(err => next(err));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`express server listening on port ${process.env.PORT}`);
});
