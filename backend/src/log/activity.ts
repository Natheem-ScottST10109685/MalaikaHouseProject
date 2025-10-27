import { prisma } from '../db/index.js';

type ActivityInput = {
    action: string;
    status?: 'SUCCESS' | 'FAIL';
    targetType?: string;
    targetId?: string;
    metadata?: Record<string, unknown>;
    actorEmailOverride?: string;
};

export async function logActivity(req: any, input: ActivityInput) {
    try {
        const ua = req.headers?.['user-agent'] as string | undefined;
        const actor = req.user ?? null;
        await prisma.activityLog.create({
            data: {
                action: input.action,
                status: input.status ?? 'SUCCESS',
                targetType: input.targetType,
                targetId: input.targetId,
                metadata: input.metadata as any,
                actorId: actor?.sub ?? null,
                actorRole: actor?.role ?? null,
                actorEmail: input.actorEmailOverride ?? actor?.email ?? null,
                ip: req.ip ?? null,
                userAgent: ua ?? null,
            },
        });
    } catch {
        
    }
}