const formattedHours = (minutes: number) => {
  const hours = minutes / 60;
  const wholeHours = Math.floor(hours);
  const decimalMinutes = (hours - wholeHours) * 60;

  const roundedMinutes = decimalMinutes.toFixed(0);

  let formattedString = '';

  if (wholeHours > 0) {
    formattedString = `${wholeHours} hour`;
    if (wholeHours > 1) {
      formattedString += 's';
    }
  }

  if (+roundedMinutes > 0) {
    if (formattedString !== '') {
      formattedString += ' and ';
    }
    formattedString += `${roundedMinutes} minute`;
    if (+roundedMinutes > 1) {
      formattedString += 's';
    }
  }

  return formattedString;
};

export default formattedHours;
