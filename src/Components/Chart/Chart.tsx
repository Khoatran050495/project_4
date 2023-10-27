import "./ChartComponent.css";

import React, { useEffect } from "react";

const Chart: React.FC = () => {
  //================================================================================================> biểu đồ tròn
  useEffect(() => {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
  }, []);
  function drawChart() {
    // Set Data
    const data = google.visualization.arrayToDataTable([
      ["Task", "Hours per Day"],
      ["Work", 5],
      ["Eat", 2],
      ["Commute", 2],
      ["Watch TV", 2],
      ["Sleep", 7],
    ]);

    // option
    const options: any = {
      title: "PROPORTION OF REVENUE BY PRODUCT",
      pieHole: 0.4,
      legend: "none",
      backgroundColor: "lightgray",
      width: 430, // Độ rộng
      height: 450, // Chiều cao
    };

    //draw chart
    const chart = new google.visualization.PieChart(
      document.getElementById("myChart") as any
    );
    chart.draw(data, options);
  }

  //================================================================================================> biểu đồ đường
  useEffect(() => {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart1);
  }, []);
  function drawChart1() {
    // Set Data
    const data = google.visualization.arrayToDataTable([
      ["Price", "Size"],
      [50, 7],
      [60, 8],
      [70, 8],
      [80, 9],
      [90, 9],
      [100, 9],
      [110, 10],
      [120, 11],
      [130, 14],
      [140, 14],
      [150, 15],
    ]);
    // Set Options
    const options: any = {
      title: "House Prices vs Size",
      hAxis: { title: "Square Meters" },
      vAxis: { title: "Price in Millions" },
      legend: "none",
      backgroundColor: "lightgray",
      width: 885, // Độ rộng
      height: 450, // Chiều cao
    };
    // Draw Chart
    const chart = new google.visualization.LineChart(
      document.getElementById("myChart1") as any
    );
    chart.draw(data, options);
  }

  //================================================================================================> biểu đồ cột ngang

  useEffect(() => {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart2);
  }, []);
  function drawChart2() {
    // Set Data
    const data = google.visualization.arrayToDataTable([
      ["City", "2010 Population"],
      ["New York City, NY", 8175000],
      ["Los Angeles, CA", 3792000],
      ["Chicago, IL", 2695000],
      ["Houston, TX", 2099000],
      ["Philadelphia, PA", 1526000],
    ]);

    //set options
    const options: any = {
      title: "Population of Largest U.S. Cities",
      chartArea: { width: "50%" },
      hAxis: {
        title: "Total Population",
        minValue: 0,
      },
      vAxis: {
        title: "City",
      },
      legend: "none",
      backgroundColor: "lightgray",
      width: 430, // Độ rộng
      height: 450, // Chiều cao
    };

    //set draw
    const chart = new google.visualization.BarChart(
      document.getElementById("myChart2") as any
    );

    chart.draw(data, options);
  }

  return (
    <div className="totaltablesmall">
      <div className="totaltable">
        <div className="totaltable1">
          <div>
            <p className="chartp">TOTAL USE </p>
            <p className="chartp">255 / USE</p>
          </div>
          <div className="totaltablesub1">
            <i className="fa-solid fa-users" style={{ color: "#ffffff" }} />
          </div>
        </div>

        <div className="totaltable2">
          <div>
            <p className="chartp">USE IS LOCKED</p>
            <p className="chartp">255 / USE</p>
          </div>
          <div className="totaltablesub2">
            <i
              className="fa-solid fa-users-slash"
              style={{ color: "#ffffff" }}
            ></i>
          </div>
        </div>

        <div className="totaltable3">
          <div>
            <p className="chartp">TOTAL ORDER </p>
            <p className="chartp">255 / ORDER </p>
          </div>
          <div className="totaltablesub3">
            <i
              className="fa-solid fa-cart-shopping"
              style={{ color: "#ffffff" }}
            />
          </div>
        </div>

        <div className="totaltable4">
          <div>
            <p className="chartp">TOTAL REVENUE</p>
            <p className="chartp">255 / USD</p>
          </div>
          <div className="totaltablesub4">
            <i
              className="fa-solid fa-cart-shopping"
              style={{ color: "#ffffff" }}
            />
          </div>
        </div>
      </div>

      <div className="chartfollow">
        <div id="chartfollow1">
          <div id="myChart" />
        </div>
        <div id="chartfollow2">
          <div id="myChart1" />
        </div>
        <div id="chartfollow3">
          <div id="myChart2" />
        </div>
      </div>
    </div>
  );
};

export default Chart;
