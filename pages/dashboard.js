import { useEffect } from 'react';
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import cookie from 'js-cookie';
import Router from 'next/router';

export default function Dashboard(props) {
    // Redirect to login if not logged in
    const token = cookie.get('token');
    useEffect(() => {
        if (!token) {
            Router.push('/');
        }
    }, []);

    if (token) {
        return (
            <div>
                <Header
                    absolute
                    color="transparent"
                    brand="SIMADU2"
                    rightLinks={<HeaderLinks />}
                />
                <h1>Ini Dashboard</h1>
            </div>
        );
    } else {
        return null;
    }
}