export interface CalendarEventOptions {
  title: string;
  description: string;
  location: string;
  startDate: string; // e.g. "2026-11-12T09:00:00"
  endDate?: string;
  fileName?: string;
}

export function downloadICSFile({
  title,
  description,
  location,
  startDate,
  endDate,
  fileName = 'cise-institutional-event.ics'
}: CalendarEventOptions) {
  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
      const now = new Date();
      now.setMonth(now.getMonth() + 2);
      return now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }
    return d.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startFormatted = formatDate(startDate);
  const endFormatted = endDate ? formatDate(endDate) : startFormatted;

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Iraqi-Chinese Agency//CISE Institutional Portal//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${title.replace(/[,;]/g, ' ')}`,
    `DESCRIPTION:${description.replace(/\n/g, '\\n')}`,
    `LOCATION:${location.replace(/[,;]/g, ' ')}`,
    `DTSTART:${startFormatted}`,
    `DTEND:${endFormatted}`,
    `STATUS:CONFIRMED`,
    `ORGANIZER;CN="Chinese Institute for Strategic and Economic Studies":mailto:events@iraq-china-agency.com`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', fileName);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
