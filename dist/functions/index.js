const functions = require("firebase-functions");
const mainjs = require(__dirname + "/server/main");
exports.ssrapp = functions.https.onRequest(mainjs.app());

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
