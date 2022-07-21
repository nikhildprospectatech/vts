import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales : {
      x : {
        stacked : true,
      },
      y : {
        stacked : true,
        min : 0,
        max : 24,
      },
    }
  };
  barChartLabels = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];
 
  barChartData: ChartDataset[] = [
    { 
      backgroundColor : "#1D4ED8",
      hoverBackgroundColor : "#1D4ED8",
      data: [], 
      label: '',
      barPercentage : 0.2
    },
    { 
      backgroundColor : "#33BFFF",
      hoverBackgroundColor : "#33BFFF",
      data: [10, 2, 6, 2, 4, 3, 2], 
      label: '',
      barPercentage : 0.2,
    },
    { 
      backgroundColor : "#22C55E",
      hoverBackgroundColor : "##22C55E",
      data: [], 
      label: '',
      barPercentage : 0.2
    }
  ];

}
