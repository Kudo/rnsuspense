// Referenced from https://github.com/vercel/swr/blob/1d8110900d1aee3747199bfb377b149b7ff6848e/_internal/src/types.ts#L27-L31
type ReactUsePromise<T, E extends Error = Error> = Promise<T> & {
  status?: 'pending' | 'fulfilled' | 'rejected';
  value?: T;
  reason?: E;
};

// Referenced from https://github.com/reactjs/react.dev/blob/6570e6cd79a16ac3b1a2902632eddab7e6abb9ad/src/content/reference/react/Suspense.md
/**
 * A custom hook like `React.use` hook using private Suspense API.
 */
export function use<T>(promise: Promise<T> | ReactUsePromise<T>) {
  if (isReactUsePromise(promise)) {
    if (promise.status === 'fulfilled') {
      return promise.value;
    } else if (promise.status === 'rejected') {
      throw promise.reason;
    } else if (promise.status === 'pending') {
      throw promise;
    }
    throw new Error('Promise is in an invalid state');
  }

  const suspensePromise = promise as ReactUsePromise<T>;
  suspensePromise.status = 'pending';
  suspensePromise.then(
    (result: T) => {
      suspensePromise.status = 'fulfilled';
      suspensePromise.value = result;
    },
    (reason) => {
      suspensePromise.status = 'rejected';
      suspensePromise.reason = reason;
    }
  );
  throw suspensePromise;
}

function isReactUsePromise<T>(
  promise: Promise<T> | ReactUsePromise<T>
): promise is ReactUsePromise<T> {
  return typeof promise === 'object' && promise !== null && 'status' in promise;
}
