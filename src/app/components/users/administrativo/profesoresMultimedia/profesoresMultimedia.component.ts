import { Component, OnInit } from '@angular/core';
import { FsService } from 'src/app/services/fs.service';
import { Usuarios } from 'src/app/domain/usuarios';
import { AuthService } from 'src/app/services/auth.service';
import { DataApiService } from 'src/app/services/data-api.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profesoresMultimedia',
  templateUrl: './profesoresMultimedia.component.html',
  styleUrls: ['./profesoresMultimedia.component.css']
})
export class profesoresMultimediaComponent implements OnInit {
  
  ngOnInit() {
  }
}
