export const authService = {
  async login(email: string, password: string) {
    return { email, password };
  },
  async logout() {
    return true;
  },
};
