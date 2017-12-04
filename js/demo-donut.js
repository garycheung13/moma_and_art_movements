const donutChart = (function () {
    let placeholderData = [{
        country: "USA",
        artworksAmount: 58396
    }, {
        country: "AUT",
        artworksAmount: 860
    }, {
        country: "USSR",
        artworksAmount: 1504
    }, {
        country: "FAKE",
        artworksAmount: 0
    }];

    //donut dimensions
    let width = 300;
    let height = 150;
    let radius = Math.min(width, height) / 2;

    const colors = d3.scale.category20();
    const arc = d3.svg.arc()
        .outerRadius(radius * 0.8)
        .innerRadius(radius * 0.5);

    const pie = d3.layout.pie()
        .value(function (d) {
            return d.artworksAmount;
        }).sort(null);

    let svg = d3.select("#donut")
        .append("g")
        .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let path = svg.selectAll('path')
        .data(pie(placeholderData))
        .enter()
        .append('path');

    path.transition()
        .attr('class', 'arc')
        .attr('fill', function (d, i) {
            return colors(i);
        })
        .attr('d', arc)
        .each(function (d) {
            this._current = d;
        });

    //handles donut size change transitions
    function arcTween(a) {
        var i = d3.interpolate(this._current, a);
        this._current = i(0);
        return function (t) {
            return arc(i(t));
        };
    }

    return {
        //call with data as param to update chart
        update: function (data) {
            path.data(pie(data));
            path.transition().duration(750).attrTween("d", arcTween);
        }
    }
})();

function updateDonutData() {
    const data = [{
        country: "USA",
        artworksAmount: 583
      }, {
        country: "AUT",
        artworksAmount: 8602
      }, {
        country: "USSR",
        artworksAmount: 15042
      }, {
        country: "FAKE",
        artworksAmount: 10231
      }];

      donutChart.update(data);
  }