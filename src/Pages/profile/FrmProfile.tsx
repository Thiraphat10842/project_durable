import { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import axios from "axios";
import API from "../../Configs/config";
import { toast } from "react-toastify";
import "./styeprofile.css";
import Register from "../Users/Frmregister";

const FrmProfile: FC = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [datasource, setDatasource] = useState([] as any);
  const [datadetail, setDatadetail] = useState([] as any);
  const [countS, setCountS] = useState(0);

  const showModal = () => {
    setCountS(0);
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCountS(countS + 1);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    setCountS(0);
  };

  useEffect(() => {
    Showdatauser();
  }, []);

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
          Edit: (
            <button
              className="btn btn-default btn-xs m-r-5"
              style={{ cursor: "pointer" }}
              onClick={() => (Showdetail(row.ID), setOpen(true))}
            >
              <i className="me-2 mdi mdi-pencil" />
              แก้ไข
            </button>
          ),
        }));

        setDatasource(rows);
      });
  }

  async function Showdetail(userID: any) {
    axios
      .get(API.returnURL.url + "Personnel?userID=" + userID)
      .then(function (response) {
        setDatadetail(response.data);
      });
  }

  return (
    <div style={{ top: 0 }}>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">จัดการโปรไฟล์</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/user">หน้าหลัก</a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    จัดการโปรไฟล์
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    โปรไฟล์
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <div className="card">
              {/* แสดงข้อมูลผู้ใช้งานในรูปแบบของรายการ */}
              <div className="list-group">
                {datasource.map((row: any, index: number) => (
                  <div key={index} className="list-group-item">
                    <div className="profile-image">
                      <img
                        src={`data:image/jpeg;base64,${row.Img}`} // ใช้ Base64 แทน URL
                        className="img-fluid rounded-circle"
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <h6 className="custom-heading"> 
                      ชื่อ{row.fullName} ({row.Position})
                    </h6>
                    {/* แสดงข้อความตามค่า row.Str */}
                    <p>
                      บทบาท: &nbsp;
                      {row.Str === "1"
                        ? "Admin"
                        : row.Str === "2"
                        ? "ITmen"
                        : row.Str === "3"
                        ? "User"
                        : "Unknown"}
                    </p>

                    <p>หน่วยงาน: &nbsp; {row.Officename}</p>
                    <p>อีเมล: &nbsp; {row.Emailaddress}</p>
                    <p> ID Line: &nbsp; {row.LineID}</p>
                    <p>เบอร์โทรศัพท์: &nbsp; {row.Tel}</p>
                    <div>{row.Edit}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        title="จัดการข้อมูลผู้ใช้งาน"
        onOk={handleOk}
        onCancel={handleCancel}
        width={"50%"}
        footer={null}
      >
        <Register datadetail={datadetail} countS={countS} />
      </Modal>
    </div>
  );
};

export default FrmProfile;
