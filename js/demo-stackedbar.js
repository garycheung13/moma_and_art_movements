const stackedBar = (function () {
    const placeholderData = [{
        country: "USA",
        artworksAmount: 53896
    },{
        country: "AUT",
        artworksAmount: 860
    }, {
        country: "USSR",
        artworksAmount: 1504
    }]

    const barElement = d3.select("#stacked-bar");

    barElement.attr("width", 250)
        .attr("height", 100);
})();