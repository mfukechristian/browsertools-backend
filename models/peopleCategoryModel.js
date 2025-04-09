import mongoose from "mongoose";

const peopleCategorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const PeopleCategory = mongoose.model("PeopleCategory", peopleCategorySchema);

export default PeopleCategory;
