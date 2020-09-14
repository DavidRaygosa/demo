import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Components

import { IndexComponent } from './components/index/index.component';
import { HistoryComponent } from './components/history/history.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';

//Routes

const appRoutes: Routes = 
[
	{path: '', component: IndexComponent},
	{path: 'historia', component: HistoryComponent},
	{path: 'blog', component: BlogComponent},
	{path: 'contacto', component: ContactComponent},
	{path: 'privacidad', component: PrivacyComponent},
	{path: 'terminos', component: TermsComponent},
	{path: '**', component: IndexComponent}
]


export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);