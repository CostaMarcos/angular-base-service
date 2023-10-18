import { environment } from 'src/environments/environments';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

export class BaseService<T> {
  protected protocol: string = location.protocol;
  protected hostname: string = location.hostname;

  private api = environment.api;
  protected headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Content-Language': 'pt-br',
    'Accept-Language': 'pt-br',
  });

  protected urlBase: string;
  protected parameters: HttpParams;
  protected fullUrl: string;

  constructor(protected http: HttpClient, path: string) {
    this.urlBase = this.getUrlBase();
    this.parameters = new HttpParams();
    this.fullUrl = this.urlBase.concat(path);
  }

  public getUrlBase(): string {
    return this.protocol.concat('//').concat(this.api);
  }

  public clearParameter(): void {
    this.parameters = new HttpParams();
  }

  public addParameter(key: string, value: string): void {
    // addParameter('nome', 'Alice');
    // addParameter('nome', 'Bob');
    // Saída: "nome=Bob"
    this.parameters = this.parameters.set(key, value);
  }

  public appendParameter(key: string, value: string): void {
    // appendParameter('nome', 'Alice');
    // appendParameter('nome', 'Bob');
    // Saída: "nome=Alice&nome=Bob"
    this.parameters = this.parameters.append(key, value);
  }

  protected addOptions(parameters?: HttpParams): { responseType: 'json', headers: HttpHeaders, observe: 'body', params: HttpParams | undefined } {

    if (parameters !== null && parameters !== undefined) {
      return {
        responseType: 'json',
        observe: 'body',
        headers: this.headers,
        params: parameters
      };

    } else {
      return {
        responseType: 'json',
        observe: 'body',
        headers: this.headers,
        params: undefined
      };
    }
  }

  public get(): Observable<T[]> {
    return this.http.get(this.fullUrl, this.addOptions(this.parameters)).pipe(
      map((response: Object) => response as T[]),
      catchError(error => { return throwError(() => error) })
    )
  }

  public post(entity: T): Observable<T> {
    this.clearParameter();
    return this.http
      .post(this.fullUrl, entity, this.addOptions(this.parameters)).pipe(
        map((response: Object) => response as T),
        catchError((error) => { return throwError(() => error) })
      )
  }

  public delete(id: number): any {
    this.clearParameter();
    return this.http
      .delete(
        this.fullUrl.concat(String(id) + '/'),
        this.addOptions(this.parameters)
      ).pipe(
        map(_ => {
          return { message: 'Item removido com sucesso!' };
        }),
        catchError((error) => { return throwError(() => error) })
      )
  }

  public update(id: number, body: any) {
    this.clearParameter();
    return this.http
      .patch(
        this.fullUrl.concat(String(id) + '/'), body,
        this.addOptions(this.parameters)).pipe(
          map((response: Object) => response as T),
          catchError((error) => { return throwError(() => error)})
        )
  }
}