import { Schema, model } from "mongoose";

const usersSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true, 
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, "El correo electrónico no es válido."]
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    role: {
        type: String,
        enum: ["admin", "trainer", "user"],
        default: "user",
    },
    plan: {
        type: String,
        enum: ["basico", "vip", "elite"],
        default: null,
    },
    planStatus: {
        type: String,
        enum: ["pending", "active"],
        default: "pending",
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    currentSessionIndex: {
        type: Number,
        default: 0,
    },
    streakCount: {
        type: Number,
        default: 0,
    },
    lastCompletedDate: {
        type: Date,
        default: null,
    },
}, {
    versionKey: false,
    timestamps: true,
});

export default model('Users', usersSchema)