import React, { FC } from 'react'
import './stylesidebay.css'


const Frmsidebaradmin: FC = () => {
  
  return (
    <aside className="left-sidebar" >
      <div className="scroll-sidebar">
        <nav className="sidebar-nav">
          <ul id="sidebarnav" className="pt-4">
            <li className="sidebar-item">
              <a className="sidebar-link waves-effect waves-dark sidebar-link" href="/Admin" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24"><path fill="#f4f4f4" stroke="#f4f4f4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.7} d="M20 19v-8.5a1 1 0 0 0-.4-.8l-7-5.25a1 1 0 0 0-1.2 0l-7 5.25a1 1 0 0 0-.4.8V19a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1"></path></svg>
                <span className="hide-menu">&nbsp;หน้าหลัก</span></a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link waves-effect waves-dark sidebar-link" href="#" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 16 16">
                <path fill="#f4f4f4" d="M2.5 2A1.5 1.5 0 0 0 1 3.5v3A1.5 1.5 0 0 0 2.5 8h11A1.5 1.5 0 0 0 15 6.5v-3A1.5 1.5 0 0 0 13.5 2zm0 8A1.5 1.5 0 0 0 1 11.5v1A1.5 1.5 0 0 0 2.5 14h3A1.5 1.5 0 0 0 7 12.5v-1A1.5 1.5 0 0 0 5.5 10zm8 0A1.5 1.5 0 0 0 9 11.5v1a1.5 1.5 0 0 0 1.5 1.5h3a1.5 1.5 0 0 0 1.5-1.5v-1a1.5 1.5 0 0 0-1.5-1.5z"></path>
              </svg>
                <span className="hide-menu">&nbsp;ปฎิทินกิจกรรม</span></a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                <path fill="#fffcfc" d="M20 6c0-2.168-3.663-4-8-4S4 3.832 4 6v2c0 2.168 3.663 4 8 4s8-1.832 8-4zm-8 13c-4.337 0-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4v-3c0 2.168-3.663 4-8 4"></path>
                <path fill="#fffcfc" d="M20 10c0 2.168-3.663 4-8 4s-8-1.832-8-4v3c0 2.168 3.663 4 8 4s8-1.832 8-4z"></path>
              </svg>
                <span className="hide-menu"> &nbsp;จัดการผู้ใช้งาน </span></a>
              <ul aria-expanded="false" className="collapse first-level">
                <li className="sidebar-item">
                  <a href="/Admin/User" className="sidebar-link">
                    <span className="hide-menu">&nbsp; - ผู้ใช้งาน </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="/Admin/Office" className="sidebar-link">
                    <span className="hide-menu">&nbsp; - หน่วยงาน </span></a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 16 16">
                <path fill="#fffcfc" d="M3.5 2a.5.5 0 0 0-.5.5V13H2v1h6v-1.5H4V3h8v1h1V2.5a.5.5 0 0 0-.5-.5z"></path>
                <path fill="#fffcfc" fillRule="evenodd" d="M9.5 5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5zm1.5 7.5h1v-1h-1z" clipRule="evenodd"></path>
              </svg>
                <span className="hide-menu"> &nbsp; ครุภัณฑ์คอมพิวเตอร์ </span></a>
              <ul aria-expanded="false" className="collapse first-level">
                <li className="sidebar-item">
                  <a href="/Admin/Computer" className="sidebar-link">
                    <span className="hide-menu"> &nbsp; - ทะเบียนครุภัณฑ์ </span></a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                <path fill="#fffcfc" d="M2 2h5.077A3.926 3.926 0 0 1 11 5.923V11H5.923A3.926 3.926 0 0 1 2 7.077zm11 3.923A3.926 3.926 0 0 1 16.923 2H22v5.077A3.926 3.926 0 0 1 18.077 11H13zm-11 11A3.926 3.926 0 0 1 5.923 13H11v5.077A3.926 3.926 0 0 1 7.077 22H2zM13 13h5.077A3.926 3.926 0 0 1 22 16.923V22h-5.077A3.926 3.926 0 0 1 13 18.077z"></path>
              </svg>
                <span className="hide-menu">  &nbsp; ระบบยืมคืนคอมพิวเตอร์ </span></a>
              <ul aria-expanded="false" className="collapse first-level">
                <li className="sidebar-item">
                  <a href="/Admin/Lending" className="sidebar-link">
                    <span className="hide-menu"> &nbsp; - ยืมครุภัณฑ์คอมพิวเตอร์ </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="/Admin/Returnequipments" className="sidebar-link">
                    <span className="hide-menu"> &nbsp; - คืนครุภัณฑ์คอมพิวเตอร์ </span></a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 48 48">
                <g fill="none" stroke="#fffcfc" strokeLinejoin="round" strokeWidth={2.5}>
                  <path strokeLinecap="round" d="M41.78 20.607a13.1 13.1 0 0 0-.25-5.102a12.94 12.94 0 0 0-3.415-6.018a12.94 12.94 0 0 0-6.018-3.416a13.1 13.1 0 0 0-5.102-.249m7.195 13.982a5.99 5.99 0 0 0-1.692-5.132a5.99 5.99 0 0 0-5.132-1.692"></path>
                  <path fill="#fffcfc" d="M14.376 8.794a2 2 0 0 1 1.748 1.03l2.447 4.406a2 2 0 0 1 .04 1.866l-2.357 4.713s.683 3.512 3.541 6.37c2.859 2.858 6.359 3.53 6.359 3.53l4.712-2.357a2 2 0 0 1 1.867.041l4.42 2.457a2 2 0 0 1 1.027 1.748v5.074c0 2.583-2.4 4.45-4.848 3.623c-5.028-1.696-12.832-4.927-17.78-9.873c-4.946-4.947-8.176-12.752-9.873-17.78c-.826-2.448 1.04-4.848 3.624-4.848z"></path>
                </g>
              </svg>
                <span className="hide-menu"> &nbsp;  แจ้งปัญหาด้านงาน IT </span></a>
              <ul aria-expanded="false" className="collapse first-level">
                <li className="sidebar-item">
                  <a href="/Admin/Informrepair" className="sidebar-link">
                    <span className="hide-menu">&nbsp;  - ขอโปรแกรม / รายงาน </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="/Admin/Reportaproblem" className="sidebar-link">
                    <span className="hide-menu">&nbsp; - แจ้งปัญหา </span></a>
                </li>
                {/* <li className="sidebar-item">
                  <a href="/Admin/Labour" className="sidebar-link">
                    <span className="hide-menu"> &nbsp;  - ภาระงาน </span></a>
                </li> */}
                <li className="sidebar-item">
                  <a href="/Admin/Jobdescription" className="sidebar-link">
                    <span className="hide-menu"> &nbsp; - Job description </span></a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link waves-effect waves-dark sidebar-link" href="#" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                <path fill="#fffcfc" d="M15.25 18.75q.3 0 .525-.225T16 18t-.225-.525t-.525-.225t-.525.225T14.5 18t.225.525t.525.225m2.75 0q.3 0 .525-.225T18.75 18t-.225-.525T18 17.25t-.525.225t-.225.525t.225.525t.525.225m2.75 0q.3 0 .525-.225T21.5 18t-.225-.525t-.525-.225t-.525.225T20 18t.225.525t.525.225M18 23q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23M7 9h10V7H7zm4.675 12H5q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v6.7q-.725-.35-1.463-.525T18 11q-.275 0-.513.012t-.487.063V11H7v2h6.125q-.45.425-.812.925T11.675 15H7v2h4.075q-.05.25-.062.488T11 18q0 .825.15 1.538T11.675 21"></path>
              </svg>
                <span className="hide-menu">  &nbsp; เวรเจ้าหน้าที่ </span></a>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link has-arrow waves-effect waves-dark" href="#" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 24 24">
                <path fill="#fffcfc" d="M18 3a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-4.724l-4.762 2.857a1 1 0 0 1-1.508-.743L7 21v-2H6a4 4 0 0 1-3.995-3.8L2 15V7a4 4 0 0 1 4-4zm-6 10a1 1 0 0 0-1 1v.01a1 1 0 0 0 2 0V14a1 1 0 0 0-1-1m0-6a1 1 0 0 0-1 1v3a1 1 0 0 0 2 0V8a1 1 0 0 0-1-1"></path>
              </svg>
                <span className="hide-menu"> &nbsp;  ระบบรายงานครุภัณฑ์คอม </span></a>
              <ul aria-expanded="false" className="collapse first-level">
                <li className="sidebar-item">
                  <a href="index2.html" className="sidebar-link">
                    <span className="hide-menu"> &nbsp; - รายงานคอมพิวเตอร์ </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="pages-gallery.html" className="sidebar-link">
                    <span className="hide-menu"> &nbsp;  - รายงาน Nootbook </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="pages-calendar.html" className="sidebar-link">
                    <span className="hide-menu"> &nbsp; - รายงาน Printer </span></a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false"><svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 20 20">
                <path fill="#fff" d="M10 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8m-4.991 9A2 2 0 0 0 3 13c0 1.691.833 2.966 2.135 3.797C6.183 17.465 7.53 17.845 9 17.96V17c0-.41.162-.78.441-1.059l2.58-2.58a4 4 0 0 1-.021-.424A3.7 3.7 0 0 1 12.53 11zm5.14 7.852A.48.48 0 0 0 10.5 19h2a.6.6 0 0 0 .273-.07a.37.37 0 0 0 .149-.172a1 1 0 0 0 .062-.235q.016-.125.016-.257V18q.36-.008.563-.023a.47.47 0 0 0 .304-.118a.46.46 0 0 0 .117-.297Q14 17.368 14 17h.5q.165 0 .266-.07a.5.5 0 0 0 .156-.172a.7.7 0 0 0 .07-.235q.015-.133.016-.273a3 3 0 0 1-.008-.227v-.195q.258.094.523.133q.266.039.54.039a2.87 2.87 0 0 0 2.078-.898q.405-.423.632-.961Q19 13.6 19 13q0-.625-.234-1.172a3 3 0 0 0-.641-.953a3 3 0 0 0-.953-.64A2.9 2.9 0 0 0 16 10q-.61.015-1.148.234a2.9 2.9 0 0 0-.954.625q-.414.407-.656.938a2.7 2.7 0 0 0-.242 1.14q0 .367.086.774l-2.938 2.937A.48.48 0 0 0 10 17v1.5q0 .203.148.352m7.132-7.133a.72.72 0 0 1 .219.531a.72.72 0 0 1-.219.531a.72.72 0 0 1-.531.219a.72.72 0 0 1-.531-.219a.72.72 0 0 1-.219-.531q0-.312.219-.531a.72.72 0 0 1 .531-.219q.312 0 .531.219"></path>
              </svg>
                <span className="hide-menu" > &nbsp; Authentication </span></a>
              <ul aria-expanded="false" className="collapse first-level">
                <li className="sidebar-item">
                  <a href="authentication-login.html" className="sidebar-link"><i className="mdi mdi-all-inclusive" /><span className="hide-menu"> Login </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="authentication-register.html" className="sidebar-link"><i className="mdi mdi-all-inclusive" /><span className="hide-menu"> Register </span></a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item">
              <a className="sidebar-link has-arrow waves-effect waves-dark" href="javascript:void(0)" aria-expanded="false">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <path fill="#fff" d="M12.884 2.532c-.346-.654-1.422-.654-1.768 0l-9 17A1 1 0 0 0 3 21h18a.998.998 0 0 0 .883-1.467zM13 18h-2v-2h2zm-2-4V9h2l.001 5z"></path>
                </svg>
                <span className="hide-menu">&nbsp; Errors </span></a>
              <ul aria-expanded="false" className="collapse first-level">
                <li className="sidebar-item">
                  <a href="error-403.html" className="sidebar-link"><span className="hide-menu"> &nbsp;- Error 403 </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="error-404.html" className="sidebar-link"><span className="hide-menu"> &nbsp;- Error 404 </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="error-405.html" className="sidebar-link"><span className="hide-menu"> &nbsp;- Error 405 </span></a>
                </li>
                <li className="sidebar-item">
                  <a href="error-500.html" className="sidebar-link"><span className="hide-menu"> &nbsp;- Error 500 </span></a>
                </li>
              </ul>
            </li>
            <li className="sidebar-item p-3">
              <a href="https://github.com/wrappixel/matrix-admin-bt5" className="w-100 btn btn-cyan d-flex align-items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                  <g fill="none">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
                    <path fill="#fff" d="M12 11a1 1 0 0 1 1 1v6.584l1.293-1.292a1 1 0 0 1 1.414 1.416l-2.824 2.819c-.253.252-.5.473-.883.473c-.336 0-.566-.169-.788-.38l-2.919-2.912a1 1 0 0 1 1.414-1.416L11 18.584V12a1 1 0 0 1 1-1m-.5-9c2.784 0 5.16 1.75 6.086 4.212a6.003 6.003 0 0 1 .395 11.453a3 3 0 0 0-.858-1.785a3 3 0 0 0-1.914-.873L15 15v-3a3 3 0 0 0-5.995-.176L9 12v3a3 3 0 0 0-2.123.88a3 3 0 0 0-.875 2.02A5.002 5.002 0 0 1 5 8.416A6.5 6.5 0 0 1 11.5 2"></path>
                  </g>
                </svg>
                &nbsp; DownloadFree
              </a>
            </li>

          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Frmsidebaradmin