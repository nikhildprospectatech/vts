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
  pagelimit = 1000;

  limit = 5;

  inOutStatus :boolean = false;
  vehicleData;
  dataSource: MatTableDataSource<any>;
  vehicleCount24hr = 0;

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
    this.calc(res[0].items);
  }

  toggle(val, item){
    this.inOutStatus = val.checked;
    this.vehicleData.items.forEach(element => {
      if(element.vehicleNumber == item.vehicleNumber){
        element.currentStatus = val.checked
      }
    });
  }

  calc(arr){
    this.vehicleCount24hr = 0;
    arr.forEach((el) => {
     let hoursBetweenDates = this.isLessThan24HourAgo(new Date(el.date * 1000))
     if(hoursBetweenDates){
      this.vehicleCount24hr++
     }
    })

    
  }

  isLessThan24HourAgo(date) {
    // hour  min  sec  milliseconds
    const twentyFourHrInMs = 24 * 60 * 60 * 1000;
  
    const twentyFourHoursAgo = Date.now() - twentyFourHrInMs;
  
    return date > twentyFourHoursAgo && date <= Date.now();
  }


  durationCount(val){
    let dt2 = new Date(val.exitDate * 1000)
    let dt1 = new Date(val.date * 1000)
    
    let diff = ( dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60)

    let diffMin = dt2.getTime() - dt1.getTime();

    let minutes = Math.floor(diffMin/ (1000 * 60) % 60)
    let hr = Math.abs(Math.round(diff)) ? Math.abs(Math.round(diff)) : "00" ;
    let min = minutes ? minutes : "00"


    return hr +"   :   "+ min
  }
}

