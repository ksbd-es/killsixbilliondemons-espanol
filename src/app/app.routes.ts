import { Routes } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {ReaderComponent} from './components/reader/reader.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'reader/:book/:chapter/:page', component: ReaderComponent },
];
