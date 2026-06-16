const sprintData = [
  { day: 1, ideal: 80, actual: 80 },
  { day: 2, ideal: 70, actual: 76 },
  { day: 3, ideal: 60, actual: 68 },
  { day: 4, ideal: 50, actual: 58 },
  { day: 5, ideal: 40, actual: 47 },
  { day: 6, ideal: 30, actual: 39 },
  { day: 7, ideal: 20, actual: 24 },
  { day: 8, ideal: 10, actual: 12 },
  { day: 9, ideal: 0, actual: 6 },
];

const chart = {
  width: 760,
  height: 340,
  padding: {
    top: 28,
    right: 28,
    bottom: 58,
    left: 64,
  },
};

const maxEffort = 80;
const yTicks = [0, 20, 40, 60, 80];

function getPoint(day, effort) {
  const innerWidth = chart.width - chart.padding.left - chart.padding.right;
  const innerHeight = chart.height - chart.padding.top - chart.padding.bottom;
  const maxDay = sprintData[sprintData.length - 1].day;

  return {
    x: chart.padding.left + ((day - 1) / (maxDay - 1)) * innerWidth,
    y: chart.padding.top + (1 - effort / maxEffort) * innerHeight,
  };
}

function makePath(key) {
  return sprintData
    .map((item, index) => {
      const point = getPoint(item.day, item[key]);
      return `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`;
    })
    .join(" ");
}

function BurnDownChart() {
  const idealPath = makePath("ideal");
  const actualPath = makePath("actual");
  const xAxisY = chart.height - chart.padding.bottom;
  const yAxisX = chart.padding.left;

  return (
    <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">BurnDownChart</h2>
          <p className="mt-1 text-sm text-slate-500">Sprint progress visualization</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm text-slate-600">
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-8 bg-brand-600" />
            Ideal Burn Line
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="h-0.5 w-8 bg-rose-500" />
            Actual Burn Line
          </span>
        </div>
      </div>

      <div className="mt-5 overflow-x-auto">
        <svg
          className="min-w-[680px]"
          role="img"
          aria-label="Burn down chart showing sprint days on the x-axis and remaining effort on the y-axis"
          viewBox={`0 0 ${chart.width} ${chart.height}`}
        >
          <rect width={chart.width} height={chart.height} fill="#ffffff" />

          {yTicks.map((tick) => {
            const point = getPoint(1, tick);

            return (
              <g key={tick}>
                <line
                  x1={yAxisX}
                  x2={chart.width - chart.padding.right}
                  y1={point.y}
                  y2={point.y}
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
                <text
                  x={yAxisX - 14}
                  y={point.y + 4}
                  fill="#64748b"
                  fontSize="12"
                  textAnchor="end"
                >
                  {tick}
                </text>
              </g>
            );
          })}

          <line x1={yAxisX} x2={yAxisX} y1={chart.padding.top} y2={xAxisY} stroke="#94a3b8" strokeWidth="1.5" />
          <line x1={yAxisX} x2={chart.width - chart.padding.right} y1={xAxisY} y2={xAxisY} stroke="#94a3b8" strokeWidth="1.5" />

          {sprintData.map((item) => {
            const point = getPoint(item.day, 0);

            return (
              <g key={item.day}>
                <line x1={point.x} x2={point.x} y1={xAxisY} y2={xAxisY + 6} stroke="#94a3b8" />
                <text x={point.x} y={xAxisY + 24} fill="#64748b" fontSize="12" textAnchor="middle">
                  Day {item.day}
                </text>
              </g>
            );
          })}

          <path d={idealPath} fill="none" stroke="#0284c7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d={actualPath} fill="none" stroke="#f43f5e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {sprintData.map((item) => {
            const idealPoint = getPoint(item.day, item.ideal);
            const actualPoint = getPoint(item.day, item.actual);

            return (
              <g key={`points-${item.day}`}>
                <circle cx={idealPoint.x} cy={idealPoint.y} r="4" fill="#0284c7" />
                <circle cx={actualPoint.x} cy={actualPoint.y} r="4" fill="#f43f5e" />
              </g>
            );
          })}

          <text x={chart.width / 2} y={chart.height - 12} fill="#334155" fontSize="13" fontWeight="600" textAnchor="middle">
            Sprint Days
          </text>
          <text
            x="18"
            y={chart.height / 2}
            fill="#334155"
            fontSize="13"
            fontWeight="600"
            textAnchor="middle"
            transform={`rotate(-90 18 ${chart.height / 2})`}
          >
            Remaining Effort (Story Points / Hours)
          </text>
        </svg>
      </div>
    </article>
  );
}

export default BurnDownChart;
