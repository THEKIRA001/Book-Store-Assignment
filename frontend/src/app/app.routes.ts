import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  // If URL Empty
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Login Route
  { path: 'login', component: LoginComponent },

];
