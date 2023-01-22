import mongoose from "mongoose";
import Questions from "../modals/Questions.js";

export const postAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { noOfAnswer, answerBody, userAnswered, userId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('question unavailable...');
    }
    updateNoOfQuestions(_id, noOfAnswer);
    try {
        const updateQuestion = await Questions.findByIdAndUpdate(_id, { $addToSet: { 'answer': [{ answerBody, userAnswered, userId }] } })
        res.status(200).json(updateQuestion);
    } catch (error) {
        res.status(400).json(error);
    }
}

const updateNoOfQuestions = async (_id, noOfAnswer) => {
    try {
        await Questions.findByIdAndUpdate(_id, { $set: { 'noOfAnswers': noOfAnswer } })
    } catch (error) {
        console.log(error);
    }
}

export const deleteAnswer = async (req, res) => {
    const { id: _id } = req.params;
    const { answerId, noOfAnswers } = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send('Question unavailable...');
    }
    if (!mongoose.Types.ObjectId.isValid(answerId)) {
        return res.status(404).send('Answer unavailable...');
    }
    updateNoOfQuestions(_id, noOfAnswers);
    try {
        await Questions.updateOne(
            { _id },
            { $pull: { 'answer': { _id: answerId } } }
        )
        res.status(200).json({ message: "succesfully deleted..." })
    } catch (error) {
        res.status(405).json(error);
    }

}
