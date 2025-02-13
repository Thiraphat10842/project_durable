import React, { FC, useState, useEffect, createContext } from 'react'
import axios from 'axios';
import API from '../../Configs/config';
import { Link } from 'react-router-dom';
import { MDBDataTable } from "mdbreact";
import { Button, Modal } from 'antd';
import ReportaproblemAdd from './frmreportaproblemAdd'
import Reportfrmedit from './frmedit';
// import { access } from 'fs';
import './stylereport.css'

// type ThemeContextType = "light" | "dark";
// export const datacontext = createContext<ThemeContextType>("light");

const frmreportaproblem: FC = () => {
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

    const showModal = (type: "add" | "edit", ID?: string) => {
        setFormType(type); // Set the form type (add or edit)

        if (type === "edit" && ID) {
            Showdetail(ID);  // If editing, fetch the details of the item
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
        axios.get(API.returnURL.url + "Reportproblem?userID=" + sessionStorage.getItem('sessuserID') + "&str=" + sessionStorage.getItem('sessStr'))
            .then(function (response) {
                let Mydata = response.data;
                let { rows } = response.data;
                rows = Mydata.map((row: any, key: number) => ({
                    ...row,
                    fullName: (
                        <>{row.Tname}{row.Fname} {row.Lname}</>
                    ),
                    Edit: (
                        <div className="d-flex justify-content-start flex-wrap">
                            <button className="btn btn-edit btn-xs m-r-5" style={{ cursor: 'pointer' }} onClick={() => showModal("edit", row.ID)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                    <path fill="#fff" d="M18.58 2.944a2 2 0 0 0-2.828 0L14.107 4.59l5.303 5.303l1.645-1.644a2 2 0 0 0 0-2.829zm-.584 8.363l-5.303-5.303l-8.835 8.835l-1.076 6.38l6.38-1.077z"></path>
                                </svg> แก้ไข
                            </button>
                            <button className="btn btn-delete btn-xs m-r-5" style={{ cursor: 'pointer' }} onClick={() => Deletedata(row.ID)}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 24 24">
                                    <path fill="#fff" d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"></path>
                                </svg> ลบรายการ
                            </button>
                        </div>
                    ),
                    Status: (
                        <>
                            {
                                row.Reportproblem == 'แจ้งปัญหา' && row.type == '0' ? (
                                    <>แจ้งปัญหา</>
                                ) : row.Reportproblem == 'รับแจ้ง' && row.type == '0' ? (
                                    <>รับแจ้ง</>
                                ) : row.Reportproblem == 'สั่งงาน' && row.type == '0' ? (
                                    <>สั่งงาน</>
                                ) : row.Reportproblem == 'รับงานแล้ว' && row.type == '1' ? (
                                    <>รับงานแล้ว</>
                                ) : (
                                    <>แล้วเสร็จ</>
                                )
                            }
                        </>
                    ),
                }));

                Mydata = {
                    columns: [
                        // { label: 'Personnelid', field: 'personnelID', sort: 'asc', width: 100 },
                        // { label: 'ชื่อผู้แจ้ง', field: 'userName', sort: 'asc', width: 200 },
                        { label: 'หน่วยงาน', field: 'Officename', sort: 'asc', width: 200 },
                        { label: 'วันที่', field: 'reportDate', sort: 'asc', width: 150 },
                        { label: 'เบอร์โทร', field: 'tel', sort: 'asc', width: 150 },
                        { label: 'สถานะ', field: 'Status', sort: 'asc', width: 150 },
                        { label: 'รายการแจ้ง', field: 'report', sort: 'asc', width: 200 },
                        { label: '', field: 'Edit', sort: 'asc', width: 250 }
                    ],
                    rows
                };

                setDatasource(Mydata);
            });
    }

    async function Showdetail(ID: string) {
        axios.get(API.returnURL.url + "Reportproblem/Showedit?id=" + ID)
            .then(function (response) {
                setDatadetail(response.data);
            });
    }

    async function Deletedata(ID: string) {
        var conF = window.confirm("คุณต้องการยกเลิกรายการนี้ใช่หรือไม่ ?");
        if (conF === true) {
            axios.delete(API.returnURL.url + "Reportproblem/Delete?id=" + ID, {
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {
                Showdata();
            }).catch(error => {
                console.error('Error deleting user:', error);
            });
        }
    }

    return (
        <div>
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">แจ้งปัญหางานด้าน IT</h4>
                        <div className="ms-auto text-end">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/Admin">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item" aria-current="page">แจ้งปัญหาด้านงาน IT</li>
                                    <li className="breadcrumb-item active" aria-current="page">แจ้งปัญหา</li>
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
                                <h5 className="card-title mb-0">แจ้งปัญหาด้านงาน</h5>

                                <div className="ms-auto text-end">
                                    <button type="button" className="btn btn-info btn-sm" onClick={() => showModal("add")}>
                                        แจ้งปัญหา
                                    </button>
                                </div>
                            </div>

                            <div style={{ height: '100%' }}>
                                <MDBDataTable
                                    striped
                                    hover
                                    scrollY
                                    maxHeight='100vh'
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
                title={formType === "add" ? "แจ้งปัญหางานด้าน IT" : "แก้ไขปัญหางานด้าน IT"}
                onCancel={handleCancel}
                width={'60%'}
                footer={null}  
            >
                {formType === "add" ? (
                    <ReportaproblemAdd datadetail={datadetail} countS={countS} setReload={setReload} reload={reload} />
                ) : (
                    <Reportfrmedit datadetail={datadetail} countS={countS} setReload={setReload} reload={reload} />
                )}
            </Modal>

        </div>
    );
};

export default frmreportaproblem;
