const express = require('express');
const router = express.Router();
const User = require('../models/User');

const passport = require('passport');

router.get('/users/login', (req, res) => {
    res.render('users/login');
});

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/notes',
    failureRedirect: '/users/login',
    failureFlash: true
}));

router.get('/users/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/users/signup', async (req, res) => {
    const { name, email, password, confirm_password } = req.body;
    const errors = [];
    const emailUser = await User.findOne({email: email});
    const nameUser = await User.findOne({name: name});
    if (name.length <= 0) {
        errors.push({text: 'Please insert your name'});
    }
    if (password != confirm_password) {
        errors.push({text: 'Passwords do not match'});
    }
    if (password.length < 4) {
        errors.push({text: 'Password must be at least 4 characters'});
    }
    if (emailUser) {
        errors.push({text: 'The email already exists!'});
    }
    if (nameUser) {
        errors.push({text: 'The name already exists!'});
    }
    if (errors.length > 0) {
        return res.render('users/signup', {errors, name, email, password, confirm_password});
    } else {
        const newUser = new User({name, email, password});
        newUser.password = await newUser.encriptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered!')
        return res.redirect('/users/login');
    }
});

router.get('/users/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;