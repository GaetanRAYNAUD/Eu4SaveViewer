import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './Components/auth/signup/signup.component';
import { SigninComponent } from './Components/auth/signin/signin.component';
import { CountryPlateComponent } from './Components/country-plate/country-plate.component';
import { CountryPlateCompareComponent } from './Components/country-plate/country-plate-compare/country-plate-compare.component';
import { HeaderComponent } from './Components/header/header.component';
import { GeneralComponent } from './Components/general/general.component';
import { SessionComponent } from './Components/session/session.component';
import { PlayerComponent } from './Components/player/player.component';
import { CompareComponent } from './Components/compare/compare.component';
import { SaveListComponent } from './Components/save/save-list/save-list.component';
import { SaveFormComponent } from './Components/save/save-form/save-form.component';
import { TimelineComponent } from './Components/graph/timeline/timeline.component';
import { ColumnComponent } from './Components/graph/column/column.component';
import { DatatableComponent } from './Components/graph/datatable/datatable.component';
import { LineComponent } from './Components/graph/line/line.component';
import { AuthService } from "./Services/auth.service";
import { AuthGuardService } from "./Services/auth-guard.service";
import { GeneralService } from "./Services/general.service";
import { HomeService } from "./Services/home.service";
import { PlayerService } from "./Services/player.service";
import { SaveService } from "./Services/save.service";
import { SessionService } from "./Services/session.service";
import { HomeComponent } from './Components/home/home.component';
import { CountryService } from "./Services/country.service";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireStorageModule } from "angularfire2/storage";
import { UploadService } from "./Services/upload.service";
import { environment } from "../environments/environment";
import { UploadComponent } from './Components/upload/upload.component';
import { DropzoneDirective } from './Directives/dropzone.directive';
import { FileSizePipe } from './Pipes/file-size.pipe';
import { FooterComponent } from './Components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatAutocompleteModule,
  MatBadgeModule,
  MatBottomSheetModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatLineModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatPseudoCheckboxModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule
} from '@angular/material';
import { ForgotPasswordComponent } from './Components/auth/forgot-password/forgot-password.component';
import { CreateGameComponent } from './Components/game/create-game/create-game.component';
import { UploadImageComponent } from './Components/upload/upload-image/upload-image.component';
import { UploadSaveComponent } from './Components/upload/upload-save/upload-save.component';
import { ViewGameComponent } from './Components/game/view-game/view-game.component';

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    CountryPlateComponent,
    CountryPlateCompareComponent,
    HeaderComponent,
    GeneralComponent,
    SessionComponent,
    PlayerComponent,
    CompareComponent,
    SaveListComponent,
    SaveFormComponent,
    TimelineComponent,
    ColumnComponent,
    DatatableComponent,
    LineComponent,
    SaveListComponent,
    SaveFormComponent,
    HomeComponent,
    UploadComponent,
    DropzoneDirective,
    FileSizePipe,
    FooterComponent,
    ForgotPasswordComponent,
    CreateGameComponent,
    UploadImageComponent,
    UploadSaveComponent,
    ViewGameComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatCardModule,
    MatChipsModule,
    MatCommonModule,
    MatSnackBarModule,
    MatSlideToggleModule,
    MatPseudoCheckboxModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatGridListModule,
    MatButtonToggleModule,
    MatBottomSheetModule,
    MatTooltipModule,
    MatDividerModule,
    MatTreeModule,
    MatListModule,
    MatExpansionModule,
    MatSliderModule,
    MatIconModule,
    MatLineModule,
    MatMenuModule,
    MatOptionModule,
    MatPaginatorModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule
  ],
  providers: [
    AuthService,
    AuthGuardService,
    GeneralService,
    HomeService,
    PlayerService,
    SaveService,
    SessionService,
    CountryService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
