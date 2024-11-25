import * as $ from "jquery";
import {
  signUserUp,
  signUserOut,
  signUserin,
  changeRoute,
  addRecipeListeners,
} from "./model";

function route() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  console.log("route", pageID);
  changeRoute(pageID);
}

function initListeners() {
  //URL
  $(window).on("hashchange", route);
  route();

  // sign up
  console.log("init");
  $(document).on("click", "#signSubmit", () => {
    console.log("hello");
    const firstName = $("#fName").val();
    const lastName = $("#lName").val();
    const email = $("#email").val();
    const password = $("#password").val();
    signUserUp(firstName, lastName, email, password);
  });

  $(".logOut").on("click", () => {
    signUserOut();
  });

  $(document).on("click", "#logSubmit", () => {
    let logEmail = $("#logEmail").val();
    let logPassword = $("#logPassword").val();
    signUserin(logEmail, logPassword);
  });
}

$(document).ready(function () {
  initListeners();
});
