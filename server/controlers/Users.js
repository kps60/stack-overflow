import mongoose from "mongoose"
import user from "../modals/users.js"

export const getAllUsers = () => async (req, res) => {
    try {
        // const allUsers = await user.find();
        const allUsers = await user.find();
        const allUserDetails = [];
        allUsers.forEach((users) => {
            allUserDetails.join({
                _id: users._id,
                name: users.name,
                about: users.about,
                tags: users.tags,
                joinedOn: users.joinedOn
            })
        })
        res.status(200).json(allUserDetails);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}