import { AuditLog } from '../models/AuditLog';
import { Types } from 'mongoose';

export async function logAudit({
  userId,
  action,
  targetId,
  targetType,
  details
}: {
  userId: Types.ObjectId | string;
  action: string;
  targetId?: Types.ObjectId | string;
  targetType?: string;
  details?: Record<string, any>;
}) {
  try {
    await AuditLog.create({
      userId,
      action,
      targetId,
      targetType,
      details,
      timestamp: new Date(),
    });
  } catch (err) {
    // Optionally log error to external service
    // console.error('Failed to log audit event:', err);
  }
} 