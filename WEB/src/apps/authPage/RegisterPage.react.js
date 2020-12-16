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
  const [state, setState] = useState({
      name: "",
      email: "",
      password: "",
      password2: "",
  });

  const handleChange = (e) => {
      const { name, value} = ee.target;
      setState({ ...state, [name]: value});
  };

  function submit(e){
      e.preventDefault()
      api.register(state)
      history.push("/");
  }

  return (
      <React.Fragment >
      <RegisterPage1 onChange={handleChange} onSubmit={submit} imageURL=""/>
      </React.Fragment >
      );
}

export default RegisterPage;
