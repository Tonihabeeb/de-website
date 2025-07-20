import mongoose, { Document as MongooseDocument, Schema, Types } from 'mongoose';

export interface IAuditLog extends MongooseDocument {
  userId: Types.ObjectId;
  action: string;
  targetId?: Types.ObjectId | string;
  targetType?: string;
  timestamp: Date;
  details?: Record<string, any>;
}

const AuditLogSchema = new Schema<IAuditLog>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  action: { type: String, required: true },
  targetId: { type: Schema.Types.Mixed },
  targetType: { type: String },
  timestamp: { type: Date, default: Date.now },
  details: { type: Schema.Types.Mixed },
});

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema); 