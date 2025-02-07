import { FC, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Headeruser from "../Headersuser/Frmheaderuser";
import Sidebaropd from "../Sidebarsuser/Frmsidebaruser";
import Footers from "../Footers/Frmfooter";

const userLayout: FC = () => {
    return (
        <Layout>
            <Headeruser />
            <Sidebaropd />
            <div className="page-wrapper">
                <Content>
                    <Outlet />
                </Content>
                <Footers />
            </div>
        </Layout>
    )
}

export default userLayout