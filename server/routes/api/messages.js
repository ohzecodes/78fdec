const router = require("express").Router();
const { Conversation, Message } = require("../../db/models");
const onlineUsers = require("../../onlineUsers");
const { QueryTypes } = require("sequelize");
const db = require("../../db");
// send the content to db
// expects {recipientId, text, conversationId } in body (conversationId will be null if no conversation exists yet)
router.post("/", async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    const senderId = req.user.id;
    // console.log(req.body);
    const { recipientId, text, conversationId, sender } = req.body;
    //
    // if we already know conversation id, we can save time and just add it to message and return
    if (conversationId) {
      const message = await Message.create({
        senderId,
        text,
        conversationId,
      });
      return res.json({ message, sender });
    }
    // if we don't have conversation id, find a conversation to make sure it doesn't already exist
    let conversation = await Conversation.findConversation(
      senderId,
      recipientId
    );

    if (!conversation) {
      // create conversation
      conversation = await Conversation.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
      if (onlineUsers.includes(sender.id)) {
        sender.online = true;
      }
    }
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation.id,
    });
    res.json({ message, sender });
  } catch (error) {
    next(error);
  }
});
router.post("/SetTrue/:cid/:senderId", async (req, res) => {
  cid = req.params.cid;
  senderId = req.params.senderId;
  const q = `UPDATE messages SET "hasRead" = TRUE WHERE "conversationId" =${cid} AND "senderId"=${senderId}AND "hasRead" = FALSE ;`;
  let update = await db
    .query(q, { type: QueryTypes.UPDATE })
    .catch((e) => console.log(e));
  console.log(update);
});

module.exports = router;
