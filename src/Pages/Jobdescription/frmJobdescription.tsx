import React from 'react'
import { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import API from "../../Configs/config";
import JobdescriptionAdd from './frmJobdescriptionAdd';
import JobdescriptionEdit from './frmJobdescriptionEdit';

function frmJobdescription() {
  
  const [datasource, setDatasource] = useState([] as any);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countS, setCountS] = useState(0);
  const [reload, setReload] = useState<boolean>(false);
  const [datadetail, setDatadetail] = useState([] as any);
  const [formType, setFormType] = useState<"add" | "edit">("add");

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCountS(countS + 1);
      //setOpen(false);
    }, 3000);
  };

  // const showModal = () => {
  //   setCountS(0);
  //   setOpen(true);
  // };

  const showModal = (type: "add" | "edit", ID?: string) => {
    setFormType(type); // Set the form type (add or edit)

    if (type === "edit" && ID) {
      Showdataedit(ID); // If editing, fetch the details of the item
    }
    setCountS(0);
    setOpen(true);
  };


  const handleCancel = () => {
    setOpen(false);
    setCountS(0);
  };


  async function ShowReturnlist() {
    axios
      .get(API.returnURL.url + "Jobdescription/Jobdescriptionlist")
      .then(function (response) {
        console.log(response.data);
        let Mydata = response.data;
        let { rows } = response.data;
        rows = Mydata.map((row: any, key: number) => ({
          ...row,
          Edit: (
            <div style={{ float: "left" }}>
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
                ส่งงาน
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
        }));

        Mydata = {
          columns: [
            // {
            //   label: "ID",
            //   field: "ID",
            //   sort: "asc",
            //   width: 100,
            // },
            {
              label: "ชื่อผู้แจ้ง",
              field: "userinFormer",
              sort: "asc",
              width: 200,
            },
            {
              label: "หน่วยงาน",
              field: "Officename",
              sort: "asc",
              width: 175,
            },
            {
              label: "เบอร์ติดต่อ",
              field: "tel",
              sort: "asc",
              width: 100,
            },
            {
              label: "Jobdescription",
              field: "symptom",
              sort: "asc",
              width: 150,
            },
            {
              label: "รายละเอียดเพิ่มเติม",
              field: "Other",
              sort: "asc",
              width: 150,
            },
            {
              label: "ผู้รับแจ้ง",
              field: "fullName1",
              sort: "asc",
              width: 200,
            },
            
            {
              label: "ผู้รับงาน",
              field: "fullName2",
              sort: "asc",
              width: 200,
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

  useEffect(() => {
    ShowReturnlist();
  }, [reload]);

  async function Showdataedit(ID: string) {
    axios
      .get(API.returnURL.url + "Jobdescription/Showdataedit?ID=" + ID)
      .then(function (response) {
        console.log(response);
        setDatadetail(response.data);
        // console.log(Lendid)
        console.log(datadetail)
      });
  }
  async function Deletedata(ID: string) {
    var conF = window.confirm("คุณต้องการยกเลิกรายการนี้ใช่หรือไม่ ?");
    if (conF == true) {
      axios
        .delete(API.returnURL.url + "Jobdescription?ID=" + ID, {
          headers: { "Content-Type": "application/json" },
        })
        .then((response) => {
          ShowReturnlist();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    }
  }

return (
  <div>
  <div className="page-breadcrumb">
    <div className="row">
      <div className="col-12 d-flex no-block align-items-center">
        <h4 className="page-title">ภาระงาน</h4>
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
               Jobdescription
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
            <h5 className="card-title mb-0">จัดการภาระงาน</h5>
            <div className="ms-auto text-end">
                                    <button type="button" className="btn btn-info btn-sm" onClick={() => showModal("add")}>
                                        <i className="me-2 mdi mdi-account-plus" />เพิ่มJobdescription
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
    title={formType === "add" ? "จัดการ Jobdescription (สำหรับรายงานภาระงานที่ได้รับมอบหมาย)" : "แก้ไข"}
    onOk={handleOk}
    onCancel={handleCancel}
    width={"60%"}
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
    {/* <JobdescriptionAdd
      datadetail={datadetail}
      countS={countS}
      setReload={setReload}
      reload={reload}
    /> */}

{formType === "add" ? (
          <JobdescriptionAdd
            datadetail={datadetail}
            countS={countS}
            setReload={() => {}}
            reload={false}
          />
        ) : (
          <JobdescriptionEdit
            datadetail={datadetail}
            countS={countS}
            setReload={() => {}}
            reload={false}
          />
        )}
  </Modal>
</div>
)
}

export default frmJobdescription
