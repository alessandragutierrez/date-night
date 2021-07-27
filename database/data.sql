insert into "users"
  ("firstName", "lastName", "password", "email")
  values
    ('Jim', 'Halpert', 'password', 'jim@example.com'),
    ('Pam', 'Beasley', 'password', 'pam@example.com');

insert into "locations"
  ("address", "latitude", "longitude", "userId")
  values
    ('Disneyland Park, Disneyland Drive, Anaheim, CA, USA', '8.8951', '77.0364', 1),
    ('Dodger Stadium, Vin Scully Ave, Los Angeles, CA, USA', '38.8951', '77.0364', 1),
    ('Laugh Factory, 8001 Sunset Blvd, Los Angeles, CA, USA', '23.2342', '76.4564', 1),
    ('Oak Mountain Winery, 36522 Via Verde, Temecula, CA, USA', '21.1231', '23.1231', 1);

insert into "ideas"
  ("title", "description", "locationId", "userId")
  values
  ('DisneyLand', 'Im baby occupy culpa glossier, tofu cardigan marfa lomo aliquip godard post-ironic unicorn +1 heirloom.', 1, 1),
  ('Baseball Game', 'Mlkshk af reprehenderit, id art party labore sunt ad banjo bicycle rights ramps yr exercitation.', 2, 1),
  ('Comedy Night', 'Quinoa retro tacos bitters yuccie typewriter. Slow-carb try-hard photo booth kickstarter helvetica paleo.', 3, 1),
  ('Wine Tasting', 'Lo-fi swag authentic, tbh before they sold out neutra semiotics. Semiotics next level pour-over locavore.', 4, 1);
