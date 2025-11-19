// db/seed.js
import 'dotenv/config';
import { db } from './index.js';
import bcrypt from 'bcryptjs';
import { quranNotes, users } from './schema.js'; // PERUBAHAN: quranNotes

async function seed() {
  console.log('Seeding database...');

  // Hapus data lama (opsional)
  await db.delete(quranNotes); // PERUBAHAN
  await db.delete(users);

  // Buat user dummy dengan password yang sudah di-hash
  const plainPassword = 'password123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  // Buat user dummy
  const user1 = await db
    .insert(users)
    .values({
      username: 'muslimah',
      password: hashedPassword,
    })
    .returning();

  // Buat catatan Quran dummy untuk user1
  await db.insert(quranNotes).values([
    // PERUBAHAN
    {
      surah_ayah: 'Al-Baqarah: 286',
      note: 'Tidak membebani jiwa melainkan sebatas kesanggupannya.',
      userId: user1[0].id,
    },
    {
      surah_ayah: 'Al-Fatihah: 6-7',
      note: 'Pentingnya memohon petunjuk jalan yang lurus.',
      userId: user1[0].id,
    },
  ]);

  console.log('✅ Seeding completed!');
  process.exit(0);
}

seed().catch((err) => {
  console.error('❌ Seeding failed:', err);
  process.exit(1);
});
