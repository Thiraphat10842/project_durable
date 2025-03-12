import React, {
  FC,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import Select from "react-select";
import API from "../../Configs/config";
import { toast } from "react-toastify";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// ลงทะเบียน Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface userProps {
  datadetail: any;
  countS: any;
}

// กำหนด interface สำหรับข้อมูลที่ได้รับจาก API
interface Report {
  Officename: string;
  reportDate: string;
  tel: string;
  status: string;
  report: string;
  Reportproblem: string;
  type: string;
}

function Frmadminhome() {
  const txtinput = { Categoryid: "", Categoryname: "" };
  const [listuser, setlistuser] = useState([]);
  const [listOffice, setlistOffice] = useState([]);
  const [listLend, setLend] = useState([]);
  const [listReturnLend, setReturneLend] = useState([]);
  // const [listcomputer, setlistcomputer] = useState([]);
  const [inputdata, setInputdata] = useState(txtinput);
  const [datasource, setDatasource] = useState([] as any);
  const [listinformrepair, setinformrepair] = useState([] as any);
  const [listreport, setlistreport] = useState([] as any);

  useEffect(() => {
    showlistuser();
    showOffice();
    ShowlistReturn();
  }, []);

  useEffect(() => {
    showcomputer();
    ShowlistLend();
    Showlistinformrepair();
    Showlistreport();
  }, [inputdata.Categoryid]);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // ฟังก์ชันที่ใช้รีโหลดหน้าจอ
    const reloadPage = () => {
      window.location.reload();
    };

    // ฟังก์ชันที่รีเซ็ตตัวจับเวลาเมื่อมีการทำกิจกรรม
    const resetTimeout = () => {
      clearTimeout(timeout); // ลบ timeout เดิม
      timeout = setTimeout(reloadPage, 20000); // รีโหลดหน้าจอหลังจาก 20 วินาทีไม่มีการทำกิจกรรม
    };

    // ตั้ง listener เพื่อตรวจจับการเคลื่อนไหวของเมาส์และการกดแป้นพิมพ์
    document.addEventListener("mousemove", resetTimeout);
    document.addEventListener("keydown", resetTimeout);

    // เริ่มต้นการนับเวลา
    resetTimeout();

    // ลบ event listeners เมื่อ component ถูก unmount
    return () => {
      clearTimeout(timeout);
      document.removeEventListener("mousemove", resetTimeout);
      document.removeEventListener("keydown", resetTimeout);
    };
  }, []);
  
  async function showlistuser() {
    axios.get(API.returnURL.url + "Personnel").then(function (response) {
      setlistuser(response.data);
    });
  }
  async function showOffice() {
    axios.get(API.returnURL.url + "Office").then(function (response) {
      setlistOffice(response.data);
    });
  }

  async function showcomputer() {
    axios
      .get(
        API.returnURL.url +
          "Computers/showcomputer?categoryID=" +
          inputdata.Categoryid
      )
      .then(function (response) {
        let Mydata = response.data;
        setDatasource(Mydata);
      });
  }

  async function ShowlistReturn() {
    const data = async () => {
      const rs = await axios.get(
        API.returnURL.url +
          "Lending/Returndurable?userID=" +
          sessionStorage.getItem("sessID") +
          "&str=" +
          sessionStorage.getItem("sessStr")
      );
      if (rs.status === 200) {
        const json = await rs.data;
        setReturneLend(json);
      }
    };
    data();
  }

  async function ShowlistLend() {
    const data = async () => {
      const rs = await axios.get(
        API.returnURL.url +
          "Lending?userID=" +
          sessionStorage.getItem("sessID") +
          "&str=" +
          sessionStorage.getItem("sessStr")
      );
      if (rs.status === 200) {
        const json = await rs.data;
        setLend(json);
      }
    };
    data();
  }

  async function Showlistinformrepair() {
    const data = async () => {
      const rs = await axios.get(
        API.returnURL.url +
          "Informrepair?userStr=" +
          sessionStorage.getItem("sessStr") +
          "&userID=" +
          sessionStorage.getItem("sessuserID")
      );
      if (rs.status === 200) {
        const json = await rs.data;
        setinformrepair(json);
      }
    };
    data();
  }

  async function Showlistreport() {
    const data = async () => {
      const rs = await axios.get(
        API.returnURL.url +
          "Reportproblem?userID=" +
          sessionStorage.getItem("sessuserID") +
          "&str=" +
          sessionStorage.getItem("sessStr")
      );
      if (rs.status === 200) {
        const json = await rs.data;
        setlistreport(json);
      }
    };
    data();
  }

  const [listReportTen, setListReportTen] = useState<Report[]>([]);

  useEffect(() => {
    async function Showlistreport_ten() {
      const data = async () => {
        try {
          const rs = await axios.get(
            API.returnURL.url +
              "Reportproblem?userID=" +
              sessionStorage.getItem("sessuserID") +
              "&str=" +
              sessionStorage.getItem("sessStr")
          );
          if (rs.status === 200) {
            // ดึงเฉพาะ 10 อันดับล่าสุด
            setListReportTen(rs.data.slice(0, 10)); // ดึง 10 รายการแรก
          }
        } catch (error) {
          console.error("Error fetching reports:", error);
        }
      };
      data();
    }

    Showlistreport_ten();
  }, []);

  const [lendData, setLendData] = useState([]);

  // ฟังก์ชันดึงข้อมูลการยืมจาก API
  async function fetchLendingData() {
    try {
      const response = await axios.get(
        API.returnURL.url +
          "Lending?userID=" +
          sessionStorage.getItem("sessID") +
          "&str=" +
          sessionStorage.getItem("sessStr")
      );

      if (response.status === 200) {
        setLendData(response.data);
      }
    } catch (error) {
      console.error("Error fetching lending data:", error);
    }
  }

  useEffect(() => {
    fetchLendingData();
  }, []);

  function getMonthlyLendData(
    data: any[]
  ): { month: string; year: number; count: number }[] {
    let monthlyCounts = Array(12).fill(0);
    let currentYear = new Date().getFullYear() + 543; // ปี พ.ศ. ปัจจุบัน

    data.forEach((item) => {
      const date = new Date(item.Lendday);
      const month = date.getMonth();
      monthlyCounts[month]++;
    });

    return monthlyCounts.map((count, index) => ({
      month: [
        "ม.ค.",
        "ก.พ.",
        "มี.ค.",
        "เม.ย.",
        "พ.ค.",
        "มิ.ย.",
        "ก.ค.",
        "ส.ค.",
        "ก.ย.",
        "ต.ค.",
        "พ.ย.",
        "ธ.ค.",
      ][index],
      year: currentYear,
      count,
    }));
  }

  const monthlyLendData = getMonthlyLendData(lendData);

  //ปรับแต่ง Chart Data
  const chartData = {
    labels: monthlyLendData.map((data) => `${data.month} ${data.year}`), // แสดงปี พ.ศ.
    datasets: [
      {
        label: "จำนวนการยืมในแต่ละเดือน",
        data: monthlyLendData.map((data) => data.count),
        backgroundColor: "#598BAF", // สีแท่งกราฟ
        borderColor: "#598BAF", // สีกรอบแท่งกราฟ
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">Dashboard</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="#">หน้าหลัก</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Library
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6 col-lg-2 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-cyan text-center">
                <h1 className="text-white">{listuser.length}</h1>
                <h6 className="text-white">ผู้ใช้งาน</h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-success text-center">
                <h1 className="text-white">{listOffice.length}</h1>
                <h6 className="text-white">หน่วยงานทั้งหมด</h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-warning text-center">
                <h1 className="text-white">{datasource.length}</h1>
                <h6 className="text-white">ทะเบียนครุภัณฑ์</h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-danger text-center">
                <h1 className="text-white">{listLend.length}</h1>
                <h6 className="text-white">จำนวนการยืมครุภัณฑ์</h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-info text-center">
                <h1 className="text-white">{listReturnLend.length}</h1>
                <h6 className="text-white">จำนวนครุภัณฑ์ที่ยังไม่ส่งคืน</h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-danger text-center">
                <h1 className="text-white">{listinformrepair.length}</h1>
                <h6 className="text-white">รายการการขอโปรแกรมรายงาน</h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-info text-center">
                <h1 className="text-white">{listreport.length}</h1>
                <h6 className="text-white">รายการแจ้งปัญหา</h6>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-2 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-success text-center">
                <h1 className="font-light text-white">
                  <i className="mdi mdi-calendar-check" />
                </h1>
                <h6 className="text-white">Calnedar</h6>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-2 col-xlg-3">
            <div className="card card-hover">
              <div className="box bg-warning text-center">
                <h1 className="font-light text-white">
                  <i className="mdi mdi-alert" />
                </h1>
                <h6 className="text-white">Errors</h6>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="d-md-flex align-items-center">
                  <div>
                    <h4 className="card-title">
                      กราฟแสดงข้อมูลจำนวนการยืมครุภัณฑ์ในแต่ละเดือน
                    </h4>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-9">
                    <div className="flot-chart">
                      <div>
                        <div style={{ width: "1200px", height: "350px" }}>
                          <Bar
                            data={chartData}
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card shadow-sm">
              <div className="card-body">
                <h4 className="text">รายการแจ้งปัญหา</h4>
                <table className="table table-bordered table-striped table-hover">
                  <thead className="thead-dark">
                    <tr>
                      <th>Office Name</th>
                      <th>Report Date</th>
                      <th>Tel</th>
                      <th>Status</th>
                      <th>Report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listReportTen.map((row, index) => (
                      <tr key={index}>
                        <td>{row.Officename}</td>
                        <td>{row.reportDate}</td>
                        <td>{row.tel}</td>
                        <td>
                          {row.Reportproblem === "แจ้งปัญหา" &&
                          row.type === "0" ? (
                            <span className="status-report problem">
                              แจ้งปัญหา
                            </span>
                          ) : row.Reportproblem === "รับแจ้ง" &&
                            row.type === "0" ? (
                            <span className="status-report received">
                              รับแจ้ง
                            </span>
                          ) : row.Reportproblem === "สั่งงาน" &&
                            row.type === "0" ? (
                            <span className="status-report assigned">
                              สั่งงาน
                            </span>
                          ) : row.Reportproblem === "รับงานแล้ว" &&
                            row.type === "1" ? (
                            <span className="status-report accepted">
                              รับงานแล้ว
                            </span>
                          ) : (
                            <span className="status-report completed">
                              แล้วเสร็จ
                            </span>
                          )}
                        </td>
                        <td>{row.report}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Frmadminhome;
