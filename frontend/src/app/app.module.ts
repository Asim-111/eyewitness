import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { NavbarModule } from './shared/navbar/navbar.module';
import { FooterModule } from './shared/footer/footer.module';
import { SidebarModule } from './sidebar/sidebar.module';
import {CustomDatePipe} from './custom.datepipe';

import { AppComponent } from './app.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AboutComponent } from './about/about.component';
import { ViewDataComponent } from './view-data/view-data.component';
import { TrainModelComponent } from './train-model/train-model.component';
import { TestModelComponent } from './test-model/test-model.component';
import { ViewDataDialogComponent } from './train-model/view-data-dialog/view-data-dialog.component';
import { BrowserModule } from '@angular/platform-browser';
import { ModelService } from './services/http.service';

// Material Modules
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { TestPredictionComponent } from './test-model/test-prediction/test-prediction.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    NavbarModule,
    FooterModule,
    SidebarModule,
    AppRoutingModule,
    MatStepperModule,
    BrowserModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTableModule
  ],
  declarations: [
    AppComponent,
    CustomDatePipe,
    AdminLayoutComponent,
    AboutComponent,
    ViewDataComponent,
    TrainModelComponent,
    TestModelComponent,
    ViewDataDialogComponent,
    TestPredictionComponent
  ],
  providers: [ModelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
