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
  status = 'Daily';
  hourMonthArr = [];


  ngOnInit(): void {
    this.onClick(this.status);
  }

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      y: {
        min: 0,
        max: 100,
      },
    },

  };

  days = ["Sunday","Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];

  ChartLabels = ['0 h', '1 h', '2 h', '4 h', '6 h', '8 h', '10 h', '12 h'];
  barChartType: ChartType = 'line';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataset[]

  async apiCall(val) {
    let res = await this.backend.getDashboardData(val);
    this.vehicleData = res;
  }

  async onClick(val) {
    this.hourMonthArr = [];
    this.status = val;
    this.ChartLabels = ['1 h', '2 h', '3 h', '4 h', '5 h', '6 h', '7 h', '8 h', '9 h', '10 h', '11 h', '12 h'];
    let mon = [];
    let Tue = [];
    let Wed = [];
    let Thu = [];
    let fry = [];
    let sat = [];
    let sun = [];

    if (val === 'Weekly') {
      await this.apiCall({ isWeeklyBasis: true });
      this.ChartLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
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
      this.hourMonthArr = {
        ...this.hourMonthArr, ...{
          frstln: sun.length, scndln: mon.length, thrdln: Tue.length, frthln: Wed.length, fivln: Thu.length,
          sixln: fry.length, svnln: sat.length
        }
      };
    }

    if(val === 'Daily'){
      await this.apiCall({ isDailyBasis: true })
      let onehr = [];
      let twohr = [];
      let threehr = [];
      let fourhr = [];
      let fivehr = [];
      let sixhr = [];
      let sevenhr = [];
      let eighthr = [];
      let ninehr = [];
      let tenhr = [];
      let elevenhr = [];
      let twelvhr = [];

      this.vehicleData.forEach((el) => {

        let hr = new Date(el.date * 1000).getHours() % 12 || 12

        if (hr === 1) onehr.push(el)
        if (hr === 2) twohr.push(el)
        if (hr === 3) threehr.push(el)
        if (hr === 4) fourhr.push(el)
        if (hr === 5) fivehr.push(el)
        if (hr === 6) sixhr.push(el)
        if (hr === 7) sevenhr.push(el)
        if (hr === 8) eighthr.push(el)
        if (hr === 9) ninehr.push(el)
        if (hr === 10) tenhr.push(el)
        if (hr === 11) elevenhr.push(el)
        if (hr === 12) twelvhr.push(el)
      })

      this.hourMonthArr = {
        ...this.hourMonthArr, ...{
          frstln: onehr.length, scndln: twohr.length, thrdln: threehr.length, frthln: fourhr.length,
          fivln: fivehr.length, sixln: sixhr.length, svnln : sevenhr.length, ethln: eighthr.length, ninln: ninehr.length,
          tenln: tenhr.length, elvln: elevenhr.length, twlln: twelvhr.length
        }
      }
    }
    if(val === 'Monthly'){
      await this.apiCall({ isMonthlyBasis: true });
      this.ChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
      let Jan = [];
      let Feb = [];
      let Mar = [];
      let Apr = [];
      let May = [];
      let June = [];
      let July = [];
      let Aug = [];
      let Sept = [];
      let Oct = [];
      let Nov = [];
      let Dec = [];

      this.vehicleData.forEach(el => {
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Jan' ) Jan.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Feb' ) Feb.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Mar' ) Mar.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Apr' ) Apr.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'May' ) May.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'June' ) June.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'July' ) July.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Aug' ) Aug.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Sept' ) Sept.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Oct' ) Oct.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Nov' ) Nov.push(el)
        if( this.month[new Date(el.date * 1000).getMonth()] === 'Dec' ) Dec.push(el)
      })

      this.hourMonthArr = {
        ...this.hourMonthArr,
        ...{ frstln: Jan.length, scndln: Feb.length, thrdln: Mar.length, frthln: Apr.length, fivln: May.length,
          sixln: June.length, svnln: July.length, ethln: Aug.length, ninln: Sept.length,
          tenln: Oct.length, elvln: Nov.length, twlln : Dec.length }
      }
    }
    this.initialize();
  }

  initialize() {
    this.barChartData = [
      {
        backgroundColor: "#1D4ED8",
        hoverBackgroundColor: "#1D4ED8",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0 ,0, 0, 0],
        label: 'Two Wheeler',
        barPercentage: 0.2
      },
      {

        backgroundColor: "#33BFFF",
        hoverBackgroundColor: "#33BFFF",
        data: [
          this.hourMonthArr['frstln'], this.hourMonthArr['scndln'],
          this.hourMonthArr['thrdln'], this.hourMonthArr['frthln'],
          this.hourMonthArr['fivln'], this.hourMonthArr['sixln'],
          this.hourMonthArr['svnln'], this.hourMonthArr['ethln'],
          this.hourMonthArr['ninln'],this.hourMonthArr['tenln'],
          this.hourMonthArr['elvln'],this.hourMonthArr['twlln']
        ],

        label: 'Four Wheeler',
        barPercentage: 0.2,
      }
    ];
  }

}
