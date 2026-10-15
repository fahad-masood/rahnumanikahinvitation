import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const html = await readFile(new URL('dist/index.html', root), 'utf8');
const ics = await readFile(new URL('dist/nikah.ics', root), 'utf8');
const sourceIcs = await readFile(new URL('public/nikah.ics', root), 'utf8');
const text = html
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
  .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&amp;|&#38;/g, '&')
  .replace(/\s+/g, ' ');

assert.match(html, /<html\b[^>]*\blang=["']en["']/i, 'Declare the document language.');
assert.match(html, /<meta\b[^>]*name=["']viewport["']/i, 'Provide a mobile viewport.');
assert.match(text, /Rahnuma Zarrin/, 'The bride’s full name must be rendered in static HTML.');
assert.match(text, /Fahad Masood/, 'The groom’s full name must be rendered in static HTML.');
assert.ok(text.indexOf('Rahnuma Zarrin') < text.indexOf('Fahad Masood'), 'The bride must appear first.');
assert.doesNotMatch(text, /Fahad Masood\s*(?:&|and|×|\+)\s*Rahnuma Zarrin/i, 'Keep all paired names in bride-first order.');
assert.match(text, /Nikah/i, 'Identify the ceremony.');
assert.match(text, /12\s+(?:November\s+)?2026|12\s+November/i, 'Display the supplied date.');
assert.match(text, /Thursday/i, 'Display the correct weekday.');
assert.match(text, /November/i, 'Display the correct month.');
assert.match(text, /2026/, 'Display the correct year.');
assert.match(text, /6:00\s*PM/i, 'Display the correct start time.');
assert.match(text, /IST|India Standard Time/i, 'Clarify the time zone.');
assert.match(text, /Aman Park/, 'Display the venue.');
assert.match(text, /New Delhi/, 'Display the city.');
assert.match(text, /India/, 'Display the country.');
assert.match(html, /href=["']https:\/\/maps\.app\.goo\.gl\/4JDyNdM4EDK4V9nc8["']/i, 'Directions must link to the supplied map.');
assert.match(html, /href=["'](?:\.\/|\/)?nikah\.ics["']/i, 'Calendar download must work without JavaScript.');
assert.match(html, /بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ/, 'Preserve the supplied Arabic Bismillah.');
assert.match(html, /\blang=["']ar["']/i, 'Identify Arabic content for assistive technology.');
assert.match(html, /\bdir=["']rtl["']/i, 'Use right-to-left Arabic text direction.');
assert.doesNotMatch(html, /<iframe\b/i, 'Do not load a map iframe.');
assert.doesNotMatch(html, /<video\b/i, 'Keep the invitation free from video loading and embeds.');
for (const audio of html.matchAll(/<audio\b[^>]*>/gi)) {
  assert.match(audio[0], /\bdata-music-audio\b/, 'Only the requested invitation music may be included.');
  assert.match(audio[0], /\bpreload=["']none["']/i, 'Avoid speculative audio downloads.');
  const source = audio[0].match(/\bsrc=["']([^"']+)["']/i)?.[1];
  assert.ok(source?.startsWith('/audio/'), 'Keep the requested recording self-hosted.');
  await readFile(new URL(`dist${source}`, root));
}

function meta(name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  const tag = tags.find((candidate) => new RegExp(`(?:name|property)=["']${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["']`, 'i').test(candidate));
  assert.ok(tag, `Missing ${name} metadata.`);
  const value = tag.match(/\bcontent=["']([^"']+)["']/i)?.[1];
  assert.ok(value, `${name} metadata must have content.`);
  return value;
}

const title = meta('og:title');
assert.match(title, /Nikah/i, 'Social title must identify the ceremony.');
assert.ok(title.indexOf('Rahnuma') >= 0 && title.indexOf('Rahnuma') < title.indexOf('Fahad'), 'Social title must put the bride first.');
meta('description');
meta('og:description');
const socialImage = meta('og:image');
assert.doesNotMatch(socialImage, /localhost|127\.0\.0\.1|example\.(?:com|org)|YOUR[_-]/i, 'Do not publish placeholder social images.');
assert.equal(meta('og:image:width'), '1200', 'Social image should be 1200 pixels wide.');
assert.equal(meta('og:image:height'), '630', 'Social image should be 630 pixels high.');
const socialImagePath = new URL(socialImage, 'https://local.test').pathname.replace(/^\//, '');
const socialImageBytes = await readFile(new URL(`dist/${socialImagePath}`, root));
assert.deepEqual(socialImageBytes.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), 'Provide a real PNG social preview.');
assert.equal(socialImageBytes.readUInt32BE(16), 1200, 'Verify actual social preview width.');
assert.equal(socialImageBytes.readUInt32BE(20), 630, 'Verify actual social preview height.');
assert.match(html, /<link\b[^>]*rel=["'][^"']*icon[^"']*["']/i, 'Provide a favicon.');

assert.equal(ics, sourceIcs, 'Ship the validated calendar file unchanged.');
assert.match(ics, /^BEGIN:VCALENDAR\r\n/, 'Use RFC 5545 CRLF line endings.');
assert.doesNotMatch(ics.replaceAll('\r\n', ''), /[\r\n]/, 'Calendar must contain only CRLF line endings.');
const unfoldedIcs = ics.replace(/\r\n[ \t]/g, '');
assert.match(unfoldedIcs, /\r\nVERSION:2\.0\r\n/);
assert.match(unfoldedIcs, /\r\nTZID:Asia\/Kolkata\r\n/, 'Declare the intended time zone.');
assert.match(unfoldedIcs, /\r\nBEGIN:VTIMEZONE\r\n[\s\S]*TZOFFSETTO:\+0530[\s\S]*END:VTIMEZONE\r\n/, 'Include the India time-zone definition.');
assert.match(unfoldedIcs, /\r\nDTSTART;TZID=Asia\/Kolkata:20261112T180000\r\n/, 'Calendar must start at 6 PM IST on 12 November 2026.');
assert.equal(new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Kolkata', weekday: 'long', year: 'numeric', month: 'long',
  day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false,
}).format(new Date('2026-11-12T12:30:00Z')), 'Thursday, November 12, 2026 at 18:00', 'Verify the UTC conversion against the time-zone database.');
assert.match(unfoldedIcs, /\r\nSUMMARY:The Nikah Ceremony — Rahnuma Zarrin & Fahad Masood\r\n/, 'Use accurate bride-first calendar names.');
assert.match(unfoldedIcs, /\r\nLOCATION:Aman Park\\, New Delhi\\, India\r\n/, 'Escape calendar location commas.');
assert.match(unfoldedIcs, /https:\/\/maps\.app\.goo\.gl\/4JDyNdM4EDK4V9nc8/, 'Include directions in the calendar.');
assert.doesNotMatch(unfoldedIcs, /\r\n(?:DTEND|DURATION|ATTENDEE|ORGANIZER):/i, 'Do not invent an end time, guest details, or contacts.');
assert.match(unfoldedIcs, /\r\nUID:[^\r\n]+\r\n/, 'Give the calendar event a stable identifier.');
for (const line of ics.split('\r\n')) {
  assert.ok(Buffer.byteLength(line, 'utf8') <= 75, 'Fold calendar lines at 75 octets.');
}

const prohibited = new RegExp(['wa', 'lima'].join(''), 'i');
async function inspectPublishedFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    assert.doesNotMatch(entry.name, prohibited, 'Published paths must only concern this invitation.');
    if (entry.isDirectory()) await inspectPublishedFiles(path);
    else if (/\.(?:html|js|mjs|css|json|svg|xml|txt|ics|webmanifest)$/i.test(entry.name)) {
      assert.doesNotMatch(await readFile(path, 'utf8'), prohibited, `Unrelated ceremony information in ${entry.name}.`);
    }
  }
}
await inspectPublishedFiles(fileURLToPath(new URL('dist/', root)));

console.log('Invitation validated: static content, bride-first names, date, time, venue, directions, social metadata, Arabic accessibility, and time-zone-aware calendar.');
