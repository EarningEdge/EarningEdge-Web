
import ReactApexChart from 'react-apexcharts';

const RatingTrendChart = ({ data }: { data: any }) => {
  const chartData = {
    series: [
      {
        name: 'Average Rating',
        data: data.map((item: any) => ({ x: new Date(item._id).getTime(), y: item.averageRating }))
      }
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        background: 'transparent'
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 1, 
        colors: ['#28a745'] 
      },
      title: {
        text: '',
        align: 'left'
      },
      subtitle: {
        text: '',
        align: 'left'
      },
      xaxis: {
        type: 'datetime',
        labels: {
          style: {
            colors: '#ffffff', 
          }
        },
        axisBorder: {
          show: true 
        },
        axisTicks: {
          show: false 
        }
      },
      yaxis: {
        title: {
          text: 'Rating',
          style: {
            color: '#ffffff'
          }
        },
        // axisBorder: {
        //   show: true 
        // },
        labels: {
          style: {
            colors: '#ffffff'
          }
        },
        min: 0,
        max: 5
      },
      tooltip: {
        x: {
          format: 'dd MMM yyyy'
        }
      },
      fill: {
        type: 'gradient',
        gradient: {
          shadeIntensity: 1,
          gradientToColors: ['#28a745'], 
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.7,
        },
        colors: ['#28a745'] 
      },
      grid: {
        show: false,  // This removes all grid lines
        padding: {
          left: 0,
          right: 0
        }
      }
    }
  };

  return (
    <div id="chart" className='bg-darkSecondary border-[0.4px] border-darkStroke px-3 rounded-md'>
      <ReactApexChart 
      //@ts-ignore
        options={chartData.options} 
        series={chartData.series} 
        type="area" 
        height={250} 
      />
    </div>
  );
};

export default RatingTrendChart;