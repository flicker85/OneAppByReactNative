export default function formatDate(date) {
  let add0 = function(m) {
    return m < 10 ? "0" + m : m;
  };
  let time;
  if(date instanceof Date) {
    time = date;
  } else {
    time = new Date(date.substr(0,10));
  }
  var y = time.getFullYear();
  var m = time.getMonth() + 1;
  var d = time.getDate();
  return (
    y +
    "-" +
    add0(m) +
    "-" +
    add0(d)
  );
}