import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { CustomFormsModule } from 'ng4-validators';

import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BooksService } from './shared/services/books.service';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { MainPageComponent } from './home/main-page/main-page.component';
import { BooksCatalogComponent } from './home/books-catalog/books-catalog.component';
import { BookItemComponent } from './home/books-catalog/books-list/book-item/book-item.component';
import { BooksListComponent } from './home/books-catalog/books-list/books-list.component';
import { ScreenSizeService } from './shared/services/screen-size.service';
import { FilterBookTitlePipe } from './shared/pipes/filter-book-title.pipe';
import { EditBookModalComponent } from './home/books-catalog/editing-mode/edit-book-modal/edit-book-modal.component';
import { DeleteBookModalComponent } from './home/books-catalog/editing-mode/delete-book-modal/delete-book-modal.component';
import { ModalsService } from './shared/services/modals.service';
import { DatesService } from './shared/services/dates.service';
import { CreateBooksComponent } from './home/books-catalog/editing-mode/create-books/create-books.component';
import { SwitchComponent } from './components/switch/switch.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksListComponent,
    BookItemComponent,
    HeaderComponent,
    HomeComponent,
    MainPageComponent,
    BooksCatalogComponent,
    FilterBookTitlePipe,
    EditBookModalComponent,
    DeleteBookModalComponent,
    CreateBooksComponent,
    SwitchComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    ScrollToModule.forRoot()
  ],
  providers: [
    BooksService,
    ScreenSizeService,
    ModalsService,
    DatesService
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
