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
import API from "../../../Configs/config"
import { toast } from "react-toastify";

export interface Datadetail {
  Lendid: string;
  Returnid: string;
  Lendtitle: string;
  startDate: string;
  OutDate: string;
  Personid_lend: string;
  Pname_lend: string;
  Personid_out: string;
  Pname_out: string;
  Lendstatus: string;
  Returnstatus: string;
  Durableid: string;
  Productname: string;
  Categoryid: string;
  Categoryname: string;
}
export interface Listuser {
  fullname: string;
  ID: string;
}

export interface Listuser_out {
  fullname_out: string;
  ID: string;
}

interface userProps {
  datadetail: any;
  countS: any;
  reload: boolean;
  setReload: Dispatch<SetStateAction<boolean>>;
}

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

const FrmlendingITAdd: FC<userProps> = ({
  datadetail,
  countS,
  reload,
  setReload,
}) => {
  const txtInput = {
    Lendid: "",
    Returnid: "",
    Lendtitle: "",
    startDate: "",
    OutDate: "",
    Personid_lend: "",
    Pname_lend: "",
    Personid_out: "",
    Pname_out: "",
    Lendstatus: "",
    Returnstatus: "",
    Durableid: "",
    Productname: "",
    Categoryid: "",
    Categoryname: "",
  };

  const [inputdata, setInputdata] = useState(txtInput);
  const [Lend, setLend] = useState([]);
  const [Listcategory, setListcategory] = useState([]);
  const [Listdurable, setListdurable] = useState([]);
  const [Listuser, setListuser] = useState<Listuser[]>([]);
  const [user_out, setuserOut] = useState<Listuser_out[]>([]);

  useEffect(() => {
    if (datadetail != null && datadetail != 0) {
      Showdetail();
    } else {
      setInputdata(txtInput);
    }
  }, [datadetail]);

  useEffect(() => {
    setInputdata({
      ...inputdata,
      Lendid: sessionStorage.getItem("sessLendid") || "",
      Returnid: sessionStorage.getItem("sessReturnid") || "",
      Lendtitle: sessionStorage.getItem("sessLendtitle") || "",
      Lendstatus: sessionStorage.getItem("sessstatus") || "",
      Returnstatus: sessionStorage.getItem("sessReturnstatus") || "",
      startDate: sessionStorage.getItem("sessStartDate") || "",
      OutDate: sessionStorage.getItem("sessOutDate") || "",
      Personid_lend: sessionStorage.getItem("sessuserID") || "",
      Pname_lend: sessionStorage.getItem("sessPname_lend") || "",
      Personid_out: sessionStorage.getItem("sessPersonid_out") || "",
      Pname_out: sessionStorage.getItem("sessPname_out") || "",
      Durableid: sessionStorage.getItem("sessDurableid") || "",
      Productname: sessionStorage.getItem("sessProductname") || "",
      Categoryid: sessionStorage.getItem("sessCategoryid") || "",
      Categoryname: sessionStorage.getItem("sessCategoryname") || "",
    });
    ShowlistCategory();
    ShowlistDurabel(inputdata.Categoryid);
    Showlistlend();
    Showuser();
    Showuser_out();
  }, []);

  useEffect(() => {
    Showlistlend();
  }, []);

  async function Showdetail() {
    setInputdata({
      ...inputdata,
      Lendid: datadetail[0].Lendid,
      Returnid: datadetail[0].Returnid,
      Lendtitle: datadetail[0].Lendtitle,
      Lendstatus: datadetail[0].Lendstatus,
      Returnstatus: datadetail[0].Returnstatus,
      startDate: datadetail[0].startDate,
      OutDate: datadetail[0].OutDate,
      Personid_lend: datadetail[0].Personid_lend,
      Pname_lend: datadetail[0].Pname_lend,
      Personid_out: datadetail[0].Personid_out,
      Pname_out: datadetail[0].Pname_out,
      Durableid: datadetail[0].Durableid,
      Productname: datadetail[0].Productname,
      Categoryid: datadetail[0].Categoryid,
      Categoryname: datadetail[0].Categoryname,
    });
  }
  async function ShowlistCategory() {
    axios
      .get(API.returnURL.url + "Lending/Listcategory")
      .then(function (response) {
        setListcategory(response.data);
        // console.log(Listcategory)
      });
  }
  async function Showuser() {
    axios.get(API.returnURL.url + "lending/Listuser").then(function (response) {
      setListuser(response.data);
      //console.log(response.data)
    });
  }

  async function Showuser_out() {
    axios
      .get(API.returnURL.url + "lending/Listuser_out")
      .then(function (response) {
        setuserOut(response.data);
      });
  }

  async function ShowlistDurabel(Categoryid: string) {
    let url = API.returnURL.url + "Lending/Listdurable";
    if (Categoryid !== "") {
      url += "?Categoryid=" + Categoryid;
    }
    try {
      const response = await axios.get(url);
      const data = response.data;
      if (response.data !== "0") {
        setListdurable(data);
      } else {
        setListdurable([]);
      }
      // console.log(data)
    } catch (error) {
      console.error("Error fetching Lend", error);
    }
  }

  async function Cleartext() {
    setInputdata(txtInput);
  }

  async function Showlistlend() {
    const data = async () => {
      const rs = await axios.get(API.returnURL.url + "Lending");
      if (rs.status === 200) {
        const json = await rs.data;
        setLend(json);
      }
    };
    data();
  }

  async function Save() {
    if (inputdata.Lendtitle == "") {
      toast.error("กรุณากรอกข้อความ");
      document.getElementById("Lendtitle")?.focus();
    } else if (inputdata.startDate == "") {
      toast.error("กรุณาเลือกวันที่ยืม");
      document.getElementById("Startd")?.focus();
    }
    // else if (inputdata.returnDate == "") {
    //     toast.error("กรุณาเลือกวันที่คืน");
    //     document.getElementById("Endd")?.focus();
    // }
    else if (inputdata.Personid_lend == "") {
      toast.error("กรอกชื่อเจ้าหน้าที่");
      document.getElementById("personlend")?.focus();
    } else {
      const frmdata = new FormData();
      frmdata.append("Lendid", inputdata.Lendid);
      frmdata.append("Returnid", inputdata.Returnid);
      frmdata.append("Lendtitle", inputdata.Lendtitle);
      frmdata.append("Startd", inputdata.startDate);
      frmdata.append("Outd", inputdata.OutDate);
      frmdata.append("status", inputdata.Lendstatus);
      frmdata.append("Returnstatus", inputdata.Returnstatus);
      frmdata.append("personlend", inputdata.Personid_lend);
      frmdata.append("Pname_lend", inputdata.Pname_lend);
      frmdata.append("personout", inputdata.Personid_out);
      frmdata.append("Pname_out", inputdata.Pname_out);
      frmdata.append("tdurable", inputdata.Durableid);
      axios
        .post(API.returnURL.url + "Lending", frmdata)
        .then((response) => {
          if (response.data == "0") {
            toast.success("ทำการยืมเรียบร้อยแล้ว");
            setTimeout(() => {
              Showlistlend();
              setReload(!reload);
              window.location.reload(); // รีเฟรชหน้า
            }, 1200); // 1 วินาทีหลังจากแสดงข้อความ
          } else if (response.data == "1") {
            toast.warning("มีการยืมครุภัณฑ์นี้อยู่");
            document.getElementById("Productname")?.focus();
          } else {
            toast.success("แก้ไขรายละเอียดการยืมเรียบร้อย");
            Showlistlend();
            setTimeout(() => {
              Showlistlend();
              setReload(!reload);
              window.location.reload(); // รีเฟรชหน้า
            }, 1200); // 1 วินาทีหลังจากแสดงข้อความ
          }
          console.log(response);
        })
        .catch((error) => {
          toast.error("เกิดข้อผิดพลาดระหว่างบันทึก" + error);
          console.log(error);
        });
    }
  }

  const datenow = new Date().toISOString().split("T")[0];

  const st = [
    { value: "0", label: "จองไว้" },
    { value: "1", label: "จ่ายออก" },
    { value: "2", label: "คืน" },
  ];
  const statusfilter =
    inputdata.Lendid !== "" ? st : st.filter((option) => option.value !== "2");

  function getstartDate(todate: string | undefined | null) {
    if (!todate) {
      return "";
    } else {
      const fomatDateStart = inputdata.startDate.split("T")[0];
      return fomatDateStart;
    }
  }
  function getOutDate(todate: string | undefined | null) {
    if (!todate) {
      return "";
    } else {
      const fomatDateEnd = inputdata.OutDate.split("T")[0];
      return fomatDateEnd;
    }
  }

  async function Selectname(event: any) {
    console.log(event.target?.value);
    const value = event.target?.value;
    const keepuser = Listuser.filter((el) => el.fullname === value); //filter เอาข้อมูลจาก Listuser ออกมา sessuserID

    if (keepuser.length > 0) {
      const keepfullname = keepuser[0].fullname;
      const keepID = keepuser[0].ID;

      // console.log("Fullname", keepfullname);
      // console.log("ID", keepID);

      setInputdata({
        ...inputdata,
        Pname_lend: keepfullname,
        Personid_lend: keepID,
      });
    } else {
      console.error("User not found");
    }
  }

  async function Selectname_out(event: any) {
    const value = event.target?.value;
    const keepuser = user_out.filter((el) => el.fullname_out === value);
    console.log(value);
    if (keepuser.length > 0) {
      const keepfullname = keepuser[0].fullname_out;
      const keepID = keepuser[0].ID;

      console.log("Fullname", keepfullname);
      console.log("ID", keepID);

      setInputdata({
        ...inputdata,
        Pname_out: keepfullname,
        Personid_out: keepID,
      });
    } else {
      console.error("User not found");
    }
    console.log(inputdata);
  } //set แต่ไม่ filter

  return (
    <div>
      <form>
        <div className="row">
          <div className="form-row row">
            <div className="form-group col-md-6">
            <label>
                  ชื่อผู้ยืม
                </label>
              <Select
                value={Listuser.find(
                  (obj: any) => obj.value == inputdata.Personid_lend
                )}
                options={Listuser}
                styles={customStyles}
                onChange={(even: any) => {
                  setInputdata({
                    ...inputdata,
                    Personid_lend: even?.value,
                    Pname_lend: even?.label,
                  });
                }}
              />
            </div>
            {/* <div className="form-group col-md-6">
              <Select
                value={user_out.find(
                  (obj: any) => obj.value == inputdata.Personid_out
                )}
                options={user_out}
                styles={customStyles}
                onChange={(even: any) => {
                  setInputdata({
                    ...inputdata,
                    Personid_out: even?.value,
                    Pname_out: even?.label,
                  });
                }}
              />
            </div> */}
          </div>

          <div className="form-row">
            <div className="form-group col-md-12">
              <label>
                รายละเอียดการยืม<sub className="text-danger h6"> * </sub>
              </label>
              <textarea
                className="form-control"
                placeholder="ระบุรายละเอียด"
                id="lendtitle"
                value={inputdata.Lendtitle}
                onChange={(even: any) =>
                  setInputdata({ ...inputdata, Lendtitle: even.target.value })
                }
              />
            </div>
          </div>

          {sessionStorage.getItem("sessStr") === "3" ? (
            <div></div>
          ) : (
            <div className="form-row row">
              <div className="form-group col-md-4">
                <label>
                  หมวด<sup className="text-danger h6"> * </sup>
                </label>
                <Select
                  value={Listcategory.find(
                    (obj: any) => obj.value === inputdata.Categoryid
                  )}
                  options={Listcategory}
                  styles={customStyles}
                  onChange={(even: any) => {
                    const selectedCategory = even?.value;
                    setInputdata({
                      ...inputdata,
                      Categoryid: selectedCategory,
                      Categoryname: even?.label,
                    });
                    ShowlistDurabel(selectedCategory);
                  }}
                />
              </div>
              <div className="form-group col-md-4">
                <label>
                  ชื่อครุภัณฑ์<sup className="text-danger h6"> * </sup>
                </label>

                <Select
                  value={Listdurable.find(
                    (obj: any) => obj.label === inputdata.Productname
                  )}
                  options={Listdurable}
                  styles={customStyles}
                  onChange={(event: any) =>
                    setInputdata({
                      ...inputdata,
                      Durableid: event?.value,
                      Productname: event?.label,
                    })
                  }
                />
              </div>
              <div className="form-group col-md-4">
                <label>สถานะ</label>
                <Select
                  value={st.find(
                    (obj: any) => obj.value === inputdata.Lendstatus
                  )}
                  options={statusfilter}
                  styles={customStyles}
                  onChange={(SelectStatus) =>
                    setInputdata({
                      ...inputdata,
                      Lendstatus: SelectStatus?.value || "",
                    })
                  }
                />
              </div>
              <div className="form-group col-md-5">
                <label>
                  เลขครุภัณฑ์<sup className="text-danger h6"> * </sup>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="tdurableid"
                  placeholder="เลขครุภัณฑ์"
                  value={inputdata.Durableid}
                  onChange={(event) =>
                    setInputdata({
                      ...inputdata,
                      Durableid: event.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <div className="form-row row">
            <div className="form-group col-md-4">
              <label>
                วันที่มารับ<sup className="text-danger h6"> * </sup>
              </label>
              <input
                type="date"
                min={datenow}
                className="form-control"
                id="Startd"
                value={getstartDate(inputdata.startDate)}
                onChange={(even) =>
                  setInputdata({ ...inputdata, startDate: even.target.value })
                }
              />
            </div>

            {inputdata.Lendstatus === "1" ? (
              <div className="form-group col-md-4">
                <label>
                  วันที่จ่ายออก<sup className="text-danger h6"> * </sup>
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="Outd"
                  value={getOutDate(inputdata.OutDate)}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, OutDate: even.target.value })
                  }
                />
              </div>
            ) : (
              <div className="form-group col-md-4">
                <label>
                  วันที่จ่ายออก<sup className="text-danger h6"> * </sup>
                </label>
                <input
                  type="date"
                  disabled
                  className="form-control"
                  id="Outd"
                  value={getOutDate(inputdata.OutDate)}
                  onChange={(even) =>
                    setInputdata({ ...inputdata, OutDate: even.target.value })
                  }
                />
              </div>
            )}
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
          {" "}
          เคลียร์
        </button>
        <button
          type="button"
          className="btn btn-custom-blue"
          onClick={() => Save()}
          disabled={
            inputdata.Lendtitle === "" ||
            inputdata.startDate === "" ||
            inputdata.Personid_lend === ""
          }
        >
          {" "}
          บันทึก
        </button>
      </div>
    </div>
  );
};

export default FrmlendingITAdd;
