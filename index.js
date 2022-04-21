const {
  TransactionalEmailsApi,
  TransactionalEmailsApiApiKeys,
} = require("@sendinblue/client");
const { promisify } = require("util");
const request = promisify(require("request"));

const apiInstance = new TransactionalEmailsApi();

apiInstance.setApiKey(
  TransactionalEmailsApiApiKeys.apiKey,
  process.env.SENDINBLUE_API_KEY
);

const main = async () => {
  const start = new Date();
  console.log("Start", start);
  // This is fast (2 - 4 seconds):
  // await apiInstance.sendTransacEmail({
  //   sender: { name: "John Doe", email: "test@ubox.org" },
  //   to: [{ email: "test@mail.crusty.io" }],
  //   subject: "test mail",
  //   textContent: "hallo thomas",
  // });

  // This is really slow (>30 seconds):
  await apiInstance.sendTransacEmail({
    templateId: 3,
    to: [{ email: "test@mail.crusty.io" }],
    params: { verificationLink: "youtube.com/watch?v=dQw4w9WgXcQ" },
  });

  await request("http://mail.crusty.io:3002/test");
  const end = new Date();
  console.log("End", end);
  console.log("Delay", (end.getTime() - start.getTime()) / 1000, "seconds");
};
main();
