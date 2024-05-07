const GMP = require("../models").GMP;
const Reminder = require("../models").Reminder;

async function joinedList(userId) {
  try {
    const data = await GMP.findAll({ where: { userId: userId } });
    const joined = data.map((GMP) => {
      return GMP.apmId;
    });
    return joined;
  } catch (err) {
    return [];
  }
}

async function reminderOf(apmId, userId) {
  const reminder = await Reminder.findOne({
    where: { appointmentId: apmId, userId: userId },
  });
  return reminder ? reminder.toJSON() : "";
}

module.exports = {
  joinedList,
  reminderOf,
};
