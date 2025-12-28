import { apiClient } from './client';
import { RENDER_CONSTANTS } from '../../config/constants';

/**
 * Render job status
 */
export type RenderStatus = 'pending' | 'processing' | 'completed' | 'failed';

/**
 * Render job response
 */
export interface RenderJob {
  jobId: string;
  bookId: string;
  status: RenderStatus;
  createdAt: string;
  completedAt?: string;
  previewUrl?: string;
  errorMessage?: string;
}

/**
 * Request for creating a personalization preview
 */
export interface CreatePreviewRequest {
  bookId: string;
  childName: string;
  locale?: string;
}

/**
 * Renders API service
 */
export const rendersApi = {
  /**
   * Create a personalization preview
   */
  async createPreview(request: CreatePreviewRequest): Promise<RenderJob> {
    return apiClient.post<RenderJob>('/renders/previews', request);
  },

  /**
   * Get render job status
   */
  async getJob(jobId: string): Promise<RenderJob> {
    return apiClient.get<RenderJob>(`/renders/${jobId}`);
  },

  /**
   * Poll for render job completion
   */
  async pollUntilComplete(
    jobId: string,
    onProgress?: (job: RenderJob) => void
  ): Promise<RenderJob> {
    const startTime = Date.now();

    const poll = async (): Promise<RenderJob> => {
      const job = await this.getJob(jobId);

      onProgress?.(job);

      if (job.status === 'completed' || job.status === 'failed') {
        return job;
      }

      // Check timeout
      if (Date.now() - startTime > RENDER_CONSTANTS.MAX_WAIT_TIME_MS) {
        throw new Error('Render job timed out');
      }

      // Wait and poll again
      await new Promise(resolve => setTimeout(resolve, RENDER_CONSTANTS.POLL_INTERVAL_MS));
      return poll();
    };

    return poll();
  },
};

