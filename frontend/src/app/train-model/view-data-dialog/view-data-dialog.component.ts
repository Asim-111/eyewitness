import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-view-data-dialog',
  templateUrl: './view-data-dialog.component.html',
  styleUrls: ['./view-data-dialog.component.css']
})
export class ViewDataDialogComponent implements OnInit {
  tableData1: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.tableData1 = this.data.tableData1;
  }

}
