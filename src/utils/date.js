const addZero = number => number < 10 ? '0' + number : number

const formatDate = (dateStr, format) => {
  /* format 
  YYYY - year
  MM - Month
  DD - day
  HH - hours
  mm - minutes
  ss - Seconds
  */
  if (!format) {
    format = 'YYYY-MM-DD HH:mm:ss';
  }

  if (dateStr) {
    const date = new Date(Date.parse(dateStr));
    const year = addZero(date.getFullYear());
    const month = addZero(date.getMonth());
    const dayNum = addZero(date.getDate());
    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());
    const seconds = addZero(date.getSeconds());

    const formattedDate = format
      .replace(/YYYY/g, year)
      .replace(/MM/g,month)
      .replace(/DD/g, dayNum)
      .replace(/HH/g, hours)
      .replace(/mm/g, minutes)
      .replace(/ss/g, seconds);

    return formattedDate;
  }

  return ''
}

export default formatDate