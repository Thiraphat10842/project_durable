import React, { FC, SetStateAction, Dispatch, useState, useEffect } from 'react'
import axios from 'axios';
import Select from 'react-select';
import API from "../../../Configs/config"
import { toast } from 'react-toastify';
import './stylereturn.css'

interface userProps {
    datadetail: any;
    countS: any;
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>
}


const frmreturnequipmentuserAdd: FC<userProps> = ({ datadetail, countS, reload, setReload }) => {

    const txtInput = {
        Lendid: "",
        ReturnDate: "",
        Returnstatus: "",
        Return_Person: "",
        Receive_Person: "",
        Durableid: "",

    }

    const [inputdata, setInputdata] = useState(txtInput)
    const [Lend, setLend] = useState([]);

    async function Showdetail() {
        setInputdata({
            ...inputdata,
            Lendid: datadetail[0].Lendid,
            Returnstatus: datadetail[0].Returnstatus,
            Return_Person: datadetail[0].Return_Person,
            Receive_Person: datadetail[0].Receive_Person,
            ReturnDate: datadetail[0].ReturnDate,
            Durableid: datadetail[0].Durableid,

        })
        // console.log(datadetail)
    }
    useEffect(() => {
        // console.log(datadetail)
        if (datadetail != null && datadetail != 0) {
            Showdetail()
        }
        else {
            setInputdata(txtInput)
        }
    }, [datadetail])

    async function ShowlistReturn() {
        const data = async () => {
            const rs = await axios.get(API.returnURL.url + "Lending/Returndurable")
            if (rs.status === 200) {
                const json = await rs.data
                setLend(json)
            }
        }
        data()
    }
    useEffect(() => {
        setInputdata({
            ...inputdata,
            Lendid: sessionStorage.getItem('sessLendid') || "",
            Returnstatus: sessionStorage.getItem('sessReturnstatus') || "",
            Return_Person: sessionStorage.getItem('sessReturn_Person') || "",
            Receive_Person: sessionStorage.getItem('sessName') || "",
            ReturnDate: sessionStorage.getItem('sessReturnDate') || "",
            Durableid: sessionStorage.getItem('sessDurableid') || "",


        })

        ShowlistReturn()

    }, [])
    useEffect(() => {
        ShowlistReturn()
        // setReload(!reload)
    }, [])

    async function Cleartext() {
        setInputdata(txtInput);

    }
    async function Save() {

        if (inputdata.Receive_Person == "") {
            toast.error("กรุณากรอกชื่อผู้รับคืน");
            document.getElementById("Receive_Person")?.focus();
        }
        // else if (inputdata.returnDate == "") {
        //     toast.error("กรุณาเลือกวันที่คืน");
        //     document.getElementById("Endd")?.focus();
        // }
        else if (inputdata.Return_Person == "") {
            toast.error("กรุณากรอกชื่อผู้คืน");
            document.getElementById("Return_Person")?.focus();
        }
        else if (inputdata.Durableid == "") {
            toast.error("กรุณากรอกเลขครุภัณฑ์");
            document.getElementById("tdurable")?.focus();
        }
        else {
            const frmdata = new FormData();
            frmdata.append("Lendid", inputdata.Lendid);
            frmdata.append("Returnstatus", inputdata.Returnstatus);
            frmdata.append("rtperson", inputdata.Return_Person);
            frmdata.append("receiveperson", inputdata.Receive_Person);
            // frmdata.append("rtDate", inputdata.ReturnDate);
            frmdata.append("tdurable", inputdata.Durableid)
            axios.patch(API.returnURL.url + "Lending/Returndurable", frmdata)
                .then((response) => {
                    if (response.data == "0") {
                        setTimeout(() => {
                            Cleartext();
                            ShowlistReturn();
                            setReload(!reload);
                            window.location.reload(); // รีเฟรชหน้า
                        }, 1000); // 1 วินาทีหลังจากแสดงข้อความ
                    }
                    else if (response.data == "1") {
                        toast.warning("ไม่มีการยืมเลขครุภัณฑ์นี้")
                        document.getElementById("tdurable")?.focus();
                    }
                    // else {
                    //     toast.success("แก้ไขรายละเอียดการยืมเรียบร้อย")
                    //     Showlistlend()
                    // }
                    // console.log(response)
                })
                .catch((error) => {
                    toast.error("เกิดข้อผิดพลาดระหว่างบันทึก" + error);
                    console.log(error)
                })
        }
    }


    return (
        <div className="card-body">
            <div className="form-group mt-3">
                <label>เลขครุภัณฑ์</label><sup className='text-danger h6'> * </sup>
                <input type="text" className="form-control date-inputmask" id="date-mask" placeholder="เลขครุภัณฑ์" value={inputdata.Durableid} onChange={(event) => setInputdata({ ...inputdata, Durableid: event.target.value })} />
            </div>
            <div className="form-group">
                <label>ชื่อผู้คืนครุภัณฑ์<sup className='text-danger h6'> * </sup>
                    <small className="text-muted"></small></label>
                <input type="text" className="form-control international-inputmask" id="international-mask" placeholder="ชื่อผู้คืนครุภัณฑ์" />
            </div>
            <div className="form-group">
                <label>ชื่อเจ้าหน้าที่ที่รับคืน<sup className='text-danger h6'> * </sup>
                    <small className="text-muted"></small></label>
                <input type="text" className="form-control xphone-inputmask" id="xphone-mask" placeholder="ชื่อเจ้าหน้าที่ที่รับคืน" />
            </div>
            <div className="form-group">
                <label>รายละเอียดการคืน
                    <small className="text-muted"></small></label>
                <input type="text" className="form-control phone-inputmask" id="phone-mask" placeholder="รายละเอียดการคืน" />
            </div>
            <div className="form-group col-md-4">
                <label >วันที่คืน<sup className='text-danger h6'> * </sup></label>
                <input type="date" />
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => Cleartext()}>เคลียร์</button>
                <button type="button"  className="btn btn-custom-blue"  onClick={() => Save()}> บันทึก</button>
            </div>

        </div>

    )

}

export default frmreturnequipmentuserAdd