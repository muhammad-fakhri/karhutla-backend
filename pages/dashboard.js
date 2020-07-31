import dynamic from "next/dynamic";
const LoginPage = dynamic(() => import("./login"));
import Header from "components/Header/Header.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Router from 'next/router';

export default function DashboardPage(props) {
    React.useEffect(() => {
        if (props.loggedIn) return; // do nothing if already logged in
        Router.replace("/dashboard", "/login", { shallow: true });
    }, [props.loggedIn]);

    // Load login page if not logged in
    if (props.loggedIn != undefined) {
        if (!props.loggedIn) return <LoginPage />;
    }

    // If logged in load dashboard page 
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
}

export async function getServerSideProps(context) {
    const cookieList = {},
        rc = context.req.headers.cookie;

    rc && rc.split(';').forEach(function (cookie) {
        let parts = cookie.split('=');
        cookieList[parts.shift().trim()] = decodeURI(parts.join('='));
    });
    let loggedIn;
    cookieList['token'] ? loggedIn = true : loggedIn = false;

    return {
        props: { loggedIn }
    }
}