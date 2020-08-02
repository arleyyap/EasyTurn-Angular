import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import * as firebase from 'firebase';
import _ from 'lodash';
import { load } from '@angular/core/src/render3';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = new Array(100).fill(0, 0, 100);
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public colors = [];
  public loaded = false;
  tipoUsuario = localStorage.getItem('tipoUsuario');

  constructor(private asfService: AuthService, private firestore: AngularFirestore, private route: ActivatedRoute) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit() {
    this.CantidadTurnosPedidos();

  }

  // events
  public async CantidadTurnosPedidos() { //
    this.loaded = false;
    this.firestore.firestore.collection('turnos').where('atendido', '==', true).get().then(async querys => {
      if (querys.docs.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var snapshots = querys.docs.map(doc => { return doc.data() });
      var filter = snapshots.filter(turn => ((turn.caja.path.match('secciones/cajas/subareas/*/') != null) == (this.tipoUsuario == 'asesor')));
      if (filter.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      if (this.tipoUsuario == 'profesor') {
        filter = filter.map(doc => {
          let arr = doc.caja.path.split('/');
          doc.caja = this.firestore.firestore.collection('secciones').doc(arr[1]);
          return doc;
        });
      }
      var agrup = _.sortBy(filter, 'caja.path');
      var data = {
        docspath: [],
        SingleDataSet: [],
        Label: [],
      };
      for (let turno of agrup) {
        let indexgetted = data.docspath.indexOf(turno.caja.path);
        if (indexgetted >= 0) {
          //ya se busco
          data.SingleDataSet[indexgetted]++;
        } else {
          await turno.caja.get().then(doc => {
            data.docspath.push(turno.caja.path);
            data.SingleDataSet.push(1);
            data.Label.push(doc.data().nombre);
          });
        }
      }


      this.pieChartLabels = data.Label;
      this.pieChartData = data.SingleDataSet;
      this.loaded = true;

    })
  }


  public TurnosNoAtendidos() {
    this.loaded = false;
    this.firestore.firestore.collection('turnos').where('atendido', '==', false).get().then(async querys => {
      if (querys.docs.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var snapshots = querys.docs.map(doc => { return doc.data() });
      var filter = snapshots.filter(turn => ((turn.caja.path.match('secciones/cajas/subareas/*/') != null) == (this.tipoUsuario == 'asesor')));
      if (filter.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      if (this.tipoUsuario == 'profesor') {
        filter = filter.map(doc => {
          let arr = doc.caja.path.split('/');
          doc.caja = this.firestore.firestore.collection('secciones').doc(arr[1]);
          return doc;
        });
      }
      var agrup = _.sortBy(filter, 'caja.path');
      var data = {
        docspath: [],
        SingleDataSet: [],
        Label: [],
      };
      for (let turno of agrup) {
        let indexgetted = data.docspath.indexOf(turno.caja.path);
        if (indexgetted >= 0) {
          //ya se busco
          data.SingleDataSet[indexgetted]++;
        } else {
          await turno.caja.get().then(doc => {
            data.docspath.push(turno.caja.path);
            data.SingleDataSet.push(1);
            data.Label.push(doc.data().nombre);
          });
        }
      }


      this.pieChartLabels = data.Label;
      this.pieChartData = data.SingleDataSet;
      this.loaded = true;

    })
  }

  public CalificacionServicio() {
    this.loaded = false;
    this.firestore.firestore.collection('comentarios').get().then(querys => {
      if (querys.docs.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var data = {
        SingleDataSet: [0, 0, 0],
        Label: ["malo", "bueno", "excelente"],
      };

      for (let query of querys.docs) {
        let calificacion = query.data().calificacion;
        if (calificacion >= 0.0 &&
          calificacion <= 1.0) {
          data.SingleDataSet[0]++;
        } else if (calificacion >= 1.1 &&
          calificacion <= 2.0) {
          data.SingleDataSet[1]++;
        } else {
          data.SingleDataSet[2]++;
        }
      }

      this.pieChartLabels = data.Label;
      this.pieChartData = data.SingleDataSet;
      this.loaded = true;
    });
  }

  public TurnoMasSolicitado() {
    this.loaded = false;
    this.firestore.firestore.collection('turnos').get().then(async querys => {
      if (querys.docs.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var snapshots = querys.docs.map(doc => { return doc.data() });
      var filter = snapshots.filter(turn => ((turn.caja.path.match('secciones/cajas/*/') != null) == (this.tipoUsuario == 'asesor')));
      if (filter.length <= 0) {
        this.pieChartLabels = [];
        this.pieChartData = [];
        this.loaded = true;
        return;
      }
      var data = {
        SingleDataSet: [0, 0],
        Label: ["reservado", "cola"],
      };

      for (let query of querys.docs) {
        if(query.data().reservado){
          data.SingleDataSet[0]++;
        }else{
          data.SingleDataSet[1]++;
        } 
      }


      this.pieChartLabels = data.Label;
      this.pieChartData = data.SingleDataSet;
      this.loaded = true;

    })
  }
}
