import { UserComponent } from './user/user.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ErrorComponent } from './error/error.component';
import { LogoutComponent } from './logout/logout.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
	{ path: "", component: HomeComponent },
	{ path: "login", component: LoginComponent },
	{ path: "register", component: RegisterComponent },
	{ path: "user", component: UserHomeComponent },
	{ path: "user/search/:email", component: UserComponent },
	{ path: "users", component: UsersComponent },
	{ path: "forgot", component: ForgotPasswordComponent },
	{ path: "logout", component: LogoutComponent },
	{ path: "**", component: ErrorComponent }
	];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
