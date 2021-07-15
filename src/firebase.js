import firebase from 'firebase/app'
import 'firebase/firestore'
var config = {
    apiKey: "AIzaSyBRwTftExmSA4KnYwQZ0OPy5DNn2ICu7Ew",
    authDomain: "pinterest-4ba20.firebaseapp.com",
    projectId: "pinterest-4ba20",
    storageBucket: "pinterest-4ba20.appspot.com",
    messagingSenderId: "652407764560",
    appId: "1:652407764560:web:467b24b089770be1760355"
};

firebase.initializeApp(config)
const db = firebase.firestore()

db.settings({ timestampsInSnapshots: true })

export default db