import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  name: string;
  description: string;
  location: string;
  status: string;
  capacity_mw?: number;
  og_image?: string;
  meta_keywords?: string;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

const ProjectSchema = new Schema<IProject>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['planned', 'in-progress', 'completed', 'on-hold'],
    default: 'planned',
  },
  capacity_mw: {
    type: Number,
    min: 0,
  },
  og_image: {
    type: String,
  },
  meta_keywords: {
    type: String,
  },
  created_by: {
    type: String,
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

// Index for better query performance
ProjectSchema.index({ status: 1, location: 1, created_at: -1 });

export const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema); 