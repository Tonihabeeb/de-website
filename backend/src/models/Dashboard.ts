import mongoose, { Document as MongooseDocument, Schema, Types } from 'mongoose';

export interface IDashboard extends MongooseDocument {
  type: 'project' | 'financial' | 'environmental' | 'stakeholder';
  data: Record<string, any>;
  updatedBy: Types.ObjectId;
  updatedAt: Date;
}

const DashboardSchema = new Schema<IDashboard>({
  type: { type: String, enum: ['project', 'financial', 'environmental', 'stakeholder'], required: true, unique: true },
  data: { type: Schema.Types.Mixed, required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const Dashboard = mongoose.model<IDashboard>('Dashboard', DashboardSchema); 