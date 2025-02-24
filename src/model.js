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
    $(".yr").css("display", "block");
  } else {
    console.log("User is signed out for real");
    $(".yr").css("display", "none");
    // uncomment to get yr to show up only when logged in
  }
});

export function signUserUp(fn, ln, email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      console.log("User Created");
      alert("User Created!");
      $(".login").css("display", "none");
      $(".logOut").css("display", "block");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error Message " + errorMessage);
    });
}

export function signUserOut() {
  signOut(auth)
    .then(() => {
      console.log("User signed out");
      $(".yr");
      $(".login").css("display", "block");
      $(".logOut").css("display", "none");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error Message " + errorMessage);
    });
}

export function signUserin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      alert("User logged in");
      $(".login").css("display", "none");
      $(".logOut").css("display", "block");
    })
    .catch((error) => {
      const errorMessage = error.message;
      alert("Error Message " + errorMessage);
    });
}

// recipes
const userRecipes = [];

function addRecipeListeners() {
  $("#ingredsBtn").on("click", function () {
    let currentIngredCount = $(".ingreds input").length;
    currentIngredCount++;

    $(".ingreds").append(
      `<input type="text" id="ingred${currentIngredCount}" placeholder="Ingredient #${currentIngredCount}" />`
    );
  });

  $("#instrcutBtn").on("click", function () {
    let currentInstructCount = $(".instructs input").length;
    currentInstructCount++;
    $(".instructs").append(
      `<input type="text" id="instruct${currentInstructCount}" placeholder="Instruction #${currentInstructCount}" />`
    );
  });

  $(".submitBtn").on("click", function () {
    let recipe = {
      recipeName: $("#recipeName").val(),
      recipeImageURL: $("#imageURL").val(),
      recipeDesc: $("#recipeDesc").val(),
      recipeTime: $("#recipeTime").val(),
      servingSize: $("#servingSize").val(),
      // ingredients: [],
      // instructions: [],
    };

    // $(".ingreds input").each(function () {
    //   recipe.ingredients.push($(this).val());
    // });

    // $(".instructs input").each(function () {
    //   recipe.instructions.push($(this).val());
    // });

    userRecipes.push(recipe);
    alert("Recipe submitted!");
    $(".form input").val("");
    console.log(userRecipes);
  });
}

function removeRecipeListeners() {
  $(".submitBtn").off("click");
  $("#instrcutBtn").off("click");
  $("#ingredsBtn").off("click");
}

export function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  console.log(hashTag + " " + pageID);

  if (pageID != "") {
    $.get(`pages/${pageID}.html`, function (data) {
      $("#app").html(data);
      if (pageID == "createRecipe") {
        addRecipeListeners();
      } else if (pageID == "yourRecipes") {
        console.log("userRecipes " + userRecipes);
        let recipeStr = "";
        $.each(userRecipes, (index, recipe) => {
          recipeStr += `<div class="recipe">
        <div class="recipeContent">
          <div class="recipeImageHolder">
            <img src="images/${recipe.recipeImageURL}" alt="${recipe.recipeName}" />
            <button class="viewBtn">View</button>
          </div>

          <div class="recipeDescription">
            <h2>${recipe.recipeName}</h2>
            <p>${recipe.recipeDesc}</p>
            <div class="icons">
              <div class="icon" id="time">
                <img src="./images/time.svg" alt="time logo" />
                <p>${recipe.recipeTime}</p>
              </div>
              <div class="icon" id="servings">
                <img src="./images/servings.svg" alt="time logo" />
                <p>${recipe.servingSize}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="recipeButtons">
          <button>Edit Recipe</button>
          <button>Delete</button>
        </div>
      </div>`;
        });

        $("#showAllRecipes").html(recipeStr);

        removeRecipeListeners();
      } else {
        removeRecipeListeners();
      }
    });
  } else {
    $.get(`pages/home.html`, function (data) {
      console.log("data " + data);
      $("#app").html(data);
    });
  }
}
