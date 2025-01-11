import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const exitingUser = await User.findOne({ email: email });
        if (exitingUser)
            return res.status(400).json({
                success: false,
                msg: "User already exists"
            })

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, password: hashedPassword });
        if (!user) throw new Error('User SignUp failed');

        await user.save();
        res.status(201).json({ message: 'User SignUp successfully' });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error registering user' });
    }
};


export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const validUser = await bcrypt.compare(password, user.password);
        if (!validUser) return res.status(400).json({ error: 'Invalid credentials' });

        const token = jwt.sign({ userId: user._id }, process.env.secretKey, { expiresIn: '48h' });
        res.cookie('auth-token', token, { maxAge: 48 * 60 * 60 * 1000, httpOnly: true });
        res.status(200).json({
            token,
            success: true,
            message: 'Signed in successfully'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error signing in' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
};


