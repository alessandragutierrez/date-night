insert into "users"
  ("firstName", "lastName", "password", "email")
  values
    ('Jim', 'Halpert', 'password', 'jim@example.com'),
    ('Pam', 'Beasley', 'password', 'pam@example.com')

insert into "locations"
  ("address", "line2", "city", "state", "zipCode", "userId")
  values
    ('1409 w lime st', 'building 1', 'Los Angeles', 'CA', 94875, 1),
    ('1390 e lemon st', 'building 2', 'Ventura', 'CA', 98573, 2)

insert into "ideas"
  ("title", "description", "locationId", "userId")
  values
  ('go bowling', 'we can go bowling', 7, 1),
  ('ice cream', 'ice cream and a walk', 8, 2)
