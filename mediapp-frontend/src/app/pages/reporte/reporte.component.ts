import { Component, OnInit } from '@angular/core';
import { ConsultaService } from 'src/app/_service/consulta.service';
import { Chart } from 'chart.js';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  chart: any;
  tipo: string = 'bar';
  pdfSrc: any;
  nombreArchivo: string;
  archivosSeleccionados: FileList;
  imagenData: any;
  imagenEstado: boolean;

  constructor(
    private consultaService: ConsultaService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.dibujar();
    this.consultaService.leerArchivo().subscribe(data => {
      this.convertir(data);
    });
  }

  convertir(data: any) {
    let reader = new FileReader();
    reader.readAsDataURL(data);
    reader.onloadend = () => {
      let base64 = reader.result;    
      this.sanar(base64);
    }
  }

  sanar(base64: any) {
    this.imagenData = this.sanitizer.bypassSecurityTrustResourceUrl(base64);
    this.imagenEstado = true;
  }


  cambiar(tipo: string) {
    this.tipo = tipo;
    if (this.chart != null) {
      this.chart.destroy();
    }
    this.dibujar();
  }

  dibujar() {
    this.consultaService.listarResumen().subscribe(data => {
      let cantidades = data.map(x => x.cantidad);
      let fechas = data.map(x => x.fecha);

      this.chart = new Chart('canvas', {
        type: this.tipo,
        data: {
          labels: fechas,
          datasets: [
            {
              label: 'Cantidad',
              data: cantidades,
              borderColor: "#3cba9f",
              fill: false,
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 0, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ]
            }
          ]
        },
        options: {
          legend: {
            display: true
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true,
              ticks: {
                beginAtZero: true
              }
            }],
          }
        }
      });

    });
  }

  ///////////PDFs/////////////
  verReporte() {
    this.consultaService.generarReporte().subscribe(data => {
      let reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfSrc = e.target.result;
        //console.log(this.pdfSrc);
      };
      reader.readAsArrayBuffer(data);
    });
    
  }

  descargarReporte(){
    this.consultaService.generarReporte().subscribe(data => {
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.setAttribute('style', 'display:none');
      document.body.appendChild(a);
      a.href = url;
      a.download = 'archivo.pdf';
      a.click();
    });
  }

  seleccionarArchivo(e : any){
    this.nombreArchivo = e.target.files[0].name;
    this.archivosSeleccionados = e.target.files;
  }

  subirArchivo() {
    this.consultaService.subirArchivo(this.archivosSeleccionados.item(0)).subscribe();
  }
}
