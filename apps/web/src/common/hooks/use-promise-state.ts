import { timeout } from '@nx-vnts/utils';
import { reactive, ref, shallowRef } from 'vue';
import { createEventHook } from '@vueuse/core';

export function usePromiseState<T, W = unknown>(
    promise: (payload?: any) => Promise<T>,
    onError?: (e: W) => void
) {
    const isReady = ref<boolean>(false);
    const isLoading = ref<boolean>(false);
    const counter = ref<number>(0);
    const startTime = ref<number>(undefined);
    const endTime = ref<number>(undefined);

    const state = shallowRef<T>(undefined);
    const error = shallowRef<W>(undefined);

    const errorEvent = createEventHook<W>();
    if (onError) errorEvent.on(onError);

    async function execute(delay?: number, payload?: any) {
        isReady.value = false;
        isLoading.value = true;
        startTime.value = Date.now();
        endTime.value = undefined;
        error.value = undefined;

        try {
            if (delay > 0) await timeout(delay);

            const data = await promise(payload);
            state.value = data;
            isReady.value = true;
            counter.value++;
        } catch (e) {
            error.value = e as W;
            errorEvent.trigger(error.value);
        } finally {
            isLoading.value = false;
            endTime.value = Date.now();
        }

        return state.value;
    }

    return reactive({
        isReady,
        isLoading,
        counter,
        startTime,
        endTime,
        state,
        error,
        onError: errorEvent.on,
        execute,
    });
}
