/** Shared invitation details. All displayed names keep the bride first. */
export const event = Object.freeze({
  bride: 'Rahnuma Zarrin',
  groom: 'Fahad Masood',
  couple: 'Rahnuma Zarrin & Fahad Masood',
  ceremony: 'The Nikah Ceremony',
  brideMother: 'Mrs. Shamshad Begum',
  groomFather: 'Mr. Masood Alam',
  groomMother: 'Mrs Rubeena Shamim',
  hosts: 'Mrs. Shamshad Begum & Family',
  dateLabel: 'Thursday, 12 November 2026',
  dateISO: '2026-11-12',
  weekday: 'Thursday',
  day: '12',
  month: 'November',
  year: '2026',
  timeLabel: '6:00 PM IST',
  time24: '18:00',
  timezone: 'Asia/Kolkata',
  startUTC: '2026-11-12T12:30:00Z',
  venue: 'Aman Park',
  city: 'New Delhi',
  country: 'India',
  location: 'Aman Park, New Delhi, India',
  mapsUrl: 'https://maps.app.goo.gl/4JDyNdM4EDK4V9nc8',
  calendarPath: '/nikah.ics',
});

export const nikahEvent = event;

/** Pass the live page URL; no production hostname is assumed or exposed. */
export function whatsappMessage(invitationUrl: string): string {
  return [
    `By the grace of Allah, you are warmly invited to the Nikah of ${event.couple}.`,
    '12 November 2026 | 6:00 PM IST',
    'Your presence and duas would mean the world to us.',
    `View the invitation: ${invitationUrl}`,
  ].join('\n');
}
