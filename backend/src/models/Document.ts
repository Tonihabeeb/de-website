import mongoose, { Document as MongooseDocument, Schema, Types } from 'mongoose';
import { UserRole } from './User';

export interface IDocument extends MongooseDocument {
  title: string;
  description?: string;
  type: string;
  category: string;
  fileUrl: string;
  metadata?: Record<string, any>;
  version: number;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
  permissions: UserRole[];
}

const DocumentSchema = new Schema<IDocument>({
  title: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  category: { type: String, required: true },
  fileUrl: { type: String, required: true },
  metadata: { type: Schema.Types.Mixed },
  version: { type: Number, default: 1 },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  permissions: { type: [String], enum: ['admin', 'editor', 'viewer'], default: ['admin', 'editor', 'viewer'] },
});

DocumentSchema.pre<IDocument>('save', function (next) {
  this.updatedAt = new Date();
  if (!this.createdAt) {
    this.createdAt = new Date();
  }
  next();
});

export const DocumentModel = mongoose.model<IDocument>('Document', DocumentSchema); 