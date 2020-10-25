import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Components

	// COMMON ROUTES
import { IndexComponent } from './components/index/index.component';
import { HistoryComponent } from './components/history/history.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { BlogTemplateComponent } from './components/blog/blog-template/blog-template.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ParallaxComponent } from './components/parallax/parallax.component';

	// ADMIN ROUTES
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { UsersComponent } from './components/admin/users/users.component';
import { PublicationsComponent } from './components/admin/publications/publications.component';
import { InfoComponent } from './components/admin/info/info.component';

// Constructor



//Routes

var _SESSION = JSON.parse(localStorage.getItem('_SESSION'));

if(_SESSION == null)
{
	var appRoutes: Routes = 
	[
		{path: '', component: IndexComponent},
		{path: 'historia', component: HistoryComponent},
		{path: 'blog/:page', component: BlogComponent},
		{path: 'contacto', component: ContactComponent},
		{path: 'privacidad', component: PrivacyComponent},
		{path: 'terminos', component: TermsComponent},
		{path: 'parallax', component: ParallaxComponent},
		{path: 'blog/publicacion/:id', component: BlogTemplateComponent},
		//ERROR ROUTE
		{path: '**', component: NotfoundComponent}
	]
}
else
{
	if(_SESSION.usertype == "admin" || _SESSION.usertype == "superadmin")
	{
		var appRoutes: Routes = 
		[
			//ADMIN ROUTES
			{path: '', component: ProfileComponent},
			{path: 'administradores', component: AdminsComponent},
			{path: 'usuarios', component: UsersComponent},
			{path: 'publicaciones', component: PublicationsComponent},
			{path: 'informacion', component: InfoComponent},
			//ERROR ROUTE
			{path: '**', component: NotfoundComponent}
		]
	}
	else
	{
		var appRoutes: Routes = 
		[
			{path: '', component: IndexComponent},
			{path: 'historia', component: HistoryComponent},
			{path: 'blog/:page', component: BlogComponent},
			{path: 'contacto', component: ContactComponent},
			{path: 'privacidad', component: PrivacyComponent},
			{path: 'terminos', component: TermsComponent},
			{path: 'parallax', component: ParallaxComponent},
			{path: 'blog/publicacion/:id', component: BlogTemplateComponent},
			//ERROR ROUTE
			{path: '**', component: NotfoundComponent}
		]
	}
}

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);