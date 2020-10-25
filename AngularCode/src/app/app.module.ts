import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; // Importante Para Validaciones de FORMS
import { routing, appRoutingProviders } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './components/index/index.component';
import { HistoryComponent } from './components/history/history.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { TermsComponent } from './components/terms/terms.component';
import { BlogTemplateComponent } from './components/blog/blog-template/blog-template.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ParallaxComponent } from './components/parallax/parallax.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/admin/profile/profile.component';
import { AdminsComponent } from './components/admin/admins/admins.component';
import { UsersComponent } from './components/admin/users/users.component';
import { PublicationsComponent } from './components/admin/publications/publications.component';
import { InfoComponent } from './components/admin/info/info.component';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HistoryComponent,
    BlogComponent,
    ContactComponent,
    PrivacyComponent,
    TermsComponent,
    BlogTemplateComponent,
    NotfoundComponent,
    ParallaxComponent,
    AdminComponent,
    ProfileComponent,
    AdminsComponent,
    UsersComponent,
    PublicationsComponent,
    InfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
