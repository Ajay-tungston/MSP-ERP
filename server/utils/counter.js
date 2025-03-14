const Counter = require("../models/Counter");

const getNextCounterNumber = async (name) => {
  const counter = await Counter.findOneAndUpdate(
    { name},
    { $inc: { value: 1 } }, 
    { new: true, upsert: true } 
  );
  
  return counter.value; 
};

module.exports = getNextCounterNumber;
