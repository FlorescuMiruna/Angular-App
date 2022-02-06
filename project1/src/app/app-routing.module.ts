import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookFormEditComponent } from './pages/book-form-edit/book-form-edit.component';
import { BookFormComponent } from './pages/book-form/book-form.component';
import { BookComponent } from './pages/book/book.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { MovieFormEditComponent } from './pages/movie-form-edit/movie-form-edit.component';
import { MovieFormComponent } from './pages/movie-form/movie-form.component';
import { MovieComponent } from './pages/movie/movie.component';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch:'full'

  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent

  },
  {
    path: 'book',
    component: BookComponent

  },
  {
    path: 'movie',
    component: MovieComponent

  },
  {
    path: 'book-form',
    component: BookFormComponent

  },
  {
    path: 'movie-form',
    component: MovieFormComponent

  },
  {
    path: 'movie-form-edit',
    component: MovieFormEditComponent

  },
  {
    path: 'book-form-edit',
    component: BookFormEditComponent

  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
