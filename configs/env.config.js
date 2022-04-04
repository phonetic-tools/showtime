export const env = {
  CI: process.env.CI === 'boolean' ?? false,
};
