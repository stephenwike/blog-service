CREATE TABLE "post" (
  "id" SERIAL PRIMARY KEY,
  "title" varchar NOT NULL,
  "authorId" int,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "content" text UNIQUE NOT NULL
);

CREATE TABLE "author" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar NOT NULL,
  "createdAt" timestamp,
  "updatedAt" timestamp
);

CREATE TABLE "comment" (
  "id" SERIAL PRIMARY KEY,
  "authorId" int,
  "postId" int,
  "level" int NOT NULL,
  "commentId" int,
  "createdAt" timestamp,
  "updatedAt" timestamp,
  "content" varchar(400) NOT NULL
);

CREATE TABLE "topic" (
  "id" SERIAL PRIMARY KEY,
  "label" varchar NOT NULL
);

CREATE TABLE "posttopic" (
  "id" SERIAL PRIMARY KEY,
  "postId" int,
  "topicId" int
);

ALTER TABLE "post" ADD FOREIGN KEY ("authorId") REFERENCES "author" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("authorId") REFERENCES "author" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("postId") REFERENCES "post" ("id");

ALTER TABLE "comment" ADD FOREIGN KEY ("commentId") REFERENCES "comment" ("id");

ALTER TABLE "posttopic" ADD FOREIGN KEY ("postId") REFERENCES "post" ("id");

ALTER TABLE "posttopic" ADD FOREIGN KEY ("topicId") REFERENCES "topic" ("id");
