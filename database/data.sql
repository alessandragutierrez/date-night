insert into "users"
  ("firstName", "lastName", "password", "email")
  values
    ('Jim', 'Halpert', 'password', 'jim@example.com'),
    ('Pam', 'Beasley', 'password', 'pam@example.com');

insert into "locations"
  ("address", "latitude", "longitude", "userId")
  values
    ('Disneyland Park, Disneyland Drive, Anaheim, CA, USA', '8.8951', '77.0364', 1),
    ('Dodger Stadium, Vin Scully Ave, Los Angeles, CA, USA', '38.8951', '77.0364', 2);

insert into "ideas"
  ("title", "description", "locationId", "userId")
  values
  ('Day at DisneyLand', 'Im baby occupy culpa glossier, tofu cardigan marfa lomo aliquip godard post-ironic unicorn +1 heirloom.', 1, 1),
  ('Baseball Game', 'Mlkshk af reprehenderit, id art party labore sunt ad banjo bicycle rights ramps yr exercitation.', 2, 2);
