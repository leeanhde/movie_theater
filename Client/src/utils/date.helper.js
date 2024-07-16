const { format, parseISO } = require('date-fns');

export function getDayOfWeek(dateString) {
  const date = parseISO(dateString);
  return format(date, 'EEEE');
}
