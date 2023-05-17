// import mongoose, { Schema, Document } from 'mongoose';

const mongoose = require('mongoose')

//define the interface for shroom document
interface Shroom extends Document {
    name: string;
    description: string;
    type: string;
    createdAt: Date;
    updatedAt: Date;
};

//define schema
const shroomSchema = new mongoose.Schema({
    name: {type: String, required: true },
    description: { type: String },
    type: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

//define model
const Shroom = mongoose.model('Shroom', shroomSchema);

module.exports = Shroom