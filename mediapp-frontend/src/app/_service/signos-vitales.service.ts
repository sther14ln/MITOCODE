import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SignosVitales } from '../_model/signosVitales';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root'
})
export class SignosVitalesService extends GenericService<SignosVitales> {

  private signosVitalesCambio = new Subject<SignosVitales[]>();
  private mensajeCambio = new Subject<string>();

  constructor(protected override http: HttpClient) {
    super(
      http,
      `${environment.HOST}/signosVitales`);
  }

  registrarSV(signosVitales: SignosVitales) {
    return this.http.post(this.url, signosVitales);
  }

  listarPageable(p: number, s: number) {
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`);
  }

  getSignosVitalesCambio() {
    return this.signosVitalesCambio.asObservable();
  }

  setSignosVitalesCambio(signosVitales: SignosVitales[]) {
    this.signosVitalesCambio.next(signosVitales);
  }

  getMensajeCambio() {
    return this.mensajeCambio.asObservable();
  }

  setMensajeCambio(mensaje: string) {
    this.mensajeCambio.next(mensaje);
  }
}
