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
const frmJobdescriptionITmenAdd: FC<userProps> = ({
  datadetail,
  countS,
  reload,
  setReload,
}) => {
  const txtInput = {
    ID: "",
    userID: "",
    dateStart: "",
    timeStart: "",
    userinFormer: "",
    tel: "",
    Productname: "",
    symptom: "",
    userreceiveinForm: "",
    userreceiveJob: "",
    dateStop: "",
    timeStop: "",
    Other: "",
    fullName1: "",
    fullName2: "",
    Rate: "",
    Officeid: "",
    Officename: "",
    // tRepairuserid3: "",
    // tRepairusername3: "",
    // tOfficeid: "",
    // tOfficename:"",
  };

  const [inputdata, setInputdata] = useState(txtInput);
  const [Lend, setLend] = useState([]);
  const [listoffice, setlistOffice] = useState([]);
  const [listpersonnelit, setlistPersonnelit] = useState([]);
  const [strhidden, setStrhidden] = useState(false);

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

  async function Showdetail() {
    setInputdata({
      ...inputdata,
      ID: datadetail[0].ID,
      userID: datadetail[0].userID,
      dateStart: datadetail[0].dateStart,
      timeStart: datadetail[0].timeStart,
      userinFormer: datadetail[0].userinFormer,
      tel: datadetail[0].tel,
      symptom: datadetail[0].symptom,
      userreceiveinForm: datadetail[0].userreceiveinForm,
      userreceiveJob: datadetail[0].userreceiveJob,
      dateStop: datadetail[0].dateStop,
      timeStop: datadetail[0].timeStop,
      Other: datadetail[0].Other,
      fullName1: datadetail[0].fullName1,
      fullName2: datadetail[0].fullName2,
      Rate: datadetail[0].Rate,
      Officeid: datadetail[0].Officeid,
      Officename: datadetail[0].Officename,
      // tRepairuserid3: datadetail[0].tRepairuserid3,
      // tRepairusername3: datadetail[0].tRepairusername3,
    });
    console.log(datadetail);
  }
  useEffect(() => {
    // console.log(datadetail)
    if (datadetail != null && datadetail != 0) {
      Showdetail();
    } else {
      setInputdata(txtInput);
    }
  }, [datadetail]);

  async function Cleartext() {
    setInputdata(txtInput);
  }
  async function ShowlistReturn() {
    const data = async () => {
      const rs = await axios.get(
        API.returnURL.url + "Jobdescription/Jobdescriptionlist"
      );
      if (rs.status === 200) {
        const json = await rs.data;
        setLend(json);
      }
    };
    data();
  }

  useEffect(() => {
    setInputdata({
      ...inputdata,
      ID: sessionStorage.getItem("sessId") || "",
      userID: sessionStorage.getItem("sessuserID") || "",
      dateStart: sessionStorage.getItem("sessdateStart") || "",
      timeStart: sessionStorage.getItem("sesstimeStart") || "",
      userinFormer: sessionStorage.getItem("sessuserinFormer") || "",
      tel: sessionStorage.getItem("sesstel") || "",
      symptom: sessionStorage.getItem("sesssymptom") || "",
      userreceiveinForm: sessionStorage.getItem("sesssuserreceiveinForm") || "",
      userreceiveJob: sessionStorage.getItem("sesssuserreceiveJob") || "",
      dateStop: sessionStorage.getItem("sesssdateStop") || "",
      timeStop: sessionStorage.getItem("sessstimeStop") || "",
      Other: sessionStorage.getItem("sesssOther") || "",
      fullName1: sessionStorage.getItem("sesssfullName1") || "",
      fullName2: sessionStorage.getItem("sesssfullName2") || "",
      Rate: sessionStorage.getItem("sesssRate") || "",
      Officeid: sessionStorage.getItem("sesssOfficeid") || "",
      Officename: sessionStorage.getItem("sesssOfficename") || "",
    });

    
    if (sessionStorage.getItem("sessStr") == "1") {
      setStrhidden(false);
    } else {
      setStrhidden(true);
    }
    
    Showlistpersonnelit();
    Showlistoffice();
    ShowlistReturn();
  }, []);
  useEffect(() => {
    ShowlistReturn();
    // setReload(!reload)
  }, []);

  async function Savedata() {
    if (inputdata.dateStop == "") {
      toast.error("กรุณากำหนดการส่งงานด้วยครับ !");
      document.getElementById("tRepairid")?.focus();
      return false;
    } else if (inputdata.userinFormer == "") {
      toast.error("กรุณาระบุชื่อด้วยครับ !");
      document.getElementById("tRepairname")?.focus();
      return false;
    } else if (inputdata.Officeid == "") {
      toast.error("กรุณาเลือกหน่วยงานด้วยครับ !");
      return false;
    } else if (inputdata.symptom == "") {
      toast.error("กรุณาระบุภาระงาน !");
      document.getElementById("tRepairsubject")?.focus();
      return false;
    } else if (inputdata.tel == "") {
      toast.error("กรุณาระบุเบอร์โทรติดต่อด้วยครับ !");
      document.getElementById("tTel")?.focus();
      return false;
    } else {
      const frmdata = new FormData();
      frmdata.append("ID", inputdata.ID);
      frmdata.append("userID", inputdata.userID);
      frmdata.append("dateStart", inputdata.dateStart);
      frmdata.append("timeStart", inputdata.timeStart);
      frmdata.append("userinFormer", inputdata.userinFormer);
      frmdata.append("tel", inputdata.tel);
      frmdata.append("symptom", inputdata.symptom);
      frmdata.append("userreceiveinForm", inputdata.userreceiveinForm);
      frmdata.append("userreceiveJob", inputdata.userreceiveJob);
      frmdata.append("dateStop", inputdata.dateStop);
      frmdata.append("timeStop", inputdata.timeStop);
      frmdata.append("Other", inputdata.Other);
      frmdata.append("fullName1", inputdata.fullName1);
      frmdata.append("fullName2", inputdata.fullName2);
      frmdata.append("Rate", inputdata.Rate);
      frmdata.append("Officeid", inputdata.Officeid);
      frmdata.append("Officename", inputdata.Officename);
      axios
        .post(API.returnURL.url + "Jobdescription", frmdata)
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

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-6 col-sm-4">
            <div className="form-group">
              <label>ชื่อผู้แจ้ง</label>
              <input
                type="text"
                className="form-control"
                id="userinFormer"
                placeholder="ชื่อผู้แจ้ง"
                value={inputdata.userinFormer}
                onChange={(even) =>
                  setInputdata({
                    ...inputdata,
                    userinFormer: even.target.value,
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-4">
            <div className="form-group">
              <label>เบอร์โทร</label>
              <input
                type="text"
                className="form-control"
                id="tel"
                placeholder="เบอร์ติดต่อ"
                value={inputdata.tel}
                onChange={(even) =>
                  setInputdata({ ...inputdata, tel: even.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="form-group">
              <label>หน่วยงาน</label>
              <Select
                value={
                  listoffice.find(
                    (obj: any) => obj.value === inputdata.Officeid
                  ) || null
                }
                options={listoffice}
                styles={customStyles}
                onChange={(even: any) =>
                  setInputdata({
                    ...inputdata,
                    Officeid: even?.value || "",
                    Officename: even?.label || "",
                  })
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label>Jobdescription</label>
              <input
                type="text"
                className="form-control"
                id="symptom"
                placeholder="ภาระงานที่สั่ง"
                value={inputdata.symptom}
                onChange={(even) =>
                  setInputdata({ ...inputdata, symptom: even.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label>รายละเอียดเพิ่มเติม</label>
              <input
                type="text"
                className="form-control"
                id="Other"
                placeholder="รายละเอียดเพิ่มเติม"
                value={inputdata.Other}
                onChange={(even) =>
                  setInputdata({ ...inputdata, Other: even.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="form-group">
              <label>วันสั่งงาน</label>
              <input
                type="date"
                className="form-control"
                id="dateStart"
                placeholder="กำหนดวันเริ่มงาน"
                value={inputdata.dateStart ? inputdata.dateStart.split("T")[0] : ""}
                onChange={(even) =>
                  setInputdata({ ...inputdata, dateStart: even.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="form-group">
              <label>เวลาสั่งงาน</label>
              <input
                type="time"
                className="form-control"
                id="timeStart"
                placeholder="กำหนดวันเริ่มงาน"
                value={inputdata.timeStart}
                onChange={(even) =>
                  setInputdata({ ...inputdata, timeStart: even.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="form-group">
              <label>กำหนดวันส่งงาน</label>
              <input
                type="date"
                className="form-control"
                id="dateStop"
                placeholder="กำหนดวันเริ่มงาน"
                value={inputdata.dateStop ? inputdata.dateStop.split("T")[0] : ""}
                onChange={(even) =>
                  setInputdata({ ...inputdata, dateStop: even.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-4 col-sm-12">
            <div className="form-group">
              <label>กำนดเวลาส่งงาน</label>
              <input
                type="time"
                className="form-control"
                id="timeStop"
                placeholder="กำนดเวลาส่งงาน"
                value={inputdata.timeStop}
                onChange={(even) =>
                  setInputdata({ ...inputdata, timeStop: even.target.value })
                }
              />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 col-sm-12">
            <div className="form-group">
              <label>ผู้รับแจ้ง</label>
              <Select
                value={listpersonnelit.find(
                  (obj: any) => obj.value === inputdata.fullName1
                )}
                options={listpersonnelit}
                styles={customStyles}
                onChange={(even: any) =>
                  setInputdata({
                    ...inputdata,
                    userreceiveinForm: even?.value,
                    fullName1: even?.label,
                  })
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
          data-dismiss="modal"
          onClick={() => Cleartext()}
        >
          เคลียร์
        </button>
        <button
          type="button"
          className="btn btn-custom-blue"
          onClick={() => Savedata()}
        >
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default frmJobdescriptionITmenAdd;
