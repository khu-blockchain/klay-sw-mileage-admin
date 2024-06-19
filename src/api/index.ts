import {AxiosRequestConfig} from "axios";
import {UseMutationResult, UseQueryResult} from "@tanstack/react-query/src/types";
import {DefaultError} from "@tanstack/query-core";
// 여기서 export
type APIRequest = {
  params?: Record<string, any>;
  query?: Record<string, any>;
  body?: any;
  config?: AxiosRequestConfig
}

type API<T extends APIRequest, D> = (request: T) => Promise<D>

type MutationProps<TResponse> = {
  onSuccessFn?: (arg: TResponse) => any;
  onErrorFn?: (arg: Error) => any;
}

type Query<TRequest, TResponse> = (args: TRequest) => UseQueryResult<TResponse, DefaultError>

type Mutation<TRequest, TResponse> = (args: MutationProps<TResponse>) => UseMutationResult<TResponse, DefaultError, TRequest, unknown>


export type {
  API,
  Mutation,
  Query,
  APIRequest
}
