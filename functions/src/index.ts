import * as functions from "firebase-functions";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({
      'message': 'Hola mundo desde Firebase Cloud Functions',
      'command': 'firebase serve'
  });
});
