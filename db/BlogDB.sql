CREATE TABLE "post" (
  "id" SERIAL PRIMARY KEY,
  "author" int,
  "date" timestamp NOT NULL,
  "content" text UNIQUE NOT NULL
);

CREATE TABLE "author" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "date" timestamp NOT NULL
);

CREATE TABLE "comment" (
  "id" SERIAL PRIMARY KEY,
  "author" int,
  "post" int,
  "date" timestamp NOT NULL,
  "level" int NOT NULL,
  "comment" int,
  "content" varchar(400) NOT NULL
);

CREATE TABLE "topic" (
  "id" SERIAL PRIMARY KEY,
  "label" varchar NOT NULL
);

CREATE TABLE "posttopic" (
  "id" SERIAL PRIMARY KEY,
  "postid" int,
  "topic" int
);

ALTER TABLE "post" ADD FOREIGN KEY ("author") REFERENCES "author" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("author") REFERENCES "author" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("post") REFERENCES "post" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("comment") REFERENCES "comment" ("id");

ALTER TABLE "posttopic" ADD FOREIGN KEY ("postid") REFERENCES "post" ("id");

ALTER TABLE "posttopic" ADD FOREIGN KEY ("topic") REFERENCES "topic" ("id");
