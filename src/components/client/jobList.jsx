import logo_item from '../../assets/images/logo-1.png';


const JobList = () => {
    return (
        <div className="job-wrap">
            <div className="job-header">
                <div className="job-heading-wrap">
                    <div className="job-heading__iconWrap">
                        <div className="job-heading__icon">
                            <svg width="25" height="21" viewBox="0 0 25 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M24.2867 6.6161C24.2867 14.8677 16.6522 19.734 13.2317 20.8977C12.8262 21.0387 12.1738 21.0387 11.7682 20.8977C10.3048 20.404 8.06563 19.2227 6.00273 17.4066C3.21694 14.9558 0.713257 11.3414 0.713257 6.6161C0.713257 2.96637 3.64008 0.0219116 7.25456 0.0219116C9.40561 0.0219116 11.3098 1.06216 12.5088 2.649C13.6901 1.06216 15.5943 0.0219116 17.7454 0.0219116C18.6798 0.0219116 19.5614 0.215855 20.3725 0.568486C22.6822 1.59112 24.2867 3.90084 24.2867 6.6161Z" fill="#FE4C4C"/>
                            </svg>                                
                        </div>
                    </div>
                    <h2 className="heading">Job tốt nhất</h2>
                </div>
                <a href="" className="job-header__link">Xem tất cả</a>
            </div>

            <ul className="job-card__list">
                <li className="job-card__item">
                    <div className="job-card__header">
                        <div className="job-card__nameWrap">
                            <img src={logo_item} alt="Logo-Company" className="job-card__logo" />
                            <h4 className="job-card__name">Data Engineer</h4>                             
                        </div>
                        <div className="job-card__time">Full-time</div>
                    </div>
                    <div className="job-card__body">
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Hoa hồng</span>
                            <p className="job-card__priceNumber">12,000,000 <span>VNĐ</span></p>
                        </div>
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Thưởng</span>
                            <p className="job-card__priceNumber">50,000,000 <span>VNĐ</span></p>
                        </div>
                    </div>
                    <div className="job-card__footer">
                        <div className="job-card__footerLeft">
                            <div className="job-card__tag">Hà Nội</div>
                            <div className="job-card__tag">Onboard</div>
                        </div>
                        <div className="job-card__footerRight">PREMIUM</div>   
                    </div>
                </li>
                <li className="job-card__item">
                    <div className="job-card__header">
                        <div className="job-card__nameWrap">
                            <img src={logo_item} alt="Logo-Company" className="job-card__logo" />
                            <h4 className="job-card__name">Data Engineer</h4>                             
                        </div>
                        <div className="job-card__time">Full-time</div>
                    </div>
                    <div className="job-card__body">
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Hoa hồng</span>
                            <p className="job-card__priceNumber">12,000,000 <span>VNĐ</span></p>
                        </div>
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Thưởng</span>
                            <p className="job-card__priceNumber">50,000,000 <span>VNĐ</span></p>
                        </div>
                    </div>
                    <div className="job-card__footer">
                        <div className="job-card__footerLeft">
                            <div className="job-card__tag">Hà Nội</div>
                            <div className="job-card__tag">Onboard</div>
                        </div>
                        <div className="job-card__footerRight">PREMIUM</div>   
                    </div>
                </li>
                <li className="job-card__item">
                    <div className="job-card__header">
                        <div className="job-card__nameWrap">
                            <img src={logo_item} alt="Logo-Company" className="job-card__logo" />
                            <h4 className="job-card__name">Data Engineer</h4>                             
                        </div>
                        <div className="job-card__time">Full-time</div>
                    </div>
                    <div className="job-card__body">
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Hoa hồng</span>
                            <p className="job-card__priceNumber">12,000,000 <span>VNĐ</span></p>
                        </div>
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Thưởng</span>
                            <p className="job-card__priceNumber">50,000,000 <span>VNĐ</span></p>
                        </div>
                    </div>
                    <div className="job-card__footer">
                        <div className="job-card__footerLeft">
                            <div className="job-card__tag">Hà Nội</div>
                            <div className="job-card__tag">Onboard</div>
                        </div>
                        <div className="job-card__footerRight">PREMIUM</div>   
                    </div>
                </li>
                <li className="job-card__item">
                    <div className="job-card__header">
                        <div className="job-card__nameWrap">
                            <img src={logo_item} alt="Logo-Company" className="job-card__logo" />
                            <h4 className="job-card__name">Data Engineer</h4>                             
                        </div>
                        <div className="job-card__time">Full-time</div>
                    </div>
                    <div className="job-card__body">
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Hoa hồng</span>
                            <p className="job-card__priceNumber">12,000,000 <span>VNĐ</span></p>
                        </div>
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Thưởng</span>
                            <p className="job-card__priceNumber">50,000,000 <span>VNĐ</span></p>
                        </div>
                    </div>
                    <div className="job-card__footer">
                        <div className="job-card__footerLeft">
                            <div className="job-card__tag">Hà Nội</div>
                            <div className="job-card__tag">Onboard</div>
                        </div>
                        <div className="job-card__footerRight">PREMIUM</div>   
                    </div>
                </li>
                <li className="job-card__item">
                    <div className="job-card__header">
                        <div className="job-card__nameWrap">
                            <img src={logo_item} alt="Logo-Company" className="job-card__logo" />
                            <h4 className="job-card__name">Data Engineer</h4>                             
                        </div>
                        <div className="job-card__time">Full-time</div>
                    </div>
                    <div className="job-card__body">
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Hoa hồng</span>
                            <p className="job-card__priceNumber">12,000,000 <span>VNĐ</span></p>
                        </div>
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Thưởng</span>
                            <p className="job-card__priceNumber">50,000,000 <span>VNĐ</span></p>
                        </div>
                    </div>
                    <div className="job-card__footer">
                        <div className="job-card__footerLeft">
                            <div className="job-card__tag">Hà Nội</div>
                            <div className="job-card__tag">Onboard</div>
                        </div>
                        <div className="job-card__footerRight">PREMIUM</div>   
                    </div>
                </li>
                <li className="job-card__item">
                    <div className="job-card__header">
                        <div className="job-card__nameWrap">
                            <img src={logo_item} alt="Logo-Company" className="job-card__logo" />
                            <h4 className="job-card__name">Data Engineer</h4>                             
                        </div>
                        <div className="job-card__time">Full-time</div>
                    </div>
                    <div className="job-card__body">
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Hoa hồng</span>
                            <p className="job-card__priceNumber">12,000,000 <span>VNĐ</span></p>
                        </div>
                        <div className="job-card__priceItem">
                            <span className="job-card__priceText">Thưởng</span>
                            <p className="job-card__priceNumber">50,000,000 <span>VNĐ</span></p>
                        </div>
                    </div>
                    <div className="job-card__footer">
                        <div className="job-card__footerLeft">
                            <div className="job-card__tag">Hà Nội</div>
                            <div className="job-card__tag">Onboard</div>
                        </div>
                        <div className="job-card__footerRight">PREMIUM</div>   
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default JobList;