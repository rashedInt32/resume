import { relations } from "drizzle-orm";
import {
  date,
  integer,
  json,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

import {
  Body,
  Contact,
  Education,
  Experience,
  Link,
  Photo,
  Project,
  Skills,
  Social,
  SubTitle,
  TextMuted,
  Title,
} from "./jsonTypes";

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique(),
  password: varchar({ length: 255 }).notNull(),
  resumeId: integer("resume_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const stylesTable = pgTable("styles", {
  id: serial("style_id").primaryKey(),
  body: json().$type<Body>(),
  title: json().$type<Title>(),
  photo: json().$type<Photo>(),
  text: json().$type<Text>(),
  textMudate: json().$type<TextMuted>(),
  subTitle: json().$type<SubTitle>(),
  link: json().$type<Link>(),
  resumeId: integer("resume_id"),
  createdAt: date("created_at").defaultNow(),
  updatedAt: date("updated_at").defaultNow(),
});

export const resumeTable = pgTable("resume", {
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
  createdAt: date("created_at").defaultNow(),
  updatedAt: date("updated_at").defaultNow(),
});

export const userRelations = relations(usersTable, ({ one }) => ({
  user: one(resumeTable, {
    fields: [usersTable.resumeId],
    references: [resumeTable.id],
  }),
}));

export const resumeRelations = relations(stylesTable, ({ one }) => ({
  style: one(resumeTable, {
    fields: [stylesTable.resumeId],
    references: [resumeTable.id],
  }),
}));

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Styles = typeof stylesTable.$inferSelect;
export type NewStyle = typeof stylesTable.$inferInsert;

export type Resume = typeof resumeTable.$inferSelect;
export type NewResume = typeof resumeTable.$inferInsert;
