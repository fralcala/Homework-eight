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

// recipes
const userRecipes = [];

function addRecipeListeners() {
  $("#ingredBtn").on("click", function () {
    let currentIngredCount = $(".ingreds input").length;
    currentIngredCount++;
    // console.log("ingredBtn clicked", currentIngredCount);
    $(".ingreds").append(
      `<input type="text" id="ingred${currentIngredCount}" placeholder="Ingredient ${currentIngredCount}" />`
    );
  });

  $("#instructBtn").on("click", function () {
    let currentInstructCount = $(".instructs input").length;
    currentInstructCount++;
    $(".instructs").append(
      `<input type="text" id="instruct${currentInstructCount}" placeholder="Instruction ${currentInstructCount}" />`
    );
  });

  $(".submitBtn").on("click", function () {
    let recipe = {
      recipeName: $("#recipeName").val(),
      recipeImageURL: $("#imageURL").val(),
      ingredients: [],
      instructions: [],
    };

    $(".ingreds input").each(function () {
      recipe.ingredients.push($(this).val());
    });

    $(".instructs input").each(function () {
      recipe.instructions.push($(this).val());
    });

    userRecipes.push(recipe);
    alert("Recipe submitted!");
    $(".form input").val("");
    console.log(userRecipes);
  });
}

function removeRecipeListeners() {
  $(".submitBtn").off("click");
  $("#instructBtn").off("click");
  $("#ingredBtn").off("click");
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
        let rectipeStr = "";
        $.each(userRecipes, (index, recipe) => {
          rectipeStr += `<div class="recipe">
  <div class="recipeImageHolder">
    <img src="${recipe.recipeImageURL}" alt="Recipe 1" />
  </div>
  <div class="recipeDescription">
    <h2>${recipe.recipeName}</h2>
    <p>Ingredients: ingredient 1, ingredient 2, ingredient 3</p>
    <p>Instructions: instruction 1, instruction 2, instruction 3</p>
  </div>
</div>`;
        });

        $("#showAllRecipes").html(rectipeStr);

        removeRecipeListeners();
      } else {
        removeRecipeListeners();
      }
    });
  } else {
    $.get(`pages/home/home.html`, function (data) {
      console.log("data " + data);
      $("#app").html(data);
    });
  }
}
