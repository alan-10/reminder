import React, { useContext } from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { AuthContext } from './Context/AuthContext';

import Landing from './pages/Landing';
import CreateUser from './pages/CreateUser';
import PageForgotPassword from './pages/PageForgotPassword';
import PageMain from './pages/PageMain';
import CreatedUser from './pages/CreatedUser';
import CreateTask from './pages/CreateTask';
import SeachTasks from './pages/SeachTasks';
import ResetPassword from './pages/ResetPassword';
import { BarLoader } from 'react-spinners';

interface IsPrivateRoutes {
    isPrivate?: boolean;
    path: string;
    exact?: boolean;
    component: React.ComponentType;
}

const CustomRoutes: React.FC<IsPrivateRoutes> = ({ isPrivate, ...rest }) => {
    const { loading, authenticated } = useContext(AuthContext);


    if (loading) {
        return < BarLoader />

    }

    if (isPrivate  && !authenticated) {

        return <Redirect to='/' />
    }


    return <Route {...rest} />

}



function Routes() {

    return (
        <BrowserRouter>
            <Switch>
                <CustomRoutes exact  path="/" component={Landing} />
                <CustomRoutes  path="/createUser" component={CreateUser} />
                <CustomRoutes  path="/forgot-passwod" component={PageForgotPassword} />
                <CustomRoutes  path="/reset-password" component={ResetPassword} />
                <CustomRoutes isPrivate path="/page-main" component={PageMain} />
                <CustomRoutes  path="/created-user" component={CreatedUser} />
                <CustomRoutes isPrivate path="/create-task" component={CreateTask} />
                <CustomRoutes isPrivate path="/seach-tasks" component={SeachTasks} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;