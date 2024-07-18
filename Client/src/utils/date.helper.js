const { format, parseISO, addMinutes } = require('date-fns');
const moment = require('moment');
export function getDayOfWeek(dateString) {
  const date = parseISO(dateString);
  return format(date, 'EEEE');
}
export function adjustTimeFromTimestamp(timestamp, addMinutesCount = 0) {
  const date = moment.utc(timestamp); 
  const adjustedDate = date.add(addMinutesCount, 'minutes');
  return adjustedDate.format("HH[h]mm");
}
