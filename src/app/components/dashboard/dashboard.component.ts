import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
import { BackendService } from 'src/app/services/backend.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private backend: BackendService
  ) { }

  vehicleData;
  status: boolean = true;
  daysArr = {};

  ngOnInit(): void {

    this.apiCall();
    this.initialize();
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
        max: 100,
      },
    },

  };

  days = ['', "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  barChartLabels = ['0 h', '1 h', '2 h', '4 h', '6 h', '8 h', '10 h', '12 h'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataset[]

  async apiCall() {
    let res = await this.backend.getDashboardData();
    this.vehicleData = res;
  }

  onClick(val) {
    this.status = !val
    this.barChartLabels = ['0 h', '1 h', '2 h', '4 h', '6 h', '8 h', '10 h', '12 h'];
    let mon = [];
    let Tue = [];
    let Wed = [];
    let Thu = [];
    let fry = [];
    let sat = [];
    let sun = [];

    if (val) {
      this.barChartLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      console.log(this.vehicleData)
      this.vehicleData.forEach(element => {
        if (this.days[new Date(element.date * 1000).getDay()] === "Monday") {
          mon.push(element)
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Tuesday") {
          Tue.push(element)
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Wednesday") {
          Wed.push(element)
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Thursday") {
          Thu.push(element)
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Friday") {
          fry.push(element)
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Saturday") {
          sat.push(element)
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Sunday") {
          sun.push(element)
        }
 
      });
console.log(Tue.length, Wed.length)
       this.daysArr = { ...this.daysArr  , ...{ mon : mon.length, Tue : Tue.length, Wed : Wed.length, Thu : Thu.length, fry : fry.length, sat : sat.length, sun : sun.length } };
    }
    this.initialize();
  }

  initialize(){
     this.barChartData = [
      {
        backgroundColor: "#1D4ED8",
        hoverBackgroundColor: "#1D4ED8",
        data: [5],
        label: '',
        barPercentage: 0.2
      },
      {
        backgroundColor: "#33BFFF",
        hoverBackgroundColor: "#33BFFF",
        data: [
          this.daysArr['mon'], this.daysArr['Tue'], this.daysArr['Wed'], this.daysArr['Thu'], this.daysArr['fry'], this.daysArr['Sat'], this.daysArr['Sun']],
        label: '4 Wheeler',
        barPercentage: 0.2,
      },
      {
        backgroundColor: "#22C55E",
        hoverBackgroundColor: "##22C55E",
        data: [],
        label: '',
        barPercentage: 0.2
      }
    ];
  }

}
