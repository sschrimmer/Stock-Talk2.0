const { Users, Post } = require('../models');

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
        },
        createThought(req, res) {
            Post.create(req.body)
              .then(({ _id }) => {
                return Users.findOneAndUpdate(
                  { _id: req.body.userId },
                  { $push: { thoughts: _id } },
                  { new: true }
                );
              })
              .then((thought) =>
                !thought
                  ? res.status(404).json({ message: "No User found with this ID!" })
                  : res.json(thought)
              )
              .catch((err) => res.status(500).json(err));
          },
    }