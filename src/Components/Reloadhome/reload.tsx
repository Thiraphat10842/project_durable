import React, {
    FC,
    useState,
    useEffect,
    Dispatch,
    SetStateAction,
  } from "react";

const reload = () => {

    useEffect(() => {
        let timeout: NodeJS.Timeout;
    
        // ฟังก์ชันที่ใช้รีโหลดหน้าจอ
        const reloadPage = () => {
          window.location.reload();
        };
    
        // ฟังก์ชันที่รีเซ็ตตัวจับเวลาเมื่อมีการทำกิจกรรม
        const resetTimeout = () => {
          clearTimeout(timeout); 
          timeout = setTimeout(reloadPage, 30000); 
        };
    
        // ตั้ง listener เพื่อตรวจจับการเคลื่อนไหวของเมาส์และการกดแป้นพิมพ์
        document.addEventListener("mousemove", resetTimeout);
        document.addEventListener("keydown", resetTimeout);
    
        resetTimeout();
    
        // ลบ event listeners เมื่อ component ถูก unmount
        return () => {
          clearTimeout(timeout);
          document.removeEventListener("mousemove", resetTimeout);
          document.removeEventListener("keydown", resetTimeout);
        };
      }, []);

  return (
    <div>
    </div>
  )
}

export default reload
