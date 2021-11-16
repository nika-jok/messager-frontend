const seconds ={
  minute: 60,
  hour: 60*60,
  day: 60*60*24,
  secondDay: 60*60*24*2,
};

const formatter = str => `Был(ла) ${str}`;

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric', 
  month: 'numeric', 
  day: 'numeric',
});

const convertDate = date => {
  const newDate = new Date(date);
  const [{ value: month },,{ value: day },,{ value: year }] = dateTimeFormat.formatToParts(newDate);
  return `${day}.${month}.${year }`;
};

const lastOnline = (timeStr, isOnline) => {
  if(!timeStr) return '';
  if(isOnline) return 'Online';
  const now = Date.now();
  const time = (new Date(timeStr)).getTime();
  const different = (now - time)/1000;
  if(different < seconds.minute) {
    return formatter('только что');
  }
  if(different < seconds.hour) {
    return formatter(`${Math.round(different/60)} минут назад`);
  }
  if(different < seconds.day) {
    return formatter(`${Math.round(different/60/60)} часов назад`);
  }
  if(different < seconds.secondDay) {
    return formatter('вчера');
  }
  return formatter(convertDate(timeStr));
};

export default lastOnline;