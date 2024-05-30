import { Routes } from '@angular/router';
import { GstutilizationComponent } from './components/gstutilization/gstutilization.component';
import { SuppbillComponent } from './components/suppbill/suppbill.component';
import { UserdeptwiseComponent } from './components/userdeptwise/userdeptwise.component';
import { TodolistComponent } from './components/todolist/todolist.component';

export const routes: Routes = [
   {
      path: '', redirectTo: 'about', pathMatch: 'full'
   },
   {
      path: 'gstutlilization',
      component: GstutilizationComponent
   },
   {
      path: 'suppbill',
      component: SuppbillComponent
   },
   {
      path: 'userdeptwise',
      component: UserdeptwiseComponent
   },
   {
      path: 'todolist',
      component: TodolistComponent
   },
];

