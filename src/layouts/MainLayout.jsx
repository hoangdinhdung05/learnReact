import Header from "../components/client/header";
import Footer from "../components/client/footer";


const MainLayout = ({ children }) => {  
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    );
};

export default MainLayout;