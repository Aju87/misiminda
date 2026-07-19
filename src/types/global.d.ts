// Pengisytiharan tunggal untuk SDK pixel yang disuntik ke dalam window.
// (Elak konflik "Subsequent property declarations must have the same type".)
export {};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: {
      page: () => void;
      load: (id: string) => void;
      track: (event: string, properties?: unknown, options?: unknown) => void;
    };
  }
}
