import { FC, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import API from '../Configs/config';
import { itserviceW } from '../Configs/partfile';
import axios from 'axios';

const Frmlogin: FC = () => {

    const txtInput = { tUsername: '', tPassword: '' }
    const [inputdata, setInputdata] = useState(txtInput);
    // const [reload, setReload] = useState<boolean>(false)

    const navigate = useNavigate()

    useEffect(() => {

        Showsettingprogram();

    }, [])

    async function Checklogin() {

        if (inputdata.tUsername == "") {
            toast.error("กรุณาระบุ Username ด้วยครับ!");
            document.getElementById("tUsername")?.focus();
            return false;
        } else if (inputdata.tPassword == "") {
            toast.error("กรุณาระบุ Password ด้วยครับ!");
            document.getElementById("tPassword")?.focus();
            return false;
        } else {

            axios.get(API.returnURL.url + "Login?username=" + inputdata.tUsername + "&passwd=" + inputdata.tPassword)
                .then(function (response) {

                    console.log(response.data[0].Str);
                    sessionStorage.setItem('sessStr', response.data[0].Str);
                    sessionStorage.setItem('sessID', response.data[0].ID);
                    sessionStorage.setItem('sessuserID', response.data[0].ID);
                    sessionStorage.setItem('sessName', response.data[0].Tname + response.data[0].Fname + ' ' + response.data[0].Lname);
                    sessionStorage.setItem('sessPositon', response.data[0].Position);
                    sessionStorage.setItem('sessImg', response.data[0].Img);
                    sessionStorage.setItem('sessLineid', response.data[0].LineID);
                    sessionStorage.setItem('sessno_SKH', response.data[0].no_SKH);
                    sessionStorage.setItem('sessEmail', response.data[0].Emailaddress);
                    sessionStorage.setItem('sessofficeID', response.data[0].Officeid);
                    sessionStorage.setItem('sessofficeName', response.data[0].Officename);
                    sessionStorage.setItem('sessIS_login', response.data[0].is_login)
                    if (response.data[0].Str == "1") {

                        navigate('/Admin')

                    } else if (response.data[0].Str == "2") {

                        navigate('/ITmen')  //เสร็จแล้วยังไม่สร้างpath

                    } else if (response.data[0].Str == "3") {

                        navigate('/User')

                    }

                    window.location.reload();
                });
        }
    }

    async function Showsettingprogram() {
        axios.get(API.returnURL.url + "Login/Settingprogram")
            .then(function (response) {
                //console.log(response.data);
                sessionStorage.setItem('sessProgramname', response.data[0].Programname);
                sessionStorage.setItem('sessProgramlogo1', response.data[0].Programlogo1);
                sessionStorage.setItem('sessProgramlogo2', response.data[0].Programlogo2);
                sessionStorage.setItem('sessProgramlogo3', response.data[0].Programlogo3);
                sessionStorage.setItem('sessProgramlogomini', response.data[0].Programlogomini);
                sessionStorage.setItem('sessProgramlogoloanding', response.data[0].Programlogoloanding);
                sessionStorage.setItem('sessIcondefaultuser', response.data[0].Icondefaultuser);

            });
    }


    return (

        <div style={{width: '100vh', textAlign: 'center', marginLeft: '25%', marginTop: '8%'}}>
            <div className="main-wrapper">
                {/* <div className="preloader">
                    <div className="lds-ripple">
                        <div className="lds-pos" />
                        <div className="lds-pos" />
                    </div>
                </div> */}
                <div className="auth-wrapper d-flex no-block justify-content-center align-items-center bg-dark" style={{borderRadius: 10}}>
                    <div className="auth-box bg-dark border-top border-secondary">
                        <div>
                            <div className="text-center pt-3 pb-3">
                                <span className="db"><img src={itserviceW} alt="logo" /></span>
                            </div>

                            <form className="form-horizontal mt-3">
                                <div className="row pb-4">
                                    <div className="col-12">
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-success text-white h-100" id="basic-addon1"><i className="mdi mdi-account fs-4" /></span>
                                            </div>
                                            <input type="text" id="tUsername" className="form-control form-control-lg" placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" value={inputdata.tUsername} onChange={(even) => setInputdata({...inputdata, tUsername: even.target.value})} />
                                        </div>
                                        <div className="input-group mb-3">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text bg-warning text-white h-100" id="basic-addon2"><i className="mdi mdi-lock fs-4" /></span>
                                            </div>
                                            <input type="password" id="tPassword" className="form-control form-control-lg" placeholder="Password" aria-label="Password" aria-describedby="basic-addon1" value={inputdata.tPassword} onChange={(even) => setInputdata({...inputdata, tPassword: even.target.value})} />
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="row border-top border-secondary">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <div className="pt-3">
                                                {/* <button className="btn btn-info" id="to-recover" type="button">
                                                    <i className="mdi mdi-lock fs-4 me-1" /> Lost password?
                                                </button> */}
                                                <button className="btn btn-success float-end text-white" type="button" style={{marginBottom: 20}} onClick={() => Checklogin()}>
                                                    Login
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default Frmlogin