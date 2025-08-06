import mongoose, { Document, Schema } from 'mongoose';

export interface IAuditLog extends Document {
  userId: mongoose.Types.ObjectId;
  action: string;
  details: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
}

const auditLogSchema = new Schema<IAuditLog>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true
  },
  details: {
    type: Schema.Types.Mixed,
    default: {}
  },
  ipAddress: String,
  userAgent: String
}, {
  timestamps: true
});

// Index for faster queries
auditLogSchema.index({ userId: 1, createdAt: -1 });
auditLogSchema.index({ action: 1, createdAt: -1 });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', auditLogSchema);

export async function logAudit(data: {
  userId: mongoose.Types.ObjectId;
  action: string;
  details?: Record<string, any>;
  ipAddress?: string;
  userAgent?: string;
}) {
  try {
    const auditLog = new AuditLog(data);
    await auditLog.save();
  } catch (error) {
    console.error('Failed to log audit:', error);
  }
} 