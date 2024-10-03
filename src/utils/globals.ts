import pino from 'pino'

export const logger = pino({
    level: 'info',
    base: undefined,
    timestamp: () => `,"timestamp":"${new Date(Date.now()).toISOString()}"`
});

export function removeCharacters(text: string): string {
  return text.replace(/[^a-zA-Z0-9\s]/g, "");
}

export function isBase64(value: string) {
  try {
    return btoa(atob(value)) == value;
  } catch (err) {
    return false;
  }
}
