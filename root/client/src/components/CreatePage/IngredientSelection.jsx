import React, { useEffect, useState } from "react";
import PlusButton from "./PlusButton";
const axios = require("axios").default;

const checkSession = async () => {
  return axios
    .get("/api/sessions/authcheck")
    .then(({ data }) => data.session.currentUser);
};

const IngredientSelection = ({ setCategory, chosenIngredients }) => {
  const [nameInput, setNameInput] = useState();
  const [descriptionInput, setDescriptionInput] = useState();
  const [formData, setFormData] = useState({});
  const [readyToSubmit, setReadyToSubmit] = useState(false);
  console.log(formData);

  const fetchUserID = async () => {
    const response = await checkSession();
    const userID = { createdBy: response.username };
    setFormData((prev) => {
      return { ...prev, ...userID };
    });
  };

  useEffect(() => {
    const updates = {
      name: nameInput,
      createdBy: "randomObjID",
      description: descriptionInput,
      base: chosenIngredients?.Bases?.id,
      flavour: chosenIngredients?.Flavourings?.id,
      toppings: chosenIngredients?.Toppings?.map((e) => e.id),
      likes: 0,
    };
    setFormData({ ...formData, ...updates });
    fetchUserID();
  }, [nameInput, descriptionInput, chosenIngredients]);

  useEffect(() => {
    if (
      formData.base !== undefined &&
      formData.flavour !== undefined &&
      formData.name
    ) {
      setReadyToSubmit(true);
    } else {
      setReadyToSubmit(false);
    }
  }, [formData]);

  const postCreation = async (credentials) => {
    //console.log(credentials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postCreation(formData);
    //console.log("form submitted");
    //console.log("e.target", e.target);
  };

  return (
    <div className="container mx-auto h-screen w-1/2 text-center justify-around">
      <div className="w-full bg-white rounded shadow-lg p-8 m-4">
        <h1 className="block w-full text-center text-grey-darkest mb-6">
          Create a Bubble Tea
        </h1>
        <form className="mb-4" action="/" method="post" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-grey-darkest"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="border py-2 px-3 text-grey-darkest"
              type="text"
              name="name"
              id="name"
              onChange={(e) => setNameInput(e.target.value)}
            />
          </div>
          <div className="flex flex-col mb-4">
            <label
              className="mb-2 uppercase font-bold text-lg text-grey-darkest"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="border py-2 px-3 text-grey-darkest"
              name="description"
              id="description"
              rows="3"
              onChange={(e) => setDescriptionInput(e.target.value)}
            />
          </div>
          <div className="container mx-auto">
            <label className="p-1 text-sm font-semibold">Base:</label>
            <div className="p-1 text-sm">
              {chosenIngredients?.Bases?.name
                ? chosenIngredients?.Bases.name
                : null}
            </div>
            <PlusButton id={"Bases"} setCategory={setCategory} />
            <br />
            <label>Flavouring:</label>
            <div className="p-1 text-sm">
              {chosenIngredients?.Flavourings?.name
                ? chosenIngredients?.Flavourings.name
                : null}
            </div>
            <PlusButton id={"Flavourings"} setCategory={setCategory} />
            <br />
            <label className="p-1 text-sm font-semibold">Toppings:</label>
            <div className="p-1 text-sm">
              {chosenIngredients?.Toppings
                ? chosenIngredients?.Toppings.map((e) => e.name).join(", ")
                : null}
            </div>
            <PlusButton id={"Toppings"} setCategory={setCategory} />
            <br />
          </div>
          {readyToSubmit ? (
            <input
              type="submit"
              value="Create bubble tea"
              className="bg-blue-700 hover:bg-blue-500 text-white m-2 p-1 drop-shadow-2xl rounded"
            />
          ) : (
            <div className="p-1 text-sm">
              Ensure all fields are filled up / selected.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default IngredientSelection;
