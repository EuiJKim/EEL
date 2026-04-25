declare global {
  interface Window {
    fbq?: (
      command: 'init' | 'track' | 'trackCustom',
      eventNameOrPixelId: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq?: unknown;
  }
}

export {};
