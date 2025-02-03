import { FC, useState, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { MDBDataTable } from "mdbreact";
import axios from 'axios';
import API from "../../../Configs/config"
import FrmdurableAdd from './FrmdurableITmenAdd';
import { toast } from "react-toastify";
import Select from 'react-select';
import './durable.css'

const FrmdurableITmen: FC = () => {

    const txtinput = { Categoryid: '', Categoryname: '' }
    const [inputdata, setInputdata] = useState(txtinput);
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

        Showdata();

    }, [inputdata.Categoryid])


    async function Showdata() {

        axios.get(API.returnURL.url + "Computers/showcomputer?categoryID=" + inputdata.Categoryid)
            .then(function (response) {

                //console.log(response.data);
                let Mydata = response.data;
                let { rows } = response.data;
                rows = Mydata.map((row: any, key: number) => ({
                    ...row,
                    Edit: (
                        <div style={{ float: 'left' }}>
                            <button className="btn btn-default btn-xs m-r-5" style={{ cursor: 'pointer' }} data-toggle="tooltip" data-original-title="Edit" onClick={() => (Showdetail(row.ID), setOpen(true))} ><i className="me-2 mdi mdi-pencil" />แก้ไข</button>
                            <button className="btn btn-danger btn-xs m-r-5" style={{ cursor: 'pointer' }} data-toggle="tooltip" data-original-title="Delete" onClick={() => DeleteOffice(row.ID)} ><i className="me-2 mdi mdi-delete-forever" />ยกเลิก</button>
                        </div>
                    ),

                }));

                Mydata = {
                    columns: [
                        {
                            label: 'ID',
                            field: 'ID',
                            sort: 'asc',
                            width: 100
                        },

                        {
                            label: 'เลขครุภัณฑ์',
                            field: 'Durableid',
                            sort: 'asc',
                            width: 200
                        },
                        {
                            label: 'รายการครุภัณฑ์',
                            field: 'Productname',
                            sort: 'asc',
                            width: 200
                        },
                        {
                            label: 'Serialnumber',
                            field: 'Serialnumber',
                            sort: 'asc',
                            width: 100
                        },
                        {
                            label: 'ประเภท',
                            field: 'Receiving',
                            sort: 'asc',
                            width: 100
                        },
                        {
                            label: 'วันที่ลงรับ',
                            field: 'ReceiveDate',
                            sort: 'asc',
                            width: 100
                        },
                        {
                            label: 'หมวด',
                            field: 'Categoryname',
                            sort: 'asc',
                            width: 150
                        },
                        {
                            label: 'ผู้ดูแล',
                            field: 'Owner',
                            sort: 'asc',
                            width: 150
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

    async function Showdetail(ID: any) {

        axios.get(API.returnURL.url + "Computers/Showedit?ID=" + ID)
            .then(function (response) {

                //console.log(response.data);
                setDatadetail(response.data);

            });

    }

    async function DeleteOffice(ID: string) {
        var confirm = window.confirm("คุณต้องการลบหน่วยงานนี้หรือไม่ ?")
        if (confirm == true) {

            axios.delete(API.returnURL.url + "Computers?ID=" + ID, {
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then(response => {
                toast.success("ทำการลบอุปกรณ์เรียบร้อย");
                Showdata();
            }).catch(error => {
                console.error("Error deleting Hardware", error)
            })



        }
    }

    const handleCategoryChange = (selectedOption: any) => {

        setInputdata({
            ...inputdata,
            Categoryid: selectedOption?.value,
            Categoryname: selectedOption?.label
        });

        Showdata();

    };

    return (
        <div>
            <div className="page-breadcrumb">
                <div className="row">
                    <div className="col-12 d-flex no-block align-items-center">
                    <h4 className="page-title mt-3 mb-3 text-center">จัดการข้อมูลครุภัณฑ์</h4>

                        <div className="ms-auto text-end">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item"><a href="/Admin">หน้าหลัก</a></li>
                                    <li className="breadcrumb-item" aria-current="page">ครุภัณฑ์คอมพิวเตอร์</li>
                                    <li className="breadcrumb-item active" aria-current="page">ทะเบียนครุภัณฑ์</li>
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
                                {/* <h5 className="card-title mb-0">ข้อมูลครุภัณฑ์</h5> */}
                                <div className="col-4 select-container">
                                <label className="label-category">เลือกดูตามหมวดหมู่</label>
                                    <Select  className="select-category"
                                        // styles={customStyles}
                                        value={{ value: inputdata.Categoryid, label: inputdata.Categoryname }}
                                        options={[
                                            { value: '', label: '---ทั้งหมด---' },
                                            { value: '01', label: 'คอมพิวเตอร์' },
                                            { value: '04', label: 'จอและโปรเจคเตอร์' },
                                            { value: '05', label: 'เครื่องปริ้นและเครื่องสแกน' },
                                            { value: '14', label: 'แท็บเล็ต' },

                                        ]}
                                        onChange={handleCategoryChange}
                                    />
                                </div>
                                <div className="ms-auto text-end">
                                    <button type="button" className="btn btn-info btn-sm" onClick={showModal}>
                                        <i className="me-2 mdi mdi-account-plus" />เพิ่มรายการใหม่
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
                title="จัดการข้อมูลครุภัณฑ์ Computer"
                onOk={handleOk}
                onCancel={handleCancel}
                width={'60%'}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        ยกเลิก
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
                        บันทึก
                    </Button>,
                ]}
            >

                <FrmdurableAdd datadetail={datadetail} countS={countS} />

            </Modal>

        </div>
    )
}

export default FrmdurableITmen