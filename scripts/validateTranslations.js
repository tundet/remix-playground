import fs from 'fs';
import path from 'path';

// Get the directory name from import.meta.url
const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

// Define paths to your translation files
const enFilePath = path.join(__dirname, '..', 'locales', 'en-US.json');
const fiFilePath = path.join(__dirname, '..', 'locales', 'fi-FI.json');

// Read the JSON files
const enTranslations = JSON.parse(fs.readFileSync(enFilePath, 'utf-8'));
const fiTranslations = JSON.parse(fs.readFileSync(fiFilePath, 'utf-8'));

// Extract keys from each file
const extractKeys = (obj, prefix = '') => {
  let keys = [];
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'object' && value !== null) {
      keys = keys.concat(extractKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  return keys;
};

const enKeys = new Set(extractKeys(enTranslations));
const fiKeys = new Set(extractKeys(fiTranslations));

// Compare the keys
const missingInFi = Array.from(enKeys).filter(key => !fiKeys.has(key));
const missingInEn = Array.from(fiKeys).filter(key => !enKeys.has(key));

// Output results
console.log('Keys missing in fi-FI:');
missingInFi.forEach(key => console.log(`- ${key}`));

console.log('\nKeys missing in en-US:');
missingInEn.forEach(key => console.log(`- ${key}`));

if (missingInFi.length === 0 && missingInEn.length === 0) {
  console.log('\nAll keys are present in both locales.');
}
