import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldDefaultOptions, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatNativeDateModule, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { COMPONENTS, MATERIAL, PAGES, PIPES, SERVICES } from 'src/app/app.common';
import { AppComponent } from 'src/app/app.component';
import { TokenInterceptor } from 'src/app/interceptors/token.interceptor';
import { EsDateAdapter } from 'src/app/model/es-date.adapter';

const appearance: MatFormFieldDefaultOptions = {
	appearance: 'outline'
};

@NgModule({
	declarations: [
		AppComponent,
		...PAGES,
		...COMPONENTS,
		...PIPES
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		FormsModule,
		...MATERIAL
	],
	exports: [
		MatNativeDateModule
	],
	providers: [
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: appearance
		},
		...SERVICES,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		},
		{
			provide: MAT_DATE_LOCALE,
			useValue: 'es-ES'
		},
		{
			provide: DateAdapter,
			useClass: EsDateAdapter
		},
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
