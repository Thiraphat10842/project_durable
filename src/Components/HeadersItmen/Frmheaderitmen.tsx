import { logoSknmini } from "../../Configs/partfile";
import { useNavigate } from "react-router-dom";
import "./styleheader.css";
import API from "../../Configs/config";
import axios from "axios";
import React, { FC, useEffect, useState } from "react";
interface Noti {
  ID: string;
  userName: string;
  str: string;
  workgroup: string;
  report: string;
  reportDate: string;
}

interface Notification {
  Officename: string;
  Reportproblem: string;
  type: string;
}


const Frmheaderitmen: FC = () => {
  const navigate = useNavigate();
  const [noti, setNoti] = useState<Noti[]>([]);
  const [datasource, setDatasource] = useState([] as any);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    Showdatauser();
  }, []);

  async function Logout() {
    var conF = window.confirm("คุณต้องการออกจากระบบ ใช่หรือไม่");
    if (conF == true) {
      axios
        .patch(
          API.returnURL.url +
            "Login/logout?personID=" +
            sessionStorage.getItem("sessID")
        )
        .then(function (response) {
          sessionStorage.removeItem("sessStr");
          sessionStorage.removeItem("sessID");
          sessionStorage.removeItem("sessuserID");
          sessionStorage.removeItem("sessName");
          sessionStorage.removeItem("sessPositon");
          sessionStorage.removeItem("sessImg");
          sessionStorage.removeItem("sessLineid");
          sessionStorage.removeItem("sessno_SKH");
          sessionStorage.removeItem("sessEmail");
          sessionStorage.removeItem("sessofficeID");
          sessionStorage.removeItem("sessofficeName");
          sessionStorage.clear();
          navigate("/");
          window.location.reload();
        });
    }
  }

  async function Showdatauser() {
    let userID: string = "";
    axios
      .get(
        API.returnURL.url +
          "Personnel?userID=" +
          sessionStorage.getItem("sessuserID")
      )
      .then(function (response) {
        let Mydata = response.data;
        let { rows } = response.data;
        rows = Mydata.map((row: any, key: number) => ({
          ...row,
          fullName: (
            <>
              {row.Tname}
              {row.Fname} {row.Lname}
            </>
          ),
        }));

        setDatasource(rows);
      });
  }

  async function Notimessage() {
    const rs = await axios.get(
      API.returnURL.url +
        "Dashboard/ShowmessageAdmin?userStr=" +
        sessionStorage.getItem("sessStr") +
        "&userID=" +
        sessionStorage.getItem("sessID")
    );

    setNoti(rs.data[0].messge1);
    // console.log(rs.data[0].messge1 , rs.data[0].messge2)
  }

  useEffect(() => {
    Notimessage();
  }, []);

  useEffect(() => {
    fetchNotifications();
}, []);

async function fetchNotifications() {
  try {
      const response = await axios.get(
          API.returnURL.url +
              "Reportproblem?userID=" +
              sessionStorage.getItem("sessuserID") +
              "&str=" +
              sessionStorage.getItem("sessStr")
      );

      let Mydata: Notification[] = response.data;

      // ✅ ใช้ Interface กับ filter() เพื่อให้ TypeScript ไม่แจ้งเตือน
      const newNotifications = Mydata.filter(
          (row: Notification) => row.Reportproblem === "แจ้งปัญหา" && row.type === "0"
      );

      setNotifications(newNotifications);
      setUnreadCount(newNotifications.length);
  } catch (error) {
      console.error("Error fetching notifications:", error);
  }
}


  return (
    <header className="topbar" data-navbarbg="skin5">
      <nav className="navbar top-navbar navbar-expand-md navbar-dark">
        <div className="navbar-header">
          <a className="navbar-brand" href="#">
            <b className="logo-icon ps-2">
              <img src={logoSknmini} alt="homepage" className="light-logo" />
            </b>
            <span className="logo-text ms-2">IT Service SKN</span>
          </a>
          <a
            className="nav-toggler waves-effect waves-light d-block d-md-none"
            href="javascript:void(0)"
          >
            <i className="ti-menu ti-close" />
          </a>
        </div>
        <div className="navbar-collapse collapse">
          \
          <ul className="navbar-nav float-start me-auto">
            <li className="nav-item d-none d-lg-block">
              <a
                className="nav-link sidebartoggler waves-effect waves-light"
                href="javascript:void(0)"
                data-sidebartype="mini-sidebar"
              >
                <i className="mdi mdi-menu font-24" />
              </a>
            </li>
            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <span className="d-none d-md-block font-18">
                  Create New <i className="fa fa-angle-down font-18" />
                </span>
                <span className="d-block d-md-none">
                  <i className="fa fa-plus" />
                </span>
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li> */}
            <li className="nav-item search-box">
              <a
                className="nav-link waves-effect waves-dark"
                href="javascript:void(0)"
              >
                {/* <i className="mdi mdi-magnify fs-2" /> */}
              </a>
              <form className="app-search position-absolute">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search & enter"
                />
                <a className="srh-btn">
                  <i className="mdi mdi-window-close" />
                </a>
              </form>
            </li>
          </ul>
          <ul className="navbar-nav float-end">
            <span className="user-name">
              {sessionStorage.getItem("sessName")}
            </span>
            <li className="nav-item dropdown">
            <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
            >
                <i className="mdi mdi-bell font-24" />
                {unreadCount > 0 && (
                    <span
                        className="position-absolute top-50 start-100 translate-middle badge rounded-pill bg-danger"
                        style={{ fontSize: "15px", padding: "5px" }}
                    >
                        {unreadCount}
                    </span>
                )}
            </a>
            <ul className="dropdown-menu dropdown-menu-start">
                {notifications.length > 0 ? (
                    notifications.map((notification, index) => (
                        <li key={index}>
                            <a className="dropdown-item fs-6" href="/Admin/Reportaproblem">
                                {notification.Officename} แจ้งปัญหา 
                            </a>
                        </li>
                    ))
                ) : (
                    <li>
                        <a className="dropdown-item text-muted">ไม่มีการแจ้งเตือน</a>
                    </li>
                )}
            </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle waves-effect waves-dark"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="font-24 mdi mdi-comment-processing" />
              </a>
              <ul className="dropdown-menu dropdown-menu-end mailbox animated bounceInDown">
                <ul className="list-style-none">
                  <li>
                    <div className="">
                      <a href="javascript:void(0)" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-success btn-circle d-flex align-items-center justify-content-center">
                            <i className="mdi mdi-calendar text-white fs-4" />
                          </span>
                          <div className="ms-2">
                            <h5 className="mb-0">Event today</h5>
                            <span className="mail-desc">
                              Just a reminder that event
                            </span>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0)" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-info btn-circle d-flex align-items-center justify-content-center">
                            <i className="mdi mdi-settings fs-4" />
                          </span>
                          <div className="ms-2">
                            <h5 className="mb-0">Settings</h5>
                            <span className="mail-desc">
                              You can customize this template
                            </span>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0)" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-primary btn-circle d-flex align-items-center justify-content-center">
                            <i className="mdi mdi-account fs-4" />
                          </span>
                          <div className="ms-2">
                            <h5 className="mb-0">Pavan kumar</h5>
                            <span className="mail-desc">
                              Just see the my admin!
                            </span>
                          </div>
                        </div>
                      </a>
                      <a href="javascript:void(0)" className="link border-top">
                        <div className="d-flex no-block align-items-center p-10">
                          <span className="btn btn-danger btn-circle d-flex align-items-center justify-content-center">
                            <i className="mdi mdi-link fs-4" />
                          </span>
                          <div className="ms-2">
                            <h5 className="mb-0">Luanch Admin</h5>
                            <span className="mail-desc">
                              Just see the my new admin!
                            </span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </li>
                </ul>
              </ul>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-muted waves-effect waves-dark pro-pic"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {datasource.map((row: any, index: number) => (
                  <img
                    src={`data:image/jpeg;base64,${row.Img}`} // ใช้ Base64 แทน URL
                    className="rounded-circle"
                    width={40}
                    height={40}
                  />
                ))}
              </a>
              <ul
                className="dropdown-menu dropdown-menu-end user-dd animated"
                aria-labelledby="navbarDropdown"
              >
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="/ITmen/FrmProfile">
                  <i className="dw dw-user1" />{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                  >
                    <g fill="#6f6e6e" fillRule="evenodd" clipRule="evenodd">
                      <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"></path>
                      <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21"></path>
                    </g>
                  </svg>
                  &nbsp; โปรไฟล์
                </a>
                <a className="dropdown-item" href="#">
                  <i className="dw dw-settings2" />{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 16 16"
                  >
                    <g fill="none" stroke="#6f6e6e">
                      <path d="m13.258 8.354l.904.805a.91.91 0 0 1 .196 1.169l-1.09 1.862a.94.94 0 0 1-.35.341a1 1 0 0 1-.478.125a1 1 0 0 1-.306-.046l-1.157-.382q-.304.195-.632.349l-.243 1.173a.93.93 0 0 1-.339.544a.97.97 0 0 1-.618.206H6.888a.97.97 0 0 1-.618-.206a.93.93 0 0 1-.338-.544l-.244-1.173a6 6 0 0 1-.627-.35L3.9 12.61a1 1 0 0 1-.306.046a1 1 0 0 1-.477-.125a.94.94 0 0 1-.35-.34l-1.129-1.863a.91.91 0 0 1 .196-1.187L2.737 8v-.354l-.904-.805a.91.91 0 0 1-.196-1.169L2.766 3.81a.94.94 0 0 1 .35-.341a1 1 0 0 1 .477-.125a1 1 0 0 1 .306.028l1.138.4q.305-.195.632-.349l.244-1.173a.93.93 0 0 1 .338-.544a.97.97 0 0 1 .618-.206h2.238a.97.97 0 0 1 .618.206c.175.137.295.33.338.544l.244 1.173q.325.155.627.35l1.162-.382a.98.98 0 0 1 .784.078c.145.082.265.2.35.34l1.128 1.863a.91.91 0 0 1-.182 1.187l-.918.782z"></path>
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0a2.5 2.5 0 0 1 5 0Z"></path>
                    </g>
                  </svg>
                  &nbsp; ตั้งค่า
                </a>
                <a className="dropdown-item" href="#">
                  <i className="dw dw-help" />{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="#6f6e6e"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.9}
                    >
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0m9 5v.01"></path>
                      <path d="M12 13.5a1.5 1.5 0 0 1 1-1.5a2.6 2.6 0 1 0-3-4"></path>
                    </g>
                  </svg>
                  &nbsp; ความช่วยเหลือ
                </a>
                <a className="dropdown-item" href="#" onClick={() => Logout()}>
                  <i className="dw dw-logout" />{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={30}
                    height={30}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#6f6e6e"
                      d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v3h-2V4H6v16h12v-2h2v3a1 1 0 0 1-1 1zm13-6v-3h-7v-2h7V8l5 4z"
                    ></path>
                  </svg>
                  &nbsp; ออกจากระบบ{" "}
                </a>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Frmheaderitmen;
