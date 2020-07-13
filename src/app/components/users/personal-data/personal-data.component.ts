import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrls: ['./personal-data.component.css']
})
export class PersonalDataComponent implements OnInit {

  @Input() Email: string;
  @Input() Password: string;
  public email;
  public password;
  public valid;
  public touched;
  public onAddPersonalData;
  constructor() {
    console.log('Este es el correo', this.email);
   }

  ngOnInit() {
  }

}
