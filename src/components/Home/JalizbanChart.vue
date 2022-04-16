<template>
  <div class="col-12">
    <canvas id="jalizbanChart" style="height: 50vh; width: 100%"></canvas>
  </div>
</template>

<script>
import Chart from "chart.js";

export default {
  name: "JalizbanChart",
  props: {
    chartData: {
      type: Array,
    },
    chartDataLegned: {
      type: Array,
    },
    chartTitle: {
      type: String,
    },
  },
  data(){
    return {
      myChart: null
    }

  },
  mounted() {
    this.getChartData();
  },
  watch: {
    chartData: function () {
      this.getChartData();
    },
  },
  methods: {
    getChartData() {
      let labels = [],
        maxDatasets = [],
        minDatasets = [],
        lineChartData = null;
      if (this.chartData.length > 0) {
        this.chartData.map((item) => {
          labels.push(item.date.display_date);
          minDatasets.push(item.min);
          maxDatasets.push(item.max);
        });
        lineChartData = {
          type: "line",
          data: {
            labels: labels,
            datasets: [
              {
                label: "بیشترین مقدار",
                // fill: false,
                data: maxDatasets,
                backgroundColor: "rgba(0, 106, 57, 0.8)",
                borderColor: "rgb(0, 106, 57)",
                borderWidth: 0.5,
                pointStyle: "rect",
                pointRadius: 3,
                pointHoverRadius: 10,
              },
              {
                label: "کمترین مقدار",
                // fill: false,
                data: minDatasets,
                backgroundColor: "rgba(165, 0, 40, 0.8)",
                borderColor: "rgb(165, 0, 40)",
                borderWidth: 0.5,
                pointStyle: "rect",
                pointRadius: 3,
                pointHoverRadius: 10,
              },
            ],
          },
          options: {
            responsive: true,
            legend: { labels: { fontFamily: "'iranyekan'" } },
            title: {
              display: true,
              fontFamily: "'iranyekan'",
              text: " نمودار " + this.chartTitle + " روزانه ",
              rtl: true,
            },
            scales: {
              // x: {
              //   display: true,
              //   title: {
              //     display: true,
              //     text: "Month",
              //     // color: "#000",
              //     // font: {
              //     //   fontFamily: "'iranyekan'",
              //     //   size: 10,
              //     //   weight: "bold",
              //     //   lineHeight: 1.2,
              //     // },
              //     // padding: {top: 10, left: 0, right: 0, bottom: 0}
              //   },
              // },
              // y: {
              //   display: true,
              //   title: {
              //     display: true,
              //     text: "Value",
              //     // color: "#000",
              //     // font: {
              //     //   fontFamily: "'iranyekan'",
              //     //   size: 10,
              //     //   style: "normal",
              //     //   lineHeight: 1.2,
              //     // },
              //     // padding: {top: 10, left: 0, right: 0, bottom: 0}
              //   },
              // },
              yAxes: [
                {
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)",
                  },
                  barPercentage: 0.1,
                  ticks: {
                    fontSize: 12,
                    fontFamily: "'iranyekan'",
                  },
                },
              ],
              xAxes: [
                {
                  barPercentage: 0.1,
                  ticks: {
                    fontSize: 12,
                    fontFamily: "'iranyekan'",
                  },
                },
              ],
            },
            tooltips: {
              mode: "index",
              bodySpacing: 3,
              bodyFontSize: 12,
              bodyFontFamily: "'iranyekan'",
              titleFontFamily: "'iranyekan'",
              rtl: true,
              backgroundColor: "rgba(255,255,255, 0.8)",
              bodyFontColor: "#000",
              titleFontColor: "#000",
              bodyAlign: "right",
            },
          },
        };
        const ctx = document.getElementById("jalizbanChart");
        if (this.myChart) this.myChart.destroy();
        this.myChart = new Chart(ctx, lineChartData);
      }
    },
  },
};
</script>

<style>
#jalizbanChart {
  width: 450px;
  height: 200px;
}

@media (max-width: 767px) {
  #jalizbanChart {
    width: 326px;
    margin-bottom: 42px;
  }
}
</style>