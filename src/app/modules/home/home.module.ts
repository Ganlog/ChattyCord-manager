import { CoreModule } from './../../core/core.module';
import { NgModule } from '@angular/core';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [CoreModule],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule {}
