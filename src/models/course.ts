import mongoose, { Document, Model, Schema, ObjectId } from "mongoose";

export interface ILecture {
  title: string;
  duration: string;
  previewLink?: string; // Optional field, only present for the first section
  paidLink?: string;
}
export interface ICourseSection {
  id?: string;
  title: string;
  totalLectures: number;
  totalTime: string;
  lectures: ILecture[];
}

export interface ICourse extends Document {
  id?: string;
  title: string;
  description: string;
  imageUrl: string;
  rating: number;
  reviewsCount: number;
  author: string;
  whatYouWillLearn: string[];
  price: number;
  content: ICourseSection[];
  createdAt: Date;
  updatedAt: Date;
}

const lectureSchema: Schema = new Schema({
  title: { type: String, required: true },
  duration: { type: String, required: true },
  previewLink: { type: String }, // Optional, only for the first section
  paidLink: { type: String },
});

const courseSectionSchema: Schema = new Schema({
  title: { type: String, required: true },
  totalLectures: { type: Number, required: true },
  totalTime: { type: String, required: true },
  lectures: { type: [lectureSchema], required: true },
});

const courseSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    reviewsCount: { type: Number, required: true },
    rating: { type: Number, required: true },
    author: { type: String, required: true },
    whatYouWillLearn: { type: [String], required: true },
    content: { type: [courseSectionSchema], required: true },
  },
  {
    timestamps: true,
    toJSON: {
      // Automatically convert _id and other fields when toJSON is called
      transform: function (doc, ret) {
        ret.id = ret._id.toString(); // Convert _id to string
        delete ret._id;
        return ret;
      },
    },
  }
);

const Course: Model<ICourse> =
  mongoose.models.Course || mongoose.model<ICourse>("Course", courseSchema);

export default Course;
