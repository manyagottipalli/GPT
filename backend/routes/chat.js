// import express from "express";
// import Thread from "../models/Thread.js";
// import getGeminiResponse from "../utils/gemini.js"
// const router = express.Router();

// //test
// router.post("/test", async (req, res) => {
//   try {
//     const thread = new Thread({
//       threadId: "abc",
//       title: "Testing New Thread2"
//     });

//     const response = await thread.save();
//     res.send(response);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Failed to save in DB" });
//   }
// });


// router.get("/thread",async(req,res) => {
//   try {
// const threads = await Thread.find({}).sort({ updatedAt: -1 });
// res.json(threads);

//   } catch(err) {
//     console.log(err);
//     res.status(500).json({error:"fauiled to fetch threads"});

//   }
// });

// router.get("/thread/:threadId", async(req,res) => {
//   const {threadId} = req.params
//   try {
//     const thread = await Thread.findOne({threadId});
//     if(!thread) { // if there is no valid thread
//       res.status(404).json({error : "thread not found"});
//     }
//     res.json(thread.messages);

//   } catch(err) {
//      console.log(err);
//     res.status(500).json({error:"failed to fetch threads"});
//   }
// });

// router.delete("/thread/:threadId", async(req,res) => {
//  const {threadId} = req.params
// try {
//   const deletedThreadId = await Thread.findOneAndDelete({threadId});
// if(!deletedThreadId) {
//   res.status(400).json({error : "Thread could not be deleted"});
// } 
// res.status(200).json({success : "Thread deleted succesfully"});
// } catch(err) {
//   console.log(err);
//   res.status(500).json({error : "faile to fetch and delete"});
// }
// })

// router.post("/chat", async(req,res) => {
//   const {threadId,message} = req.body;
//   if(!threadId || !message) {
//     res.status(400).json({error : "missing required fields"});
//   }
//   try {
//    let thread = await Thread.findOne({threadId});
//     if(!thread) {
//     threadId = new Thread({
//       threadId,
//       title:message,
//       messages : [{role:"user",content : message}]
//     });
   
//   }  else {
//     thread.messages.push({role:"user",content:message});
//   }

//   const assistant = await getGeminiResponse(message);

//   thread.messages.push({role:"assistant",content:assistant});
//   thread.updatedAt = new Date();
//   await thread.save();
//   res.json({reply : assistant}) // sending reply to the frontend
// } catch(err) {
//   console.log(err);
//   res.status(500).json({error: "something went wrong"});
// }
// });
// export default router;

import express from "express";
import Thread from "../models/Thread.js";
import getGeminiResponse from "../utils/gemini.js";

const router = express.Router();

// test route
router.post("/test", async (req, res) => {
  try {
    const thread = new Thread({
      threadId: "abc",
      title: "Testing New Thread2"
    });

    const response = await thread.save();
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in DB" });
  }
});

// get all threads
router.get("/thread", async (req, res) => {
  try {
    const threads = await Thread.find({}).sort({ updatedAt: -1 });
    res.json(threads);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch threads" });
  }
});

// get a single thread
router.get("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const thread = await Thread.findOne({ threadId });
    if (!thread) {
      return res.status(404).json({ error: "thread not found" });
    }
    res.json(thread.messages);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to fetch thread" });
  }
});

// delete a thread
router.delete("/thread/:threadId", async (req, res) => {
  const { threadId } = req.params;
  try {
    const deletedThread = await Thread.findOneAndDelete({ threadId });
    if (!deletedThread) {
      return res.status(400).json({ error: "Thread could not be deleted" });
    }
    res.status(200).json({ success: "Thread deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "failed to delete thread" });
  }
});

// main chat route
router.post("/chat", async (req, res) => {
  const { threadId, message } = req.body;

  if (!threadId || !message) {
    return res.status(400).json({ error: "missing required fields" });
  }

  try {
    let thread = await Thread.findOne({ threadId });

    if (!thread) {
      // create a new thread
      thread = new Thread({
        threadId,
        title: message,
        messages: [{ role: "user", content: message }]
      });
    } else {
      // append to existing
      thread.messages.push({ role: "user", content: message });
    }

    // get assistant response
    const assistant = await getGeminiResponse(message);

    thread.messages.push({ role: "assistant", content: assistant });
    thread.updatedAt = new Date();

    await thread.save();

    res.json({ reply: assistant });
  } catch (err) {
    console.error("Error in /chat route:", err);


    res.status(500).json({ error: "something went wrong" });
  }
});

export default router;

