import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SignosVitales } from 'src/app/_model/signosVitales';
import { SignosVitalesService } from 'src/app/_service/signos-vitales.service';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalNuevoPacienteComponent } from '../modal-nuevo-paciente/modal-nuevo-paciente.component';

@Component({
  selector: 'app-signos-vitales-edicion',
  templateUrl: './signos-vitales-edicion.component.html',
  styleUrls: ['./signos-vitales-edicion.component.css']
})
export class SignosVitalesEdicionComponent implements OnInit {

  form: FormGroup;
  edicion: boolean;
  fecha: Date = new Date();
  maxFecha: Date = new Date();
  idPaciente: number;
  id: number;
  pacientes$: Observable<Paciente[]>;
  listadoPacientes: Paciente[] = [];
  paciente: any;
  animal: string;
  name: string;
  constructor(
    public dialog: MatDialog,
    private signosVitalesService: SignosVitalesService,
    private route: ActivatedRoute,
    private router: Router,
    private pacienteService: PacienteService
  ) { }

  ngOnInit(): void {

    this.pacienteService.getPacienteCambio().subscribe(data => {
      this.listadoPacientes = data;

      let ultimoIdPaciente = this.listadoPacientes.sort(
        (a, b) => {
          return b.idPaciente - a.idPaciente
        }
      ).map((element) => element.idPaciente);

      console.log(ultimoIdPaciente)

      this.form.patchValue({ "paciente": ultimoIdPaciente[0] })
    });


    this.listar();

    this.form = new FormGroup({
      'id': new FormControl(0),
      'fecha': new FormControl(new Date()),
      'paciente': new FormControl(''),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmoR': new FormControl('')
    });

    this.route.params.subscribe(data => {
      console.log(data)
      this.id = data['id'];
      this.edicion = data['id'] != null;
      console.log(this.edicion);
      this.initForm();
    });


  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalNuevoPacienteComponent, {
      width: '450px',
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }


  listar() {
    //this.pacientes$ = this.pacienteService.listar();
    this.pacienteService.listar().subscribe((response) => {
      this.listadoPacientes = response;
    })
  }

  initForm() {
    console.log(this.edicion)
    if (this.edicion) {
      console.log('edicion')
      console.log(this.id)
      this.signosVitalesService.listarPorId(this.id).subscribe(data => {
        console.log(data);
        this.form = new FormGroup({
          'id': new FormControl(data.idSigno),
          'paciente': new FormControl(data.paciente.idPaciente),
          'fecha': new FormControl(new Date(data.fecha)),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmoR': new FormControl(data.ritmoR)
        });

        // this.form.patchValue({ "paciente": data.paciente })

      });
    }

  }

  operar() {

    let signosVitales = new SignosVitales();
    signosVitales.idSigno = this.form.value['id'];
    signosVitales.fecha = this.form.value['fecha']

    signosVitales.paciente = this.listadoPacientes
      .filter((element) => element.idPaciente = this.form.value['paciente'])[0];


    signosVitales.temperatura = this.form.value['temperatura'];
    signosVitales.pulso = this.form.value['pulso'];
    signosVitales.ritmoR = this.form.value['ritmoR'];
    console.log(this.form.value)
    console.log(signosVitales)

    if (this.edicion) {
      this.signosVitalesService.modificar(signosVitales).subscribe(() => {
        this.signosVitalesService.listar().subscribe(data => {
          console.log(data)
          this.signosVitalesService.setSignosVitalesCambio(data);
          this.signosVitalesService.setMensajeCambio('SE MODIFICO');
          this.signosVitalesService.listar();
        });
      });
    } else {
      //REGISTRAR 
      //PRACTICA IDEAL, OPERADORES REACTIVOS op switchMap
      this.signosVitalesService.registrarSV(signosVitales)
        .pipe(switchMap((responseRegistro) => {

          return this.signosVitalesService.listar();
        }))
        .subscribe(data => {
          console.log(data)
          this.signosVitalesService.setSignosVitalesCambio(data);
          this.signosVitalesService.setMensajeCambio('SE REGISTRO');
        });
    }
    this.router.navigate(['/pages/signos-vitales']);

  }


}


