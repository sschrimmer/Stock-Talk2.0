const { Post } = require('../models');

module.exports = {
    addReaction(req, res) {
        Post.findOneAndUpdate(
            { _id: req.params.postId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((dbPostData) => {
                if (!dbPostData) {
                    return res.status(404).json({ message: "No post with this id!" });
                }
                res.json(dbPostData);
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        }
    }