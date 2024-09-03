const moment = require("moment");

const slotGenerator = (startTime, endTime) => {
  // today
  let date = moment().format("YYYY-MM-DD");
  //   startday in moment format
  startTime = moment(date + " " + startTime, "YYYY-MM-DD HH:mm");
  //   end time as a moment object
  endTime = moment(date + " " + endTime, "YYYY-MM-DD HH:mm");
  //   resuly array
  let result = [];
  //   iterate and generate slots
  while (startTime.isBefore(endTime)) {
    // declare object
    let obj = {};
    obj.active=true
    // start time
    obj.startTime = startTime.format("HH:mm");
    // add the slot duration
    startTime = startTime.add(15, "m");
    // end time
    obj.endTime = startTime.format("HH:mm");
    // push to slots array
    result.push(obj);
  }
    // return result
  return result;
};

module.exports = slotGenerator;
