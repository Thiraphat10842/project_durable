import { FC, useState, useEffect } from "react";
import { Modal } from "antd";
import { MDBDataTable } from "mdbreact";
import axios from "axios";
import API from "../../../Configs/config"
import ReturnequipmenITmenAdd from "./frmreturnequipmentITmenAdd";

function frmreturnequipmentITmen() {
  const [datasource, setDatasource] = useState([] as any);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countS, setCountS] = useState(0);
  const [reload, setReload] = useState<boolean>(false);
  const [datadetail, setDatadetail] = useState([] as any);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCountS(countS + 1);
      //setOpen(false);
    }, 3000);
  };

  const showModal = () => {
    setCountS(0);
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
    setCountS(0);
  };

  async function ShowReturnlist() {
    axios
      .get(API.returnURL.url + "Lending/Returndurable")
      .then(function (response) {
        console.log(response.data);
        let Mydata = response.data;
        let { rows } = response.data;
        rows = Mydata.map((row: any, key: number) => ({
          ...row,
          Edit: (
            <div style={{ float: "left" }}>
              <button
                className="btn btn-default btn-xs m-r-5"
                style={{ cursor: "pointer" }}
                data-toggle="tooltip"
                data-original-title="Edit"
                onClick={() => (ShoweditLend(rows[key].Lendid), setOpen(true))}
              >
                <i className="me-2 mdi mdi-pencil" />
                คืนครุภัณฑ์{" "}
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
            // {
            //     label: 'รายละเอียด',
            //     field: 'Lendtitle',
            //     sort: 'asc',
            //     width: 250
            // },
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
              width: 250,
            },
            // {
            //     label: 'ประเภท',
            //     field: 'Categoryname',
            //     sort: 'asc',
            //     width: 100,
            // },
            {
              label: "สถานะ",
              field: "Returnstatus",
              sort: "asc",
              width: 100,
            },
            {
              label: "",
              field: "Edit",
              sort: "asc",
              width: 180,
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

  async function ShoweditLend(Lendid: string) {
    axios
      .get(API.returnURL.url + "Lending/Returndurable?Lendid=" + Lendid)
      .then(function (response) {
        console.log(response);
        setDatadetail(response.data);
        console.log(Lendid)
        // console.log(datadetail)
      });
  }


  return (
    <div>
      <div className="page-breadcrumb">
        <div className="row">
          <div className="col-12 d-flex no-block align-items-center">
            <h4 className="page-title">จัดการข้อมูลครุภัณฑ์</h4>
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
                    คืนครุภัณฑ์คอมพิวเตอร์
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
                <h5 className="card-title mb-0">คืนครุภัณฑ์คอมพิวเตอร์</h5>

                <div className="ms-auto text-end"></div>
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
        title="คืนครุภัณฑ์คอมพิวเตอร์"
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
        <ReturnequipmenITmenAdd
          datadetail={datadetail}
          countS={countS}
          setReload={setReload}
          reload={reload}
        />
      </Modal>
    </div>
  );
}

export default frmreturnequipmentITmen;
