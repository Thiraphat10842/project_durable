import { FC, useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { MDBDataTable } from "mdbreact";
import axios from 'axios';
import API from '../../Configs/config';
import Officeadd from './FrmofficeAdd';
import { toast } from "react-toastify";
import EditofficeAdd from './editofficeAdd';  // นำเข้า EditofficeAdd

const Frmoffice: FC = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [datasource, setDatasource] = useState([] as any);
    const [datadetail, setDatadetail] = useState([] as any);
    const [countS, setCountS] = useState(0);

    // เปิด Modal สำหรับการเพิ่มข้อมูลใหม่
    const showModalAdd = () => {
        setCountS(0);  // ส่งค่า countS เป็น 0 เมื่อเปิดฟอร์มเพิ่มข้อมูลใหม่
        setOpen(true);
    };

    // เปิด Modal สำหรับการแก้ไขข้อมูล
    const showModalEdit = (userID: any) => {
        setCountS(1);  // ส่งค่า countS เป็น 1 เมื่อเปิดฟอร์มแก้ไขข้อมูล
        Showdetail(userID);  // ดึงข้อมูลของหน่วยงานที่ต้องการแก้ไข
        setOpen(true);
    };

    // ปิด Modal
    const handleCancel = () => {
        setOpen(false);
        setCountS(0);  // รีเซ็ตค่า countS เมื่อปิด Modal
    };

    // ฟังก์ชันสำหรับการดึงข้อมูลทั้งหมดจาก API
    useEffect(() => {
        Showdata();
    }, []);

    // ดึงข้อมูลทั้งหมดของหน่วยงาน
    async function Showdata() {
        axios.get(API.returnURL.url + "Office")
            .then(function (response) {
                let Mydata = response.data;
                let { rows } = response.data;
                rows = Mydata.map((row: any, key: number) => ({
                    ...row,
                    Edit: (
                        <div style={{ float: 'left' }}>
                            <button
                                className="btn btn-default btn-xs m-r-5"
                                style={{ cursor: 'pointer' }}
                                data-toggle="tooltip"
                                data-original-title="Edit"
                                onClick={() => showModalEdit(row.value)}  // ใช้ showModalEdit เมื่อคลิกแก้ไข
                            >
                                <i className="me-2 mdi mdi-pencil" />แก้ไข
                            </button>
                            <button
                                className="btn btn-danger btn-xs m-r-5"
                                style={{ cursor: 'pointer' }}
                                data-toggle="tooltip"
                                data-original-title="Delete"
                                onClick={() => DeleteOffice(row.value)}
                            >
                                <i className="me-2 mdi mdi-delete-forever" />ลบ
                            </button>
                        </div>
                    ),
                }));

                Mydata = {
                    columns: [
                        {
                            label: 'ID',
                            field: 'value',
                            sort: 'asc',
                            width: 200
                        },
                        {
                            label: 'ชื่อหน่วยงาน',
                            field: 'label',
                            sort: 'asc',
                            width: 850
                        },
                        {
                            label: '',
                            field: 'Edit',
                            sort: 'asc',
                            width: 300
                        }
                    ],
                    rows
                };

                setDatasource(Mydata);
            });
    }

    // ดึงข้อมูลหน่วยงานที่ต้องการแก้ไข
    async function Showdetail(userID: any) {
        axios.get(API.returnURL.url + "Office/Showedit?OfficeID=" + userID)
            .then(function (response) {
                setDatadetail(response.data);  // อัพเดตข้อมูลที่ต้องการแก้ไข
            });
    }

    // ฟังก์ชันสำหรับลบหน่วยงาน
    async function DeleteOffice(ID: string) {
        var confirm = window.confirm("คุณต้องการลบหน่วยงานนี้หรือไม่ ?");
        if (confirm === true) {
            axios.delete(API.returnURL.url + "Office/Delete?Officeid=" + ID, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(response => {
                toast.success("ทำการลบอุปกรณ์เรียบร้อย");
                Showdata();  // รีเฟรชข้อมูลหลังจากลบ
            }).catch(error => {
                console.error("Error deleting Hardware", error);
            });
        }
    }

    return (
        <div>
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">จัดการหน่วยงาน</h4>
                        <div className="ms-auto text-end">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/Admin">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item" aria-current="page">จัดการผู้ใช้งาน</li>
                                    <li className="breadcrumb-item active" aria-current="page">หน่วยงาน</li>
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
                                <h5 className="card-title mb-0">ข้อมูลหน่วยงาน</h5>
                                <div className="ms-auto text-end">
                                    <button
                                        type="button"
                                        className="btn btn-info btn-sm"
                                        onClick={showModalAdd}  // เปิดฟอร์มเพิ่ม
                                    >
                                        <i className="me-2 mdi mdi-account-plus" />เพิ่มรายการใหม่
                                    </button>
                                </div>
                            </div>

                            <div style={{ height: '100%' }}>
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
                title={countS === 0 ? "เพิ่มข้อมูลหน่วยงาน" : "แก้ไขข้อมูลหน่วยงาน"}  // แสดงชื่อ Modal ตาม context
                onCancel={handleCancel}
                width={"50%"}
                footer={[]}
            >
                {/* ใช้ Officeadd เมื่อ countS เป็น 0 และใช้ EditofficeAdd เมื่อ countS เป็น 1 */}
                {countS === 0 ? (
                    <Officeadd datadetail={datadetail} countS={countS} />
                ) : (
                    <EditofficeAdd datadetail={datadetail} countS={countS} />
                )}
            </Modal>

        </div>
    );
};

export default Frmoffice;
