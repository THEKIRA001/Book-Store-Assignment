import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserInfoStore } from '../../stores/user-info.store';
import { LoginCredentials } from '../../models/user.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {
  readonly store = inject(UserInfoStore);

  credentials : LoginCredentials = {
    username: '',
    password: ''
  };

  onSubmit(){
    if (this.credentials.username && this.credentials.password) {
      console.log('Attempting login...', this.credentials);
      this.store.login(this.credentials);
    }
  }
}
