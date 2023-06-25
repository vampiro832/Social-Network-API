const { thought, User } = require('../models');


modual.exports = {

    getThoughts(req, res) {
        thought.find({})
        .then((thoughts)=> res.json(thoughts))
        .catch((err)=> res.status(400).json(err));
    },

    getSingleThought(req, res) {
        thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought)=>
        !thought
        ? res.status(404).json({ message: 'No thought found with this id!' })
        : res.json(thought)
        )
        .catch((err)=> res.status(400).json(err));
    },

    createThought(req, res) {
        thought.create(req.body)
        .then((thought) => res.jason(thought))
        .catch((err)=> {
            console.log(err);
            return res.status(400).json(err);
        });
    },


    deleteThought(req, res) {
        thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought)=> 
        !thought
        ?res.status(404).json({message: 'No thought with that ID' }) 
        :User.deleteMany({_id:{ $in:thought.user} }) 
        )
        .then(() => res.json({message:'Thought and user deleted'}))
        .catch((err)=> res.status(400).json(err));
    },

    updateThought(req, res) {
        thought.findOneAndUpdate(
            {_id: req.params.thoughtId },
            {$set: req.body},
            {runValidators: true, new: true}
        )
        .then((thought)=>
        !thought
        ? res.status(404).json({message: 'No thought with that ID'})
        : res.json(thought)
        )
        .catch((err)=> res.status(400).json(err));

        },
};