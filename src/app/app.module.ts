import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ProcessFileComponent } from './process-file/process-file.component';
import { MenuComponent } from './menu/menu.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store';
import { AppEffects } from './effects/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { FileUploadComponent } from './fileUploader/file-upload/file-upload.component';
import { CategoryObserverComponent } from './category-observer/category-observer.component';
import { DragAndDropDirective } from './fileUploader/drag-and-drop.directive';
import { ProgressComponent } from './progress/progress.component';
import { BasicFlowComponent } from './basic-flow/basic-flow.component';

@NgModule({
  declarations: [
    AppComponent,
    ProcessFileComponent,
    MenuComponent,
    NavigationComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    FileUploadComponent,
    CategoryObserverComponent,
    DragAndDropDirective,
    ProgressComponent,
    BasicFlowComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot(reducers), 
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
