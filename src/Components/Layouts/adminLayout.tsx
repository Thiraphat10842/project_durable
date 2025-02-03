import { FC, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { Content } from "antd/es/layout/layout";
import Headeropd from "../Headers/Frmheader";
import Sidebaropd from "../Sidebars/Frmsidebaradmin";
import Footers from "../Footers/Frmfooter";

const adminLayout: FC = () => {
    return (
        <Layout>
            <Headeropd />
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

export default adminLayout