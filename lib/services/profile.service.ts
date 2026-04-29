export const profileService = {
  async getProfile(userId: string) {
    return { id: userId };
  },
  async updateProfile(userId: string, updates: Record<string, unknown>) {
    return { id: userId, ...updates };
  },
};
