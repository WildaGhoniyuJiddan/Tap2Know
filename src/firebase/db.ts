import { adminDb } from './admin';
import { Profile } from '../types/schema';

export const ProfileService = {
  async getProfile(username: string): Promise<Profile | null> {
    const doc = await adminDb.collection('profiles').doc(username).get();
    if (!doc.exists) return null;
    return doc.data() as Profile;
  },

  async updateProfile(username: string, data: Partial<Profile>): Promise<void> {
    await adminDb.collection('profiles').doc(username).update({
      ...data,
      updatedAt: Date.now(),
    });
  },
};
