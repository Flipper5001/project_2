module.exports = {
    // the helper method 'format_time' will take in a timestamp and return a string with only the time
    format_time: (date) => {
      // We use the 'toLocaleTimeString()' method to format the time as H:MM:SS AM/PM
      return date.toLocaleTimeString();
    },
    // formatting date to locale
    format_date: (date) => {
      return `${new Date(date).getDate()}/${new Date(date).getMonth()}/${new Date(date).getFullYear()}`;
    }
  };
  