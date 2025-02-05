export function getErrorFromUnknown(cause: unknown): Error & { statusCode?: number; code?: string } {
  if (cause instanceof Error) {
    return cause;
  }
  if (typeof cause === "string") {
    // @ts-expect-error https://github.com/tc39/proposal-error-cause
    return new Error(cause, { cause });
  }

  return new Error(`Unhandled error of type '${typeof cause}''`);
}

export function handleErrorsJson(response: Response) {
  if (response.status === 204) {
    return new Promise((resolve) => resolve({}));
  }
  if (!response.ok && response.status < 200 && response.status >= 300) {
    response.json().then(console.log);
    throw Error(response.statusText);
  }
  return response.json();
}

export function handleErrorsRaw(response: Response) {
  if (response.status === 204) {
    return {};
  }
  if (!response.ok && response.status < 200 && response.status >= 300) {
    response.text().then(console.log);
    throw Error(response.statusText);
  }
  return response.text();
}
