import { Routes } from '@angular/router';
import { GstutilizationComponent } from './components/gstutilization/gstutilization.component';
import { SuppbillComponent } from './components/suppbill/suppbill.component';
import { UserdeptwiseComponent } from './components/userdeptwise/userdeptwise.component';
import { TodolistComponent } from './components/MyTodo/todolist/todolist.component';
import { FrmTodoListComponent } from './components/CompanyTodo/frmTodoList/frmTodoList.component';
import { HomeComponent } from './components/home/home.component';
import { AllProcessComponent } from './components/all-process/all-process.component';

export const routes: Routes = [
   {
      path: '', redirectTo: 'home', pathMatch: 'full'
   },
   {
      path: 'home',
      component: HomeComponent
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
   {
      path: 'todolistc',
      component: FrmTodoListComponent
   },
   {
      path: 'all-process',
      component: AllProcessComponent
   },
];

