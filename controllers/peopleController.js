import asyncHandler from "express-async-handler";
import People from "../models/peopleModel.js";

// @desc    Create new people
// @route   POST /api/people
// @access  Public
const createPeople = asyncHandler(async (req, res) => {
  const { name, description, image, url, category } = req.body;

  if (!name || !description || !image || !url || !category) {
    res.status(400);
    throw new Error(
      "Please provide all required fields: name, description, image, url, and category."
    );
  }

  // **Check if a person with the same name and URL already exists**
  const existingPerson = await People.findOne({ name, url });

  if (existingPerson) {
    res.status(409); // Conflict
    throw new Error("Person with this name and URL already exists.");
  }

  const people = await People.create({
    name,
    description,
    image,
    url,
    category,
  });

  res.status(201).json({
    _id: people._id,
    name: people.name,
    description: people.description,
    image: people.image,
    url: people.url,
    category: people.category,
  });
});

// @desc    Get all people
// @route   GET /api/people
// @access  Public
const getAllPeople = asyncHandler(async (req, res) => {
  const people = await People.find({});
  res.status(200).json(people);
});

// @desc    Get single people by ID
// @route   GET /api/people/:id
// @access  Public
const getPeopleById = asyncHandler(async (req, res) => {
  const people = await People.findById(req.params.id).populate("category");

  if (people) {
    res.status(200).json(people);
  } else {
    res.status(404);
    throw new Error("People not found");
  }
});

// @desc    Update people by ID
// @route   PUT /api/people/:id
// @access  Public
const updatePeople = asyncHandler(async (req, res) => {
  const { name, description, image, url, category } = req.body;

  const people = await People.findById(req.params.id);

  if (people) {
    people.name = name || people.name;
    people.description = description || people.description;
    people.image = image || people.image;
    people.url = url || people.url;
    people.category = category || people.category;

    const updatedPeople = await people.save();
    res.status(200).json(updatedPeople);
  } else {
    res.status(404);
    throw new Error("People not found");
  }
});

// @desc    Delete people by ID
// @route   DELETE /api/people/:id
// @access  Public
const deletePeople = asyncHandler(async (req, res) => {
  const people = await People.findById(req.params.id);

  if (people) {
    await people.deleteOne();
    res.status(200).json({ message: "People removed" });
  } else {
    res.status(404);
    throw new Error("People not found");
  }
});

export {
  createPeople,
  getAllPeople,
  getPeopleById,
  updatePeople,
  deletePeople,
};
