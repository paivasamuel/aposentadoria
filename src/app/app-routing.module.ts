import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NovoComponent } from './pages/novo/novo.component';


const routes: Routes = [ 
	{ path: '', component: HomeComponent },
	
	{ path: 'home', component: NovoComponent }, 
 { path: 'novo', component: NovoComponent }, 
 { path: 'novo/:id', component: NovoComponent },
 { path: ':msg', component: HomeComponent }  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
