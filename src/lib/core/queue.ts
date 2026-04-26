import { Queue, Worker, Job } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL || "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

export const syncQueue = new Queue("data-sync", { connection });

export async function addSyncJob(module: string) {
  await syncQueue.add(`sync-${module}`, { module }, {
    attempts: 3,
    backoff: {
      type: "exponential",
      delay: 1000,
    },
  });
}

// In a real app, this worker would be in a separate process
if (process.env.NODE_ENV === "development") {
  const worker = new Worker(
    "data-sync",
    async (job: Job) => {
      console.log(`Processing sync for module: ${job.data.module}`);
      // Simulate work
      await new Promise((res) => setTimeout(res, 2000));
      console.log(`Sync completed for ${job.data.module}`);
    },
    { connection }
  );

  worker.on("completed", (job) => {
    console.log(`${job.id} has completed!`);
  });

  worker.on("failed", (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
  });
}