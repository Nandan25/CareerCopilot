import express from 'express';
import passport from 'passport';
import { User } from '../models/User';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = new User({
            name,
            email,
            password: hashedPassword,
        });

        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/login', passport.authenticate('local', { session: false }), (req: any, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token, user: { id: req.user._id, name: req.user.name, email: req.user.email } });
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { session: false, failureRedirect: '/login' }), (req: any, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.redirect(`http://localhost:5173/auth/success?token=${token}&name=${req.user.name}&email=${req.user.email}`);
});

export default router;
