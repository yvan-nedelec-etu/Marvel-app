import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const RadarChart = ({ char1, char2 }) => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (char1 && char2 && char1.capacities && char2.capacities && d3Container.current) {
      // Utiliser les clés de l'objet 'capacities'
      const stats = ['force', 'intelligence', 'durability', 'energy', 'speed'];
      
      const data = [
        { 
          name: char1.name, 
          color: '#8884d8', 
          // Lire depuis char1.capacities
          stats: stats.map(stat => ({ axis: stat, value: char1.capacities[stat] || 0 })) 
        },
        { 
          name: char2.name, 
          color: '#82ca9d', 
          // Lire depuis char2.capacities
          stats: stats.map(stat => ({ axis: stat, value: char2.capacities[stat] || 0 })) 
        }
      ];

      const width = 500;
      const height = 500;
      const margin = { top: 60, right: 60, bottom: 60, left: 60 };
      const radius = Math.min(width, height) / 2 - margin.top;

      // Définir une échelle de 0 à 7 (valeur max typique pour les stats Marvel)
      const rScale = d3.scaleLinear().range([0, radius]).domain([0, 7]);
      const angleSlice = Math.PI * 2 / stats.length;

      // Vider le SVG précédent pour éviter les superpositions
      d3.select(d3Container.current).selectAll("*").remove();

      const svg = d3.select(d3Container.current)
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      // Dessiner la grille
      const grid = svg.append("g").attr("class", "grid");
      grid.selectAll(".grid-level")
        .data(d3.range(1, 6).reverse())
        .enter().append("circle")
        .attr("class", "grid-level")
        .attr("r", d => radius / 5 * d)
        .style("fill", "#CDCDCD")
        .style("stroke", "#CDCDCD")
        .style("fill-opacity", 0.1);

      // Dessiner les axes
      const axis = grid.selectAll(".axis")
        .data(stats)
        .enter().append("g")
        .attr("class", "axis");

      axis.append("line")
        .attr("x1", 0).attr("y1", 0)
        .attr("x2", (d, i) => rScale(7) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y2", (d, i) => rScale(7) * Math.sin(angleSlice * i - Math.PI / 2))
        .attr("class", "line")
        .style("stroke", "grey").style("stroke-width", "1px");

      axis.append("text")
        .attr("class", "legend")
        .style("font-size", "11px")
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("x", (d, i) => rScale(8) * Math.cos(angleSlice * i - Math.PI / 2))
        .attr("y", (d, i) => rScale(8) * Math.sin(angleSlice * i - Math.PI / 2))
        .text(d => d.charAt(0).toUpperCase() + d.slice(1));

      // Dessiner les polygones des personnages
      const radarLine = d3.lineRadial()
        .curve(d3.curveLinearClosed)
        .radius(d => rScale(d.value))
        .angle((d, i) => i * angleSlice);

      svg.selectAll(".radar-area")
        .data(data)
        .enter().append("path")
        .attr("class", "radar-area")
        .attr("d", d => radarLine(d.stats))
        .style("fill", d => d.color)
        .style("fill-opacity", 0.5)
        .style("stroke", d => d.color)
        .style("stroke-width", 2);
        
      // Légende
      const legend = svg.append("g")
        .attr("class", "legend-container")
        .selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", (d, i) => `translate(-50, ${height/2 - 20 - i * 20})`);

      legend.append("rect")
        .attr("width", 18)
        .attr("height", 18)
        .style("fill", d => d.color);

      legend.append("text")
        .attr("x", 24)
        .attr("y", 9)
        .attr("dy", "0.35em")
        .text(d => d.name);
    }
  }, [char1, char2]);

  return <svg ref={d3Container}></svg>;
};

export default RadarChart;