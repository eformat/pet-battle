import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '@app/core';
import { HomeComponent } from './home.component';
import { Shell } from '@app/shell/shell.service';
import { CanAuthenticationGuard } from '@app/auth.guard';

const routes: Routes = [
  Shell.childRoutes([
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full',
      canActivate: [CanAuthenticationGuard],
      data: { roles: ['pbplayer'] }
    },
    {
      path: 'home',
      component: HomeComponent,
      data: { title: extract('Home'), roles: ['pbplayer'] },
      canActivate: [CanAuthenticationGuard]
    }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class HomeRoutingModule {}
