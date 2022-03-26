import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';

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

// * Generar una app de Express sobre un proyecto Firebase Cloud Functions
const app = express();
app.use(cors({origin: true}));

app.get('/goty', async(req, res) => {
  const gotyRef = db.collection('goty');
  const docsSnap = await gotyRef.get();
  const juegos = docsSnap.docs.map(juego => juego.data());
  res.json(juegos)
});

// Servicio para actuaizar los votos de un juego
app.post('/goty/:id', async(req, res) => {
  const id = req.params.id;
  // Verificar que el id del docuemnto exista, de lo contrario Firebase lo creará
  const gameRef = db.collection('goty').doc(id);
  const gameSnap = await gameRef.get();
  if (!gameSnap.exists) {
    res.status(404).json({
      status: false,
      message: 'No existe un juego con el ID ' + id
    });
  } else {
    // Recuperar los datos del juego, y actualizar sus votos en + 1
    const currentGame = gameSnap.data()!;
    // actualizar
    await gameRef.update({
      votes: currentGame.votes + 1
    });
    res.json({
      status: true,
      message: `Gracias por tu voto a ${currentGame.name}`
    })
  }
});

// Cualquier petición https adicional, va a ser gestionada por nuestra app de express
// localhost/api/url_express
export const api = functions.https.onRequest(app);