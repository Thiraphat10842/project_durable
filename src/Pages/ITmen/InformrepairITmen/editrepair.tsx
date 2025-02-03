import React, {
    FC,
    SetStateAction,
    Dispatch,
    useState,
    useEffect,
  } from "react";
  import axios from "axios";
  import Select from "react-select";
  import API from "../../../Configs/config"
  import { toast } from "react-toastify";
  
  interface userProps {
    datadetail: any;
    countS: any;
    reload: boolean;
    setReload: Dispatch<SetStateAction<boolean>>;
  }
  
  const editrepair : FC<userProps> = ({
    datadetail,
    countS,
    reload,
    setReload,
  }) => {
    const customStyles = {
      control: (provided: any, state: any) => ({
        ...provided,
        background: "#fff",
        borderColor: "#9e9e9e",
        minHeight: "30px",
        height: "30px",
        boxShadow: state.isFocused ? null : null,
      }),
  
      valueContainer: (provided: any, state: any) => ({
        ...provided,
        height: "30px",
        padding: "0 6px",
      }),
  
      input: (provided: any, state: any) => ({
        ...provided,
        margin: "0px",
      }),
      indicatorsContainer: (provided: any, state: any) => ({
        ...provided,
        height: "30px",
      }),
    };
  
    const txtInput = {
      tID: "",
      tRepairid: "",
      tRepairname: "",
      tRepairposition: "",
      tOfficeid: "",
      tOfficename: "",
      tTel: "",
      tEmail: "",
      tRepairsubject: "",
      tRepairstatus: "",
      tOther: "",
      tRepairday: "",
      tDatestart: "",
      tDatestop: "",
      tDatesave: "",
      tRepairdategetjob: "",
      tRepairuserid1: "",
      tRepairusername1: "",
      tRepairuserid2: "",
      tRepairusername2: "",
      tFile: "",
      tFilename: "",
      tLineid: "",
      tUserstr: "",
      tUserid: "",
      tUsername: "",
      tRepairuserid3: "",
      tRepairusername3: "",
    };
    const [inputdata, setInputdata] = useState(txtInput);
    // const datadetail = useContext<any>(datacontext);
    const [listoffice, setlistOffice] = useState([]);
    const [listpersonnelit, setlistPersonnelit] = useState([]);
    const [strhidden, setStrhidden] = useState(false);
  
    useEffect(() => {
      if (datadetail != null && datadetail != 0) {
        Showdetail();
      } else {
        Cleartextinput();
      }
    }, [datadetail]);
  
    useEffect(() => {
      let tdateNow = new Date();
  
      setInputdata({
        ...inputdata,
        tOfficeid: sessionStorage.getItem("sessofficeID") || "",
        tOfficename: sessionStorage.getItem("sessofficeName") || "",
        tEmail: sessionStorage.getItem("sessEmail") || "",
        tDatesave: tdateNow.toISOString().substr(0, 10) || "",
        tLineid: sessionStorage.getItem("sessLineid") || "",
        tUserstr: sessionStorage.getItem("sessStr") || "",
        tUserid: sessionStorage.getItem("sessuserID") || "",
        tUsername: sessionStorage.getItem("sessName") || "",
        /*tRepairname: sessionStorage.getItem('sessName') || '',
        tRepairposition: sessionStorage.getItem('sessPositon') || '',*/
      });
  
      if (sessionStorage.getItem("sessStr") == "1") {
        setStrhidden(false);
      } else {
        setStrhidden(true);
      }
  
      Showlistoffice();
      Showlistpersonnelit();
    }, []);
  
    async function Showdetail() {
      var checkboxStr1 = document.getElementById("tStatus1") as HTMLInputElement;
      var checkboxStr2 = document.getElementById("tStatus2") as HTMLInputElement;
      var checkboxStr3 = document.getElementById("tStatus3") as HTMLInputElement;
      var checkboxStr4 = document.getElementById("tStatus4") as HTMLInputElement;
      checkboxStr1.checked = false;
      checkboxStr2.checked = false;
      checkboxStr3.checked = false;
      checkboxStr4.checked = false;
  
      setInputdata({
        ...inputdata,
        tID: datadetail[0].ID,
        tRepairid: datadetail[0].repairID,
        tRepairname: datadetail[0].repairName,
        tRepairposition: datadetail[0].repairPosition,
        tOfficeid: datadetail[0].repairOfficeid,
        tOfficename: datadetail[0].repairOffice,
        tTel: datadetail[0].repairTel,
        tEmail: datadetail[0].repairEmail,
        tRepairsubject: datadetail[0].repairSubject,
        tRepairstatus: datadetail[0].repairStatus,
        tOther: datadetail[0].repairOther,
        tRepairday: datadetail[0].repairDay,
        tDatestart: datadetail[0].repairDatestart,
        tDatestop: getDatatext(datadetail[0].repairDatestop),
        tDatesave: getDatatext(datadetail[0].repairDatesave),
        tRepairdategetjob: getDatatext(datadetail[0].repairDategetjob),
        tRepairuserid1: datadetail[0].repairUserid1,
        tRepairuserid2: datadetail[0].repairUserid2,
        tFilename: datadetail[0].repairFile1,
      });
  
      if (datadetail[0]?.repairStatus == "1") {
        checkboxStr1.checked = true;
      } else if (datadetail[0]?.repairStatus == "2") {
        checkboxStr2.checked = true;
      } else if (datadetail[0]?.repairStatus == "3") {
        checkboxStr3.checked = true;
      } else if (datadetail[0]?.repairStatus == "4") {
        checkboxStr4.checked = true;
      }
    }
  
    async function Cleartextinput() {
      setInputdata(inputdata);
    }
  
    async function Cleartext() {
      setInputdata(txtInput);
  
  }
  
  
    async function Showlistoffice() {
      axios.get(API.returnURL.url + "Office").then(function (response) {
        //console.log(response);
        setlistOffice(response.data);
      });
    }
  
    async function Showlistpersonnelit() {
      axios
        .get(API.returnURL.url + "Informrepair/Listpersonnal")
        .then(function (response) {
          //console.log(response);
          setlistPersonnelit(response.data);
        });
    }
  
    async function selectStatus(Str: string) {
      var checkboxStr1 = document.getElementById("tStatus1") as HTMLInputElement;
      var checkboxStr2 = document.getElementById("tStatus2") as HTMLInputElement;
      var checkboxStr3 = document.getElementById("tStatus3") as HTMLInputElement;
      var checkboxStr4 = document.getElementById("tStatus4") as HTMLInputElement;
  
      if (Str == "1") {
        checkboxStr2.checked = false;
        checkboxStr3.checked = false;
        checkboxStr4.checked = false;
      } else if (Str == "2") {
        checkboxStr1.checked = false;
        checkboxStr3.checked = false;
        checkboxStr4.checked = false;
      } else if (Str == "3") {
        checkboxStr1.checked = false;
        checkboxStr2.checked = false;
        checkboxStr4.checked = false;
      } else if (Str == "4") {
        checkboxStr1.checked = false;
        checkboxStr3.checked = false;
        checkboxStr2.checked = false;
      }
  
      if (
        checkboxStr1.checked == true ||
        checkboxStr2.checked == true ||
        checkboxStr3.checked == true ||
        checkboxStr4.checked == true
      ) {
        setInputdata({ ...inputdata, tRepairstatus: Str });
      } else {
        setInputdata({ ...inputdata, tRepairstatus: "" });
      }
    }
  
    async function Savedata() {
      if (inputdata.tRepairid == "" && inputdata.tUserstr == "1") {
        toast.error("กรุณาใส่เลขที่ใบงานด้วยครับ !");
        document.getElementById("tRepairid")?.focus();
        return false;
      } else if (inputdata.tRepairdategetjob == "" && inputdata.tUserstr == "1") {
        toast.error("กรุณาใส่วันที่รับงานด้วยครับ !");
        document.getElementById("tRepairid")?.focus();
        return false;
      } else if (inputdata.tRepairname == "") {
        toast.error("กรุณาระบุชื่อ-สกุลด้วยครับ !");
        document.getElementById("tRepairname")?.focus();
        return false;
      } else if (inputdata.tRepairposition == "") {
        toast.error("กรุณาระบุตำแหน่งด้วยครับ !");
        document.getElementById("tRepairposition")?.focus();
        return false;
      } else if (inputdata.tOfficeid == "") {
        toast.error("กรุณาเลือกหน่วยงานด้วยครับ !");
        return false;
      } else if (inputdata.tRepairsubject == "") {
        toast.error("กรุณาระบุเรื่องด้วยครับ !");
        document.getElementById("tRepairsubject")?.focus();
        return false;
      } else if (inputdata.tTel == "") {
        toast.error("กรุณาระบุเบอร์โทรติดต่อด้วยครับ !");
        document.getElementById("tTel")?.focus();
        return false;
      } else {
        const frmdata = new FormData();
        frmdata.append("id", inputdata.tID);
        frmdata.append("repairID", inputdata.tRepairid);
        frmdata.append("repairName", inputdata.tRepairname);
        frmdata.append("repairPosition", inputdata.tRepairposition);
        frmdata.append("repairOfficeid", inputdata.tOfficeid);
        frmdata.append("repairOffice", inputdata.tOfficename);
        frmdata.append("repairTel", inputdata.tTel);
        frmdata.append("repairEmail", inputdata.tEmail);
        frmdata.append("repairSubject", inputdata.tRepairsubject);
        frmdata.append("repairStatus", inputdata.tRepairstatus);
        frmdata.append("repairOther", inputdata.tOther);
        frmdata.append("repairDay", inputdata.tRepairday);
        frmdata.append("repairDatestart", inputdata.tDatestart);
        frmdata.append("repairDatestop", inputdata.tDatestop);
        frmdata.append("repairDatesave", inputdata.tDatesave);
        frmdata.append("repairDategetjob", inputdata.tRepairdategetjob);
        frmdata.append("repairUserid1", inputdata.tRepairuserid1);
        frmdata.append("repairUserid2", inputdata.tRepairuserid2);
        frmdata.append("repairUserid3", inputdata.tRepairuserid3);
        frmdata.append("fileup", inputdata.tFile);
        frmdata.append("userStr", inputdata.tUserstr);
        axios
          .post(API.returnURL.url + "Informrepair", frmdata)
          .then((response) => {
            console.log(response);
            if (response.data == "0") {
              toast.success("ระบบทำการบันทึกข้อมูลเรียบร้อยแล้วครับ");
              setTimeout(() => {
                Cleartext();
                window.location.reload(); 
            }, 1300);  
  
            } else if (response.data == "1") {
              toast.warning("ระบบตรวจพบว่ามีข้อมูลนี้ในระบบแล้วครับ");
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
    function getData(todate: string) {
      const date = new Date(todate);
      const formatter = new Intl.DateTimeFormat("en-US", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
      const formattedDate = formatter.format(date);
      return formattedDate;
    }
  
    function getDatatext(todate: string) {
      var resultDate = "";
      if (todate != null && todate != "") {
        resultDate = todate.substr(0, 10);
      }
      return resultDate;
    }
  
    return (
      <div>
        <form>
          <div className="row" hidden={strhidden}>
            <div className="col-md-6 col-sm-4">
              <div className="form-group">
                <label>เลขที่ใบงาน</label>
                <input
                  type="text"
                  className="form-control"
                  id="tRepairid"
                  value={inputdata.tRepairid}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, tRepairid: even.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-6 col-sm-4">
              <div className="form-group">
                <label>วันที่รับ</label>
                <input
                  type="date"
                  className="form-control"
                  id="tRepairdategetjob"
                  value={inputdata.tRepairdategetjob}
                  onChange={(even) =>
                    setInputdata({
                      ...inputdata,
                      tRepairdategetjob: even.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>ชื่อ-สกุล</label>
                <input
                  type="text"
                  className="form-control"
                  id="tRepairname"
                  value={inputdata.tRepairname}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, tRepairname: even.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>ตำแหน่ง</label>
                <input
                  type="text"
                  className="form-control"
                  id="tRepairposition"
                  value={inputdata.tRepairposition}
                  onChange={(even) =>
                    setInputdata({
                      ...inputdata,
                      tRepairposition: even.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>หน่วยงาน</label>
                <Select
                  value={listoffice.find(
                    (obj: any) => obj.value === inputdata.tOfficeid
                  )}
                  options={listoffice}
                  styles={customStyles}
                  onChange={(even: any) =>
                    setInputdata({
                      ...inputdata,
                      tOfficeid: even?.value,
                      tOfficename: even?.label,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="form-group">
                <label>เรื่องที่แจ้ง</label>
                <textarea
                  className="form-control"
                  id="tRepairsubject"
                  value={inputdata.tRepairsubject}
                  onChange={(even) =>
                    setInputdata({
                      ...inputdata,
                      tRepairsubject: even.target.value,
                    })
                  }
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>วันที่แจ้ง</label>
                <input
                  type="date"
                  className="form-control"
                  id="tDatesave"
                  value={inputdata.tDatesave}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, tDatesave: even.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>เบอร์โทรติดต่อ</label>
                <input
                  type="text"
                  className="form-control"
                  id="tTel"
                  value={inputdata.tTel}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, tTel: even.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="tEmail"
                  value={inputdata.tEmail}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, tEmail: even.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="form-group">
                <label>
                  ขอโปรแกรม ในกรณีขอข้อมูล ให้ระบุ สาเหตุและการนำไปใช้งาน
                </label>
                <div className="row">
                  <div className="d-flex flex-wrap">
                    <div className="custom-control custom-checkbox mb-5 mr-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="tStatus1"
                        onClick={() => selectStatus("1")}
                      />
                      <label className="custom-control-label" htmlFor="tStatus1">
                        ผู้บริหาร
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox mb-5 mr-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="tStatus2"
                        onClick={() => selectStatus("2")}
                      />
                      <label className="custom-control-label" htmlFor="tStatus2">
                        ศึกษาต่อ
                      </label>
                    </div>
                      <div className="custom-control custom-checkbox mb-5 mr-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="tStatus3"
                        onClick={() => selectStatus("3")}
                      />
                      <label className="custom-control-label" htmlFor="tStatus3">
                        เพิ่มสมรรถรนะบุคลากร
                      </label>
                    </div>
                    <div className="custom-control custom-checkbox mb-5 mr-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="tStatus4"
                        onClick={() => selectStatus("4")}
                      />
                      <label className="custom-control-label" htmlFor="tStatus4">
                        อื่นๆ(ระบุ)
                      </label>                   
                    </div>
                    <input type="text" className="form-control" id="tOther" placeholder="อื่นๆ...." value={inputdata.tOther} onChange={(even) => setInputdata({ ...inputdata, tOther: even.target.value })} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>ความต้องการแล้วเสร็จของ User ภายใน</label>
                <input
                  type="number"
                  className="form-control"
                  id="tRepairday"
                  placeholder="วัน"
                  value={inputdata.tRepairday}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, tRepairday: even.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>วันแล้วเสร็จของโปรแกรมเมอร์ เริ่มวันที่</label>
                <input
                  type="date"
                  className="form-control"
                  id="tDatestart"
                  value={inputdata.tDatestart}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, tDatestart: even.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12">
              <div className="form-group">
                <label>กำหนดการแล้วเสร็จ</label>
                <input
                  type="date"
                  className="form-control"
                  id="tDatestop"
                  value={inputdata.tDatestop}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, tDatestop: even.target.value })
                  }
                />
              </div>
            </div>
            <div className="col-md-4 col-sm-12" >
              <div className="form-group">
                <label>มอบหมายงาน</label>
                <Select
                  value={listpersonnelit.find(
                    (obj: any) => obj.value === inputdata.tRepairuserid2
                  )}
                  options={listpersonnelit}
                  styles={customStyles}
                  onChange={(even: any) =>
                    setInputdata({
                      ...inputdata,
                      tRepairuserid2: even?.value,
                      tRepairusername2: even?.label,
                    })
                  }
                />
              </div>
            </div>
            <div className="col-md-12 col-sm-12">
              <div className="form-group">
                <label>ไฟล์แนบ</label>
                <input
                  type="file"
                  id="tImage"
                  onChange={(even: any) =>
                    setInputdata({ ...inputdata, tFile: even.target.files[0] })
                  }
                />
              </div>
            </div>
          </div>
        </form>
  
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal" onClick={() => Cleartext()} 
          >
           เคลียร์
          </button>
          <button
            type="button"
            className="btn btn-custom-blue"
            onClick={() => Savedata()}
          >
            ส่ง
          </button>
        </div>
      </div>
    );
  };
  
export default editrepair;
