import { FC, useState, useEffect } from "react";
import {Modal } from "antd";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import API from "../../../Configs/config"
import FrmITmenadd from "./FrmlendingITmenAdd";
import { toast } from "react-toastify";
import "./Lending.css";

const FrmlendingITmen: FC = () => {
  const txtinput = { Categoryid: "", Categoryname: "" };
  const [inputdata, setInputdata] = useState(txtinput);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [datasource, setDatasource] = useState([] as any);
  const [datadetail, setDatadetail] = useState([] as any);
  const [countS, setCountS] = useState(0);
  const [reload, setReload] = useState<boolean>(false);

  const showModal = () => {
    setCountS(0);
    setOpen(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCountS(countS + 1);
      //setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
    setCountS(0);
  };

  useEffect(() => {
    Showdata();
  }, [inputdata.Categoryid]);

  async function ShoweditLend(Lendid: string) {
    axios
      .get(API.returnURL.url + "Lending/Showedit?Lendid=" + Lendid)
      .then(function (response) {
        console.log(response);
        setDatadetail(response.data);
        console.log(Lendid);
        console.log(datadetail)
      });
  }

  async function Showdata() {
    axios
      .get(
        API.returnURL.url +
          "Lending?userID=" +
          sessionStorage.getItem("sessID") +
          "&str=" +
          sessionStorage.getItem("sessStr")
      )
      .then(function (response) {
        // console.log(response.data);
        let Mydata = response.data;
        let { rows } = response.data;
        rows = Mydata.map((row: any, key: number) => ({
          ...row,
          Edit: (
            <div className="d-flex justify-content-start flex-wrap">
              <button
                className="btn btn-default btn-xs m-2"
                style={{ cursor: "pointer" }}
                data-toggle="tooltip"
                data-original-title="Edit"
                onClick={() => (ShoweditLend(row.Lendid), setOpen(true))}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M18.58 2.944a2 2 0 0 0-2.828 0L14.107 4.59l5.303 5.303l1.645-1.644a2 2 0 0 0 0-2.829zm-.584 8.363l-5.303-5.303l-8.835 8.835l-1.076 6.38l6.38-1.077z"
                  ></path>
                </svg>{" "}
                แก้ไข
              </button>

              <button
                className="btn btn-danger btn-xs m-2"
                style={{ cursor: "pointer" }}
                data-toggle="tooltip"
                data-original-title="Delete"
                onClick={() => DeleteOffice(row.Lendid)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="#fff"
                    d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                  ></path>
                </svg>{" "}
                ยกเลิก
              </button>
            </div>
          ),
        }));

        Mydata = {
          columns: [
            {
              label: "เลขการยืม",
              field: "Lendid",
              sort: "asc",
              width: 100,
            },
            {
              label: "ชื่อผู้ยืม",
              field: "fullname_lend",
              sort: "asc",
              width: 200,
            },
            {
              label: "วันที่มารับ",
              field: "startDate",
              sort: "asc",
              width: 175,
            },
            {
              label: "เลขครุภัณฑ์",
              field: "Durableid",
              sort: "asc",
              width: 200,
            },
            {
              label: "ชื่อครุภัณฑ์",
              field: "Productname",
              sort: "asc",
              width: 170,
            },
            {
              label: "ประเภท",
              field: "Categoryname",
              sort: "asc",
              width: 100,
            },
            {
              label: "สถานะ",
              field: "Lendstatus",
              sort: "asc",
              width: 100,
            },
            {
              label: "รายละเอียด",
              field: "Lendtitle",
              sort: "asc",
              width: 250,
            },
            {
              label: "",
              field: "Edit",
              sort: "asc",
              width: 250,
            },
          ],
          rows,
        };

        setDatasource(Mydata);
      });
  }

  async function DeleteOffice(ID: string) {
    var confirm = window.confirm("คุณต้องการลบหน่วยงานนี้หรือไม่ ?");
    if (confirm == true) {
      axios
        .delete(API.returnURL.url + "Lending/Delete?Lendid=" + ID, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          toast.success("ทำการลบอุปกรณ์เรียบร้อย");
          Showdata();
        })
        .catch((error) => {
          console.error("Error deleting Hardware", error);
        });
    }
  }

  return (
    <div>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title"> จัดการครุภัณฑ์คอมพิวเตอร์</h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/Admin">หน้าหลัก</a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    ระบบยืมคืนคอมพิวเตอร์
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    ยืมครุภัณฑ์คอมพิวเตอร์
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
              <div className="card-body ol-12 d-flex no-block align-items-center">
                <h5 className="card-title mb-0">ยืมครุภัณฑ์คอมพิวเตอร์</h5>
                <div className="ms-auto text-end">
                  <button
                    type="button"
                    className="btn btn-info btn-sm"
                    onClick={showModal}
                  >
                    <i className="me-2 mdi mdi-account-plus" />
                    เพิ่มรายการใหม่
                  </button>
                </div>
              </div>

              <div style={{ height: "100%" }}>
                <MDBDataTable
                  striped
                  hover
                  scrollY
                  maxHeight="100vh"
                  data={datasource}
                  searchLabel="ค้นหา"
                  infoLabel={["จำนวน", "ถึง", "จากทั้งหมด", "รายการ"]}
                  paginationLabel={["หน้าก่อน", "ถัดไป"]}
                  entriesLabel="แสดงจำนวนรายการ"
                  className="custom-mdb-table" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        open={open}
        title="ยืมครุภัณฑ์คอมพิวเตอร์"
        onOk={handleOk}
        onCancel={handleCancel}
        width={"60%"}
        className="show-entries" // ใช้คลาสที่กำหนดใน CSS
        footer={
          [
            // <Button key="back" onClick={handleCancel}>
            //     ยกเลิก
            // </Button>,
            // <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            //     บันทึก
            // </Button>,
          ]
        }
      >
        <FrmITmenadd
          datadetail={datadetail}
          countS={countS}
          setReload={setReload}
          reload={reload}
        />
      </Modal>
    </div>
  );
};

export default FrmlendingITmen;
