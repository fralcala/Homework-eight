import * as $ from "jquery";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "./firebaseConfig";

const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("User is signed in");
    $("#yr").css("display", "block");
  } else {
    console.log("User is signed out for real");
    $("#yr").css("display", "block");
  }
});

export function signUserUp(fn, ln, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User Created");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function signUserOut() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      $("#yr");
    })
    .catch((error) => {
      console.log("Error" + error);
    });
}

export function signUserin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User signed in");
    })
    .catch((error) => {
      console.log(error);
    });
}

export function changePage(pageName) {
  console.log("pageName: ", pageName);
  if (pageName == "") {
    $.get("pages/home.html", (data) => {
      $("#app").html(data);
    }).fail((error) => {
      console.log("error", error);
      Swal.fire({
        title: "Error. Choose a different page.",
        text: `${error.statusText}`,
        icon: "error",
        confirmButtonText: "Yes",
        showCancelButton: true,
      });
    });
  } else {
    $.get(`pages/${pageName}.html`, (data) => {
      $("#app").html(data);
    }).fail((error) => {
      console.log("error", error);
    });
  }
}
