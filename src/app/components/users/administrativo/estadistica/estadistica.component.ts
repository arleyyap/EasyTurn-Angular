import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { FsService } from 'src/app/services/fs.service';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';


@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.css']
})
export class EstadisticaComponent implements OnInit {

  public CalificacionAcademico=[];
  
// Pie
public pieChartOptions: ChartOptions = {
  responsive: true,
  legend: {
    position: 'top',
  },
  plugins: {
    datalabels: {
      formatter: (value, ctx) => {
        const label = ctx.chart.data.labels[ctx.dataIndex];
        return label;
      },
    },
  }
};
public pieChartLabels: Label[] = [['Academico'], ['Financiero'], 'Caja'];
public CantidadTurnos: number[] = [0 ,0, 0];
public CalificacionServicios: number[] = [0, 0, 0];
public TurnosDesertores: number[] = [0, 0, 0];
public ServicioMasSolicitado: number[] = [0, 0, 0];
public pieChartType: ChartType = 'pie';
public pieChartLegend = true;
public pieChartPlugins = [pluginDataLabels];
public pieChartColors = [
  {
    backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
  },
];
constructor(public fsService: FsService, private afs:AngularFirestore) { }

ngOnInit() {
}

// events
public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
  console.log(event, active);
}

public CantidadTurnosPedidos(){

  var tabla = document.getElementById('tabla');
  this.afs.collection("CalificacionTurnoAcademico").get().subscribe((querySnapshot) =>{
    querySnapshot.forEach((doc) =>{
     (`${doc.id}`);
     this.CalificacionAcademico.push(`${doc.id}`);

    });
    this.CantidadTurnos = [this.CantidadTurnos.length,3,4]

  });

}


public TurnosNoAtendidos(){

  var tabla = document.getElementById('tabla');
  this.afs.collection("CalificacionTurnoAcademico").get().subscribe((querySnapshot) =>{
    querySnapshot.forEach((doc) =>{
     (`${doc.id}`);
     this.CalificacionAcademico.push(`${doc.id}`);

    });
    this.CantidadTurnos = [this.CantidadTurnos.length,8,10]

  });

}

public CalificacionServicio(){
  var tabla = document.getElementById('tabla');
  this.afs.collection("CalificacionTurnoAcademico").get().subscribe((querySnapshot) =>{
    querySnapshot.forEach((doc) =>{
     (`${doc.id}`);
     this.CalificacionAcademico.push(`${doc.id}`);

    });
    this.CantidadTurnos = [20,22,34]

  });

}

public TurnoMasSolicitado(){

  var tabla = document.getElementById('tabla');
  this.afs.collection("CalificacionTurnoAcademico").get().subscribe((querySnapshot) =>{
    querySnapshot.forEach((doc) =>{
     (`${doc.id}`);
     this.CalificacionAcademico.push(`${doc.id}`);

    });
    this.CantidadTurnos = [100,200,30]

  });

}


  



    


  
}


