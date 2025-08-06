export type Success<R> = { kind: 'success'; value: R };
export type Failure<E> = { kind: 'failure'; value: E };

export class Result<R, E> {
  private constructor(private readonly result: Success<R> | Failure<E>) {}

  static success<R, E>(value: R): Result<R, E> {
    return new Result<R, E>({ kind: 'success', value });
  }

  static failure<R, E>(error: E): Result<R, E> {
    return new Result<R, E>({ kind: 'failure', value: error });
  }

  isSuccess(): this is Result<R, never> {
    return this.result.kind === 'success';
  }

  isFailure(): this is Result<never, E> {
    return this.result.kind === 'failure';
  }

  match<U>(onFail: (error: E) => U, onSuccess: (value: R) => U): U {
    switch (this.result.kind) {
      case 'failure':
        return onFail(this.result.value);
      case 'success':
        return onSuccess(this.result.value);
    }
  }

  map<U>(fn: (value: R) => U): Result<U, E> {
    return this.match(
      (error) => Result.failure(error),
      (value) => Result.success(fn(value)),
    );
  }

  get(): R | undefined {
    return this.match(
      () => undefined,
      (value) => value,
    );
  }

  orElse(defaultValue: R): R {
    return this.match(
      () => defaultValue,
      (value) => value,
    );
  }

  orThrow(e: E): R {
    return this.match(
      (error) => {
        if (e) throw e;
        throw error;
      },
      (value) => value,
    );
  }

  static run<R, E>(closure: () => R): Result<R, E> {
    try {
      const result = closure();
      return Result.success(result);
    } catch (error) {
      return Result.failure(error as E);
    }
  }

  static async runPromise<R, E>(closure: () => Promise<R>): Promise<Result<R, E>> {
    try {
      const result = await closure();
      return Result.success(result);
    } catch (error) {
      return Result.failure(error as E);
    }
  }
}
