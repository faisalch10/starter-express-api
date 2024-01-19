import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const carSchema = Schema(
  {
    company: {
      type: String,
      required: [true, "Car's company is required"],
    },
    color: {
      type: String,
      required: [true, 'Car color is required'],
    },
    model: {
      type: String,
      required: [true, 'Car model is required'],
    },
    make: {
      type: Date,
      required: [true, 'Please select date of the car'],
    },
    regNo: {
      type: String,
      required: [true, 'Car registration no is required'],
    },
    carType: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
  },
  { timestamps: true }
);

const Car = model('Car', carSchema);
export default Car;
