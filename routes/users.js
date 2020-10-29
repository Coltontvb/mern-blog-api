const router = require(`express`).Router();
let User = require(`../models/user`);
//Find all users
router.route(`/`).get((req, res) => {
    User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(err));
});
//Create new user route
router.route(`/create`).post((req, res) => {
    //Collect data from json
    const username = req.body.username;
    const email = req.body.email;
    //Store the user information inside of mongoose object
    const newUser = new User({username, email});
    //Save the user, send 400 in case of error
    newUser.save()
    .then(() => res.json(`User created!`))
    .catch(err => res.status(400).json(err));
});

module.exports = router;