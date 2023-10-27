import "./RevenueManages.css";

import React, { useEffect, useState } from "react";

import axiosClient from "../../api/axiosClient";
import { IRevenuemanagers, TotalOrders } from "../../Types/Type";

const RevenueManages: React.FC = () => {
  const [data, setdata] = useState<IRevenuemanagers[]>([]);
  const [datarevenue, setdatarevenue] = useState([]);
  const [dataOrder, setdataOrder] = useState<TotalOrders[]>([]);
  const [datarifle, setdatarifle] = useState(0);
  const [datapistols, setdatapistols] = useState(0);
  const [databullet, setdatabullet] = useState(0);
  const [totalprice1, settotalprice1] = useState(0);

  //================================================================================================> danh sách use
  const fetchDataUser = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `/api/v1/user/getalluser`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      setdata(postIdProductOrder1);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataUser();
  }, []);

  //================================================================================================> doanh thu cho biểu đồ đường
  const fetchDatarevenue = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `/api/v1/history/gethistorywithmonth`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      const chartData = [["Month", "Total Revenue"]];
      postIdProductOrder1?.forEach((item: any) => {
        const month: any = Number(item?.month?.split("-")[1]);
        chartData.push([month, parseFloat(item.totalRevenue)]);
        return chartData;
      });
      setdatarevenue(chartData as any);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDatarevenue();
  }, []);

  //================================================================================================> lọc danh sách use bị khóa

  const useBlock = data.filter((item) => item.status === 2);

  //================================================================================================> gét order cộng tổng tiền

  const fetchDataOrder = async () => {
    try {
      const postIdProductOrder = await axiosClient.get(
        `/api/v1/history/getallhistory`
      );
      const postIdProductOrder1 = postIdProductOrder.data.data;
      setdataOrder(postIdProductOrder1);
      //=============================================================================================>cộng tổng doanh thu
      const total = postIdProductOrder1?.reduce(
        (pre: any, urr: any) => pre + Number(urr.Total_Price),
        0
      );
      settotalprice1(total);

      //=============================================================================================> lọc sản phẩm RIFLE và cộng tiền
      const rifle = postIdProductOrder1.filter(
        (item: any) => item.product.type === "rifle"
      );
      const pricerifle = rifle?.reduce(
        (pre: any, urr: any) => pre + Number(urr.Total_Price),
        0
      );
      setdatarifle(pricerifle);

      //=============================================================================================> lọc sản phẩm PISTOLS và cộng tiền
      const pistols = postIdProductOrder1.filter(
        (item: any) => item.product.type === "pistols"
      );
      const pricepistols = pistols?.reduce(
        (pre: any, urr: any) => pre + Number(urr.Total_Price),
        0
      );
      setdatapistols(pricepistols);

      //=============================================================================================> lọc sản phẩm BULLET và cộng tiền
      const bullet = postIdProductOrder1.filter(
        (item: any) => item.product.type === "bullet"
      );
      const pricebullet = bullet?.reduce(
        (pre: any, urr: any) => pre + Number(urr.Total_Price),
        0
      );
      setdatabullet(pricebullet);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchDataOrder();
  }, []);

  //================================================================================================> biểu đồ tròn
  useEffect(() => {
    google.charts.load("current", { packages: ["corechart"] });
    google.charts.setOnLoadCallback(drawChart);
  }, [datarifle, datapistols, databullet]);
  function drawChart() {
    // Set Data
    const data = google.visualization.arrayToDataTable([
      ["Task", "Hours per Day"],
      ["rifle", datarifle],
      ["pistol", datapistols],
      ["bullet", databullet],
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
  }, [datarevenue]);

  function drawChart1() {
    // Set Data
    const data = google.visualization?.arrayToDataTable(datarevenue);
    // Set Options
    const options: any = {
      title: "YEAR REVENUE",
      hAxis: { title: "Month" },
      vAxis: { title: "Price in Thousand" },
      legend: "none",
      backgroundColor: "lightgray",
      width: 1340, // Độ rộng
      height: 450, // Chiều cao
    };
    // Draw Chart
    const chart = new google.visualization.LineChart(
      document.getElementById("myChart1") as any
    );
    chart.draw(data, options);
  }

  return (
    <div className="totaltablesmall">
      <div className="totaltable">
        <div className="totaltable1">
          <div>
            <p className="chartp">TOTAL USE </p>
            <p className="chartp">{data.length} / USE</p>
          </div>
          <div className="totaltablesub1">
            <i className="fa-solid fa-users" style={{ color: "#ffffff" }} />
          </div>
        </div>

        <div className="totaltable2">
          <div>
            <p className="chartp">USE IS LOCKED</p>
            <p className="chartp">{useBlock.length} / USE</p>
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
            <p className="chartp">{dataOrder.length} / ORDER </p>
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
            <p className="chartp">
              {totalprice1.toLocaleString("en-GB")} / USD
            </p>
          </div>
          <div className="totaltablesub4">
            <i
              className="fa-solid fa-money-bill-wave"
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

export default RevenueManages;
