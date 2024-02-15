import { Component, Input } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-charts-data',
  templateUrl: './charts-data.component.html',
  styleUrl: './charts-data.component.scss'
})
export class ChartsDataComponent {

  @Input() carbValues?: number[];
  @Input() glucoseValues?: number[];
  @Input() dateValues?: string[];
  chart?: any;
  constructor(){}

  ngOnInit(): void {
    this.chart.destroy();
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

          scales: {
              yAxis: {
                max: 800,
                beginAtZero: true,
                  ticks: {
                    stepSize: 20,
                  }
              }
          }
      }
  });


  }


}
