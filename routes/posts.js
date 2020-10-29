const router = require(`express`).Router();
const Post = require(`../models/post`);


//Find all posts
router.route(`/`).get((req, res) => {
    Post.find().then((posts) => res.json(posts))
    .catch((err) => res.status(400).json(err));
});

router.route(`/create`).post((req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    //Save new post into object
    const newPost = new Post({title, content});
    //save new post to database
    newPost.save().then(() => res.json(`Post created!`))
    .catch(err => res.status(400).json(err));
});
//Find post by specific id (./:id is the literal db object id)
router.route(`/:id`).get((req, res) => {
    //Pulls id from URL
    Post.findById(req.params.id).then(post => res.json(post))
    .catch(err => res.status(400).json(err));
});
//Find and delete post by specific id
router.route(`/:id`).delete((req, res) => {
    //Pulls id from URL
    Post.findByIdAndDelete(req.params.id).then(post => res.json(`Post ${post.title} deleted!`))
    .catch(err => res.status(400).json(err));
});
//Find and update post by specific id. 
router.route(`/:id`).post((req, res) => {
    //Pulls id from URL
    Post.findByIdAndUpdate(req.params.id).then(post => {
        post.title = req.body.title;
        post.content= req.body.content;

        post.save().then(() => res.json(`${post.title} post updated`))
        .catch(err => res.status(400).json(err))
    })
    .catch(err => res.status(400).json(err));
});

module.exports = router;