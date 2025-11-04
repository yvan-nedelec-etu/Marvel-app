import { useEffect } from "react";
import * as d3 from "d3";
import { prepareData } from './chart-utils';

// Define the diameter of the pie
const diameter = 100;

// Define the margin
const margin = {
    top: 10, right: 10, bottom: 10, left: 10,
};

// Define the width and height using the margin conventions
const width = 2 * diameter + margin.left + margin.right;
const height = 2 * diameter + margin.top + margin.bottom;

// Define the radius
const radius = Math.min(width, height) / 2;

const drawChart = (data) => {
    // Remove the old svg if it exists (in development)
    d3.select('#pie-container')
        .select('svg')
        .remove();

    // Si pas de données, ne pas dessiner
    if (!data || data.length === 0) {
        return;
    }

    // Create the color scale
    const color = d3.scaleOrdinal()
        .domain(data.map(d => d.name))
        .range(d3.quantize(t => d3.interpolateSpectral(t * 0.8 + 0.1), data.length).reverse());

    // Create the pie chart
    // Create the arc
    const arc = d3.arc()
        .innerRadius(radius * 0.67)
        .outerRadius(radius - 1);

    // Create the pie
    const pie = d3.pie()
        .padAngle(1 / radius)
        .sort(null)
        .value(d => d.value);

    // Create the svg, with the right dimensions
    const svg = d3.select('#pie-container')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [-width / 2, -height / 2, width, height])
        .attr('style', 'max-width: 100%; height: auto;');

    // draw the donut
    svg.append('g')
        .selectAll()
        .data(pie(data))
        .join('path')
            .attr('fill', d => color(d.data.name))
            .attr('d', arc)
            .attr('stroke', 'white')
            .attr('stroke-width', 2)
        .append('title')
            .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    // add labels over the donut
    svg.append('g')
        .attr('font-family', 'sans-serif')
        .attr('font-size', 12)
        .attr('text-anchor', 'middle')
        .selectAll()
        .data(pie(data))
        .join('text')
            .attr('transform', d => `translate(${arc.centroid(d)})`)
            .call(text => text.append('tspan')
                .attr('y', '-0.4em')
                .attr('font-weight', 'bold')
                .attr('fill', 'white')
                .text(d => d.data.name))
            .call(text => text.filter(d => (d.endAngle - d.startAngle) > 0.25).append('tspan')
                .attr('x', 0)
                .attr('y', '0.7em')
                .attr('fill', 'white')
                .attr('fill-opacity', 0.8)
                .text(d => d.data.value.toLocaleString('en-US')));
};

export default function D3PieChart({
    data,
}) {
    // useEffect is a hook that will run the code inside it only once when data is loaded
    useEffect(() => {
        // transform data
        const preparedData = prepareData(data);

        // draw the chart
        drawChart(preparedData);
    }, [data]);

    return (
        // Return the div that will contain the chart
        <div id="pie-container" />
    );
}