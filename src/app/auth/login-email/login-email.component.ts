import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-email',
  templateUrl: './login-email.component.html',
  styleUrls: ['./login-email.component.css']
})
export class LoginEmailComponent implements OnInit {
  email: string;
  password: string;

  constructor() { }

  ngOnInit() {
  }

}
