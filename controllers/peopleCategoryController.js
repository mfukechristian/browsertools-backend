import asyncHandler from "express-async-handler";
import PeopleCategory from "../models/peopleCategoryModel.js";

// @desc    Create new category
// @route   POST /api/categories
// @access  Public
const createCategory = asyncHandler(async (req, res) => {
  const { category } = req.body;

  if (!category) {
    res.status(400);
    throw new Error("Please provide a category name.");
  }

  const categoryExists = await PeopleCategory.findOne({ category });

  if (categoryExists) {
    res.status(400);
    throw new Error("Category already exists.");
  }

  const newCategory = await PeopleCategory.create({
    category,
  });

  res.status(201).json({
    _id: newCategory._id,
    category: newCategory.category,
  });
});

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
const getAllCategories = asyncHandler(async (req, res) => {
  const categories = await PeopleCategory.find({});
  res.status(200).json(categories);
});

// @desc    Get single category by ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await PeopleCategory.findById(req.params.id);

  if (category) {
    res.status(200).json(category);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Update category by ID
// @route   PUT /api/categories/:id
// @access  Public
const updateCategory = asyncHandler(async (req, res) => {
  const { category: newCategoryName } = req.body;

  if (!newCategoryName) {
    res.status(400);
    throw new Error("Please provide a new category name.");
  }

  const category = await PeopleCategory.findById(req.params.id);

  if (category) {
    category.category = newCategoryName;
    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

// @desc    Delete category by ID
// @route   DELETE /api/categories/:id
// @access  Public
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await PeopleCategory.findById(req.params.id);

  if (category) {
    // Optionally, you might want to check if any people are associated with this category
    // before deleting it to maintain data integrity.
    await category.deleteOne();
    res.status(200).json({ message: "Category removed" });
  } else {
    res.status(404);
    throw new Error("Category not found");
  }
});

export {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
