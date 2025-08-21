export interface Notifier {
  notify(
    event: string,
    user: {
      id: string;
      email?: string;
    },
    data?: any,
  ): Promise<void>;
}
