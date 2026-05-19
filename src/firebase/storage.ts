import { adminStorage } from './admin';

export const StorageService = {
  /**
   * Generates a signed URL allowing the client to upload an image directly.
   * Compression is handled client-side before requesting this URL.
   */
  async generateUploadUrl(username: string, fileName: string, contentType: string): Promise<string> {
    const bucket = adminStorage.bucket();
    const file = bucket.file(`profiles/${username}/${Date.now()}_${fileName}`);

    const [url] = await file.getSignedUrl({
      version: 'v4',
      action: 'write',
      expires: Date.now() + 15 * 60 * 1000, // 15 minutes
      contentType,
      extensionHeaders: {
        'x-goog-content-length-range': '0,5242880' // Limits to 5MB max
      }
    });

    return url;
  }
};
