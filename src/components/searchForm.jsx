const SearchForm = () => {
    return (
        <div className="form-search-layout">
            <form action="" className="form-search">
                <div className="form-search__input">
                    <svg className="search-icon" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 20.5126C15.9706 20.5126 20 16.4832 20 11.5126C20 6.54207 15.9706 2.51263 11 2.51263C6.02944 2.51263 2 6.54207 2 11.5126C2 16.4832 6.02944 20.5126 11 20.5126Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M18.9299 21.2024C19.4599 22.8024 20.6699 22.9624 21.5999 21.5624C22.4499 20.2824 21.8899 19.2324 20.3499 19.2324C19.2099 19.2224 18.5699 20.1124 18.9299 21.2024Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <input type="text" placeholder="Nhập vị trí hoặc từ khóa..." id="search"/>
                </div>
                <div className="form-search__option">
                    <div className="form-search__optionLeft">
                        <svg width="18" height="21" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.5 9.01314C11.5 7.63187 10.3808 6.51263 9.00051 6.51263C7.61924 6.51263 6.5 7.63187 6.5 9.01314C6.5 10.3934 7.61924 11.5126 9.00051 11.5126C10.3808 11.5126 11.5 10.3934 11.5 9.01314Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M8.99951 19.5126C7.80104 19.5126 1.5 14.411 1.5 9.07592C1.5 4.89927 4.8571 1.51263 8.99951 1.51263C13.1419 1.51263 16.5 4.89927 16.5 9.07592C16.5 14.411 10.198 19.5126 8.99951 19.5126Z" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                    <span className="form-search__location">Chọn địa điểm</span>    
                    <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.92 9.46265L13.4 15.9826C12.63 16.7526 11.37 16.7526 10.6 15.9826L4.07999 9.46265" stroke="#999999" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </div>
                <button type="submit" className="btn-search">Tìm kiếm</button>
            </form>
        </div>
    );
};

export default SearchForm;