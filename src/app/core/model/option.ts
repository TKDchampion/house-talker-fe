export class HttpDefaultOptions {
  baseApiURL: string | undefined;
  headers: Record<string, unknown> | undefined;
}
export class JWTOptions {
  key: string | undefined;
}
export declare class LoggerOptions {
  enableServerLog?: boolean;
  serverURL?: string;
  disableConsoleLog?: boolean;
}
export interface HttpRequestOptions {
  headers?: Record<string, unknown>;
  queryObject?: Record<string, unknown>;
  body?: Record<string, unknown>;
  baseURL?: string;
}
