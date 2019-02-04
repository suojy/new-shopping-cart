import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const config = {
    apiKey: "AIzaSyDL1xfHHqUaKYRsXhW5VNqBOOAOe4mH-bg",
    authDomain: "new-shopping-cart-742e0.firebaseapp.com",
    databaseURL: "https://new-shopping-cart-742e0.firebaseio.com",
    projectId: "new-shopping-cart-742e0",
    storageBucket: "new-shopping-cart-742e0.appspot.com",
    messagingSenderId: "51932463874"
  };
  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.database();
    }
    // *** User API ***

  user = uid => this.db.ref(`users/${uid}`);

  users = () => this.db.ref('users');
  }
  
  export default Firebase;