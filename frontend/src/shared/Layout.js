import React from 'react';
import SideNav from '../components/SideNav';

function Layout({ children }) {
    return (
        <div>
            <SideNav/>
            <div>
                {children}
            </div>
            {/* <div>푸터부분</div> */}
        </div>
    );
}

export default Layout;