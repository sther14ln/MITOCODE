import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DialogData } from 'src/app/_model/dialog-data';
import { Paciente } from 'src/app/_model/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-modal-nuevo-paciente',
  templateUrl: './modal-nuevo-paciente.component.html',
  styleUrls: ['./modal-nuevo-paciente.component.css']
})
export class ModalNuevoPacienteComponent implements OnInit {

  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<ModalNuevoPacienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private pacienteService: PacienteService,
    private router: Router
  ) { }



  ngOnInit(): void {

    this.form = new FormGroup({
      'id': new FormControl(0),
      'nombres': new FormControl(''),
      'apellidos': new FormControl(''),
      'dni': new FormControl(''),
      'direccion': new FormControl(''),
      'telefono': new FormControl(''),
      'email': new FormControl('')
    });
  }

  registrar() {
    let paciente = new Paciente();
    paciente.idPaciente = this.form.value['id'];
    paciente.nombres = this.form.value['nombres'];
    paciente.apellidos = this.form.value['apellidos'];
    paciente.dni = this.form.value['dni'];
    paciente.direccion = this.form.value['direccion'];
    paciente.telefono = this.form.value['telefono'];
    paciente.email = this.form.value['email'];


    this.pacienteService.registrar(paciente)
      .subscribe(data => {
        //this.pacienteService.setPacienteCambio(data);
        console.log(data)
        this.pacienteService.setMensajeCambio('SE REGISTRO');

        this.listarPaciente();
        this.onNoClick;

      });

  }

  listarPaciente() {
    this.pacienteService.listar().subscribe((response) => {
      this.pacienteService.setPacienteCambio(response)
    })


  }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
