import ReactApexChart from 'react-apexcharts';

const RatingTrendChart = ({ data }:{data:any}) => {
  const chartData = {
    series: [
      {
        name: 'Average Rating',
        data: data.map((item:any) => ({ x: new Date(item._id).getTime(), y: item.averageRating }))
      }
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false
        }
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
      },
      yaxis: {
        title: {
          text: 'Rating'
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
      }
    }
  };

  return (
    <div id="chart" className=' bg-white'>
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
