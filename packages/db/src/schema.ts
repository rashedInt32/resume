import { pgTable, varchar, integer, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  username: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).unique(),
  password: varchar({ length: 255 }).notNull()
});

export const StylesTable = pgTable('styles', {
  body: json().$type<Body>(),
  title: json().$type<Title>(),
  
})



interface FontSize  {
  fontSize: number
  lineHeight: number
  color: string
}

interface FontFamily {
  fontFamily: string
}

interface Body extends FontFamily {
  background: string
}

interface Title extends FontSize, FontFamily {
  textTransform: string
  letterSpacing: number
  [key: string]: any
}

interface Text extends FontSize {
  lineHeight: number
  fontSize: number
}

interface TextMuted extends FontSize {
}

interface SubTitle extends FontSize{
  textTransform: string
}

interface Link extends FontSize {}

