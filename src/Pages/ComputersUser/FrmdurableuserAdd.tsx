import { FC, useState, useEffect, Dispatch, SetStateAction } from 'react'
import axios from 'axios';
import Select from 'react-select';
import API from '../../Configs/config';
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

const FrmdurableuserAdd: FC<userProps> = ({ datadetail, countS }) => {

    const inputdata = {
        tID: '', tdurableID: '', tserialnumer: '', treceivedate: '', tusedate: '', tselldate: '', ipaddress: '',
        treceiving: '', tname: '', tOwner: '', tprice: '', tbrand: '', tgeneration: '',
        tcondition: '', tfile: '', tfilename: '', tother: '', treceivingother: '', tconditionother: '',
        tcategoryid: '', tcategoryname: '', Images: '', tuserinspect: ''
    }
    const [inputvalue, setInputvalue] = useState(inputdata);
    const [Listcategory, setListCategory] = useState([]);
    const Arr = [
        { value: "1", label: "เครื่องใหม่" },
        { value: "2", label: "เครื่องเก่า" },
        { value: "3", label: "เครื่องบริจาค" },
        { value: "4", label: "เครื่องเข้า" },
        { value: "9", label: "อื่นๆ" }
    ]

    useEffect(() => {
        if (countS != "0") {
            Savedata();
        } else {
            Cleartext();
        }
    }, [countS])

    useEffect(() => {

        ShowlistCategory();

        if (datadetail != null) {
            Showdatadetail();
        }

    }, [datadetail])

    async function ShowlistCategory() {

        axios.get(API.returnURL.url + "Computers/Listcategory")
            .then(function (response) {
                //console.log(response.data);
                setListCategory(response.data);
            });

    }

    async function Showdatadetail() {
        setInputvalue({
            ...inputdata,
            tID: datadetail[0].ID,
            tdurableID: datadetail[0].Durableid,
            tserialnumer: datadetail[0].Serialnumber,
            tname: datadetail[0].Productname,
            treceiving: datadetail[0].Receiving,
            treceivingother: datadetail[0].Receivingother,
            tprice: datadetail[0].Price,
            treceivedate: datadetail[0].ReceiveDate.substr(0, 10),
            tusedate: datadetail[0].UseDate.substr(0, 10),
            tselldate: datadetail[0].SellDate,
            ipaddress: datadetail[0].Ipaddress,
            tcategoryid: datadetail[0].Categoryid,
            tbrand: datadetail[0].Brand,
            tgeneration: datadetail[0].Generation,
            tcondition: datadetail[0].Condition,
            tOwner: datadetail[0].Owner,
            tuserinspect: datadetail[0].Userinspect,
            tfilename: datadetail[0].Images,
            tcategoryname: datadetail[0].Categoryid
        })
    }

    async function Cleartext() {
        setInputvalue(inputdata);
    }

    async function Savedata() {

        if (inputvalue.tdurableID == "") {
            toast.error("กรุณากรอกเลขครุภัณฑ์");
            document.getElementById("tdurableid")?.focus();
            return false;
        } else if (inputvalue.tname == "") {
            toast.error("กรุณาระบุชื่อครุภัณฑ์");
            document.getElementById("tname")?.focus();
            return false;
        } else if (inputvalue.tbrand == "") {
            toast.error("กรุณากรอกยี่ห้อ !");
            document.getElementById("tbrand")?.focus();
            return false;
        } else if (inputvalue.tgeneration == "") {
            toast.error("กรุณากรอกรุ่น");
            document.getElementById("tgeneration")?.focus();
            return false;
        } else if (inputvalue.treceiving == "") {
            toast.error("กรุณาเลือกวิธีได้รับ ! ");
            document.getElementById("treceiving")?.focus();
            return false;
        } else if(inputvalue.treceivedate == ""){
            toast.error("กรุณาระบุวันที่รับด้วย ! ");
            document.getElementById("treceivedate")?.focus();
            return false;
        } else if(inputvalue.tusedate == ""){
            toast.error("กรุณาระบุวันที่ใช้ครั้งแรกด้วย ! ");
            document.getElementById("tusedate")?.focus();
            return false;
        } else if(inputvalue.tcategoryid == ""){
            toast.error("กรุณาเลือกหมวดด้วย ! ");
            return false;
        } else {

            const frmdata = new FormData();
            frmdata.append("tid", inputvalue.tID);
            frmdata.append("tbrand", inputvalue.tbrand);
            frmdata.append("tgeneration", inputvalue.tgeneration);
            frmdata.append("tdurableid", inputvalue.tdurableID);
            frmdata.append("tserialnumer", inputvalue.tserialnumer);
            frmdata.append("tname", inputvalue.tname);
            frmdata.append("treceiving", inputvalue.treceiving);
            frmdata.append("treceivingother", inputvalue.treceivingother);
            frmdata.append("tprice", inputvalue.tprice);
            frmdata.append("treceivedate", inputvalue.treceivedate);
            frmdata.append("tusedate", inputvalue.tusedate);
            frmdata.append("tselldate", inputvalue.tselldate);
            frmdata.append("ipaddress", inputvalue.ipaddress);
            frmdata.append("tcategory", inputvalue.tcategoryid);
            frmdata.append("tcondition", inputvalue.tcondition);
            frmdata.append("tOwner", inputvalue.tOwner);
            frmdata.append("tfile", inputvalue.Images);
            axios.post(API.returnURL.url + "Computers", frmdata)
                .then((response) => {

                    console.log(response.data);
                    if (response.data == "0") {
                        toast.success("ระบบทำการเพิ่มครุภัณฑ์เรียบร้อย");
                        setTimeout(() => {
                            Cleartext();
                            window.location.reload(); 
                        }, 1200);  // หน่วงเวลา 1200 มิลลิวินาที (1.2 วินาที เพื่อรีหน้าเว็บ)
                    } else if (response.data == "1") {
                        toast.warning("มีเลขครุภัณฑ์นี้หรือมีอุปกรณ์นี้ในระบบอยู่แล้ว");
                        document.getElementById("tdurableid")?.focus();
                    } else {
                        toast.success("ระบบทำการบันทึกแก้ไขข้อมูลเรียบร้อยแล้วครับ");
                        setTimeout(() => {
                            window.location.reload(); 
                        }, 1200);  // หน่วงเวลา 1200 มิลลิวินาที (1.2 วินาที เพื่อรีหน้าเว็บ)
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
                <div className="form-row col-md-12 col-sm-12 row">
                    <div className="form-group col-md-3">
                        <label>เลขครุภัณฑ์<sup className='text-danger h6'> * </sup></label>
                        <input type="text" className="form-control" id="tdurableid" placeholder="เลขครุภัณฑ์" value={inputvalue.tdurableID}/>
                    </div>

                    <div className='form-group col-md-5'>
                        <label>ชื่อครุภัณฑ์<sup className='text-danger h6'> * </sup></label>
                        <input type="text" className='form-control' id='tname' placeholder='ชื่อครุภัณฑ์' value={inputvalue.tname} />
                    </div>

                    {/* <div className="form-group col-md-4">
                        <label>วิธีได้รับ<sup className='text-danger h6'> * </sup></label>
                        <Select
                            value={Arr.find((obj: any) => obj.value === inputvalue.treceiving)}
                          
                        />
                        {inputvalue.treceiving === '9' || inputvalue.treceiving === 'อื่นๆ' ? (
                            <input type="text" className="form-control mt-2" id='treceivingother' placeholder="โปรดระบุ" value={inputvalue.treceivingother} />
                        ) : null}
                    </div> */}

                </div>

                <div className='form-row col-md-12 col-sm-12 row'>
                    <div className="form-group col-md-4">
                        <label>ยี่ห้อ<sup className='text-danger h6'> * </sup></label>
                        <input type="text" className="form-control" id="tbrand" placeholder='ชื่อยี่ห้อ' value={inputvalue.tbrand} />
                    </div>
                    <div className="form-group col-md-4">
                        <label>รุ่น<sup className='text-danger h6'> * </sup></label>
                        <input type="text" className="form-control" id="tgeneration" placeholder='ชื่อรุ่น' value={inputvalue.tgeneration}  />
                    </div>
                    <div className="form-group col-md-4">
                        <label >ราคา</label>
                        <input type="text" className="form-control" id="tprice" placeholder='ราคา' value={inputvalue.tprice} />
                    </div>

                </div>

                <div className='form-row col-md-12 col-sm-12 row'>
                    <div className="form-group col-md-6">
                        <label>ซีเรียลนัมเบอร์</label>
                        <input type="text" className="form-control" id="tserialnumer" placeholder="เลข Device ID" value={inputvalue.tserialnumer}  />
                    </div>
                    <div className='form-group col-md-6'>
                        <label>IP Address</label>
                        <input type="text" className='form-control' id="ipaddress" placeholder='เลข IP' value={inputvalue.ipaddress} />
                    </div>
                </div>

                <div className="form-row col-md-12 col-sm-12 row">
                    <div className="form-group col-md-4">
                        <label >วันที่รับ<sup className='text-danger h6'> * </sup></label>
                        <input type="date" className="form-control" id="treceivedate" value={inputvalue.treceivedate}  />
                    </div>
                    <div className="form-group col-md-4">
                        <label>วันที่ใช้ครั้งแรก<sup className='text-danger h6'> * </sup></label>
                        <input type="date" className="form-control" id="tusedate" value={inputvalue.tusedate} />
                    </div>
                    <div className="form-group col-md-4">
                        <label >หมวด<sup className='text-danger h6'> * </sup></label>
                        <Select
                            value={Listcategory.find((obj: any) => obj.value === inputvalue.tcategoryid)}
                            options={Listcategory}
                            styles={customStyles}
                           
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group col-md-12">
                        <label >ชื่อผู้ดูแล</label>
                        <input type="text" className="form-control" placeholder='ชื่อ - นามสกุล' id="tOwner" value={inputvalue.tOwner} />
                    </div>

                </div>
                <div className='form-row mb-3'>
                    <div className='form-group'>
                        <label >รูปคอมพิวเตอร์</label>
                        {/* <input type="file" className='form-control form-control-sm ' id='tfile' /> */}
                        {inputvalue.tfilename !== "" ? (<img style={{ maxWidth: "300px", margin: "auto" }} src={`data:image/png;base64,${inputvalue.tfilename}`} alt="picture" />) : null}
                    </div>
                </div>
            </form>
        </div>
    )
}

export default FrmdurableuserAdd