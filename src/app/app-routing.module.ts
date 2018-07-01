import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from "./Components/auth/signup/signup.component";
import { SigninComponent } from "./Components/auth/signin/signin.component";
import { GeneralComponent } from "./Components/general/general.component";
import { SessionComponent } from "./Components/session/session.component";
import { PlayerComponent } from "./Components/player/player.component";
import { SaveListComponent } from "./Components/save/save-list/save-list.component";
import { SaveFormComponent } from "./Components/save/save-form/save-form.component";
import { CompareComponent } from "./Components/compare/compare.component";
import { HomeComponent } from "./Components/home/home.component";
import { ForgotPasswordComponent } from "./Components/auth/forgot-password/forgot-password.component";
import { CreateGameComponent } from "./Components/game/create-game/create-game.component";
import { AuthGuardService } from "./Services/auth-guard.service";
import { ViewGameComponent } from "./Components/game/view-game/view-game.component";

const routes: Routes = [
  { path: 'auth/signup', component: SignupComponent},
  { path: 'auth/signin', component: SigninComponent},
  { path: 'auth/forgotPassword', component: ForgotPasswordComponent},
  { path: 'home', component: HomeComponent},
  { path: 'general', component: GeneralComponent},
  { path: 'session', component: SessionComponent},
  { path: 'player', component: PlayerComponent},
  { path: 'compare', component: CompareComponent},
  { path: 'save/view/:id', component: SaveListComponent},
  { path: 'save/edit/:id', component: SaveFormComponent},
  { path: 'game/new', canActivate: [AuthGuardService], component: CreateGameComponent},
  { path: 'game/view/:id', component: ViewGameComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
