const router = require("express").Router();
const axios = require("axios");

/* GET home page */
router.get("/characters", (req, res, next) => {
  axios
    .get("https://ih-crud-api.herokuapp.com/characters")
    .then((responseFromAPI) => {
      // console.log(responseFromAPI)
      res.render("characters/list-characters", {
        characters: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/create", (req, res, next) => {
  res.render("characters/create-character.hbs");
});

router.post("/characters/create", (req, res, next) => {
  if (req.body.debt === "true") {
    req.body.debt = true;
  } else if (req.body.debt === "false") {
    req.body.debt = false;
  }
  axios
    .post("https://ih-crud-api.herokuapp.com/characters", {
      name: req.body.name,
      occupation: req.body.occupation,
      debt: req.body.debt,
      weapon: req.body.weapon,
    })
    .then(() => {
      res.redirect("/characters");
    })
    .catch((err) => console.log(err));
});

router.get("/characters/:id", (req, res, next) => {
  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/details-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.get("/characters/:id/edit", (req, res, next) => {
  // Getting the data from the character  by submitting the req.params.id then creating a paramater inside  the then statement
  //  Then create a parameter inside the then statement that takes that id and  while you render the page create a character object so that we can access the character data via the handlebars file through the data key.

  axios
    .get(`https://ih-crud-api.herokuapp.com/characters/${req.params.id}`)
    .then((responseFromAPI) => {
      // console.log("details: ", responseFromAPI.data)
      res.render("characters/edit-character", {
        character: responseFromAPI.data,
      });
    })
    .catch((err) => console.error(err));
});

router.post("/characters/:id/update", (req, res, next) => {
  axios
    .put(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      req.body
    )
    .then(() => {
      res.redirect("/characters");
    })
    .catch((err) => console.log(err));
});

router.post("/characters/:id/delete", (req, res, next) => {
  //Getting the req.params because a ":" is present in the link and we are fetching the ID then redirecting to the characters

  axios
    .delete(
      `https://ih-crud-api.herokuapp.com/characters/${req.params.id}`,
      req.body
    )
    .then(() => {
      res.redirect("/characters");
    });
});

module.exports = router;

// https://ih-crud-api.herokuapp.com/characters
