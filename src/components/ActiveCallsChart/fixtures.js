export const CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: true,
  elements: {
    line: {
      tension: 0,
    },
    point: {
      radius: 0, // disable points
    },
  },
  scales: {
    xAxes: [{
      type: 'time',
      position: 'bottom',
      ticks: {
        major: {
          enabled: true,
        },
        maxRotation: 0,
        autoSkipPadding: 60,
      },
      time: {
        displayFormats: {
          minute: 'HH:mm',
          hour: 'HH:mm',
          day: 'MM-DD-YY HH:mm',
        },
        round: true,
        stepSize: 1,
      },
      scaleLabel: {
        display: true,
        labelString: 'Time',
      },
    }],
    yAxes: [{
      id: 0,
      type: 'linear',
      position: 'left',
      ticks: {
        maxRotation: 0,
        suggestedMin: 0,
        // suggestedMax: 110,
      },
    }],
  },
  animation: {
    duration: 0,
  },
  downsample: {
    enabled: true,
    threshold: 300, // change this

    auto: true,
    onInit: true,
  },
  tooltips: {
    intersect: false,
    mode: 'index',
    position: 'nearest',
  },
};


export const INITIAL_DATASETS_SETTINGS = {
  terminatedCalls: {
    label: 'Terminated calls',
    data: [],
    backgroundColor: 'transparent',
    borderColor: 'lightblue',
  },
  originatedCalls: {
    label: 'Originated calls', data: [], backgroundColor: 'transparent', borderColor: 'lightgreen',
  },
};
