const barChart = (function () {
    let width = 900;
    let height = 900;
    let chartAreaHeight = height - 50;
    let chartAreaWidth = width - 230;
    const sample = {
        "classification": [{
                "count": 0,
                "name": "Architecture"
            },
            {
                "count": 0,
                "name": "Mies van der Rohe Archive"
            },
            {
                "count": 0,
                "name": "Design"
            },
            {
                "count": 0,
                "name": "Illustrated Book"
            },
            {
                "count": 0,
                "name": "Print"
            },
            {
                "count": 0,
                "name": "Drawing"
            },
            {
                "count": 0,
                "name": "Film"
            },
            {
                "count": 0,
                "name": "Multiple"
            },
            {
                "count": 0,
                "name": "Periodical"
            },
            {
                "count": 0,
                "name": "Photography Research/Reference"
            },
            {
                "count": 0,
                "name": "Photograph"
            },
            {
                "count": 0,
                "name": "Painting"
            },
            {
                "count": 0,
                "name": "(not assigned)"
            },
            {
                "count": 0,
                "name": "Installation"
            },
            {
                "count": 0,
                "name": "Product Design"
            },
            {
                "count": 0,
                "name": "Media"
            },
            {
                "count": 0,
                "name": "Sculpture"
            },
            {
                "count": 0,
                "name": "Software"
            },
            {
                "count": 0,
                "name": "Textile"
            },
            {
                "count": 0,
                "name": "Video"
            },
            {
                "count": 0,
                "name": "Work on Paper"
            },
            {
                "count": 0,
                "name": "Audio"
            },
            {
                "count": 0,
                "name": "Performance"
            },
            {
                "count": 0,
                "name": "Ephemera"
            },
            {
                "count": 0,
                "name": "Collage"
            },
            {
                "count": 0,
                "name": "Film (object)"
            },
            {
                "count": 0,
                "name": "Frank Lloyd Wright Archive"
            },
            {
                "count": 0,
                "name": "Graphic Design"
            },
            {
                "count": 0,
                "name": "Furniture and Interiors"
            }
        ]
    }

    //sort the data
    sample['classification'].sort(function (x, y) {
        return d3.descending(x['count'], y['count']);
    })

    //create the chart area
    let chart = d3.select('#bar-chart')
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("width", chartAreaWidth)
        .attr("height", chartAreaHeight)
        .attr("transform", "translate(" + (width - chartAreaWidth) + ",50)");

    //create the scale functions
    let max = d3.max(sample['classification'], function (d) {
        return d.count;
    })

    let xScale = d3.scale.linear()
        .domain([0, max])
        .range([0, chartAreaWidth]);

    let yScale = d3.scale.linear()
        .domain([0, sample['classification'].length])
        .range([0, chartAreaHeight]);


    //add text
    let text = d3.select('#bar-chart')
        .append("g")
        .attr("class", "names")
        .attr("transform", "translate(0, 50)")
        .selectAll('text')
        .data(sample['classification'])
        .enter().append("text")
        .attr("class", "text")
        .attr("x", 0)
        .attr("y", function (d, i) {
            return (i * chartAreaHeight / sample['classification'].length) + 10;
        })
        .text(function (d) {
            return d.name;
        })
        .style("display", "none");


    //making bars
    let bar = chart.selectAll("bar")
        .data(sample['classification'])
        .enter().append("rect")
        .attr("class", "bar")
        .attr("height", 50) //height of bar
        .attr("width", function (d) {
            return xScale(d.count);
        })
        .attr("transform", function (d, i) {
            return "translate(0," + i * (chartAreaHeight / sample['classification'].length) + ")";
        });

    //create axis
    let xAxis = d3.svg.axis();
    xAxis.orient('top')
        .ticks(10)
        .scale(xScale);

    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0,-10)")
        .call(xAxis);

    //tooltip
    var tooltip = d3.select("#bar-chart")
        .append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 80)
        .attr("height", 25)
        .attr("fill", "grey")
        .style("opacity", 1);

    tooltip.append("text")
        .attr("x", 15)
        .attr("dy", "1.2em")
        .style("text-anchor", "start")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");

    return {
        update: function (newData, eraName) {
            const barFill = {
                'impression': '#4188EC',
                'cubism': '#DD433D',
                'bauhaus': '#F5B240',
                'surrealism': '#009C60',
                'abstract': '#AC4BB5',
                'minimalism': '#FF6E4E',
                'pop': '#00ADBE',
                'photorealism': '#9E9C3F'
            }
            //sort the data
            newData.sort(function (x, y) {
                return d3.descending(x['count'], y['count']);
            });
            // console.log(newData);
            xScale.domain([0, d3.max(newData, function (d) {
                return d.count;
            })])
            //transition axis
            chart.select('.x-axis')
                .transition()
                .call(xAxis)
                .attr("transform", "translate(0,-10)");
            // .attr("transform", "translate(0," + (newData.length * 16) + ")");

            //transition bars
            let bars = chart.selectAll('.bar')
                .data(newData);

            bars.enter()
                .append("rect")
                .attr("class", "bar");

            bars.transition()
                .attr("height", 20) //height of bar
                .style("fill", barFill[eraName])
                .attr("transform", function (d, i) {
                    return "translate(0," + i * (chartAreaHeight / sample['classification'].length) + ")";
                })
                .attr("width", function (d) {
                    return xScale(d.count);
                });
            //remove the bars
            bars.exit().transition().attr("width", 0).remove();

            //transition text
            let text = d3.select('.names').selectAll('text')
                .data(newData);

            text.enter()
                .append("text");

            text.transition()
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return (i * chartAreaHeight / sample['classification'].length) + 10;
                })
                .text(function (d) {
                    return d.name;
                })
                .style("display", "block");

            text.exit().transition().attr("opacity", 0).remove();

            d3.selectAll(".bar")
                .on("mouseover", function () {
                    d3.selectAll(".bar")
                        .attr("opacity", "0.4");
                    d3.select(this)
                        .attr("opacity", "1");
                    tooltip.style("display", null);
                })
                .on("mouseout", function () {
                    tooltip.style("display", "none");
                    d3.selectAll(".bar")
                        .attr("opacity", "1")
                })
                .on("mousemove", function (d) {
                    let currentBar = d3.select(this).datum();
                    tooltip.attr("transform", "translate(" + (d3.event.offsetX + 20) + "," + d3.event.offsetY + ")");
                    tooltip.select("text")
                        .text(currentBar.count)
                        .style("fill", "white")
                        .style("font-size", "15");
                });
        }
    }
})();