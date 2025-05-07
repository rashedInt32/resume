CREATE TABLE "resume" (
	"resume_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	"photo" text,
	"overview" text,
	"education" json,
	"experience" json,
	"socials" json,
	"projects" json,
	"skills" json,
	"contact" json,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "styles" (
	"style_id" serial PRIMARY KEY NOT NULL,
	"body" json,
	"title" json,
	"photo" json,
	"text" json,
	"textMudate" json,
	"subTitle" json,
	"link" json,
	"resume_id" integer,
	"created_at" date DEFAULT now(),
	"updated_at" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"email" varchar(255),
	"password" varchar(255) NOT NULL,
	"resume_id" integer,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
