set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public.ideas" (
	"ideaId" serial NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"locationId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "ideas_pk" PRIMARY KEY ("ideaId")
) WITH (
  OIDS=FALSE
);
​
CREATE TABLE "public.users" (
	"userId" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"password" TEXT NOT NULL,
	"email" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL DEFAULT now(),
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);
​
CREATE TABLE "public.locations" (
	"locationId" serial NOT NULL,
	"address" TEXT NOT NULL,
	"line2" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"zipCode" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "locations_pk" PRIMARY KEY ("locationId")
) WITH (
  OIDS=FALSE
);
​
CREATE TABLE "public.schedule" (
	"scheduleId" serial NOT NULL,
	"date" DATE NOT NULL,
	"time" TIME NOT NULL,
	"canceled" BOOLEAN NOT NULL,
	"ideaId" integer NOT NULL,
	CONSTRAINT "schedule_pk" PRIMARY KEY ("scheduleId")
) WITH (
  OIDS=FALSE
);
​
CREATE TABLE "public.notes" (
	"noteId" serial NOT NULL,
	"note" TEXT NOT NULL,
	"scheduleId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "notes_pk" PRIMARY KEY ("noteId")
) WITH (
  OIDS=FALSE
);
​
CREATE TABLE "public.images" (
	"imageId" serial NOT NULL,
	"url" TEXT NOT NULL,
	"scheduleId" integer NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "images_pk" PRIMARY KEY ("imageId")
) WITH (
  OIDS=FALSE
);
​
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_fk0" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId");
ALTER TABLE "ideas" ADD CONSTRAINT "ideas_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "locations" ADD CONSTRAINT "locations_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "schedule" ADD CONSTRAINT "schedule_fk0" FOREIGN KEY ("ideaId") REFERENCES "ideas"("ideaId");
ALTER TABLE "notes" ADD CONSTRAINT "notes_fk0" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("scheduleId");
ALTER TABLE "notes" ADD CONSTRAINT "notes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "images" ADD CONSTRAINT "images_fk0" FOREIGN KEY ("scheduleId") REFERENCES "schedule"("scheduleId");
ALTER TABLE "images" ADD CONSTRAINT "images_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
