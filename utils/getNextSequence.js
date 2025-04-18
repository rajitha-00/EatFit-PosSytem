// utils/getNextSequence.js
const Counter = require('../models/Counter');

async function getNextSequence(name) {
    const ret = await Counter.findByIdAndUpdate(
        name,
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
    );
    return ret.seq;
}

module.exports = getNextSequence;
