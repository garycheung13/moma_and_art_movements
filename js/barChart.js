const barChart = (function () {
    let width = 900;
    let height = 500;
    let chartAreaHeight = height - 50;
    let chartAreaWidth = width - 230;
    const sample = {
        "classification": [{
                "count": 2439,
                "name": "Architecture"
            },
            {
                "count": 3342,
                "name": "Mies van der Rohe Archive"
            },
            {
                "count": 9049,
                "name": "Design"
            },
            {
                "count": 23783,
                "name": "Illustrated Book"
            },
            {
                "count": 24617,
                "name": "Print"
            },
            {
                "count": 9412,
                "name": "Drawing"
            },
            {
                "count": 1547,
                "name": "Film"
            },
            {
                "count": 910,
                "name": "Multiple"
            },
            {
                "count": 514,
                "name": "Periodical"
            },
            {
                "count": 4,
                "name": "Photography Research/Reference"
            },
            {
                "count": 25373,
                "name": "Photograph"
            },
            {
                "count": 2136,
                "name": "Painting"
            },
            {
                "count": 163,
                "name": "(not assigned)"
            },
            {
                "count": 175,
                "name": "Installation"
            },
            {
                "count": 1,
                "name": "Product Design"
            },
            {
                "count": 144,
                "name": "Media"
            },
            {
                "count": 1516,
                "name": "Sculpture"
            },
            {
                "count": 1,
                "name": "Software"
            },
            {
                "count": 20,
                "name": "Textile"
            },
            {
                "count": 1876,
                "name": "Video"
            },
            {
                "count": 236,
                "name": "Work on Paper"
            },
            {
                "count": 254,
                "name": "Audio"
            },
            {
                "count": 17,
                "name": "Performance"
            },
            {
                "count": 48,
                "name": "Ephemera"
            },
            {
                "count": 7,
                "name": "Collage"
            },
            {
                "count": 2,
                "name": "Film (object)"
            },
            {
                "count": 726,
                "name": "Frank Lloyd Wright Archive"
            },
            {
                "count": 1,
                "name": "Graphic Design"
            },
            {
                "count": 1,
                "name": "Furniture and Interiors"
            }
        ]
    }

    //sort the data
    sample['classification'].sort(function(x, y){
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
        });


    //making bars
    let bar = chart.selectAll("bar")
        .data(sample['classification'])
        .enter().append("rect")
        .attr("class", "bar")
        .attr("height", 10) //height of bar
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

    return {
        update: function (newData, eraName) {
            const barFill = {
                'impression': '#4188EC',
                'cubism':'#DD433D',
                'bauhaus':'#F5B240',
                'surrealism':'#009C60',
                'abstract':'#AC4BB5',
                'minimalism':'#FF6E4E',
                'pop':'#00ADBE',
                'photorealism':'#9E9C3F'
            }
            //sort the data
            newData.sort(function(x, y){
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
                .attr("height", 10) //height of bar
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
                });

            text.exit().transition().attr("opacity", 0).remove();
        }
    }
})();