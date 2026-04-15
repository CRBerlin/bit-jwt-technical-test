import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';
import { Home } from './components/pages/home/home';
import { Users } from './components/pages/users/users';
import { Login } from './components/pages/login/login';
import { PageNotFound } from './components/pages/page-not-found/page-not-found';

export const routes: Routes = [
  { path: 'inicio', component: Home, title: "Inicio" },
  { path: 'usuarios', component: Users, canActivate: [authGuard], title: "Usuarios" },
  { path: 'login', component: Login, title: "Iniciar sesión" },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', component: PageNotFound, title: "Error 404" },
];
