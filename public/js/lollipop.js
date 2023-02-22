$(function () {
   
    var lollipopPlot = function (selection, props) {
        var svg = props.svg;
        var title = props.title;
        var data = props.data;
        var x = props.x;
        var y = props.y;
        var xAxis = props.xAxis;
        var yAxis = props.yAxis;
        var test = props.test;
    
        //red color
        //["#fff7ec","#fff7eb","#fff6ea","#fff6e9","#fff5e7","#fff5e6","#fff4e5","#fff4e4","#fff3e3","#fff3e2","#fff2e1","#fff2e0","#fff1de","#fff1dd","#fff0dc","#fff0db","#feefda","#feefd9","#feeed7","#feeed6","#feedd5","#feedd4","#feecd3","#feecd2","#feebd0","#feebcf","#feeace","#feeacd","#fee9cc","#fee9ca","#fee8c9","#fee8c8","#fee7c7","#fee7c6","#fee6c4","#fee5c3","#fee5c2","#fee4c1","#fee4bf","#fee3be","#fee3bd","#fee2bc","#fee1ba","#fee1b9","#fee0b8","#fee0b7","#fedfb5","#fedeb4","#fedeb3","#fdddb2","#fddcb1","#fddcaf","#fddbae","#fddaad","#fddaac","#fdd9ab","#fdd8a9","#fdd8a8","#fdd7a7","#fdd6a6","#fdd6a5","#fdd5a4","#fdd4a3","#fdd4a1","#fdd3a0","#fdd29f","#fdd29e","#fdd19d","#fdd09c","#fdcf9b","#fdcf9a","#fdce99","#fdcd98","#fdcc97","#fdcc96","#fdcb95","#fdca94","#fdc994","#fdc893","#fdc892","#fdc791","#fdc690","#fdc58f","#fdc48e","#fdc38d","#fdc28c","#fdc18b","#fdc08a","#fdbf89","#fdbe88","#fdbd87","#fdbc86","#fdbb85","#fdba84","#fdb983","#fdb882","#fdb781","#fdb680","#fdb57f","#fdb47d","#fdb27c","#fdb17b","#fdb07a","#fdaf79","#fdae78","#fdac76","#fdab75","#fdaa74","#fca873","#fca772","#fca671","#fca46f","#fca36e","#fca26d","#fca06c","#fc9f6b","#fc9e6a","#fc9c68","#fc9b67","#fb9a66","#fb9865","#fb9764","#fb9563","#fb9462","#fb9361","#fb9160","#fa905f","#fa8f5e","#fa8d5d","#fa8c5c","#f98b5b","#f9895a","#f98859","#f98759","#f88558","#f88457","#f88356","#f78155","#f78055","#f77f54","#f67d53","#f67c52","#f67b52","#f57951","#f57850","#f4774f","#f4754f","#f4744e","#f3734d","#f3714c","#f2704c","#f26f4b","#f16d4a","#f16c49","#f06b49","#f06948","#ef6847","#ef6646","#ee6545","#ed6344","#ed6243","#ec6042","#ec5f42","#eb5d41","#ea5c40","#ea5a3f","#e9593e","#e8573c","#e8563b","#e7543a","#e65339","#e65138","#e55037","#e44e36","#e44c35","#e34b34","#e24932","#e14831","#e04630","#e0442f","#df432e","#de412d","#dd402b","#dc3e2a","#dc3c29","#db3b28","#da3927","#d93826","#d83624","#d73423","#d63322","#d53121","#d43020","#d32e1f","#d22c1e","#d12b1d","#d0291b","#cf281a","#ce2619","#cd2518","#cc2317","#cb2216","#ca2015","#c91f14","#c81d13","#c71c12","#c61b11","#c51911","#c31810","#c2170f","#c1150e","#c0140d","#bf130c","#be120c","#bc110b","#bb100a","#ba0e09","#b80d09","#b70c08","#b60b07","#b50b07","#b30a06","#b20906","#b10805","#af0705","#ae0704","#ac0604","#ab0504","#a90503","#a80403","#a60402","#a50302","#a40302","#a20302","#a00201","#9f0201","#9d0201","#9c0101","#9a0101","#990101","#970101","#960100","#940100","#920000","#910000","#8f0000","#8e0000","#8c0000","#8a0000",
        //"#890000","#870000","#860000","#840000","#820000","#810000","#7f0000"]
        svg.select('.title').remove();
        var color = d3
          .scaleSequential(d3.interpolateYlOrRd)
          .domain([0, d3.max(data, function (d) { return d[test] })])
          .interpolator(d3.interpolate("#fff5e6", "#820000"));
    
    
        x.domain(data.map(function (d) { return d.match_number; }));
        xAxis.transition().duration(1000).call(d3.axisBottom(x));
    
        y.domain([0, d3.max(data, function (d) { return +d[test] })]);
    
    
    
        if (test === "damage_taken") {
          yAxis.transition().duration(1000).call(d3.axisLeft(y));
        } else {
    
          yAxis.transition().duration(1000)
            .call(d3.axisLeft(y)
              .ticks(d3.max(data, function (d) {
                return d[test];
              }))
    
    
            );
    
        }
    
        var tooltip = d3
          .select('body')
          .append('div')
          .style('position', 'absolute')
          .style('z-index', '10')
          .style('visibility', 'hidden')
          .style('padding', '8px')
          .style('border-radius', '4px')
          .style('color', '#860000');
    
    
    
    
        var j = svg.selectAll(".myLine")
          .data(data);
        // update lines
    
        console.log(data[test]);
        j
          .enter()
          .append("line")
          .attr("class", "myLine")
          .merge(j)
          .transition()
          .duration(1000)
          .attr("x1", function (d) { console.log(x(d.match_number)); return x(d.match_number); })
          .attr("x2", function (d) { return x(d.match_number); })
          .attr("y1", y(0))
          .attr("y2", function (d) { return y(d[test]); })
          .attr("stroke", "grey");
    
        // variable u: map data to existing circle
        var u = svg.selectAll("circle")
          .data(data);
        // update bars
    
        
        u
            .enter()
            .append("circle")
            .merge(u)
            .transition()
            .duration(1000)
            .attr("cx", function (d) { return x(d.match_number); })
            .attr("cy", function (d) { return y(d[test]); })
            .attr("r", 8)
            .attr("fill", function (d) {  
               console.log('bbb');
              return color(d[test]); })
      
        const s = u;
        s
          .on('mouseover', function (d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('fill', function (d) { return color(d[test]); })
              .attr('opacity', 0.6);
        
            tooltip
              .text(
                
                ("Agent: " + (d.agent))
        
              )
              .style('visibility', 'visible');
    
              console.log("aaa");
         
          })
          .on('mousemove', function (event, datum) {
            //Be careful to use event.pageY in different D3 version
            tooltip
              .style('top', d3.event.pageY - 50 + 'px')
              .style('left', d3.event.pageX - 50 + 'px');
          })
          .on('mouseout', function (d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('opacity', 1);
        
            tooltip.style('visibility', 'hidden');
          });
    
         

    
        svg.append('text')
          .attr('class', 'title')
          .attr('y', -18)
          .attr('x', -20)
          .text(title);
    

      };
    
      //pie chart
    
      var svg = d3.select('svg');
      var width = +svg.attr('width');
      var height = +svg.attr('height');
    
      svg
        .attr('width', width)
        .attr('height', height)
        .append('rect')
        .attr('width', width)
        .attr('height', height)
        .attr('class', 'back_svg')
        .attr('fill', "#F4F6F6")
        .attr('rx', 40);
    
    
      var render = function (data) {

        console.log(data);
    
        var margin = { top: 60, right: 40, bottom: 88, left: 105 };
        var innerWidth = width - margin.left - margin.right;
        var innerHeight = height - margin.top - margin.bottom;
    
        var g = svg.append('g')
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
        var x = d3.scaleBand()
          .range([0, innerWidth - 100])
          .padding(1);
    
    
        var xAxis = g.append("g")
          .attr("transform", "translate(0," + innerHeight + ")");
    
    
        // Initialize the Y axis
        var y = d3.scaleLinear()
          .range([innerHeight, 0]);
    
        var yAxis = g.append("g")
          .attr("class", "myYaxis");
    
    
          g
          .append('g')
          .append('circle')
          .attr('cy', 85)
          .attr('cx', 443)
    
        g.call(lollipopPlot, {
          svg: g,
          title: 'Damage Taken',
          data: data,
          x: x,
          y: y,
          xAxis: xAxis,
          yAxis: yAxis,
          test: "damage_taken"
    
        });
    
        var eg = svg.append('g')
          .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");
    
        eg
          .append('g')
          .append('circle')
          .attr('cy', 85)
          .attr('cx', 443)
          .attr('r', 6)
          .style('fill', 'black')
          .attr("stroke", "#b9becf")
          .attr('opacity', 0.2);
    
        g
          .append('g')
          .append('circle')
          .attr('cy', 85)
          .attr('cx', 443)
          .attr('r', 8)
          .style('fill', 'white')
          .attr("stroke", "#890000")
          .on('mouseover', function (d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('fill', '#fff5e6')
              .attr('opacity', 0.6);
          })
          .on('mouseout', function (d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('opacity', 1);
          })
          .on('click', function () {
    
            // refresh(select);
            g.selectAll('circle.gatheredButton').remove();
    
            g
              .append('g')
              .append('circle')
              .attr('cy', 85)
              .attr('cx', 443)
              .attr('class', 'usedButton')
              .attr('r', 6)
              .style('fill', 'black')
              .attr("stroke", "#b9becf")
              .attr('opacity', 0.2);
    
            g.call(lollipopPlot, {
              svg: g,
              title: 'Damage Taken',
              data: data,
              x: x,
              y: y,
              xAxis: xAxis,
              yAxis: yAxis,
              test: "damage_taken"
    
            });
    
          });
    
        g
          .append('g')
          .append('circle')
          .attr('cy', 110)
          .attr('cx', 443)
          .attr('r', 8)
          .style('fill', 'white')
          .attr("stroke", "#890000")
          .on('mouseover', function (d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('fill', '#fff5e6')
              .attr('opacity', 0.6);
          })
          .on('mouseout', function (d, i) {
            d3.select(this).transition()
              .duration('50')
              .attr('opacity', 1);
          })
          .on('click', function () {
    
            // refresh(select);
            g.selectAll('circle.usedButton').remove();
            eg.selectAll('circle').remove();
    
            g
              .append('g')
              .append('circle')
              .attr('cy', 110)
              .attr('cx', 443)
              .attr('class', 'gatheredButton')
              .attr('r', 6)
              .style('fill', 'black')
              .attr("stroke", "#b9becf")
              .attr('opacity', 0.2);
    
            g.call(lollipopPlot, {
              svg: g,
              title: 'First Blood Times',
              data: data,
              x: x,
              y: y,
              xAxis: xAxis,
              yAxis: yAxis,
              test: "first_blood_times"
            });
    
          });
    
        svg
          .append('text')
          .attr('y', 148)
          .attr('x', 562)
          .attr('class', 'text_anote')
          .text("Damage Taken");
    
        svg
          .append('text')
          .attr('y', 173)
          .attr('x', 562)
          .attr('class', 'text_anote')
          .text("First Blood Times");
    
        svg
          .append('text')
          .attr('y', 555)
          .attr('x', 495)
          .attr('class', 'textAnno')
          .text("Match");
    
      };
    

   

    $.ajax({
        type: 'POST',
        url: '/data/write_2',
        dataType: 'json',  
        success: function (data) {
            if (data.status == 1) {

                render(data.info);

                //window.location.reload();  //refresd
            } else if (data.status == 2) {
                alert(data.info);
                //window.location.href = '/login';
            } else {
                alert(data.info);
            }
        },
        error: function () {
            alert('failed');

            
        }
    });
    return false;

});