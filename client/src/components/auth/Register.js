import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import variables from "../../utils/base.scss"
import Logo from "../../assets/logo.svg"
import './Register.scss'

class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/");
    }
  }

  componentWillReceiveProps(nextProps) {
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

    const newUser = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register__container">
        <div className="register__containerLeft">
          <img src={Logo} className="register__logo colorToFilterBase" onClick={()=>{window.location.href = "/"}}/>

          <div className="register__formContainer">
            <h1 className="register__title">Bienvenue sur<b style={{ color: variables.baseColor, fontWeight: "900" }}> Spoots</b></h1>
            <p className="littleTextGrey register__text">Heureux de faire votre rencontre, merci d'entrer vos informations afin de vous inscrire.</p>
            <form noValidate onSubmit={this.onSubmit}>
              <div className="inputsContainer">
                <div className="inputAuthContainer">
                  <input onChange={this.onChange} value={this.state.email} error={errors.email} id="email" type="email" className="inputAuth" autoComplete="none" />
                  <label htmlFor="email" className="inputAuthLabel littleTextGrey" >Email {errors.email ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.email}</span> : ""}</label>
                  <div className="inputAuthFocus"></div>
                </div>
                <div className="inputAuthContainer">
                  <input onChange={this.onChange} value={this.state.username} error={errors.username} id="username" type="text" className="inputAuth" autoComplete="off" />
                  <label htmlFor="username" className="inputAuthLabel littleTextGrey" >Username {errors.username ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.username}</span> : ""}</label>
                  <div className="inputAuthFocus"></div>
                </div>

                <div className="inputAuthContainer">
                  <input onChange={this.onChange} value={this.state.password} error={errors.password} id="password" type="password" className="inputAuth" autoComplete="off" />
                  <label htmlFor="password" className="inputAuthLabel littleTextGrey" >Mot de passe {errors.password ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.password}</span> : ""}</label>
                  <div className="inputAuthFocus"></div>
                </div>
                <div className="inputAuthContainer">
                  <input onChange={this.onChange} value={this.state.password2} error={errors.password2} id="password2" type="password" className="inputAuth" autoComplete="off" />
                  <label htmlFor="password2" className="inputAuthLabel littleTextGrey">Confirmer MDP {errors.password2 ? <span className="inputAuthError" style={{ color: "#E7366A" }}>- {errors.password2}</span> : ""}</label>
                  <div className="inputAuthFocus"></div>
                </div>

              </div>
              <div className="register__actionsContainer" >
                <button className="buttonBlack" type="submit" >Inscription</button>
                <button className="buttonWhite" onClick={() => { window.location.href = "/login" }}>Se connecter</button>
              </div>
            </form>
          </div>

          <div className="register__policy">
            En vous connectant, vous acceptez les <b>termes et conditions</b> & la <b>politique de confidentialité</b> de Spoots
          </div>
        </div>
        <div className="register__rightContainer">right</div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
