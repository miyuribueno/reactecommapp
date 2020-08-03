import React, {useState} from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';
import MyContext from '../../MyContext';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const Forms = (props) => {
    const { userLoggedIn } = useState(MyContext);
    return (
        <React.Fragment>

                <div id="formsContainer">
                    <React.Fragment>
                        <Switch>
                            <Route path={"/signUp"} component={SignUpForm}>
                                <SignUpForm userLoggedInHandler={props.userLoggedInHandler} />
                            </Route>
                            <Route path={["/", "signIn"]} component={SignInForm}>
                                <SignInForm userLoggedInHandler={props.userLoggedInHandler}/>
                            </Route>
                        </Switch>
                    </React.Fragment>
                </div>

         </React.Fragment>
    )
}

export default Forms;