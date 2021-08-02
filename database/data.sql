insert into "users"
  ("firstName", "lastName", "password", "email")
  values
    ('Jim', 'Halpert', 'password', 'jim@example.com'),
    ('Pam', 'Beasley', 'password', 'pam@example.com');

insert into "locations"
  ("address", "latitude", "longitude", "userId")
  values
    ('Laugh Factory, 8001 Sunset Blvd, Los Angeles, CA, USA', '23.2342', '76.4564', 1),
    ('Oak Mountain Winery, 36522 Via Verde, Temecula, CA, USA', '21.1231', '23.1231', 1),
    ('Disneyland Park, Disneyland Drive, Anaheim, CA, USA', '8.8951', '77.0364', 1),
    ('Dodger Stadium, Vin Scully Ave, Los Angeles, CA, USA', '38.8951', '77.0364', 1),
    ('Griffith Observatory, 2800 E Observatory Rd, Los Angeles, CA, USA', '12.1234', '12.1234', 1),
    ('Verdigo Boulders, 266 E Magnolia Blvd, Burbank, CA, USA', '12.1234', '12.1234', 1);

insert into "ideas"
  ("title", "description", "scheduled", "locationId", "userId")
  values
  ('Comedy Night', 'Quinoa retro tacos bitters yuccie typewriter. Slow-carb try-hard photo booth kickstarter helvetica paleo.', false, 1, 1),
  ('Wine Tasting', 'Lo-fi swag authentic, tbh before they sold out neutra semiotics. Semiotics next level pour-over locavore.', false, 2, 1),
  ('Disneyland', 'Im baby occupy culpa glossier, tofu cardigan marfa lomo aliquip godard post-ironic unicorn +1 heirloom.', true, 3, 1),
  ('Baseball Game', 'Mlkshk af reprehenderit, id art party labore sunt ad banjo bicycle rights ramps yr exercitation.', true, 4, 1),
  ('Geocaching', 'Mumblecore occupy, williamsburg gochujang cred yuccie etsy art party. DIY lyft hella irony intelligentsia.', true, 5, 1),
  ('Rock Climbing', '8-bit enamel pin brunch, fixie food truck portland kogi pinterest. Freegan goth typewriter distillery.', true, 6, 1);

insert into "schedule"
  ("date", "time", "ideaId", "canceled")
  values
  ('2021-08-15', '7:00 PM', 3, 'false'),
  ('2021-08-29', '5:30 PM', 4, 'false'),
  ('2021-02-10', '1:30 PM', 5, 'false'),
  ('2021-04-07', '11:00 AM', 6, 'false');

insert into "notes"
  ("note", "scheduleId", "userId")
  values
  ('', 1, 1),
  ('', 2, 1),
  ('', 3, 1),
  ('', 4, 1);
