interface LoadingState<T> {
    loading: boolean;
    error: string | null;
    state: T;
}

export const setLoading = (state: LoadingState<any>): LoadingState<any> => ({ ...state, loading: true });

export const setError = (error: string, state: LoadingState<any>): LoadingState<any> => ({
    ...state,
    loading: false,
    error
});

export const setState = <T>(newState: T, state: LoadingState<T>): LoadingState<T> => ({
    ...state,
    loading: false,
    error: null,
    state: newState
});

export const getDefaultState = <T>(defaultState: T) => ({ loading: false, error: null, state: defaultState });

export default LoadingState;
