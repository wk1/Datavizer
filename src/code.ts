figma.showUI(__html__, {
  height: 820,
  width: 760,
});

figma.ui.postMessage({
  type: "init",
  selectedDimensions: figma.currentPage.selection.map((node) => {
    const { x, y, width, height } = node;
    return { x, y, width, height };
  }),
});

figma.ui.onmessage = ({ type, data, chartConfig, fields, dimensions }) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  if (type === "draw-data") {
    const selectedElement = figma.currentPage.selection[0];
    const position = selectedElement
      ? [selectedElement.x, selectedElement.y]
      : [
          figma.viewport.center.x - chartConfig.width / 2,
          figma.viewport.center.y - chartConfig.height / 2,
        ];

    let nodes = [];
    if (chartConfig.type == "bars")
      drawBars({
        chartConfig,
        data,
        fields,
        dimensions,
        nodes,
        position,
      });
    if (chartConfig.type == "scatter")
      drawScatter({
        chartConfig,
        data,
        fields,
        dimensions,
        nodes,
        position,
      });
    if (chartConfig.type == "rectScatter")
      drawRectScatter({
        chartConfig,
        data,
        fields,
        dimensions,
        nodes,
        position,
      });
    if (chartConfig.type == "line")
      drawLine({
        chartConfig,
        data,
        fields,
        dimensions,
        nodes,
        position,
      });
    const groupedNodes = figma.group(nodes, figma.currentPage);
    figma.currentPage.selection = nodes;
    // figma.viewport.scrollAndZoomIntoView(nodes);
  }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};

const darkColor = {
  r: 44 / 255,
  g: 62 / 255,
  b: 80 / 255,
};
const darkColorPaint: Paint[] = [
  {
    type: "SOLID",
    color: darkColor,
  },
];
const drawBars = ({
  chartConfig,
  data,
  fields,
  dimensions,
  nodes,
  position = [],
}) => {
  if (!fields.padding) fields.padding = 0;
  const barWidth = Math.max(
    chartConfig.width / data.length - fields.padding,
    3
  );
  const x = position[0];
  const y = position[1] + chartConfig.height;

  data.forEach((d: dataPoint, i: number) => {
    const barHeight = d.yScaled;
    if (!barHeight || barHeight < 0.01) return;

    const rect = figma.createRectangle();
    rect.x = x + i * (barWidth + fields.padding);
    rect.y = y + -barHeight;
    rect.resize(barWidth, barHeight);
    // rect.fills = darkColorPaint
    rect.fills = darkColorPaint;
    if (d.color) {
      rect.fills = [
        {
          type: "SOLID",
          color: {
            r: getRGBProp(d.colorScaled, "r"),
            g: getRGBProp(d.colorScaled, "g"),
            b: getRGBProp(d.colorScaled, "b"),
          },
        },
      ];
    }
    figma.currentPage.appendChild(rect);

    nodes.push(rect);
  });
};

const drawScatter = ({
  chartConfig,
  data,
  fields,
  dimensions,
  nodes,
  position = [],
}) => {
  data.forEach((d: dataPoint, i: number) => {
    const x = position[0];
    const y = position[1];
    const ellipse = figma.createEllipse();
    ellipse.resize(fields.radius, fields.radius);
    ellipse.x = x + d.xScaled;
    ellipse.y = y + d.yScaled;
    // ellipse.fills = d.color ? [{type: 'SOLID', color: {r: 1, g: 1, b: 1}}]
    ellipse.fills = darkColorPaint;
    if (d.color) {
      ellipse.fills = [
        {
          type: "SOLID",
          color: {
            r: getRGBProp(d.colorScaled, "r"),
            g: getRGBProp(d.colorScaled, "g"),
            b: getRGBProp(d.colorScaled, "b"),
          },
        },
      ];
    }
    figma.currentPage.appendChild(ellipse);

    nodes.push(ellipse);
  });
};

const drawRectScatter = ({
  chartConfig,
  data,
  fields,
  dimensions,
  nodes,
  position = [],
}) => {
  data.forEach((d: dataPoint, i: number) => {
    const x = position[0];
    const y = position[1];
    const rect = figma.createRectangle();
    rect.resize(d.width, fields.rectHeight);
    rect.cornerRadius = fields.cornerRadius;
    rect.x = x + d.xScaled;
    rect.y = y + d.yScaled;
    rect.fills = darkColorPaint;
    if (d.color) {
      rect.fills = [
        {
          type: "SOLID",
          color: {
            r: getRGBProp(d.colorScaled, "r"),
            g: getRGBProp(d.colorScaled, "g"),
            b: getRGBProp(d.colorScaled, "b"),
          },
        },
      ];
    }
    figma.currentPage.appendChild(rect);

    nodes.push(rect);
  });
};

const getRGBProp = (color: string, property: string) => {
  if (!color) return 255;
  const index = ["r", "g", "b"].indexOf(property);
  return +color.match(/\d+/g)[index] / 255;
};

const drawLine = ({
  chartConfig,
  data,
  fields,
  dimensions,
  nodes,
  position = [],
}) => {
  const x = position[0];
  const y = position[1];

  const area = figma.createVector();
  let areaPath = chartConfig.areaPath
    .replace(/,/g, " ")
    .replace(/([A-Z])/g, " $1 ");
  areaPath = areaPath.slice(1, areaPath.length - 1);
  area.vectorPaths = [
    {
      windingRule: "NONZERO",
      data: areaPath,
    },
  ];
  // area.fills = [{type: "SOLID", color: {r: 1, g: 1, b: 1}, opacity: 0.3}]
  area.fills = [
    {
      type: "GRADIENT_LINEAR",
      gradientStops: [
        {
          position: 0,
          color: { ...darkColor, a: 0.4 },
        },
        {
          position: 1,
          color: { ...darkColor, a: 0 },
        },
      ],
      gradientTransform: [
        [0, 1, 0],
        [0, 0, 0],
      ],
    },
  ];
  area.strokes = darkColorPaint;
  area.strokeJoin = "ROUND";
  area.strokeWeight = 0;
  figma.currentPage.appendChild(area);

  const line = figma.createVector();
  let linePath = chartConfig.linePath
    .replace(/,/g, " ")
    .replace(/([A-Z])/g, " $1 ");
  linePath = linePath.slice(1, linePath.length - 1);
  line.vectorPaths = [
    {
      windingRule: "NONE",
      data: linePath,
    },
  ];
  line.strokes = darkColorPaint;
  line.strokeJoin = "ROUND";
  line.strokeCap = "ROUND";
  line.strokeWeight = fields.lineWidth;
  figma.currentPage.appendChild(line);

  line.x = x;
  line.y = y;
  area.x = x;
  area.y = y;

  nodes.push(line);
  nodes.push(area);
};

interface dataPoint {
  readonly y: number;
  readonly yScaled: number;
  readonly x: number;
  readonly xScaled: number;
  readonly color: number;
  readonly colorScaled: string;
  readonly width: number;
}
