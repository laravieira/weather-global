import useSWRMutation, {
  MutationFetcher,
  SWRMutationConfiguration,
  SWRMutationResponse,
  TriggerWithArgs,
} from 'swr/mutation'
import { Arguments } from 'swr'

/** Same as useSWRMutation, but with a debounce option.
 *
 * A hook to define and manually trigger remote mutations like POST, PUT, DELETE and PATCH use cases with a debounce option.
 * Example:
 * ```typescript
 * import useSWRMutationWithDebounce from '@/hooks/useSWRMutationWithDebounce'
 *
 * const {
 *   data,
 *   error,
 *   trigger,
 *   reset,
 *   isMutating
 * } = useSWRMutationWithDebounce(
 *   key,
 *   fetcher,
 *   { debounce: 500 } // 500ms
 * )
 * ```
 * [useSWRMutation](https://swr.vercel.app/docs/mutation)
 */
export function useSWRMutationWithDebounce<Data, Error, Key extends Arguments, Arg>(
  key: Key,
  fetcher: MutationFetcher<Data, Key, Arg>,
  options?: SWRMutationConfiguration<Data, Error, Key> & { debounce?: number },
): SWRMutationResponse<Data, Error, Key, Arg> {
  const { debounce } = options ?? {}
  const { trigger, ...rest } = useSWRMutation<Data, Error, Key, Arg, Data>(key, fetcher, options)
  let handler: NodeJS.Timeout | null = null

  function triggerAfterDebounce(arg: Arg, options?: SWRMutationConfiguration<Data, Error, Key>) {
    const swrTrigger = trigger as TriggerWithArgs<Data, Error, Key, Arg>
    if (debounce === undefined) return swrTrigger(arg, options)
    if (handler) clearTimeout(handler)
    handler = setTimeout(() => {
      swrTrigger(arg, options)
    }, debounce)
  }

  return {
    trigger: triggerAfterDebounce as SWRMutationResponse<Data, Error, Key, Arg>['trigger'],
    ...rest,
  }
}
