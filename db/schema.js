// db/schema.js
import { pgTable, serial, varchar, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  username: varchar('username', { length: 256 }).notNull().unique(),
  password: varchar('password', { length: 256 }).notNull(),
});

export const quranNotes = pgTable('quran_notes', {
  id: serial('id').primaryKey(),
  // Catatan spesifik, misalnya: Surah:Ayat - Judul
  surah_ayah: varchar('surah_ayah', { length: 256 }).notNull(),
  note: text('note').notNull(), // Isi catatan/refleksi
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
});
