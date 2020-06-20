// @TODO: YOUR CODE HERE!
let csvDataRaw

let dataInicial = {
    abbr: [],
    age: [],
    ageMoe: [],
    healthcare: [],
    healthcareHigh: [],
    healthcareLow: [],
    id: [],
    income: [],
    incomeMoe: [],
    obesity: [],
    obesityHigh: [],
    obesityLow: [],
    poverty: [],
    povertyMoe: [],
    smokes: [],
    smokesHigh: [],
    smokesLow: [],
    state: [],
}

let variable1="age"
let variable2="obesity"

d3.select("#producto1").on("change", function (d) {
    variable1 = d3.select(this).property("value")
    console.log(variable1)
    graph(variable1,variable2)

  })

  d3.select("#producto2").on("change", function (d) {
    variable2 = d3.select(this).property("value")
    console.log(variable2)
    graph(variable1,variable2)

  })

sacaDatos();


graph(variable1,variable2)





async function sacaDatos() {
    await d3.csv("assets/data/data.csv").then(function (data) {
        csvDataRaw = data
        // console.log(data);
    });
    llenaDatos()

}

async function llenaDatos() {
    await csvDataRaw.map(function (dato) {
        dataInicial.abbr.push(dato.abbr)
        dataInicial.age.push(dato.age)
        dataInicial.ageMoe.push(dato.ageMoe)
        dataInicial.healthcare.push(dato.healthcare)
        dataInicial.healthcareHigh.push(dato.healthcareHigh)
        dataInicial.healthcareLow.push(dato.healthcareLow)
        dataInicial.id.push(dato.id)
        dataInicial.income.push(dato.income)
        dataInicial.incomeMoe.push(dato.incomeMoe)
        dataInicial.obesity.push(dato.obesity)
        dataInicial.obesityHigh.push(dato.obesityHigh)
        dataInicial.obesityLow.push(dato.obesityLow)
        dataInicial.poverty.push(dato.poverty)
        dataInicial.povertyMoe.push(dato.povertyMoe)
        dataInicial.smokes.push(dato.smokes)
        dataInicial.smokesHigh.push(dato.smokesHigh)
        dataInicial.smokesLow.push(dato.smokesLow)
        dataInicial.state.push(dato.state)

    })
    // console.log(data)
    graph(variable1,variable2);
}

function graph(variable1,variable2) {
    console.log(dataInicial)
    d3.select("#scatter").html("")
    console.log(variable1)
    console.log(variable2)

    // console.log(dataInicial )

    data1 = dataInicial[variable1]
    data2 = dataInicial[variable2]
    // data=[]
    dataGrafica = []
    data1.map(function (dato, key) {
        let dataPush = { dato1: data1[key], dato2: data2[key] }
        dataGrafica.push(dataPush)
    })
    console.log(dataGrafica)

    var margin = {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50
    }
    width = 700 - margin.left - margin.right;
    height = 500 - margin.top - margin.bottom;


    num=0
    // format the data
    dataGrafica.forEach(function (d) {
        // parseDate = d3.timeParse("%Y");
        d.dato1 = +d.dato1;
        d.dato2 = +d.dato2;
    });


    var x = d3.scaleLinear().range([0, width]);
    var y = d3.scaleLinear().range([height, 0]);

    // Scale the range of the data
    x.domain([d3.min(dataGrafica, function (d) {
        return d.dato1-d.dato1*.1;
    }), d3.max(dataGrafica, function (d) {
        return d.dato1+d.dato1*.1;
    })]);
    y.domain([d3.min(dataGrafica, function (d) {
        return d.dato2-d.dato2*.1;
    }), d3.max(dataGrafica, function (d) {
        return d.dato2+d.dato2*.1;
    })]);
    
 


    var valueline = d3.line()
        .x(function (d) {
            return x(d.dato1);
        })
        .y(function (d) {
            return y(d.dato2);
        });

    var svg = d3.select("#scatter").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var path = svg.selectAll("dot")
        .data(dataGrafica)
        .enter().append("circle")
        .attr("r", 5)
        .attr("cx", function (d) {
            return x(d.dato1);
        })
        .attr("cy", function (d) {
            return y(d.dato2);
        })
        .attr("stroke", "#32CD32")
        .attr("stroke-width", 1.5)
        .attr("fill", "#FFFFFF");

    let xAxisG=svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x)  );
    let yAxisG= svg.append("g")
        .call(d3.axisLeft(y));

        xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('class', 'axis-label2')
        .attr('x', width / 2)
        .attr('y', 40)
        .text(variable1);

        yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('class', 'axis-label2')
        .attr('x', -height / 2)
        .attr('y', -25)
        .attr('transform', `rotate(-90)`)
        .style('text-anchor', 'middle')
        .text(variable2);
}

