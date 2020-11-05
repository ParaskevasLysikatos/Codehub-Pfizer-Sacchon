import { Component, Input, OnInit } from '@angular/core';

import {Chart} from 'node_modules/chart.js/dist/Chart.js';

@Component({
  selector: 'codehub-charts-data',
  templateUrl: './charts-data.component.html',
  styleUrls: ['./charts-data.component.scss']
})
export class ChartsDataComponent implements OnInit {

  @Input() carbValues: number[];
  @Input() glucoseValues: number[];
  @Input() dateValues: Date[];
  chart: Chart;
  constructor(){}

  ngOnInit(): void {
    
    //if user is a doctor
    console.log(this.carbValues);
    this.setChart(); 
  }

  ngOnChanges() {
    console.log(this.carbValues);
    if(this.chart != undefined)
      this.chart.destroy();
    this.setChart();
  }


setChart(){
    this.chart = new Chart("data-chart", {
      type: 'line',
      data: {
          labels: this.dateValues,
          datasets: [{
            events: [],
              label: 'Glucose (mg/dl)',
              data: this.glucoseValues,
              backgroundColor: 
                 'red'
              ,
              borderColor: [
                'red'
              ], fill:false,
              borderWidth: 3
          }, {
            events: [],
            label: 'Carbs (grams)',
              data: this.carbValues,
              backgroundColor: 
                'blue'
              ,
              borderColor: [
                'blue' 
              ], fill:false,
              borderWidth: 3
          }
        ]
      },
      options: {
        responsive: true,
        title:{
          display: true,
          text: 'Medidata Line Chart' 
        },
          scales: {
              yAxes: [{
                  ticks: {
                    max: 800,
                    stepSize: 20,
                      beginAtZero: true
                  }
              }]
          }
      }
  });


  }

}
