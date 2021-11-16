const seconds ={
  minute: 60,
  hour: 60*60,
  day: 60*60*24,
  secondDay: 60*60*24*2,
};

const dateTimeFormat = new Intl.DateTimeFormat('en', {
  year: 'numeric', 
  month: 'numeric', 
  day: 'numeric',
  hour: 'numeric', 
  minute: 'numeric', 
});

const dateTimeFormatToday = new Intl.DateTimeFormat('en', {
  hour: 'numeric', 
  minute: 'numeric', 
  second: 'numeric',
  hour12: false
});

const convertDate = date => {
  const newDate = new Date(date);
  const [{ value: month },,{ value: day },,{ value: year },,{value: hour},,{value: minute}] = dateTimeFormat.formatToParts(newDate);
  return `${hour}:${minute} ${day}.${month}.${year}`;
};

const convertDateToday = date => {
  const newDate = new Date(date);
  const [{ value: hour },,{ value: minute }] = dateTimeFormatToday.formatToParts(newDate);
  return `${hour}:${minute}`;
};

const messageSend = (timeStr) => {
  const now = Date.now();
  const time = (new Date(timeStr)).getTime();
  const different = (now - time)/1000;
  if(different < seconds.day) {
    return convertDateToday(time);
  }
  return convertDate(time);
};
  
export default messageSend;