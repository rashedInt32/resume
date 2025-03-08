import {
  integer,
  json,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique(),
  password: varchar({ length: 255 }).notNull(),
  resumeId: integer("resume_id"),
});

export const StylesTable = pgTable("styles", {
  id: serial("style_id").primaryKey(),
  body: json().$type<Body>(),
  title: json().$type<Title>(),
  photo: json().$type<Photo>(),
  text: json().$type<Text>(),
  textMudate: json().$type<TextMuted>(),
  subTitle: json().$type<SubTitle>(),
  link: json().$type<Link>(),
  resumeId: integer("resume_id"),
});

export const ResumeTable = pgTable("resume", {
  id: serial("resume_id").primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull(),
  photo: text(),
  overview: text(),
  education: json().$type<Education[]>(),
  experience: json().$type<Experience[]>(),
  socials: json().$type<Social[]>(),
  projects: json().$type<Project[]>(),
  skills: json().$type<Skills[]>(),
  contact: json().$type<Contact>(),
});

interface Contact {
  phone: string;
  email: string;
  address: string;
}

interface Skills {
  name: string;
}

interface Project {
  url: string;
}

interface Social {
  name: string;
  url: string;
}

interface Experience {
  role: string;
  company: string;
  year: string;
  desc: string;
}

interface Education {
  university: string;
  year: string;
  degree: string;
}

interface FontSize {
  fontSize: number;
  lineHeight: number;
  color: string;
}

interface FontFamily {
  fontFamily: string;
}

interface Body extends FontFamily {
  background: string;
}

interface Title extends FontSize, FontFamily {
  textTransform: string;
  letterSpacing: number;
  [key: string]: any;
}

interface Text extends FontSize {
  lineHeight: number;
  fontSize: number;
}

interface TextMuted extends FontSize {}

interface SubTitle extends FontSize {
  textTransform: string;
}

interface Link extends FontSize {}

interface Photo {
  width: number;
  height: number;
  borderRadius: number;
}
