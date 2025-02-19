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

const frmreportaproblemedit: FC<userProps> = ({ datadetail }) => {
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
    tpersonnelID: "",
    tPersonnelname: "",
    tOther: "",
    tFile: "",
    tLineid: "",
    tUserstr: "",
    tStatus: "0",
    tPersonnelid: ''
  };

  const [inputdata, setInputdata] = useState(txtInput);
  const [listoffice, setlistOffice] = useState([]);
  const [strhidden, setStrhidden] = useState(false);
  const [listoptions, setlistOptions] = useState([]);
  const statusOptions = [
    { value: "0", label: "แจ้งปัญหา" },
    { value: "1", label: "รับแจ้ง" },
    { value: "2", label: "สั่งงาน" },
    { value: "3", label: "ดำเนินการเสร็จแล้ว" },
    // { value: '4', label: 'ไม่รับแจ้ง' },
  ];

  useEffect(() => {
    if (datadetail != null && datadetail != 0) {
      Showdetail();
    } else {
      setInputdata(txtInput);
    }
  }, [datadetail]);

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
      tpersonnelID: sessionStorage.getItem("sessPersonnelID") || "",
      tPersonnelname: sessionStorage.getItem("sessName") || "",
      tPersonnelid: sessionStorage.getItem('sessuserID') || '',
      
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
      tpersonnelID: datadetail[0].personnelID,
      tOther: datadetail[0].other,
      tLineid: datadetail[0].userLineid,
      tStatus: datadetail[0].str,
      tPersonnelid: datadetail[0].userID,
    });

    // checkboxStr.checked = datadetail[0]?.str == '1';
  }

  async function Showlistoffice() {
    axios.get(API.returnURL.url + "Office").then(function (response) {
      setlistOffice(response.data);
    });
  }

  async function Showlistitem() {
    axios
      .get(API.returnURL.url + "Jobdescription/Showlistitem")
      .then(function (response) {
        setlistOptions(response.data);
      });
  }

  async function sendLineNotification(message: string) {
    let personnelID = inputdata.tpersonnelID || datadetail?.personnelID || sessionStorage.getItem("sessPersonnelID") || "";

    if (!personnelID) {
        toast.error("ไม่พบ Personnel ID");
        return;
    }

    console.log("📌 ข้อมูลที่ส่ง:", { personnelID, message });

    try {
        const response = await axios.post(
            API.returnURL.url + "Sendline/SendToPersonnel",
            {
                personnelID: personnelID,
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


  async function Savedata() {
    if (!inputdata.tReport) {
      toast.error("กรุณาแจ้งเรื่องที่ต้องการแจ้งด้วยครับ!");
      document.getElementById("tReport")?.focus();
      return;
    }
    if (!inputdata.tofficeID) {
      toast.error("กรุณาเลือกหน่วยงานด้วยครับ!");
      return;
    }
    if (!inputdata.tTel) {
      toast.error("กรุณาใส่เบอร์โทรติดต่อด้วยครับ!");
      document.getElementById("tTel")?.focus();
      return;
    }

    const frmdata = new FormData();
    frmdata.append("id", inputdata.tID);
    frmdata.append("personnelID", inputdata.tpersonnelID);
    frmdata.append("officeID", inputdata.tofficeID);
    frmdata.append("workgroup", inputdata.tWorkgroup);
    frmdata.append("report", inputdata.tReport);
    frmdata.append("tel", inputdata.tTel);
    frmdata.append("email", inputdata.tEmail);
    frmdata.append("lineID", inputdata.tLineid);
    frmdata.append("userStr", inputdata.tUserstr);
    frmdata.append("userID", inputdata.tPersonnelid);
    frmdata.append("status", inputdata.tStatus);

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
          `\n📢 ใบงานที่: ${inputdata.tID}\n 📋เรื่องที่แจ้ง: ${inputdata.tReport}\n ⚠️ สถานะ: ${statusText}`
        );
      } else if (response.data == "1") {
        toast.warning("ระบบตรวจพบว่ามีข้อมูล Username นี้ในระบบแล้วครับ");
        document.getElementById("tUsername")?.focus();
      } else {
        toast.success("ระบบทำการบันทึกแก้ไขข้อมูลเรียบร้อยแล้ว");

        await sendLineNotification(
          `\n📢 ใบงานที่: ${inputdata.tID}\n 📋เรื่องที่แจ้ง: ${inputdata.tReport}\n ⚠️ สถานะ: ${statusText}`
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
  async function Cleartext() {
    setInputdata(txtInput);
  }
  const datenow = new Date().toISOString().split("T")[0];
  return (
    <div>
      <form>
        <div className="row">
          {/* <div className="form-group">
            <label>Personnel ID</label>
            <input
              type="text"
              className="form-control"
              id="tPersonnelID"
              value={inputdata.tpersonnelID}
              readOnly
            />
          </div> */}
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
                    {...params}
                    label="พิมพ์เรื่องที่แจ้ง"
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
                value={inputdata.tEmail}
                onChange={(even) =>
                  setInputdata({ ...inputdata, tEmail: even.target.value })
                }
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12"></div>

          {/* ใช้ Select แทน Checkbox */}
          <div className="col-md-12 col-sm-12">
            <div className="form-group">
              <label>สถานะ</label>
              <Select
                value={statusOptions.find(
                  (option) => option.value === inputdata.tStatus
                )}
                options={statusOptions}
                onChange={(selectedOption: any) =>
                  setInputdata({ ...inputdata, tStatus: selectedOption.value })
                }
                styles={customStyles}
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
          ยกเลิก
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

export default frmreportaproblemedit;
