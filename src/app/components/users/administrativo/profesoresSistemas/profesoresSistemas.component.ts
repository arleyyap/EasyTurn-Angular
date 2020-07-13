import { Component, OnInit } from '@angular/core';
import { FsService } from 'src/app/services/fs.service';
import { Usuarios } from 'src/app/domain/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profesoresSistemas',
  templateUrl: './profesoresSistemas.component.html',
  styleUrls: ['./profesoresSistemas.component.css']
})
export class profesoresSistemasComponent implements OnInit {
  ngOnInit() {
   
    }
    
   
}
