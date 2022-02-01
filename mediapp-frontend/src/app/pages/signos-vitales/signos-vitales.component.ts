import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SignosVitales } from 'src/app/_model/signosVitales';
import { PacienteService } from 'src/app/_service/paciente.service';
import { SignosVitalesService } from 'src/app/_service/signos-vitales.service';

@Component({
  selector: 'app-signos-vitales',
  templateUrl: './signos-vitales.component.html',
  styleUrls: ['./signos-vitales.component.css']
})
export class SignosVitalesComponent implements OnInit {

  dataSource: MatTableDataSource<SignosVitales>;
  //dataSourceSV: MatTableDataSource<SignosVitales>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = ['idSigno', 'nombrePaciente', 'fecha', 'temperatura', 'pulso', 'ritmoR', 'acciones'];
  cantidad: number;
  constructor(
    private signosVitalesService: SignosVitalesService,
    private snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.signosVitalesService.getMensajeCambio().subscribe(data => {
      this.snackBar.open(data, 'AVISO', { duration: 2000 });
    });

    this.signosVitalesService.getSignosVitalesCambio().subscribe(data => {
      console.log(data)
      let listadoSignosVitalesExtend = data.map((element) => {
        element.nombrePaciente = element.paciente.nombres + ' ' + element.paciente.apellidos;
        return element;
      });
      //  this.dataSource = new MatTableDataSource(listadoSignosVitalesExtend);
      this.dataSource = new MatTableDataSource(listadoSignosVitalesExtend);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });


    this.signosVitalesService.listarPageable(0, 25).subscribe(data => {
      this.cantidad = data.totalElements;
      let listadoSignosVitalesExtend = data.content.map((element) => {
        element.nombrePaciente = element.paciente.nombres + ' ' + element.paciente.apellidos;
        return element;
      });
      this.dataSource = new MatTableDataSource(listadoSignosVitalesExtend);
      console.log(data)
    });


  }

  mostrarMas(e: any) {

    this.signosVitalesService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;

      let listadoSignosVitalesExtend = data.content.map((element) => {
        element.nombrePaciente = element.paciente.nombres + ' ' + element.paciente.apellidos;
        return element;
      });

      this.dataSource = new MatTableDataSource(listadoSignosVitalesExtend);
    });
  }

  eliminar(idPaciente: number) {
    this.signosVitalesService.eliminar(idPaciente).subscribe(() => {
      this.signosVitalesService.listar().subscribe(data => {
        this.signosVitalesService.setSignosVitalesCambio(data);
        this.signosVitalesService.setMensajeCambio('SE ELIMINO');
      });
    });
  }



  /*filtrar(e: any){
    this.dataSource.filter = e.target.value.trim().toLowerCase();    
  }*/

}
