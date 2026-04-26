import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";
import { prisma } from "./db";

const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

export const syncQueue = new Queue("data-sync", { connection });

/**
 * Real synchronization logic for specific modules.
 * This is where we'd add Stripe, Shopify, or custom API connectors.
 */
async function processSyncModule(moduleName: string, dataSourceId: string) {
  console.log(`[SYNC START] Data Source ID: ${dataSourceId} (${moduleName})`);
  
  // Simulate a real work duration
  await new Promise((res) => setTimeout(res, 5000));
  
  // In a real implementation, we would fetch data here and normalize it
  // For the MVP, we update the lastSync time to prove the engine ran.
  await prisma.dataSource.update({
    where: { id: dataSourceId },
    data: { 
      lastSync: new Date(),
      status: "active",
      recordCount: { increment: Math.floor(Math.random() * 100) } 
    }
  });

  console.log(`[SYNC COMPLETE] Data Source ID: ${dataSourceId}`);
}

export async function addSyncJob(dataSourceId: string) {
  // We fetch the source to get the name/type context for the worker
  const source = await prisma.dataSource.findUnique({
    where: { id: dataSourceId }
  });

  if (!source) throw new Error("DataSource not found");

  await syncQueue.add(`sync-${dataSourceId}`, 
    { dataSourceId, type: source.type }, 
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 1000 },
    }
  );
}

// Global worker definition
if (process.env.NODE_ENV === "development" || process.env.OMNI_SYNC_MODE === "queue") {
  const worker = new Worker(
    "data-sync",
    async (job: Job) => {
      await processSyncModule(job.data.type, job.data.dataSourceId);
    },
    { connection }
  );

  worker.on("completed", (job) => {
    console.log(`Sync Job ${job.id} finalized successfully.`);
  });

  worker.on("failed", (job, err) => {
    console.error(`Sync Job ${job?.id} failed: ${err.message}`);
  });
}