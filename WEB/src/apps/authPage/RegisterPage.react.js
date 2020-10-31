// @flow

import { FormTextInput} from "tabler-react";
import withTouchedErrorsht from "tabler-react";
import * as React from "react";
import * as api from "../api/api.react"
import  RegisterPage1 from "./RegisterPageDetail.react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import * as Action from "../store/actions/register.action"
import submitRegister from "../store/reducers/register.reducer";
type Props = {||};


function RegisterPage({history}): React.Node {
  const dispatch = useDispatch();
  const { name, email, password, password2 } = useSelector(
      state => ({
        name: state.submitRegister.name,
        email: state.submitRegister.email,
        password: state.submitRegister.password,
        password2: state.submitRegister.password2,
      }),
      shallowEqual
    );

  function change(e){
      const { target: {name, vlaue} } = e
      if(name === "name"){dispatch(Action.setName(e.target.value))}
      else if(name === "email"){dispatch(Action.setEmail(e.target.value))}
      else if(name === "password"){dispatch(Action.setPassword(e.target.value))}
      else if(name === "password2"){dispatch(Action.setPassword2(e.target.value))}
  }

  function submit(e){
      e.preventDefault()
      api.register(name, email, password, password2)
      history.push("/");
  }

  return (
      <React.Fragment >
      <RegisterPage1 onChange={change} onSubmit={submit} imageURL=""/>
      </React.Fragment >
      );
}

export default RegisterPage;
