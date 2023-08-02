import Chat from "../models/Chat.js";

export const addMessage = async (req, res) => {
  try {
    const { sender, reciever, message } = req.body;
    console.log(req.body);
    const chat = await Chat.create({
      sender,
      reciever,
      message,
    });
    if (!chat) res.status(204).json({ msg: "No Content" });
    await chat.save();
    console.log(chat);
    res.status(201).json(chat);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    let { sender, reciever } = req.params;
    const messages = await Chat.find({ 
        $or :[
        {$and: [{sender},{reciever}]},
        {$and:[{sender:reciever},{reciever:sender}]}
    ] }).select('sender reciever message createdAt -_id ')
    .sort({
      timeStamp: -1,
    });
    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ err: error.message });
  }
};
