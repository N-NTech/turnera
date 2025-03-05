import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-event-details-dialog',
  template: `
    <h2 mat-dialog-title>{{data.title}}</h2>
    <mat-dialog-content class="mat-typography">
        @if(data.cliente){
            <p><strong>Cliente:</strong> {{ data.cliente }}</p>
        }

        <p><strong>Fecha:</strong> 
        @if(data.allDay && !data.end) {
            {{ data.start | date: 'dd/MM/yyyy' }}
        }@else if(data.allDay && data.end){
            {{ data.start | date: 'dd/MM/yyyy' }} - {{ data.end | date: 'dd/MM/yyyy' }}
        }@else if(isSameDay()){
            {{ data.start | date: 'dd/MM/yyyy' }} {{ data.start | date: 'HH:mm' }} - {{ data.end | date: 'HH:mm' }}
        }@else if(data.start && data.end){
            <br>Inicio: {{ data.start | date: 'dd/MM/yyyy HH:mm' }}
            <br>Fin: {{ data.end | date: 'dd/MM/yyyy HH:mm' }}
        }@else {
            {{ data.start | date: 'dd/MM/yyyy HH:mm' }}
        }
        </p>

        @if(data.profesional){
            <p><strong>Profesional:</strong> {{ data.profesional }}</p>
        }

        @if(data.precioFinal){
            <p><strong>Precio:</strong> {{ data.precioFinal }}</p>
        }

        @if(data.anticipo){
            <p><strong>Seña:</strong> {{ data.anticipo }}</p>
        }
        
        

    </mat-dialog-content>
    <mat-dialog-actions align="end">
        <button mat-button (click)="close()">Cerrar</button>
    </mat-dialog-actions>
  `,
  imports: [
    MatDialogModule,
    CommonModule,
    MatButtonModule
  ]
})

export class EventDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EventDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data)
  }

  close(): void {
    this.dialogRef.close();
  }

  isSameDay(): boolean {
    const start = new Date(this.data.start);
    const end = new Date(this.data.end);
    return start.getDate() === end.getDate() &&
           start.getMonth() === end.getMonth() &&
           start.getFullYear() === end.getFullYear();
  }
}