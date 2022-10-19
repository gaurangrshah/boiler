import { ONE_MIN } from "@/utils"

export const cancelRetry =     {
  retry: false,
  retryOnMount: false,
  refetchOnMount: false,
  refetchOnReconnect: false,
  refetchOnWindowFocus: false,
  refetchInterval: 6 * ONE_MIN,
}
