import Header from "../components/client/Header/header";
import Footer from "../components/client/Footer/footer";
import { Outlet } from "react-router-dom";
import "../assets/css/reset.css";
import "../components/client/Header/headerClient.css";
import "../components/client/Footer/footerClient.css";
import "../components/client/Banner/bannerClient.css";
import "../components/client/content/contentClient.css";
import "../assets/css/client/base.css";

const MainLayout = () => {  
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default MainLayout;