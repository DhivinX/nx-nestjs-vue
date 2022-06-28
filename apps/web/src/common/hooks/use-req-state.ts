import { timeout } from '@nx-vnts/utils';
import { reactive, ref, shallowRef } from 'vue';
import { AxiosError, type AxiosResponse } from 'axios';

type ReqStateSuccessCalback<T> = (data: T) => void;
type ReqStateErrorCalback = (error: AxiosError) => void;

export function useReqState<T, W extends [...W]>(
    fn: (...args: W) => Promise<AxiosResponse<T, unknown>>,
    ...args: W
) {
    const successCallback = ref<ReqStateSuccessCalback<T> | undefined>();
    const errorCallback = ref<ReqStateErrorCalback | undefined>();

    const isLoading = ref<boolean>(false);
    const isFinish = ref<boolean>(false);

    const response = shallowRef<AxiosResponse<T, unknown | undefined>>();
    const data = shallowRef<T | undefined>();
    const error = shallowRef<AxiosError<unknown, unknown> | undefined>();

    async function execute(delay?: number) {
        isFinish.value = false;
        isLoading.value = true;
        error.value = undefined;

        try {
            if (delay) await timeout(delay);
            const res = await fn(...args);
            response.value = res;
            data.value = res.data;
            if (successCallback.value) successCallback.value(res.data);
        } catch (e) {
            if (e instanceof AxiosError) {
                error.value = e;
                if (errorCallback.value) errorCallback.value(e);
            }
        }

        isFinish.value = true;
        isLoading.value = false;
    }

    function onSuccess(fn: ReqStateSuccessCalback<T>) {
        successCallback.value = fn;
    }

    function onError(fn: ReqStateErrorCalback) {
        errorCallback.value = fn;
    }

    return reactive({ response, data, error, isLoading, isFinish, execute, onSuccess, onError });
}
