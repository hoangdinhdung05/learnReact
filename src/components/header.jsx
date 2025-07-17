import logo_recland from '../assets/images/logo-recland.png';

const Header = () => {
  
    return (
        <header className="header">
            <div className="header__wrapper">
                <div className="header__logo">
                    <img src={logo_recland} alt="RecLand" />
                </div>
                <div className="header__menu">
                    <div className="header__menu-item">
                        <a href="#" className="header__menu-link">Tất cả các Jobs</a>
                    </div>
                    <div className="header__menu-item">
                        <button className="header__button header__button--register"><span>Đăng ký</span></button>
                    </div>
                    <div className="header__menu-item">
                        <button className="header__button header__button--login">Đăng nhập</button>
                    </div>
                </div>
            </div>
        </header>
    );
    
};

export default Header;