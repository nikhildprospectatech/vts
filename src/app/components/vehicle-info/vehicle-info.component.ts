import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { BackendService } from 'src/app/services/backend.service';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  foods = [
    { viewValue: 5 },
    {
      viewValue: 10
    },
    {
      viewValue: 15
    },
    {
      viewValue: 20
    }
  ];

  default = 5;

  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['Sl.No.', 'Date', 'Vehicle Number', 'Category', 'From Hour', 'To Hour', 'Check In/out'];
  constructor(
    private backend: BackendService
  ) { }

  ngOnInit(): void {
    this._apiCall(); 
  }

  async _apiCall() {
    let res = await this.backend.getVehicleData();
    this.dataSource = new MatTableDataSource(res);
  }
}
