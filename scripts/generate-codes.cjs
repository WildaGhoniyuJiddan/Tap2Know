/**
 * Batch Activation Code Generator for Tap2Know NFC Cards
 * 
 * Usage:
 *   node scripts/generate-codes.js              → generates 50 codes (default)
 *   node scripts/generate-codes.js --count 100  → generates 100 codes
 * 
 * Prerequisites:
 *   Set the following environment variables (or use a .env file):
 *   - FIREBASE_PROJECT_ID
 *   - FIREBASE_CLIENT_EMAIL
 *   - FIREBASE_PRIVATE_KEY
 * 
 * Output:
 *   - Writes codes to Firestore `activation_codes` collection
 *   - Prints all generated codes to stdout for factory flashing
 */

const admin = require('firebase-admin');
const crypto = require('crypto');

// --- Configuration ---
const args = process.argv.slice(2);
let count = 50;
const countIndex = args.indexOf('--count');
if (countIndex !== -1 && args[countIndex + 1]) {
  count = parseInt(args[countIndex + 1], 10);
  if (isNaN(count) || count < 1 || count > 500) {
    console.error('Error: --count must be a number between 1 and 500');
    process.exit(1);
  }
}

// --- Initialize Firebase Admin ---
// Try loading from .env.local if dotenv is available
try {
  require('dotenv').config({ path: '.env.local' });
} catch (e) {
  // dotenv not installed, rely on system env vars
}

if (!process.env.FIREBASE_PROJECT_ID) {
  console.error('Error: FIREBASE_PROJECT_ID environment variable is required.');
  console.error('Make sure your .env.local or system environment variables are set.');
  process.exit(1);
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();

// --- Code Generation ---
function generateCode() {
  // 8-character uppercase alphanumeric (A-Z, 0-9), excluding ambiguous chars (O, 0, I, 1, L)
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  let code = '';
  const bytes = crypto.randomBytes(8);
  for (let i = 0; i < 8; i++) {
    code += chars[bytes[i] % chars.length];
  }
  return code;
}

async function main() {
  console.log(`\n🔑 Generating ${count} activation codes...\n`);

  const codes = [];
  const usedCodes = new Set();

  // Generate unique codes
  while (codes.length < count) {
    const code = generateCode();
    if (!usedCodes.has(code)) {
      usedCodes.add(code);
      codes.push(code);
    }
  }

  // Write to Firestore in batches of 500 (Firestore limit)
  const batchSize = 500;
  for (let i = 0; i < codes.length; i += batchSize) {
    const batch = db.batch();
    const chunk = codes.slice(i, i + batchSize);

    for (const code of chunk) {
      const ref = db.collection('activation_codes').doc(code);
      batch.set(ref, {
        status: 'unused',
        claimedBy: null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    await batch.commit();
    console.log(`  ✅ Batch ${Math.floor(i / batchSize) + 1}: Wrote ${chunk.length} codes to Firestore`);
  }

  // Output all codes
  console.log(`\n${'='.repeat(50)}`);
  console.log(`  GENERATED CODES (${count} total)`);
  console.log(`${'='.repeat(50)}\n`);

  codes.forEach((code, index) => {
    console.log(`  ${String(index + 1).padStart(3, ' ')}. ${code}`);
  });

  console.log(`\n${'='.repeat(50)}`);
  console.log(`  All ${count} codes written to Firestore ✅`);
  console.log(`${'='.repeat(50)}\n`);

  // Also output as CSV for easy factory import
  console.log('--- CSV FORMAT (copy below) ---');
  console.log(codes.join('\n'));
  console.log('--- END CSV ---\n');

  process.exit(0);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
