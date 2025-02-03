import { FC, useState, useEffect } from 'react'
import axios from 'axios';
import API from '../../Configs/config';
import { toast } from 'react-toastify';
import './styleoffice.css'

interface userProps {
    datadetail: any;
    countS: any;
}

const EditofficeAdd: FC<userProps> = ({ datadetail, countS }) => {

    const txtInput = {
        tID: '', tTname: ''
    }
    const [inputdata, setInputdata] = useState(txtInput);

    useEffect(() => {
        if (countS != "0") {
            Saveedit();
        } else {
            Cleartext();
        }
    }, [countS])

    useEffect(() => {
        if (datadetail != null) {
            Showdatadetail();
        }
    }, [datadetail])

    async function Showdatadetail() {
        setInputdata({
            ...inputdata, tID: datadetail[0]?.value, tTname: datadetail[0]?.label
        });
    }

    // ฟังก์ชันบันทึก/แก้ไขข้อมูล
    async function Saveedit() {
        if (inputdata.tTname === "") {
            toast.error("กรุณากรอกชื่อของหน่วยงาน !");
            document.getElementById("tTname")?.focus();
            return false;
        } else {
            const frmdata = new FormData();
            frmdata.append("value", inputdata.tID);
            frmdata.append("label", inputdata.tTname);
            axios.post(API.returnURL.url + "Office", frmdata)
                .then((response) => {
                    if (response.data === "0") {
                        toast.success("ระบบทำการบันทึกข้อมูลเรียบร้อยแล้วครับ");
                        setTimeout(() => {
                            Cleartext();
                            window.location.reload(); 
                        }, 1300);  
                    } else if (response.data === "1") {
                        toast.warning("ระบบตรวจพบว่ามีชื่อหน่วยงานนี้ในระบบแล้วครับ");
                        document.getElementById("tTname")?.focus();
                    } else {
                        toast.success("ระบบทำการบันทึกแก้ไขข้อมูลเรียบร้อยแล้วครับ");
                        setTimeout(() => {
                            Cleartext();
                            window.location.reload(); 
                        }, 1300);  
                    }
                    Showdatadetail(); 
                })
                .catch((error) => {
                    toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล Error " + error);
                    console.log(error);
                });
        }
    }

    // ฟังก์ชันล้างข้อมูล
    async function Cleartext() {
        setInputdata(txtInput);
    }

    return (
        <div>
            <form>
                <div className="row">
                    <div className="col-md-5 col-sm-12">
                        <div className="form-group">
                            <label>รหัส</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tFname"
                                value={inputdata.tID}
                                onChange={(even) => setInputdata({ ...inputdata, tID: even.target.value })}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="col-md-7 col-sm-12">
                        <div className="form-group">
                            <label>ชื่อหน่วยงาน</label>
                            <input
                                type="text"
                                className="form-control"
                                id="tTname"
                                value={inputdata.tTname}
                                onChange={(even) => setInputdata({ ...inputdata, tTname: even.target.value })}
                            />
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-dismiss="modal"
                            onClick={() => Cleartext()}
                        >
                            ยกเลิก
                        </button>
                        <button
                            type="button"
                            className="btn btn-custom-blue" 
                            onClick={() => Saveedit()}
                        >
                            บันทึกการแก้ไข
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditofficeAdd
