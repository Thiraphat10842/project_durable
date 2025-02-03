import React, { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import axios from 'axios';
import Select from 'react-select';
import API from "../../../Configs/config"
import { toast } from 'react-toastify';


interface userProps {
    datadetail: any;
    countS: any;
}

const customStyles = {
    control: (provided: any, state: any) => ({
        ...provided,
        background: '#fff',
        borderColor: '#9e9e9e',
        minHeight: '30px',
        height: '30px',
        boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided: any, state: any) => ({
        ...provided,
        height: '30px',
        padding: '0 6px'
    }),

    input: (provided: any, state: any) => ({
        ...provided,
        margin: '0px',
    }),
    indicatorsContainer: (provided: any, state: any) => ({
        ...provided,
        height: '30px',
    }),
};

const FrmregisterITmen: FC<userProps> = ({ datadetail, countS }) => {

    const txtInput = {
        tID: '', tTname: '', tFname: '', tLname: '', tOffice: '', tPosition: '', tLine: '',
        tEmail: '', tImage: '', tUsername: '', tPasswd: '', tTel: '',tStr:''
    }
    const [inputdata, setInputdata] = useState(txtInput);

    const titleName = [
        { value: 'นาย', label: 'นาย' },
        { value: 'นาง', label: 'นาง' },
        { value: 'นางสาว', label: 'นางสาว' },
    ]

    const roleOptions = [
        { value: '1', label: 'Admin' },
        { value: '2', label: 'IT' },
        { value: '3', label: 'User' },
    ];

    const [listoffice, setlistOffice] = useState([]);

    useEffect(() => {

        //console.log(countS);
        //setCountS(countS);
        showlistOffice();

        if (countS != "0") {

            Saverregister();

        } else {
            Cleartext();
        }

    }, [countS])

    useEffect(() => {

        if (datadetail != null) {
            Showdatadetail();
        }

    }, [datadetail])


    async function showlistOffice() {

        axios.get(API.returnURL.url + "Office")
            .then(function (response) {

                setlistOffice(response.data);

            });
    }

    async function Cleartext() {
        setInputdata(txtInput);
    }

    async function Showdatadetail() {
        setInputdata({
            ...inputdata, 
            tID: datadetail[0]?.ID, 
            tTname: datadetail[0]?.Tname, 
            tFname: datadetail[0]?.Fname, 
            tLname: datadetail[0]?.Lname,
            tPosition: datadetail[0]?.Position, 
            tLine: datadetail[0]?.LineID, 
            tOffice: datadetail[0]?.Officeid,
            tEmail: datadetail[0]?.Emailaddress,  
            tTel: datadetail[0]?.Tel, 
            tUsername: datadetail[0]?.Username,
            tStr: datadetail[0]?.Str

        });
    }
    

    async function Saverregister() {

        if (inputdata.tTname == "") {
            toast.error("กรุณาเลือกคำนำหน้าชื่อด้วยครับ !");
            return false;
        } else if (inputdata.tFname == "") {
            toast.error("กรุณาระบุชื่อด้วยครับ !");
            document.getElementById("tFname")?.focus();
            return false;
        } else if (inputdata.tLname == "") {
            toast.error("กรุณาระบุนามสกุลด้วยครับ !");
            document.getElementById("tLname")?.focus();
            return false;
        } else if (inputdata.tPosition == "") {
            toast.error("กรุณาระบุตำแหน่งด้วยครับ !");
            document.getElementById("tPosition")?.focus();
            return false;
        } else if (inputdata.tUsername == "") {
            toast.error("กรุณาระบุ Username ด้วยครับ !");
            document.getElementById("tUsername")?.focus();
            return false;
        } else if (inputdata.tPasswd == "") {
            toast.error("กรุณาระบุ Password ด้วยครับ !");
            document.getElementById("tPasswd")?.focus();
            return false;
        } else {

            const frmdata = new FormData();
            frmdata.append("id", inputdata.tID);
            frmdata.append("tname", inputdata.tTname);
            frmdata.append("fname", inputdata.tFname);
            frmdata.append("lname", inputdata.tLname);
            frmdata.append("position", inputdata.tPosition);
            frmdata.append("office", inputdata.tOffice);
            frmdata.append("tokenline", inputdata.tLine);
            frmdata.append("tel", inputdata.tTel);
            frmdata.append("emailaddress", inputdata.tEmail);
            frmdata.append("fileup", inputdata.tImage);
            frmdata.append("username", inputdata.tUsername);
            frmdata.append("passwd", inputdata.tPasswd);
            frmdata.append("Str", inputdata.tStr);
            axios.post(API.returnURL.url + "Personnel", frmdata)
                .then((response) => {
                    //console.log(response);
                    if (response.data == "0") {
                        toast.success("ระบบทำการบันทึกข้อมูลการลงทะเบียนเรียบร้อยแล้วครับ");
                        setTimeout(() => {
                            Cleartext();
                            window.location.reload(); 
                        }, 1300);
                    } else if (response.data == "1") {
                        toast.warning("ระบบตรวจพบว่ามีข้อมูล Username นี้ในระบบแล้วครับ");
                        document.getElementById("tUsername")?.focus();
                    } else {
                        toast.success("ระบบทำการบันทึกแก้ไขข้อมูลเรียบร้อยแล้วครับ");
                        setTimeout(() => {
                            Cleartext();
                            window.location.reload(); 
                        }, 1300);
                    }

                })
                .catch((error) => {

                    toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล Error " + error);
                    console.log(error);

                });

        }

    }

    return (
        <div>
            <form>
                <div className="row">
                    <div className="col-md-2 col-sm-12">
                        <div className="form-group">
                            <label>คำนำหน้าชื่อ</label>
                            <Select
                                value={titleName.find((obj: any) => obj.value === inputdata.tTname)}
                                options={titleName}
                                styles={customStyles}
                                onChange={(even: any) => setInputdata({ ...inputdata, tTname: even?.value })}
                            />
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12">
                        <div className="form-group">
                            <label>ชื่อ</label>
                            <input type="text" className="form-control" id="tFname" value={inputdata.tFname} onChange={(even) => setInputdata({ ...inputdata, tFname: even.target.value })} />
                        </div>
                    </div>
                    <div className="col-md-5 col-sm-12">
                        <div className="form-group">
                            <label>นามสกุล</label>
                            <input type="text" className="form-control" id="tLname" value={inputdata.tLname} onChange={(even) => setInputdata({ ...inputdata, tLname: even.target.value })} />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>ตำแหน่ง</label>
                            <input type="text" className="form-control" id="tPosition" value={inputdata.tPosition} onChange={(even) => setInputdata({ ...inputdata, tPosition: even.target.value })} />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Line</label>
                            <input type="text" className="form-control" id="tLine" value={inputdata.tLine} onChange={(even) => setInputdata({ ...inputdata, tLine: even.target.value })} />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>หน่วยงาน</label>
                            <Select
                                value={listoffice.find((obj: any) => obj.value === inputdata.tOffice)}
                                options={listoffice}
                                styles={customStyles}
                                onChange={(even: any) => setInputdata({ ...inputdata, tOffice: even?.value })}
                            />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Email</label>
                            <input type="email" className="form-control" id="tEmail" value={inputdata.tEmail} onChange={(even) => setInputdata({ ...inputdata, tEmail: even.target.value })} />

                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
                        <div className="form-group">
                            <label>Tel</label>
                            <input type="text" className="form-control" id="tTel" value={inputdata.tTel} onChange={(even) => setInputdata({ ...inputdata, tTel: even.target.value })} />
                        </div>
                    </div>
                    <div className="form-group">
        <label>ประเภทผู้ใช้งาน</label>
        <Select
    value={roleOptions.find((obj) => obj.value === inputdata.tStr)}
    options={roleOptions}
    styles={customStyles}
    onChange={(even: any) => setInputdata({ ...inputdata, tStr: even?.value })}
/>
    </div>
                    <div className="col-md-12 col-sm-12">
                        <div className="form-group">
                            <label htmlFor="tImage" className="custom-file-upload" hidden>รูปภาพ</label>
                            <input type="file" id="tImage" onChange={(even: any) => setInputdata({ ...inputdata, tImage: even.target.files[0] })} />
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12">
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text" className="form-control" id="tUsername" value={inputdata.tUsername} onChange={(even) => setInputdata({ ...inputdata, tUsername: even.target.value })} />
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12">
</div>
                    <div className="col-md-3 col-sm-12">
                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" id="tPasswd" value={inputdata.tPasswd} onChange={(even) => setInputdata({ ...inputdata, tPasswd: even.target.value })} />
                        </div>
                    </div>
                    <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => Cleartext()}>เคลียร์</button>
                <button type="button" className="btn btn-custom-blue" onClick={() =>Saverregister()}>บันทึก</button>
            </div>

                </div>
            </form>

        </div>
    )
}

export default FrmregisterITmen
