import mongoose from "mongoose";

const { Schema } = mongoose

const userSchema = new Schema({
    username: {
        type: String,
        unique: true, // يمنع تكرار اسم المستخدم في قاعدة البيانات
        required: [true, "Username Required"],
        minlength: [3, "username must be 3 letters or more"],
        trim: true,
    },
    email: {
        type: String,
        unique: true, // يمنع إنشاء أكثر من حساب بنفس الإيميل
        required: [true, "Email is required"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password length must be 6 or more"],
    }
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User