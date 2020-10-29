import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { loginUser } from "../store/actions/auth.react";
import { LoginPage as TablerLoginPage } from "tabler-react";
import { useHistory } from "react-router-dom";

const LoginPage = ({ loginUser, history }) => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const login = async (event) => {
    console.log("======login")
    event.preventDefault();
    const { email, password } = state;

    await loginUser(email, password);
    history.push("/");
    window.location.reload(false);
  };

  return (
    <TablerLoginPage
      strings={{ emailLabel:"ID", emailPlaceholder:"Enter ID"}}
      onSubmit={login}
      onChange={handleChange}
    />
  
  );
};

LoginPage.propTypes = {
  loginUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  loginUser,
};

export default connect(null, mapDispatchToProps)(LoginPage);