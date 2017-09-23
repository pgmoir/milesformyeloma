import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register-email',
  templateUrl: './register-email.component.html',
  styleUrls: ['./register-email.component.css']
})
export class RegisterEmailComponent implements OnInit {
  email: string;
  password: string;
  
  constructor() { }

  ngOnInit() {
  }

}
