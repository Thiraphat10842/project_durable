import { FC, useState, useEffect } from "react";
import { MDBDataTable } from "mdbreact";
import { Button, Modal } from "antd";
import axios from "axios";
import API from "../../Configs/config";
import "./informrepair.css";
import FrminformrepairuserAdd from "./frminformreuserAdd";
import Editrepair from "./editrepair";

const Frminformrepair: FC = () => {
  const [datadetail, setDatadetail] = useState([] as any);
  const [datasource, setDatasource] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [countS, setCountS] = useState(0);
  const [formType, setFormType] = useState<"add" | "edit">("add");

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCountS(countS + 1);
    }, 3000);
  };

  // const showModal = () => {
  //   setCountS(0);
  //   setOpen(true);
  // };

  const showModal = (type: "add" | "edit", ID?: string) => {
    setFormType(type); // Set the form type (add or edit)

    if (type === "edit" && ID) {
      Showdetail(ID); // If editing, fetch the details of the item
    }

    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setCountS(0);
  };

  useEffect(() => {
    Showdata();
  }, []);
  async function Showdata() {
    axios
      .get(
        API.returnURL.url +
          "Informrepair?userStr=" +
          sessionStorage.getItem("sessStr") +
          "&userID=" +
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
            <div className="d-flex justify-content-start flex-wrap">
              <button
                className="btn btn-default btn-xs m-2"
                style={{ cursor: "pointer" }}
                data-toggle="tooltip"
                data-original-title="Edit"
                onClick={() => showModal("edit", row.ID)}
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
                onClick={() => Deletedata(row.ID)}
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
          Repairdategetjob: <>{getData(row.repairDategetjob)}</>,
          
          repairFile1: (
            <a
              href={row.repairFile1 ? `${API.returnURL.url}Informrepair/Downloadfile?fileId=${row.repairFile1}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#007bff", textDecoration: "underline" }}
              aria-label="View repair file"
            >
              {row.repairFile1 ? 'ดูไฟล์' : 'ไฟล์ไม่พบ'}
            </a>
          ),
          

        }));

        Mydata = {
          columns: [
            // { label: "ID", field: "ID", sort: "asc", width: 100 },
            {
              label: "รายการ",
              field: "repairSubject",
              sort: "asc",
              width: 250,
            },
            {
              label: "หน่วยงาน",
              field: "repairOffice",
              sort: "asc",
              width: 200,
            },
            {
              label: "วันที่แจ้ง",
              field: "repairDatesave",
              sort: "asc",
              width: 200,
            },
            { label: "เบอร์ติดต่อ", field: "repairTel", sort: "asc", width: 150 },
            { label: "ผู้รับผิดชอบ", field: "user3", sort: "asc", width: 200 },
            {
              label: "ไฟล์อัปโหลด",
              field: "repairFile1",
              sort: "asc",
              width: 130,
            },
            { label: "", field: "Edit", sort: "asc", width: 250 },
          ],
          rows,
        };

        setDatasource(Mydata);
      });
  }

  async function Showdetail(ID: string) {
    axios
      .get(API.returnURL.url + "Informrepair/Showdataedit?ID=" + ID)
      .then(function (response) {
        setDatadetail(response.data);
      });
  }

  async function Deletedata(ID: string) {
    var conF = window.confirm("คุณต้องการยกเลิกรายการนี้ใช่หรือไม่ ?");
    if (conF == true) {
      axios
        .delete(API.returnURL.url + "Informrepair?ID=" + ID, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          Showdata();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  }

  function getData(todate: string) {
    const date = new Date(todate);
    const formatter = new Intl.DateTimeFormat("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formatter.format(date);
  }

  return (
    <div>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">แจ้งปัญหางานด้าน IT </h4>
            <div className="ms-auto text-end">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/Admin">หน้าหลัก</a>
                  </li>
                  <li className="breadcrumb-item" aria-current="page">
                    แจ้งปัญหาด้านงาน IT
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    ขอโปรแกรมและรายงาน
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
                <h5 className="card-title mb-0">ขอโปรแกรมและรายงาน</h5>
                <div className="ms-auto text-end">
                  <button
                    type="button"
                    className="btn btn-info btn-sm"
                    onClick={() => showModal("add")}
                  >
                    <i className="me-2 mdi mdi-account-plus" />
                    แจ้งขอโปรแกรมรายงาน
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
        title={formType === "add" ? "ขอโปรแกรมและข้อมูลสารสนเทศกลุ่มงานดิจิทัลการแพทย์" : "แก้ไข"}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"60%"}
        footer={
          [
            // <Button key="back" onClick={handleCancel}>
            //     ยกเลิก
            // </Button>,
          ]
        }
      >
        {/* <FrminformrepairAdd datadetail={datadetail} countS={countS} setReload={() => {}} reload={false} /> */}
        {formType === "add" ? (
          <FrminformrepairuserAdd
            datadetail={datadetail}
            countS={countS}
            setReload={() => {}}
            reload={false}
          />
        ) : (
          <Editrepair
            datadetail={datadetail}
            countS={countS}
            setReload={() => {}}
            reload={false}
          />
        )}

        
      </Modal>
    </div>
  );
};

export default Frminformrepair;
