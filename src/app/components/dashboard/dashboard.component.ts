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

  ngOnInit(): void {

    this.apiCall();
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

  barChartData: ChartDataset[] = [
    {
      backgroundColor: "#1D4ED8",
      hoverBackgroundColor: "#1D4ED8",
      data: [0, 10, 15,],
      label: '',
      barPercentage: 0.2
    },
    {
      backgroundColor: "#33BFFF",
      hoverBackgroundColor: "#33BFFF",
      data: [20, 10, 15],
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

  async apiCall() {
    let res = await this.backend.getDashboardData();
    this.vehicleData = res;
  }

  onClick(val) {
    this.status = !val
    this.barChartLabels = ['0 h', '1 h', '2 h', '4 h', '6 h', '8 h', '10 h', '12 h'];
    let tempArr = [];
    if (val) {
      this.barChartLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
      console.log(this.vehicleData)
      this.vehicleData.forEach(element => {
        if (this.days[new Date(element.date * 1000).getDay()] === "Monday") {
          console.log(tempArr['M'])
           if( !tempArr['M']){
              tempArr.push({'M' : []})
           }

          //  tempArr['M'].push(element)
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Tuesday") {
          console.log('sdsd')
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Wednesday") {
          console.log('sdsd')
        }

        if (this.days[new Date(element.date * 1000).getDay()] == "Thursday") {
          console.log('sds')
        }
 console.log(tempArr)
      });
    }
  }

}
