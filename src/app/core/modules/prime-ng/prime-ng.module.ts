import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RatingModule} from 'primeng/rating';
import {RippleModule} from 'primeng/ripple';
import {ImageModule} from 'primeng/image';
import {CarouselModule} from 'primeng/carousel';
import { FormsModule } from '@angular/forms';
import {ToolbarModule} from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import {MenubarModule} from 'primeng/menubar';
import {SidebarModule} from 'primeng/sidebar';
import {CardModule} from 'primeng/card';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ToastModule} from 'primeng/toast';
import {SkeletonModule} from 'primeng/skeleton';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    FormsModule,
    ImageModule,
    CarouselModule,
    ToolbarModule,
    SplitButtonModule,
    MenubarModule,
    SidebarModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    SkeletonModule
  ],
  exports: [
    CommonModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    RatingModule,
    FormsModule,
    ImageModule,
    CarouselModule,
    ToolbarModule,
    SplitButtonModule,
    MenubarModule,
    SidebarModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    SkeletonModule
  ]
})
export class PrimeNgModule { }
