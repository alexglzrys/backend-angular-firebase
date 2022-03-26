import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Referencia a la base de datos para este proyecto en Firebase
const db = admin.firestore();


// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.json({
      'message': 'Hola mundo desde Firebase Cloud Functions',
      'command': 'firebase serve'
  });
});

export const getGOTY = functions.https.onRequest(async(req, res) => {
  // Obtener el valor de un Query String
  const name = req.query.name || 'Sin nombre';

  // Obtener referencia a la base de datos Firestore
  const gotyRef = db.collection('goty');
  // Consultar el estado actual de mi colecciòn
  const docsSnap = await gotyRef.get();
  // Recuparar la informaciòn de todos los documentos registrados en la colecciòn
  const juegos = docsSnap.docs.map(juego => juego.data());

  res.json(juegos)
})
