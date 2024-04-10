import OpenAI from "openai";

const openai = new OpenAI();

async function main() {
  const run = await openai.beta.threads.createAndRun({
    instructions: "You are a code autocomplete engine.You dont ask or talk. Your job is to complete the code snippet one line at a time. Now write first line for the code which follows",
    assistant_id: "asst_vicZxSUaZYBo53UeY2XW153l",
    thread: {
      messages: [
        { role: "user", content: "//def add2nos(" },
      ],
    },
  });
  const runid = run.id;
  const threadid = run.thread_id;

  while (run.status !== "completed") {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const updatedRun = await openai.beta.threads.runs.retrieve(threadid, runid);
    if (updatedRun.status === "completed") {
      break;
    }
  }

  const threadMessages = await openai.beta.threads.messages.list(threadid);
  const latestMessage = threadMessages.data[0];
  const text = latestMessage.content[0].text.value;
  console.log(text);
}

main();