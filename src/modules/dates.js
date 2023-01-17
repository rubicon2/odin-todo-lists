const oneDayInMillis = 1000 * 60 * 60 * 24;
const twoDaysInMillis = oneDayInMillis * 2;

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export function tomorrowInMillis() {
  return todayInMillis() + oneDayInMillis;
}

export function yesterdayInMillis() {
  return todayInMillis() - oneDayInMillis;
}

export function todayInMillis() {
  return floorTimeToDay(new Date.getTime());
}

export function floorTimeToDay(millis) {
  return millis - (millis % oneDayInMillis);
}

export function getRelativeDate(date) {
  // This is rubbish and not going to work. IF you are halfway through the day, if the thing starts tomorrow
  // it would only show TOMORROW if it was over a day beforehand.　NEED TO ROUND TO WHOLE DAYS!
  let diff = floorTimeToDay(date.getTime()) - floorTimeToDay(Date.now());
  if (diff <= -oneDayInMillis && diff > -twoDaysInMillis) {
    return 'Yesterday';
  } else if (diff >= oneDayInMillis && diff < twoDaysInMillis) {
    return 'Tomorrow';
  } else if (diff === 0) {
    return 'Today';
  } else {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  }
}
