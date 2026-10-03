"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Blog = void 0;
const mongoose_1 = require("mongoose");
const blogSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, lowercase: true },
    excerpt: { type: String, required: true },
    content: [String], // paragraphs
    category: { type: String, index: true },
    tags: [String],
    author: { type: String, default: 'Wayfarer Team' },
    coverImage: String,
    isPublished: { type: Boolean, default: true, index: true },
}, { timestamps: true });
exports.Blog = (0, mongoose_1.model)('Blog', blogSchema);
