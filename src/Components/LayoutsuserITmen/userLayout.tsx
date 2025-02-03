import { FC, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Headeropd from "../Headers/Frmheader";
import SidebarITmen from "../SidebarsITmen/Frmsidebaradmin";
import Footers from "../Footers/Frmfooter";

const ITmenLayout: FC = () => {
    return (
        <Layout>
            <Headeropd />
            <SidebarITmen />
            <div className="page-wrapper">
                <Content>
                    <Outlet />
                </Content>
                <Footers />
            </div>
        </Layout>
    )
}
export default ITmenLayout