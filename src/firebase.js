import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCtgETZhp0ukvpSOTO-ihoLVUn-DO_hmCk",
    authDomain: "iexpress-e6a45.firebaseapp.com",
    databaseURL: "https://iexpress-e6a45.firebaseio.com",
    projectId: "iexpress-e6a45",
    storageBucket: "iexpress-e6a45.appspot.com",
    messagingSenderId: "1095051193777",
    appId: "1:1095051193777:web:fbd54492725c20ebc3a190",
    measurementId: "G-T19JT1FFV9"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;