import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'showproduct',
    pathMatch: 'full',
  },
  {
    path: 'addproduct',
    loadComponent: () => import('./addproduct/addproduct.page').then( m => m.AddproductPage)
  },
  {
    path: 'showproduct',
    loadComponent: () => import('./showproduct/showproduct.page').then( m => m.ShowproductPage)
  },
];
