import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { Restaurante } from 'src/app/domain/restaurante';
import { RestauranteService } from './../../../../services/restaurante/restaurante.service';
import { AuthService } from './../../../../services/auth.service';


@Component({
  selector: 'app-restaurante',
  templateUrl: './restaurante.component.html',
  styleUrls: ['./restaurante.component.css']
})
export class RestauranteComponent implements OnInit {
  public restaurante: Restaurante;
  public nombre: string;
  public descripcion: string;
  public telefono: number;

  constructor(private storage: AngularFireStorage, public restauranteService: RestauranteService, private authService: AuthService
  ) { }


  uploadPercent: Observable<number>;
  urlImage: Observable<string>;
  urlImagenCompleta: string;

  ngOnInit() {
    this.authService.isAuth().subscribe(user =>{
      console.log('Usuario en NgonInit', user);
    });
    this.restaurante = new Restaurante(1, '', '', 0, '', 'arleyyap@hotmail.com');
  }

  onUpload(e) {
    // console.log('subir', e.target.files[0]);
    const id = Math.random().toString(36).substring(2);
    const file = e.target.files[0];
    const filePath = `uploads/restaurante_${id}`;
    const ref = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    this.uploadPercent = task.percentageChanges();
    task.snapshotChanges().pipe(finalize(() => this.urlImage = ref.getDownloadURL())).toPromise()
    .then((res) => {
      this.urlImage.toPromise().then(resolve => {
        console.log(resolve);
        this.urlImagenCompleta = resolve.toString();
        console.log('Esta es mi ruta absoluta', this.urlImagenCompleta);
      });
    }
    );

  }

  onAddUser() {
    console.log('nombre', this.nombre);
    console.log('descripcion', this.descripcion);
    console.log('telefono', this.telefono);
    console.log('URL IMAGEN', this.urlImagenCompleta);
    this.restaurante.imagenrestaurante = this.urlImagenCompleta;
    console.log('Restaurante', this.restaurante);
    this.restauranteService.save(this.restaurante).subscribe(resultado=>{
      console.log('Se registro con exito');
    }, error => {
      console.log('Error', error);
    }
    );
  }
}
