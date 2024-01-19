import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required'],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Category = model('Category', categorySchema);
export default Category;
