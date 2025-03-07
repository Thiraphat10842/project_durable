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
    const [listrepair, setlistrepair] = useState([] as any);
    const [listjobdiscription, setlistjobdiscription] = useState([] as any);
  
    useEffect(() => {
      showlistuser();
      showOffice();
      ShowlistReturn();
    }, []);
  
    useEffect(() => {
      showcomputer();
      ShowlistLend();
      Showlistinformrepair();
      Showlistrepair();
      Showlistjobdiscription();
    }, [inputdata.Categoryid]);
  
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
        const rs = await axios.get(API.returnURL.url + "Lending/Returndurable");
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
    async function Showlistrepair() {
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
          setlistrepair(json);
        }
      };
      data();
    }
  
    async function Showlistjobdiscription() {
      const data = async () => {
        const rs = await axios.get(API.returnURL.url + "Jobdescription/JobdescriptionlistUserID", {
            params: { userID: sessionStorage.getItem('sessuserID') },
          });
        if (rs.status === 200) {
          const json = await rs.data;
          setlistjobdiscription(json);
        }
      };
      data();
    }
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
          backgroundColor: "#54a3bc",  // สีแท่งกราฟ
          borderColor: "#54a3bc",// สีกรอบแท่งกราฟ
          borderWidth: 1,
        },
      ],
    };
  
    // กำหนด options ให้แสดงปี พ.ศ. ที่หัวกราฟ
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: `จำนวนการยืมปี ${new Date().getFullYear() + 543}`, // ปี พ.ศ.
          font: {
            size: 18,
            weight: "bold",
          },
          padding: {
            top: 20,
            bottom: 20,
          },
        },
      },
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
                  <h1 className="text-white">{listrepair.length}</h1>
                  <h6 className="text-white">รายการแจ้งปัญหา</h6>
                </div>
              </div>
            </div>
  
            <div className="col-md-6 col-lg-2 col-xlg-3">
              <div className="card card-hover">
                <div className="box bg-cyan text-center">
                  <h1 className="text-white">{listjobdiscription.length}</h1>
                  <h6 className="text-white">Jobdiscription</h6>
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
                        <div style={{ width: "800px", height: "300px" }}>
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
                    <div className="col-lg-3">
                      <div className="row">
                        <div className="col-6">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-account fs-3 mb-1 font-16" />
                            <h5 className="mb-0 mt-1">2540</h5>
                            <small className="font-light">Total Users</small>
                          </div>
                        </div>
                        <div className="col-6">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-plus fs-3 font-16" />
                            <h5 className="mb-0 mt-1">120</h5>
                            <small className="font-light">New Users</small>
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-cart fs-3 mb-1 font-16" />
                            <h5 className="mb-0 mt-1">656</h5>
                            <small className="font-light">Total Shop</small>
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-tag fs-3 mb-1 font-16" />
                            <h5 className="mb-0 mt-1">9540</h5>
                            <small className="font-light">Total Orders</small>
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-table fs-3 mb-1 font-16" />
                            <h5 className="mb-0 mt-1">100</h5>
                            <small className="font-light">Pending Orders</small>
                          </div>
                        </div>
                        <div className="col-6 mt-3">
                          <div className="bg-dark p-10 text-white text-center">
                            <i className="mdi mdi-web fs-3 mb-1 font-16" />
                            <h5 className="mb-0 mt-1">8540</h5>
                            <small className="font-light">Online Orders</small>
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
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Latest Posts</h4>
                </div>
                <div className="comment-widgets scrollable">
                  <div className="d-flex flex-row comment-row mt-0">
                    <div className="p-2">
                      <img
                        src="../src/assets/images/users/1.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="comment-text w-100">
                      <h6 className="font-medium">James Anderson</h6>
                      <span className="mb-3 d-block">
                        Lorem Ipsum is simply dummy text of the printing and type
                        setting industry.
                      </span>
                      <div className="comment-footer">
                        <span className="text-muted float-end">
                          April 14, 2021
                        </span>
                        <button
                          type="button"
                          className="btn btn-cyan btn-sm text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-sm text-white"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="d-flex flex-row comment-row">
                    <div className="p-2">
                      <img
                        src="../src/assets/images/users/4.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="comment-text active w-100">
                      <h6 className="font-medium">Michael Jorden</h6>
                      <span className="mb-3 d-block">
                        Lorem Ipsum is simply dummy text of the printing and type
                        setting industry.
                      </span>
                      <div className="comment-footer">
                        <span className="text-muted float-end">May 10, 2021</span>
                        <button
                          type="button"
                          className="btn btn-cyan btn-sm text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-sm text-white"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="d-flex flex-row comment-row">
                    <div className="p-2">
                      <img
                        src="../src/assets/images/users/5.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="comment-text w-100">
                      <h6 className="font-medium">Johnathan Doeting</h6>
                      <span className="mb-3 d-block">
                        Lorem Ipsum is simply dummy text of the printing and type
                        setting industry.
                      </span>
                      <div className="comment-footer">
                        <span className="text-muted float-end">
                          August 1, 2021
                        </span>
                        <button
                          type="button"
                          className="btn btn-cyan btn-sm text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-sm text-white"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">To Do List</h4>
                  <div className="todo-widget scrollable" style={{ height: 450 }}>
                    <ul
                      className="list-task todo-list list-group mb-0"
                      data-role="tasklist"
                    >
                      <li className="list-group-item todo-item" data-role="task">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck"
                          />
                          <label
                            className="form-check-label w-100 mb-0 todo-label"
                            htmlFor="customCheck"
                          >
                            <span className="todo-desc fw-normal">
                              Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry.
                            </span>
                            <span className="badge rounded-pill bg-danger float-end">
                              Today
                            </span>
                          </label>
                        </div>
                        <ul className="list-style-none assignedto">
                          <li className="assignee">
                            <img
                              className="rounded-circle"
                              width={40}
                              src="../src/assets/images/users/1.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Steave"
                            />
                          </li>
                          <li className="assignee">
                            <img
                              className="rounded-circle"
                              width={40}
                              src="../src/assets/images/users/2.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Jessica"
                            />
                          </li>
                          <li className="assignee">
                            <img
                              className="rounded-circle"
                              width={40}
                              src="../src/assets/images/users/3.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Priyanka"
                            />
                          </li>
                          <li className="assignee">
                            <img
                              className="rounded-circle"
                              width={40}
                              src="../src/assets/images/users/4.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Selina"
                            />
                          </li>
                        </ul>
                      </li>
                      <li className="list-group-item todo-item" data-role="task">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck1"
                          />
                          <label
                            className="form-check-label w-100 mb-0 todo-label"
                            htmlFor="customCheck1"
                          >
                            <span className="todo-desc fw-normal">
                              Lorem Ipsum is simply dummy text of the printing
                            </span>
                            <span className="badge rounded-pill bg-primary float-end">
                              1 week
                            </span>
                          </label>
                        </div>
                        <div className="item-date">26 jun 2021</div>
                      </li>
                      <li className="list-group-item todo-item" data-role="task">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck2"
                          />
                          <label
                            className="form-check-label w-100 mb-0 todo-label"
                            htmlFor="customCheck2"
                          >
                            <span className="todo-desc fw-normal">
                              Give Purchase report to
                            </span>
                            <span className="badge rounded-pill bg-info float-end">
                              Yesterday
                            </span>
                          </label>
                        </div>
                        <ul className="list-style-none assignedto">
                          <li className="assignee">
                            <img
                              className="rounded-circle"
                              width={40}
                              src="../src/assets/images/users/3.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Priyanka"
                            />
                          </li>
                          <li className="assignee">
                            <img
                              className="rounded-circle"
                              width={40}
                              src="../src/assets/images/users/4.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Selina"
                            />
                          </li>
                        </ul>
                      </li>
                      <li className="list-group-item todo-item" data-role="task">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck3"
                          />
                          <label
                            className="form-check-label w-100 mb-0 todo-label"
                            htmlFor="customCheck3"
                          >
                            <span className="todo-desc fw-normal">
                              Lorem Ipsum is simply dummy text of the printing
                            </span>
                            <span className="badge rounded-pill bg-warning float-end">
                              2 weeks
                            </span>
                          </label>
                        </div>
                        <div className="item-date">26 jun 2021</div>
                      </li>
                      <li className="list-group-item todo-item" data-role="task">
                        <div className="form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="customCheck4"
                          />
                          <label
                            className="form-check-label w-100 mb-0 todo-label"
                            htmlFor="customCheck4"
                          >
                            <span className="todo-desc fw-normal">
                              Give Purchase report to
                            </span>
                            <span className="badge rounded-pill bg-info float-end">
                              Yesterday
                            </span>
                          </label>
                        </div>
                        <ul className="list-style-none assignedto">
                          <li className="assignee">
                            <img
                              className="rounded-circle"
                              width={40}
                              src="../src/assets/images/users/3.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Priyanka"
                            />
                          </li>
                          <li className="assignee">
                            <img
                              className="rounded-circle"
                              width={40}
                              src="../src/assets/images/users/4.jpg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="top"
                              data-original-title="Selina"
                            />
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
  
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-0">Progress Box</h4>
                  <div className="mt-3">
                    <div className="d-flex no-block align-items-center">
                      <span>81% Clicks</span>
                      <div className="ms-auto">
                        <span>125</span>
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped"
                        role="progressbar"
                        style={{ width: "81%" }}
                        aria-valuenow={10}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex no-block align-items-center mt-4">
                      <span>72% Uniquie Clicks</span>
                      <div className="ms-auto">
                        <span>120</span>
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped bg-success"
                        role="progressbar"
                        style={{ width: "72%" }}
                        aria-valuenow={25}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex no-block align-items-center mt-4">
                      <span>53% Impressions</span>
                      <div className="ms-auto">
                        <span>785</span>
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped bg-info"
                        role="progressbar"
                        style={{ width: "53%" }}
                        aria-valuenow={50}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="d-flex no-block align-items-center mt-4">
                      <span>3% Online Users</span>
                      <div className="ms-auto">
                        <span>8</span>
                      </div>
                    </div>
                    <div className="progress">
                      <div
                        className="progress-bar progress-bar-striped bg-danger"
                        role="progressbar"
                        style={{ width: "3%" }}
                        aria-valuenow={75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      />
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title mb-0">News Updates</h4>
                </div>
                <ul className="list-style-none">
                  <li className="d-flex no-block card-body">
                    <i className="mdi mdi-check-circle fs-4 w-30px mt-1" />
                    <div>
                      <a href="#" className="mb-0 font-medium p-0">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </a>
                      <span className="text-muted">
                        dolor sit amet, consectetur adipiscing
                      </span>
                    </div>
                    <div className="ms-auto">
                      <div className="tetx-right">
                        <h5 className="text-muted mb-0">20</h5>
                        <span className="text-muted font-16">Jan</span>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex no-block card-body border-top">
                    <i className="mdi mdi-gift fs-4 w-30px mt-1" />
                    <div>
                      <a href="#" className="mb-0 font-medium p-0">
                        Congratulation Maruti, Happy Birthday
                      </a>
                      <span className="text-muted">
                        many many happy returns of the day
                      </span>
                    </div>
                    <div className="ms-auto">
                      <div className="tetx-right">
                        <h5 className="text-muted mb-0">11</h5>
                        <span className="text-muted font-16">Jan</span>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex no-block card-body border-top">
                    <i className="mdi mdi-plus fs-4 w-30px mt-1" />
                    <div>
                      <a href="#" className="mb-0 font-medium p-0">
                        Maruti is a Responsive Admin theme
                      </a>
                      <span className="text-muted">
                        But already everything was solved. It will ...
                      </span>
                    </div>
                    <div className="ms-auto">
                      <div className="tetx-right">
                        <h5 className="text-muted mb-0">19</h5>
                        <span className="text-muted font-16">Jan</span>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex no-block card-body border-top">
                    <i className="mdi mdi-leaf fs-4 w-30px mt-1" />
                    <div>
                      <a href="#" className="mb-0 font-medium p-0">
                        Envato approved Maruti Admin template
                      </a>
                      <span className="text-muted">
                        i am very happy to approved by TF
                      </span>
                    </div>
                    <div className="ms-auto">
                      <div className="tetx-right">
                        <h5 className="text-muted mb-0">20</h5>
                        <span className="text-muted font-16">Jan</span>
                      </div>
                    </div>
                  </li>
                  <li className="d-flex no-block card-body border-top">
                    <i className="mdi mdi-comment-question-outline fs-4 w-30px mt-1" />
                    <div>
                      <a href="#" className="mb-0 font-medium p-0">
                        I am alwayse here if you have any question
                      </a>
                      <span className="text-muted">
                        we glad that you choose our template
                      </span>
                    </div>
                    <div className="ms-auto">
                      <div className="tetx-right">
                        <h5 className="text-muted mb-0">15</h5>
                        <span className="text-muted font-16">Jan</span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
  
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">Chat Option</h4>
                  <div className="chat-box scrollable" style={{ height: 475 }}>
                    <ul className="chat-list">
                      <li className="chat-item">
                        <div className="chat-img">
                          <img
                            src="../src/assets/images/users/1.jpg"
                            alt="user"
                          />
                        </div>
                        <div className="chat-content">
                          <h6 className="font-medium">James Anderson</h6>
                          <div className="box bg-light-info">
                            Lorem Ipsum is simply dummy text of the printing &amp;
                            type setting industry.
                          </div>
                        </div>
                        <div className="chat-time">10:56 am</div>
                      </li>
  
                      <li className="chat-item">
                        <div className="chat-img">
                          <img
                            src="../src/assets/images/users/2.jpg"
                            alt="user"
                          />
                        </div>
                        <div className="chat-content">
                          <h6 className="font-medium">Bianca Doe</h6>
                          <div className="box bg-light-info">
                            It’s Great opportunity to work.
                          </div>
                        </div>
                        <div className="chat-time">10:57 am</div>
                      </li>
  
                      <li className="odd chat-item">
                        <div className="chat-content">
                          <div className="box bg-light-inverse">
                            I would love to join the team.
                          </div>
                          <br />
                        </div>
                      </li>
  
                      <li className="odd chat-item">
                        <div className="chat-content">
                          <div className="box bg-light-inverse">
                            Whats budget of the new project.
                          </div>
                          <br />
                        </div>
                        <div className="chat-time">10:59 am</div>
                      </li>
  
                      <li className="chat-item">
                        <div className="chat-img">
                          <img
                            src="../src/assets/images/users/3.jpg"
                            alt="user"
                          />
                        </div>
                        <div className="chat-content">
                          <h6 className="font-medium">Angelina Rhodes</h6>
                          <div className="box bg-light-info">
                            Well we have good budget for the project
                          </div>
                        </div>
                        <div className="chat-time">11:00 am</div>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="card-body border-top">
                  <div className="row">
                    <div className="col-9">
                      <div className="input-field mt-0 mb-0">
                        <textarea
                          id="textarea1"
                          placeholder="Type and enter"
                          className="form-control border-0"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-3">
                      <a
                        className="btn-circle btn-lg btn-cyan float-end text-white"
                        href="javascript:void(0)"
                      >
                        <i className="mdi mdi-send fs-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="card">
                <div className="card-body">
                  <h4 className="card-title">
                    Our partner (Box with Fix height)
                  </h4>
                </div>
                <div
                  className="comment-widgets scrollable"
                  style={{ maxHeight: 130 }}
                >
                  <div className="d-flex flex-row comment-row mt-0">
                    <div className="p-2">
                      <img
                        src="../src/assets/images/users/1.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="comment-text w-100">
                      <h6 className="font-medium">James Anderson</h6>
                      <span className="mb-3 d-block">
                        Lorem Ipsum is simply dummy text of the printing and type
                        setting industry.
                      </span>
                      <div className="comment-footer">
                        <span className="text-muted float-end">
                          April 14, 2021
                        </span>
                        <button
                          type="button"
                          className="btn btn-cyan btn-sm text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-sm text-white"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="d-flex flex-row comment-row">
                    <div className="p-2">
                      <img
                        src="../src/assets/images/users/4.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="comment-text active w-100">
                      <h6 className="font-medium">Michael Jorden</h6>
                      <span className="mb-3 d-block">
                        Lorem Ipsum is simply dummy text of the printing and type
                        setting industry.
                      </span>
                      <div className="comment-footer">
                        <span className="text-muted float-end">May 10, 2021</span>
                        <button
                          type="button"
                          className="btn btn-cyan btn-sm text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-sm text-white"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
  
                  <div className="d-flex flex-row comment-row">
                    <div className="p-2">
                      <img
                        src="../src/assets/images/users/5.jpg"
                        alt="user"
                        width={50}
                        className="rounded-circle"
                      />
                    </div>
                    <div className="comment-text w-100">
                      <h6 className="font-medium">Johnathan Doeting</h6>
                      <span className="mb-3 d-block">
                        Lorem Ipsum is simply dummy text of the printing and type
                        setting industry.
                      </span>
                      <div className="comment-footer">
                        <span className="text-muted float-end">
                          August 1, 2021
                        </span>
                        <button
                          type="button"
                          className="btn btn-cyan btn-sm text-white"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn btn-success btn-sm text-white"
                        >
                          Publish
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="accordion" id="accordionExample">
                <div className="card mb-0">
                  <div className="card-header" id="headingOne">
                    <h5 className="mb-0">
                      <a
                        className="d-flex align-items-center"
                        data-toggle="collapse"
                        data-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <i
                          className="me-1 mdi mdi-magnet fs-4"
                          aria-hidden="true"
                        />
                        <span>Accordion Example 1</span>
                      </a>
                    </h5>
                  </div>
                  <div
                    id="collapseOne"
                    className="collapse show"
                    aria-labelledby="headingOne"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute, non cupidatat skateboard dolor brunch. Food truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                      sunt aliqua put a bird on it squid single-origin coffee
                      nulla assumenda shoreditch et. Nihil anim keffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                      Leggings occaecat craft beer farm-to-table, raw denim
                      aesthetic synth nesciunt you probably haven't heard of them
                      accusamus labore sustainable VHS.
                    </div>
                  </div>
                </div>
                <div className="card mb-0 border-top">
                  <div className="card-header" id="headingTwo">
                    <h5 className="mb-0">
                      <a
                        className="collapsed d-flex align-items-center"
                        data-toggle="collapse"
                        data-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                      >
                        <i
                          className="me-1 mdi mdi-magnet fs-4"
                          aria-hidden="true"
                        />
                        <span>Accordion Example 2</span>
                      </a>
                    </h5>
                  </div>
                  <div
                    id="collapseTwo"
                    className="collapse"
                    aria-labelledby="headingTwo"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute, non cupidatat skateboard dolor brunch. Food truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                      sunt aliqua put a bird on it squid single-origin coffee
                      nulla assumenda shoreditch et. Nihil anim keffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                      Leggings occaecat craft beer farm-to-table, raw denim
                      aesthetic synth nesciunt you probably haven't heard of them
                      accusamus labore sustainable VHS.
                    </div>
                  </div>
                </div>
                <div className="card mb-0 border-top">
                  <div className="card-header" id="headingThree">
                    <h5 className="mb-0">
                      <a
                        className="collapsed d-flex align-items-center"
                        data-toggle="collapse"
                        data-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <i
                          className="me-1 mdi mdi-magnet fs-4"
                          aria-hidden="true"
                        />
                        <span>Accordion Example 3</span>
                      </a>
                    </h5>
                  </div>
                  <div
                    id="collapseThree"
                    className="collapse"
                    aria-labelledby="headingThree"
                    data-parent="#accordionExample"
                  >
                    <div className="card-body">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life
                      accusamus terry richardson ad squid. 3 wolf moon officia
                      aute, non cupidatat skateboard dolor brunch. Food truck
                      quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
                      sunt aliqua put a bird on it squid single-origin coffee
                      nulla assumenda shoreditch et. Nihil anim keffiyeh
                      helvetica, craft beer labore wes anderson cred nesciunt
                      sapiente ea proident. Ad vegan excepteur butcher vice lomo.
                      Leggings occaecat craft beer farm-to-table, raw denim
                      aesthetic synth nesciunt you probably haven't heard of them
                      accusamus labore sustainable VHS.
                    </div>
                  </div>
                </div>
              </div>
  
              <div id="accordian-4">
                <div className="card mt-4">
                  <a
                    className="card-header link"
                    data-toggle="collapse"
                    data-parent="#accordian-4"
                    href="#Toggle-1"
                    aria-expanded="true"
                    aria-controls="Toggle-1"
                  >
                    <i
                      className="seticon mdi mdi-arrow-right-bold"
                      aria-hidden="true"
                    />
                    <span>Toggle, Open by default</span>
                  </a>
                  <div id="Toggle-1" className="collapse show multi-collapse">
                    <div className="card-body widget-content">
                      This box is opened by default, paragraphs and is full of
                      waffle to pad out the comment. Usually, you just wish these
                      sorts of comments would come to an end.
                    </div>
                  </div>
                  <a
                    className="card-header link border-top"
                    data-toggle="collapse"
                    data-parent="#accordian-4"
                    href="#Toggle-2"
                    aria-expanded="false"
                    aria-controls="Toggle-2"
                  >
                    <i className="seticon mdi mdi-close" aria-hidden="true" />
                    <span>Toggle, Closed by default</span>
                  </a>
                  <div
                    id="Toggle-2"
                    className="multi-collapse collapse"
                    style={{}}
                  >
                    <div className="card-body widget-content">
                      This box is now open
                    </div>
                  </div>
                  <a
                    className="card-header collapsed link border-top"
                    data-toggle="collapse"
                    data-parent="#accordian-4"
                    href="#Toggle-3"
                    aria-expanded="false"
                    aria-controls="Toggle-3"
                  >
                    <i className="seticon mdi mdi-close" aria-hidden="true" />
                    <span>Toggle, Closed by default</span>
                  </a>
                  <div id="Toggle-3" className="collapse multi-collapse">
                    <div className="card-body widget-content">
                      This box is now open
                    </div>
                  </div>
                </div>
              </div>
  
              <div className="card">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      data-bs-toggle="tab"
                      href="#home"
                      role="tab"
                    >
                      <span className="hidden-sm-up" />
                      <span className="hidden-xs-down">Tab1</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#profile"
                      role="tab"
                    >
                      <span className="hidden-sm-up" />
                      <span className="hidden-xs-down">Tab2</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      data-bs-toggle="tab"
                      href="#messages"
                      role="tab"
                    >
                      <span className="hidden-sm-up" />
                      <span className="hidden-xs-down">Tab3</span>
                    </a>
                  </li>
                </ul>
  
                <div className="tab-content tabcontent-border">
                  <div className="tab-pane active" id="home" role="tabpanel">
                    <div className="p-20">
                      <p>
                        And is full of waffle to It has multiple paragraphs and is
                        full of waffle to pad out the comment. Usually, you just
                        wish these sorts of comments would come to an end.multiple
                        paragraphs and is full of waffle to pad out the comment..
                      </p>
                      <img
                        src="../src/assets/images/background/img4.jpg"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                  <div className="tab-pane p-20" id="profile" role="tabpanel">
                    <div className="p-20">
                      <img
                        src="../src/assets/images/background/img4.jpg"
                        className="img-fluid"
                      />
                      <p className="mt-2">
                        And is full of waffle to It has multiple paragraphs and is
                        full of waffle to pad out the comment. Usually, you just
                        wish these sorts of comments would come to an end.multiple
                        paragraphs and is full of waffle to pad out the comment..
                      </p>
                    </div>
                  </div>
                  <div className="tab-pane p-20" id="messages" role="tabpanel">
                    <div className="p-20">
                      <p>
                        And is full of waffle to It has multiple paragraphs and is
                        full of waffle to pad out the comment. Usually, you just
                        wish these sorts of comments would come to an end.multiple
                        paragraphs and is full of waffle to pad out the comment..
                      </p>
                      <img
                        src="../src/assets/images/background/img4.jpg"
                        className="img-fluid"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Frmadminhome;
  