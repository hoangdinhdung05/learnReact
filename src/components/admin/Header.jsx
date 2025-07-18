import avatarImg from "../../assets/images/logo-1.png";

const Header = () => {
  return (
    <div className="admin__header">
      <div className="admin__header-left">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="admin__header-right">
        <i className="fas fa-bell icon"></i>
        <i className="fas fa-user-circle icon"></i>
        <img src={avatarImg} alt="Avatar" className="admin__avatar" />
      </div>
    </div>
  );
};

export default Header;