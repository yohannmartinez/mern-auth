import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import './Login.scss'
import variables from "../../utils/base.scss"
import Logo from "../../assets/logo.svg"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value, errors: {} });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="login__container">
        <div className="login__containerLeft">
          <img src={Logo} className="login__logo colorToFilterBase" onClick={()=>{window.location.href = "/"}}/>

          <div className="login__formContainer">
            <h1 className="login__title">Bienvenue sur<b style={{ color: variables.baseColor, fontWeight: "900" }}> Spoots</b></h1>
            <p className="littleTextGrey login__text">Heureux de vous revoir, merci d'entrer vos informations afin de vous connecter à votre compte.</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="inputsContainer">
                <div className="inputAuthContainer">
                  <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" className="inputAuth" type="email" autoComplete="off" />
                  <label className="inputAuthLabel littleTextGrey">Email {errors.email || errors.emailnotfound ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.email || errors.emailnotfound}</span> : ""}</label>
                  <div className="inputAuthFocus"></div>
                </div>
                <div className="inputAuthContainer">
                  <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" className="inputAuth" type="password" />
                  <label className="inputAuthLabel littleTextGrey">Mot de passe {errors.password || errors.passwordincorrect ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.password || errors.passwordincorrect}</span> : ""}</label>
                  <div className="inputAuthFocus"></div>
                </div>
              </div>
              <span className="littleTextGrey" style={{textDecoration :"underline"}} onClick={()=>{window.location.href = "/forgotPassword"}}>J'ai oublié mon mot de passe</span>
              <div className="login__actionsContainer" >
                <button className="buttonBlack" type="submit" >Connexion</button>
                <button className="buttonWhite" onClick={() => { window.location.href = "/register" }}>S'inscrire</button>
              </div>
            </form>
          </div>
          <div className="login__policy">
            En vous connectant, vous acceptez les <b>termes et conditions</b> & la <b>politique de confidentialité</b> de Spoots
          </div>
        </div>
        <div className="login__rightContainer"></div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
