import Header from "../components/header";
import Footer from "../components/footer";


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