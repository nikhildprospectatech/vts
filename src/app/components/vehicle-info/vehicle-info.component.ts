import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { BackendService } from 'src/app/services/backend.service';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-vehicle-info',
  templateUrl: './vehicle-info.component.html',
  styleUrls: ['./vehicle-info.component.css']
})
export class VehicleInfoComponent implements OnInit {
  
  @ViewChild(MatPaginator) paginator: MatPaginator;

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

  page = 1;
  pagelimit = 10;

  limit = 5;

  inOutStatus :boolean = false;
  vehicleData;
  dataSource: MatTableDataSource<any>;

  displayedColumns: string[] = ['Sl.No.', 'Date', 'Vehicle Number', 'Category', 'From Hour', 'To Hour', 'Check In/out', "Duration"];
  constructor(
    private backend: BackendService
  ) { }


  ngOnInit(): void {
    this._apiCall(this.pagelimit, this.page); 
  }

  async _apiCall( limit?, page?) {
    let res = await this.backend.getVehicleData({limit : limit, page : page});
    this.vehicleData = res[0];
    this.dataSource = new MatTableDataSource(res[0].items);
    this.dataSource.paginator = this.paginator;
  }

  toggle(val, item){
    this.inOutStatus = val.checked;
    this.vehicleData.items.forEach(element => {
      if(element.vehicleNumber == item.vehicleNumber){
        element.currentStatus = val.checked
      }
    });
  }


  // timeLeft: number = 60;
  // interval;

// startTimer() {
//     this.interval = setInterval(() => {
//       if(this.timeLeft > 0) {
//         this.timeLeft--;
//       } else {
//         this.timeLeft = 60;

//       }
//     },1000)
//   }

//   pauseTimer() {
//     clearInterval(this.interval);
//   }
}

