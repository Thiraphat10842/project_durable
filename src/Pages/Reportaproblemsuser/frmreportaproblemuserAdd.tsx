import React, {
  Dispatch,
  FC,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import axios from "axios";
import Select from "react-select";
import API from "../../Configs/config";
import { toast } from "react-toastify";
import "./stylereport.css";
// import { datacontext } from './Frmreportaproblem';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


export interface Datadetail {
  tID: string;
  Officeid: string;
  Officename?: string;
  Position?: string;
  email?: number;
  other?: number;
  personnelID?: number;
  personnelLineid?: string;
  personnelName?: string;
  report?: string;
  reportDate?: string;
  str?: string;
  tel?: string;
  userID?: string;
  userLineid?: string;
  userName?: string;
  workgroup?: string;
}

interface userProps {
  datadetail: any;
  countS: any;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

const frmreportaproblemuserAdd: FC<userProps> = ({ datadetail }) => {
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
    tReportID: "",
    tReport: "",
    tWorkgroup: "",
    tofficeID: "",
    tReportdate: "",
    tTel: "",
    tEmail: "",
    tUser: "",
    tPersonnelid: "",
    tPersonnelname: "",
    tOther: "",
    tFile: "",
    tLineid: "",
    tUserstr: "",
    tStatus: "0",
    tOfficename: "",
    tpersonnelID: "",
  };
  const [inputdata, setInputdata] = useState(txtInput);

  // const datadetail = useContext<any>(datacontext);
  const [listoffice, setlistOffice] = useState([]);
  const [strhidden, setStrhidden] = useState(false);
  const [listoptions, setlistOptions] = useState([]);

  useEffect(() => {
    if (datadetail != null && datadetail != 0) {
      Showdetail();
    } else {
      setInputdata(txtInput);
    }
  }, [datadetail]);
  // console.log(datadetail)
  useEffect(() => {
    let tdateNow = new Date();

    setInputdata({
      ...inputdata,
      tofficeID: sessionStorage.getItem("sessofficeID") || "",
      tWorkgroup: sessionStorage.getItem("sessofficeName") || "",
      tEmail: sessionStorage.getItem("sessEmail") || "",
      tReportdate: tdateNow.toISOString() || "",
      tLineid: sessionStorage.getItem("sessLineid") || "",
      tUserstr: sessionStorage.getItem("sessStr") || "",
      tPersonnelid: sessionStorage.getItem("sessuserID") || "",
      tPersonnelname: sessionStorage.getItem("sessName") || "",
      tOfficename: sessionStorage.getItem("sessOfficename") || "",
    });

    if (sessionStorage.getItem("sessStr") == "1") {
      setStrhidden(false);
    } else {
      setStrhidden(true);
    }

    Showlistoffice();
    Showlistitem();
  }, []);

  async function Showdetail() {
    var checkboxStr = document.getElementById("tStatus") as HTMLInputElement;
    setInputdata({
      ...inputdata,
      tID: datadetail[0].ID,
      tReport: datadetail[0].report,
      tWorkgroup: datadetail[0].workgroup,
      tofficeID: datadetail[0].Officeid,
      tReportdate: datadetail[0].reportDate.substr(0, 10),
      tTel: datadetail[0].tel,
      tEmail: datadetail[0].email,
      tUser: datadetail[0].userName,
      tPersonnelid: datadetail[0].userID,
      tOther: datadetail[0].other,
      tLineid: datadetail[0].userLineid,
      tStatus: datadetail[0].str,
      tpersonnelID: datadetail[0].personnelID,
      tOfficename: datadetail[0].Officename,
    });

    // checkboxStr.checked = datadetail[0]?.str == '1';
  }
  async function Showlistoffice() {
    //const res = await axios.get(API.returnURL.url + "Office");
    axios.get(API.returnURL.url + "Office").then(function (response) {
      console.log(response);
      setlistOffice(response.data);
    });
  }

  
  async function Showipaddress() {
    axios
      .get(API.returnURL.url + "Reportproblem/Getipaddress")
      .then(function (response) {
        console.log(response.data);
      });
  }



  async function sendLineNotification(message: string) {
    console.log("📌 ข้อมูลที่ส่ง:", { message });

    try {
      const response = await axios.post(
        API.returnURL.url + "Sendline/SendToadminandit",
        {
          message: message,
        }
      );

      if (response.status === 200) {
        toast.success("ส่งข้อความแจ้งเตือนไปยัง LINE สำเร็จ!");
      } else {
        toast.error("ไม่สามารถส่งข้อความแจ้งเตือนได้");
      }
    } catch (error) {
      console.error("Error sending LINE Notify:", error);
      toast.error("เกิดข้อผิดพลาดในการส่งข้อความ LINE");
    }
  }

  async function getIPAddress() {
    try {
      const response = await axios.get("https://api64.ipify.org?format=json");
      return response.data.ip;
    } catch (error) {
      console.error("ไม่สามารถดึง IP Address ได้", error);
      return "ไม่ทราบ IP";
    }
  }
  
  async function Savedata() {
    if (inputdata.tReport == "") {
      toast.error("กรุณาแจ้งเรื่องที่ต้องการแจ้งด้วยครับ!");
      document.getElementById("tReport")?.focus();
      return false;
    } else if (inputdata.tofficeID == "") {
      toast.error("กรุณาเลือกหน่วยงานด้วยครับ!");
      return false;
    } else if (inputdata.tTel == "") {
      toast.error("กรุณาใส่เบอร์โทรติดต่อด้วยครับ!");
      document.getElementById("tTel")?.focus();
      return false;
    } else {
      const frmdata = new FormData();
      const userIP = await getIPAddress();
      frmdata.append("id", inputdata.tID);
      frmdata.append("personnelID", inputdata.tPersonnelid);
      frmdata.append("officeID", inputdata.tofficeID);
      frmdata.append("workgroup", inputdata.tWorkgroup);
      frmdata.append("report", inputdata.tReport);
      frmdata.append("tel", inputdata.tTel);
      frmdata.append("email", inputdata.tEmail);
      frmdata.append("lineID", inputdata.tLineid);
      frmdata.append("userStr", inputdata.tUserstr);
      frmdata.append("userID", inputdata.tPersonnelid);
      frmdata.append("status", inputdata.tStatus);
      frmdata.append("Officename", inputdata.tOfficename);
          // ✅ แปลงค่า Status เป็นข้อความ
    const statusLabels: Record<string, string> = {
      "0": "แจ้งปัญหา",
      "1": "รับแจ้งแล้ว",
      "2": "สั่งงานแล้ว",
      "3": "ดำเนินการเสร็จแล้ว",
    };
    const statusText = statusLabels[inputdata.tStatus] || "ไม่ทราบสถานะ";
      try {
        const response = await axios.post(
          API.returnURL.url + `Reportproblem`,
          frmdata
        );
  
        if (response.data == "0") {
          toast.success("ระบบทำการบันทึกข้อมูลการลงทะเบียนเรียบร้อยแล้วครับ");
  
          // ✅ ส่งแจ้งเตือน LINE
          await sendLineNotification(
            `\n📢เรื่องที่แจ้ง: ${inputdata.tReport}\n 🏢 จากหน่วยงาน:${inputdata.tWorkgroup} ${inputdata.tofficeID}\n 📞 เบอร์ติดต่อ:${inputdata.tTel} \n ⚠️ สถานะ: ${statusText}\n 🌍 IP Address: ${userIP}`
          );
        } else if (response.data == "1") {
          toast.warning("ระบบตรวจพบว่ามีข้อมูล Username นี้ในระบบแล้วครับ");
          document.getElementById("tUsername")?.focus();
        } else {
          toast.success("ระบบทำการบันทึกแก้ไขข้อมูลเรียบร้อยแล้ว");
  
          await sendLineNotification(
            `\n📢เรื่องที่แจ้ง: ${inputdata.tReport}\n 🏢 จากหน่วยงาน:${inputdata.tWorkgroup} ${inputdata.tofficeID}\n 📞 เบอร์ติดต่อ:${inputdata.tTel}\n ⚠️ สถานะ: ${statusText}\n 🌍 IP Address: ${userIP}`
          );
  
          setTimeout(() => {
            Cleartext();
            window.location.reload();
          }, 1300);
        }
      } catch (error) {
        toast.error("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error);
        console.error(error);
      }
    }
    }
  async function Selectstr(str: boolean) {
    if (str == true) {
      setInputdata({ ...inputdata, tStatus: "1" });
    } else {
      setInputdata({ ...inputdata, tStatus: "0" });
    }
  }

  async function Showlistitem() {
    axios
      .get(API.returnURL.url + "Jobdescription/Showlistitem")
      .then(function (response) {
        setlistOptions(response.data);
      });
  }
  async function Cleartext() {
    setInputdata(txtInput);
  }
  const datenow = new Date().toISOString().split("T")[0];

  return (
    <div>
      <form>
        <div className="row">
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label>เรื่องที่แจ้ง</label>
              <Autocomplete
                id="Personlend"
                freeSolo
                onSelect={(even: any) =>
                  setInputdata({ ...inputdata, tReport: even.target.value })
                }
                options={listoptions}
                renderInput={(params) => (
                  <TextField
                    className="kanit-thin"
                    {...params}
                    placeholder="พิมพ์เรื่องที่แจ้ง"
                    variant="outlined"
              
                    InputProps={{
                      ...params.InputProps,
                      style: { height: 40 },
                    }}
                  />
                )}
                onInputChange={(even: any) =>
                  setInputdata({ ...inputdata, tReportID: even.target.value })
                }
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label>หน่วยงาน</label>
              <Select
                value={listoffice.find(
                  (obj: any) => obj.value === inputdata.tofficeID
                )}
                options={listoffice}
                styles={customStyles}
                onChange={(even: any) =>
                  setInputdata({
                    ...inputdata,
                    tofficeID: even?.value,
                    tWorkgroup: even?.label,
                  })
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label>วันที่แจ้ง</label>
              <input
                type="date"
                min={datenow}
                className="form-control"
                id="tReportdate"
                value={inputdata.tReportdate}
                onChange={(even) =>
                  setInputdata({ ...inputdata, tReportdate: even.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12">
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
          <div className="col-md-6 col-sm-12">
            <div className="form-group">
              <label>Email</label>
              <input
                type="text"
                className="form-control"
                id="tEmail"
                onChange={(even) =>
                  setInputdata({ ...inputdata, tEmail: even.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-12 col-sm-12">
            <div className="form-group" hidden>
              <label>รูปภาพ</label>
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

export default frmreportaproblemuserAdd;
