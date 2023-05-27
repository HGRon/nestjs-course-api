abstract class UseCase<Input, Output> {
  abstract call(params: Input): Promise<Output> | Output;
}

abstract class UseCaseOutput<Output> {
  abstract call(): Promise<Output> | Output;
}

abstract class UseCaseInput<Input> {
  abstract call(params: Input): Promise<void>;
}
