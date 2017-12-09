const barChart = (function () {
    let width = 900;
    let height = 500;
    let chartAreaHeight = height - 50;
    let chartAreaWidth = width - 100;
    const sample = {
        "classification": [{
                "Name": "Architecture",
                "count": 315
            },
            {
                "Name": "Painting",
                "count": 30
            },
            {
                "Name": "Drawing",
                "count": 303
            }
        ]
    }

    //create the chart area
    let chart = d3.select('#bar-chart')
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("width", chartAreaWidth)
        .attr("height", chartAreaHeight)
        .attr("transform", "translate(" + (width - chartAreaWidth) + ",0)");

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
        .selectAll('text')
        .data(sample['classification'])
        .enter().append("text")
        .attr("class", "text")
        .attr("x", 0)
        .attr("y", function (d, i) {
            return (i * chartAreaHeight / sample['classification'].length) + 10;
        })
        .text(function (d) {
            return d.Name;
        });


    //making bars
    let bar = chart.selectAll("bar")
        .data(sample['classification'])
        .enter().append("g")
        .attr("class", "bar")
        .attr("transform", function (d, i) {
            return "translate(0," + i * (chartAreaHeight / sample['classification'].length) + ")";
        });

    bar.append("rect")
        .attr("height", 10) //height of bar
        .attr("width", function (d) {
            return xScale(d.count);
        });

    //create axis
    let xAxis = d3.svg.axis();
    xAxis.orient('bottom')
        .ticks(10)
        .scale(xScale);

    chart.append("g")
        .attr("class", "x-axis")
        .attr("transform", "translate(0,450)")
        .call(xAxis);

    return {
        update: function () {
            const exampleData = [{
                    "Name": "Architecture",
                    "count": 15
                },
                {
                    "Name": "Painting",
                    "count": 250
                },
                {
                    "Name": "Drawing",
                    "count": 500
                }
            ];

            xScale.domain([0, d3.max(exampleData, function(d){
                return d.count;
            })])
            //transition axis
            chart.select('.x-axis').transition().call(xAxis);

            //transition bars
            chart.selectAll('rect')
                .data(exampleData)
                .transition()
                .attr("width", function(d){
                    return xScale(d.count);
                })
        }
    }
})();