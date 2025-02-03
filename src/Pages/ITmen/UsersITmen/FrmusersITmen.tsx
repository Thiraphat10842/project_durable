import { FC, useState, useEffect } from 'react'
import { Button, Modal } from 'antd';
import { MDBDataTable } from "mdbreact";
import axios from 'axios';
import API from "../../../Configs/config"
import Register from './Frmregister';
import { toast } from "react-toastify";
import './styeluser.css'
const FrmusersITmen: FC = () => {

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
            //setOpen(false);
        }, 3000);
    };

    const handleCancel = () => {
        setOpen(false);
        setCountS(0);
    };

    useEffect(() => {

        Showdatauser();

    }, [])


    async function Showdatauser() {
        let userID: String = "";
        if (sessionStorage.getItem('sessStr') != "1") {
            userID = sessionStorage.getItem('sessName') || '';
        }

        axios.get(API.returnURL.url + "Personnel?userID=" + userID)
            .then(function (response) {

                //console.log(response.data);
                let Mydata = response.data;
                let { rows } = response.data;
                rows = Mydata.map((row: any, key: number) => ({
                    ...row,
                    fullName: (
                        <>{row.Tname}{row.Fname} {row.Lname}</>
                    ),
                    Edit: (
                        <>
                            <button className="btn btn-default btn-xs m-r-5" style={{ cursor: 'pointer' }} data-toggle="tooltip" data-original-title="Edit" onClick={() => (Showdetail(row.ID), setOpen(true))} ><i className="me-2 mdi mdi-pencil" />แก้ไข</button>
                            <button className="btn btn-danger btn-xs m-r-5" style={{ cursor: 'pointer' }} data-toggle="tooltip" data-original-title="Delete" onClick={() => DeleteOffice(row.ID)} ><i className="me-2 mdi mdi-delete-forever" />ลบ</button>
                        </>
                    ),

                }));

                Mydata = {
                    columns: [
                        {
                            label: 'ลำดับ',
                            field: 'ID',
                            sort: 'asc',
                            width: 20
                        },
                        {
                            label: 'ชื่อ-สกุล',
                            field: 'fullName',
                            sort: 'asc',
                            width: 500
                        },
                        {
                            label: 'ตำแหน่ง',
                            field: 'Position',
                            sort: 'asc',
                            width: 500
                        },
                        {
                            label: 'หน่วยงาน',
                            field: 'Officename',
                            sort: 'asc',
                            width: 500
                        },
                        {
                            label: 'เบอร์โทร',
                            field: 'Tel',
                            sort: 'asc',
                            width: 500
                        },
                        {
                            label: 'บทบาท',
                            field: 'Str',
                            sort: 'asc',
                            width: 50
                        },
                        {
                            label: '#',
                            field: 'Edit',
                            sort: 'asc',
                            width: 200
                        }
                    ],
                    rows
                };

                setDatasource(Mydata);

            });

    }

    async function Showdetail(userID: any) {

        axios.get(API.returnURL.url + "Personnel?userID=" + userID)
            .then(function (response) {

                setDatadetail(response.data);

            });

    }

    async function DeleteOffice(ID: string) {
        var confirm = window.confirm("คุณต้องการลบหน่วยงานนี้หรือไม่ ?")
        if (confirm == true) {

            axios.delete(API.returnURL.url + "Personnel?ID=" + ID, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(response => {
                toast.success("ทำการลบอุปกรณ์เรียบร้อย");
                Showdatauser();
            }).catch(error => {
                console.error("Error deleting Hardware", error)
            })



        }
    }


    return (
        <div style={{ top: 0 }}>
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                        <h4 className="page-title">จัดการผู้ใช้งาน</h4>
                        <div className="ms-auto text-end">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/Admin">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item" aria-current="page">จัดการผู้ใช้งาน</li>
                                    <li className="breadcrumb-item active" aria-current="page">ผู้ใช้งาน</li>
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
                                <h5 className="card-title mb-0">ข้อมูลผู้ใช้งาน</h5>
                                <div className="ms-auto text-end">
                                    <button type="button" className="btn btn-info btn-sm" onClick={showModal}>
                                        <i className="me-2 mdi mdi-account-plus" />เพิ่มผู้ใช้งาน
                                    </button>
                                </div>
                            </div>

                            <MDBDataTable
                                striped
                                hover
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

            <Modal
                open={open}
                title="จัดการข้อมูลผู้ใช้งาน"
                onOk={handleOk}
                onCancel={handleCancel}
                width={'50%'}
                footer={[
                    // <Button key="back" onClick={handleCancel}>
                    //     ยกเลิก
                    // </Button>,
                    // <Button key="submit" type="primary" loading={loading} onClick={handleOk}  className="btn btn-custom-blue" >
                    //     บันทึก
                    // </Button>,
                ]}
            >

                <Register datadetail={datadetail} countS={countS} />

            </Modal>

        </div>

    )
}

export default FrmusersITmen
