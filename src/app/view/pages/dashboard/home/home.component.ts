import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UIService } from 'src/app/services/ui.service';

import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexPlotOptions,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexYAxis,
  ApexTooltip,
} from 'ng-apexcharts';
import { Months, RankOrder } from 'src/app/constants';
import { SoldierService } from 'src/app/services/soldier/soldier.service';
import { Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
} from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
  colors: string[];
  yaxis: ApexYAxis;
};
export type PieChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  tooltip: ApexTooltip;
  labels: any;
};

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  @ViewChild('pieChart') pieChart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public pieChartOptions: Partial<PieChartOptions>;
  leaveSummary: any[];
  years: number[] = [];
  selectedYear: number;
  monthWiseLeaveObj: any = {};
  searchResults: any[] = [];

  armyNo: string;
  search = new Subject<string>();
  BASE_IMAGE_URL = '../../../../../assets/images/image.png';
  birthDays: any = {};
  pieChartData: any;

  constructor(
    private uiService: UIService,
    private soldierService: SoldierService
  ) {
    this.chartOptions = {
      series: [],
      chart: {
        height: 350,
        type: 'bar',
        redrawOnWindowResize: true,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: '60%',
        },
      },
      colors: ['#00E396'],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
        showForSingleSeries: false,
        customLegendItems: ['Actual', 'Expected'],
        markers: {
          fillColors: ['#00E396', '#775DD0'],
        },
      },
      yaxis: {
        min: 0,
      },
    };

    this.pieChartOptions = {
      series: [],
      chart: {
        width: 500,
        type: 'pie',
        redrawOnWindowResize: true,
        events: {
          click: (event: any, chartContext: any, config: any) => {
            const seriesIndex = event.target.classList[1].split(
              'apexcharts-pie-slice-'
            )[1];
            this.onChartClick(seriesIndex);
          },
        },
      },
      labels: [
        'Person On Leave',
        'Person On Course',
        'Person On ATT',
        'Available Person',
      ],

      tooltip: {
        custom: (data) => {
          const colors = data.w.globals.colors[data.seriesIndex];
          let coy: any;

          if (data.seriesIndex === 0) {
            coy = { ...this.pieChartData.personOnLeave };
          } else if (data.seriesIndex === 1) {
            coy = { ...this.pieChartData.personOnCourse };
          } else if (data.seriesIndex === 2) {
            coy = { ...this.pieChartData.personOnAtt };
          } else if (data.seriesIndex === 3) {
            coy = { ...this.pieChartData.availablePerson };
          }

          return (
            '<div style="padding:1rem;background:' +
            colors +
            '"' +
            '>' +
            '<li style="list-style:none">' +
            data.w.globals.labels[data.seriesIndex] +
            ': ' +
            data.series[data.seriesIndex] +
            '</li>' +
            '<li style="list-style:none">A: ' +
            coy.A +
            '</li>' +
            '<li style="list-style:none">B: ' +
            coy.B +
            '</li>' +
            '<li style="list-style:none">C: ' +
            coy.C +
            '</li>' +
            '<li style="list-style:none">D: ' +
            coy.D +
            '</li>' +
            '<li style="list-style:none">SP: ' +
            coy.SP +
            '</li>' +
            '<li style="list-style:none">HQ: ' +
            coy.HQ +
            '</li>' +
            '</div>'
          );
        },
      },
    };
  }

  ngOnInit(): void {
    this.uiService.isAuthenticated.next(true);
    let currentYear = new Date().getFullYear();
    this.selectedYear = currentYear;
    for (let i = 1; i <= 7; i++) {
      this.years.push(currentYear);
      currentYear -= 1;
    }
    this.getParadeState();
    this.getLeaveSummary();
    this.getBirthDay();
  }

  ngAfterViewInit() {
    this.search
      .pipe(
        map((searchString: string) => searchString),
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((data) =>
          this.soldierService.getAllPerson({
            pageNo: 0,
            pageLimit: 10,
            search: data,
          })
        )
      )
      .subscribe((res: any) => {
        if (res.data) {
          const getRank = new Map(
            Array.from(RankOrder, (a) => a.reverse()) as []
          );
          this.searchResults = res.data.persons;
          this.searchResults.forEach((result) => {
            result.rank = getRank.get(result.rank);
            if (result.photo) {
              result.photo = `${environment.base_url}/${result.photo}`;
            }
            console.log(result.photo);
          });
        } else {
          this.searchResults = [];
        }
      });

    this.search.subscribe((res: any) => {
      if (res.data) {
        //
      }
    });
  }

  getParadeState() {
    this.soldierService.getParadeState().subscribe((res: any) => {
      console.log(res);
      this.pieChartData = res.data;
      const pieChartDataObj: any = new Object();
      const base_coy = {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        SP: 0,
        HQ: 0,
      };
      let coy_available: any = { ...base_coy };
      let coy_leave: any = { ...base_coy };
      let coy_course: any = { ...base_coy };
      let coy_att: any = { ...base_coy };
      res.data.availablePerson.rows.forEach((row: any) => {
        coy_available[row.coy] += 1;
      });
      pieChartDataObj['availablePerson'] = coy_available;
      res.data.personOnAtt.rows.forEach((row: any) => {
        coy_att[row.coy] += 1;
      });
      pieChartDataObj['personOnAtt'] = coy_att;
      res.data.personOnCourse.rows.forEach((row: any) => {
        coy_course[row.coy] += 1;
      });
      pieChartDataObj['personOnCourse'] = coy_course;
      res.data.personOnLeave.rows.forEach((row: any) => {
        coy_leave[row.coy] += 1;
      });
      pieChartDataObj['personOnLeave'] = coy_leave;

      this.pieChartData = pieChartDataObj;
      const pieChartSeries = [
        res.data.personOnLeave.count,
        res.data.personOnCourse.count,
        res.data.personOnAtt.count,
        res.data.availablePerson.count,
      ];
      this.pieChartOptions.series = pieChartSeries;
    });
  }
  getLeaveSummary() {
    this.soldierService.getLeaveSummary().subscribe((res: any) => {
      this.leaveSummary = res.data;
      this.populateLeaveSeries();
    });
  }
  resetMonth() {
    for (let i = 1; i <= 12; i++) {
      this.monthWiseLeaveObj[i] = { x: Months[i - 1].name, y: 0 };
    }
  }
  populateLeaveSeries() {
    this.resetMonth();
    const seriesData: any[] = [];
    let leaveSeries = this.leaveSummary.filter(
      (leave) => parseInt(leave.year) === this.selectedYear
    );

    if (leaveSeries.length) {
      let count = 0;
      leaveSeries[0].months.forEach((month: any) => {
        if (month.count > count) {
          count = month.count;
        }
        this.monthWiseLeaveObj[month.month]['y'] = month.count;
      });

      const remainder = count % 10;
      const max = count + (10 - remainder);
      for (let key in this.monthWiseLeaveObj) {
        seriesData.push(this.monthWiseLeaveObj[key]);
      }
      this.chartOptions.series = [{ name: 'Leave', data: seriesData }];
      this.chartOptions.yaxis.max = max;
      if (!max) {
        this.chartOptions.yaxis.max = 100;
      }
    } else {
      this.chartOptions.series = [];
    }
  }
  onPersonSelection() {
    this.searchResults = [];
    this.armyNo = undefined;
  }
  onClearSearch() {
    this.searchResults = [];
    this.armyNo = null;
  }
  getBirthDay() {
    this.soldierService.getBirthday().subscribe((res: any) => {
      console.log(res);
      let todays: any[] = [];
      let nextWeek: any[] = [];
      const getRank = new Map(Array.from(RankOrder, (a) => a.reverse()) as []);
      res.data.forEach((data: any) => {
        if (moment(data.dob).format('DD-MMM') === moment().format('DD-MMM')) {
          todays.push(data);
        } else {
          nextWeek.push(data);
        }

        data.rank = getRank.get(data.rank);
        data.dob = moment(data.dob).format('DD-MMM-YYYY');
      });

      this.birthDays['todays'] = todays;
      this.birthDays['nextWeek'] = nextWeek;
    });
  }
  onChartClick(seriesIndex: number) {
    console.log('Working...', seriesIndex);
  }
}
