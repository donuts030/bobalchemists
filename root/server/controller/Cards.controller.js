const express = require("express");
const base_seed = require("../models/Ingredients/base_seed");
const Router = express.Router();

//import tea cards info
const TeaCardsInfo = require("../models/teaCardInfo");
const teaCardInfo_seed = require("../models/teaCardInfo_seed");

//import user info
const User = require("../models/userData");

//ROUTES ('api/teacardsinfo/')
//get "api/teacardsinfo/seed"
Router.get("/seed", async (req, res) => {
  try {
    await TeaCardsInfo.deleteMany({});
    const seedCards = await TeaCardsInfo.create(teaCardInfo_seed);
    res.status(200).json({
      status: "ok",
      message: "tea cards seeded",
      data: seedCards,
    });
  } catch (error) {
    console.log("at teacardsinfo/seed", error);
  }
});

//get "api/teacardsinfo"
Router.get("/", async (req, res) => {
  try {
    const populatedCards = await TeaCardsInfo.find({})
      .populate("base", ["name", "img"])
      .populate("flavour", ["name", "img"])
      .populate("toppings", ["name", "img"]);
    res.status(200).json({
      status: "ok",
      message: "populated teaCards returned",
      data: populatedCards,
    });
  } catch (error) {
    console.log(error);
  }
});

//get "api/teacardsinfo/show/:id"
Router.get("/show/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const populatedOneCard = await TeaCardsInfo.findById(id)
      .populate("createdBy", "username")
      .populate("base", ["name", "img"])
      .populate("flavour", ["name", "img"])
      .populate("toppings", ["name", "img"]);
    res.status(200).json({
      status: "ok",
      message: "populated one teaCard",
      data: populatedOneCard,
    });
  } catch (error) {
    console.log("at show/:id", error);
  }
});

//post "api/teacardsinfo/newCard"
Router.post("/newcard", async (req, res) => {
  const newCard = req.body;
  if (!newCard) {
    res.status(400).json({
      status: "error",
      message: "please add the card",
    });
  }
  try {
    const createNewCard = await TeaCardsInfo.create(newCard);
    const updateUser = await User.findOneAndUpdate(
                                    { username: createNewCard.createdBy }, 
                                    { $push: {userCreations: createNewCard._id}}
                                    );

    res.status(200).json({
      status: "ok",
      message: "new Card created",
      data: createNewCard,
      updatedUser: updateUser
    });
  } catch (error) {
    console.log("at /newCard", error);
  }
});

//put "api/teacardsinfo/update/:id" --> updates
Router.put("/update/:id", async (req, res) => {
  const { id } = req.params;
  const updatedCardData = req.body;
  try {
    const updatedCard = await TeaCardsInfo.findByIdAndUpdate(
      id,
      updatedCardData,
      { new: true }
    );
    res.status(200).json({
      status: "ok",
      message: "tea card is edited",
      data: updatedCard,
    });
  } catch (error) {
    console.log("at/update/:id", error);
  }
});

//put "api/teacardsinfo/liked/:id" --> for likes
Router.put("/liked/:id", async (req, res) =>{
  const { id } = req.params;
  const likedCard = req.body.likes;
  const likedUser = req.body.username;
  try{
      const checkLiked = await User.findOne(
        { username: likedUser},
        { likedCreations: 1}
        );
      
      let alreadyliked = false;
      checkLiked.likedCreations.map((likedId)=>{
        if(likedId === id){
          alreadyliked = true;
        }
      })

      if(alreadyliked === true){
        res.status(400).json({
          status: "error: already liked",
          message: "user has already liked this card",
          data: checkLiked
        })
        return;
      }
      console.log(alreadyliked);
      
      const updateLikes = await TeaCardsInfo.findByIdAndUpdate(
        id,
        {$set :{ likes : likedCard}},
        {new: true}
      )
      const updateUser = await User.findOneAndUpdate(
        { username: likedUser},
        { $push: {likedCreations : id}},
        {new: true}
      )
      res.status(200).json({
        status: "ok",
        message: "teacards liked",
        data: updateLikes,
        userData : updateUser
      })
  }catch(error){
    console.log("at liked/:id: ", error);
  }

})

//delete "api/teacardsinfo/delete/:id"
Router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await TeaCardsInfo.findByIdAndDelete(id);
    res.status(200).json({
      status: "ok",
      message: "indiv card deleted",
      data: null,
    });
  } catch (error) {
    console.log("at /delete/:id", error);
  }
});

module.exports = Router;
