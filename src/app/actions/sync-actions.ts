"use server";

import { addSyncJob } from "@/lib/core/queue";
import { prisma } from "@/lib/core/db";
import { revalidatePath } from "next/cache";
import { ensureAdmin } from "@/lib/core/auth-utils";

export async function triggerManualSync(dataSourceId: string) {
  await ensureAdmin();
  try {
    const source = await prisma.dataSource.findUnique({
      where: { id: dataSourceId },
    });

    if (!source) throw new Error("Data source not found");

    // Add job to BullMQ
    await addSyncJob(source.id);

    // Update status to sync in UI
    await prisma.dataSource.update({
      where: { id: dataSourceId },
      data: { status: "active" }, // For MVP, we just set to active
    });

    revalidatePath("/dashboard/omniscale/sources");
    return { success: true };
  } catch (error) {
    console.error("Sync Trigger Error:", error);
    return { success: false, error: "Failed to trigger synchronization." };
  }
}

export async function createDataSource(data: { name: string; type: any; config: any }) {
  try {
    const source = await prisma.dataSource.create({
      data: {
        name: data.name,
        type: data.type,
        connectionConfig: data.config,
        status: "inactive",
      },
    });

    revalidatePath("/dashboard/omniscale/sources");
    return { success: true, id: source.id };
  } catch (error) {
    console.error("Create Source Error:", error);
    return { success: false, error: "Failed to create data source." };
  }
}