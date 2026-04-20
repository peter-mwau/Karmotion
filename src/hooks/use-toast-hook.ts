// Stub useToast hook
export function useToast() {
  return {
    toast: (props: Record<string, unknown>) => {
      console.log("Toast:", props);
    },
  };
}
