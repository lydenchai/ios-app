import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, defer, finalize, map, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { Response } from '../classes/response';
import { RESPONSE_STATUS } from 'src/app/models/enums/response-status.enum';
import { LocalStorageEnum } from '../models/enums/local-storage.enum';
import { LoadingService } from './loading.service';

interface Config {
  loading?: boolean;
  errSnackbar?: boolean;
  headers?: HttpHeaders;
  fetchingId?: string;
}

type Param = {
  [param: string]:
    | string
    | number
    | boolean
    | readonly (string | number | boolean)[];
};

type Headers = {
  [key: string]: string | string[];
};

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  private _root: string;
  private _token: string;
  constructor(
    private _http: HttpClient,
    private _localStorage: LocalStorageService,
    private _loadingService: LoadingService,
    private _snackbar: MatSnackBar
  ) {
    this._root = environment.api_url + '/';
    this._token = this._localStorage.get(LocalStorageEnum.token);
  }

  getJSON<T>(
    path: string,
    params?: HttpParams | Param,
    config: Config = { fetchingId: '' }
  ) {
    const headers = { ContentType: 'application/json' };
    let request = this.get<Response<T>>(
      path,
      params,
      headers,
      undefined,
      config
    );

    request = request.pipe(
      map((response) => {
        if (response.status !== RESPONSE_STATUS.SUCCESS) {
          throw new Error(config.fetchingId);
        }

        return new Response(response);
      })
    );
    return request;
  }

  putJSON<T>(path: string, data: any, config: Config = { fetchingId: '' }) {
    const headers = { ContentType: 'application/json' };
    let request = this.put<T>(path, data, headers, undefined, config);

    request = request.pipe(
      map((response) => {
        if (response.status !== RESPONSE_STATUS.SUCCESS) {
          throw new Error(config.fetchingId);
        }

        return new Response(response);
      })
    );
    return request;
  }

  patchJSON<T>(path: string, data: any, config: Config = { fetchingId: '' }) {
    const headers = { ContentType: 'application/json' };
    let request = this.patch<T>(path, data, headers, undefined, config);

    request = request.pipe(
      map((response) => {
        if (response.status !== RESPONSE_STATUS.SUCCESS) {
          throw new Error(config.fetchingId);
        }

        return new Response(response);
      })
    );
    return request;
  }

  postJSON<T>(path: string, data: any, config: Config = { fetchingId: '' }) {
    const headers = { ContentType: 'application/json' };
    let request = this.post<T>(path, data, headers, undefined, config);

    request = request.pipe(
      map((response) => {
        if (response.status !== RESPONSE_STATUS.SUCCESS) {
          throw new Error(config.fetchingId);
        }

        return new Response(response);
      })
    );
    return request;
  }

  deleteJSON<T>(
    path: string,
    params?: HttpParams | Param,
    config: Config = { fetchingId: '' }
  ) {
    const headers = { ContentType: 'application/json' };
    let request = this.delete<Response<T>>(
      path,
      params,
      headers,
      undefined,
      config
    );

    request = request.pipe(
      map((response) => {
        if (response.status !== RESPONSE_STATUS.SUCCESS) {
          throw new Error(config.fetchingId);
        }

        return new Response(response);
      })
    );
    return request;
  }

  get<T>(
    path: string,
    params?: HttpParams | Param,
    headers?: Headers,
    options?: { [key: string]: any },
    config: Config = {}
  ) {
    const _headers = this._getHeader(headers);
    this.clean(params);

    return defer(() => {
      let request = this._http.get<T>(this._root + path, {
        headers: _headers,
        params,
        ...options,
      });
      if (config.loading) {
        this._loadingService.setLoading(true);
        request = request.pipe(
          finalize(() => {
            this._loadingService.setLoading(false);
          })
        );
      }
      return request;
    });
  }

  put<T, R = Response<T>>(
    path: string,
    data: any,
    headers?: Headers,
    options?: any,
    config: Config = {}
  ) {
    const _headers = this._getHeader(headers);
    this.clean(data);

    return defer(() => {
      let request = this._http.put<Response<T>>(this._root + path, data, {
        headers: _headers,
        ...options,
      }) as unknown as Observable<R>;
      if (config.loading) {
        this._loadingService.setLoading(true);
        request = request.pipe(
          finalize(() => {
            this._loadingService.setLoading(false);
          })
        );
      }
      return request;
    });
  }

  patch<T, R = Response<T>>(
    path: string,
    data: any,
    headers?: Headers,
    options?: any,
    config: Config = {}
  ) {
    const _headers = this._getHeader(headers);
    this.clean(data);

    return defer(() => {
      let request = this._http.patch<Response<T>>(this._root + path, data, {
        headers: _headers,
        ...options,
      }) as unknown as Observable<R>;
      if (config.loading) {
        this._loadingService.setLoading(true);
        request = request.pipe(
          finalize(() => {
            this._loadingService.setLoading(false);
          })
        );
      }
      return request;
    });
  }

  post<T, R = Response<T>>(
    path: string,
    data: any,
    headers?: Headers,
    options?: any,
    config: Config = {}
  ) {
    const _headers = this._getHeader(headers);
    this.clean(data);

    return defer(() => {
      let request = this._http.post<Response<T>>(this._root + path, data, {
        headers: _headers,
        ...options,
      }) as unknown as Observable<R>;
      if (config.loading) {
        this._loadingService.setLoading(true);
        request = request.pipe(
          finalize(() => {
            this._loadingService.setLoading(false);
          })
        );
      }
      return request;
    });
  }

  delete<T>(
    path: string,
    params?: HttpParams | Param,
    headers?: Headers,
    options?: { [key: string]: any },
    config: Config = {}
  ) {
    const _headers = this._getHeader(headers);
    this.clean(params);

    return defer(() => {
      let request = this._http.delete<T>(this._root + path, {
        headers: _headers,
        params,
        ...options,
      });
      if (config.loading) {
        this._loadingService.setLoading(true);
        request = request.pipe(
          finalize(() => {
            this._loadingService.setLoading(false);
          })
        );
      }
      return request;
    });
  }

  getFile<T>(
    path: string,
    params?: HttpParams | Param,
    config: Config = { fetchingId: '' }
  ) {
    const headers = this._getHeader({ ContentType: 'application/json' });
    const responseType: XMLHttpRequestResponseType = 'blob';

    return defer(() => {
      let request = this._http.get<T>(this._root + path, {
        params: params,
        headers: headers,
        responseType: responseType as any,
      });

      if (config.loading) {
        this._loadingService.setLoading(true);
        request = request.pipe(
          map((res) => {
            if (res instanceof Blob) return res;
            throw new Error(config.fetchingId);
          }),
          finalize(() => {
            this._loadingService.setLoading(false);
          })
        );
      }
      return request;
    });
  }

  private _getHeader(headers?: Headers) {
    let httpHeaders = new HttpHeaders({
      Authorization: 'Bearer ' + this._token,
    });
    if (headers) {
      for (let key in headers) {
        httpHeaders.append(key, headers[key]);
      }
    }
    return httpHeaders;
  }

  private clean(obj: any) {
    for (const propName in obj) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        obj[propName] === ''
      ) {
        delete obj[propName];
      }
    }
  }

  public setToken(token: string) {
    this._token = token;
  }
}
