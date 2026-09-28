import { Schema, model } from 'mongoose';

const blogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, lowercase: true },
  excerpt: { type: String, required: true },
  content: [String],                       // paragraphs
  category: { type: String, index: true },
  tags: [String],
  author: { type: String, default: 'Wayfarer Team' },
  coverImage: String,
  isPublished: { type: Boolean, default: true, index: true },
}, { timestamps: true });

export const Blog = model('Blog', blogSchema);
