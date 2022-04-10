function asBoolean(value) {
  if (value === 'true' || value === '1') return true;
  return value;
}

export const env = {
  CI: asBoolean(process.env.CI ?? false),
};
