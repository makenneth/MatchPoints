import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { resetPassword } from 'redux/modules/reset';
import { setMessage } from 'redux/modules/main';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import MdArrowBack from 'react-icons/lib/md/arrow-back';
import CircularProgress from 'material-ui/CircularProgress';


@connect(({ reset }) => ({ reset }), { resetPassword, setMessage, push })
export default class ForgotReset extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      passwordCheck: '',
      errors: {},
    };
  }

  componentDidMount() {
    this.props.push('/reset');
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.reset.isLoading &&
      !nextProps.reset.isLoading
    ) {
      this.timeout = setTimeout(() => {
        this.props.push('/');
        this.props.setPage(1);
      }, 4000);
    }
  }

  componentWillUnmount() {
    if (this.timeout) clearTimeout(this.timeout);
  }

  handleChange = (field, val) => {
    const { [field]: errorText, ...errors } = this.state.errors;
    if (errorText) {
      this.setState({ errors });
    }
    this.setState({ [field]: val });
  }

  validate() {
    let isValid = true;
    const errors = {};
    if (this.state.password.length < 8) {
      isValid = false;
      errors.password = 'Password has to be at least 8 characters long';
    } else if (this.state.password !== this.state.passwordCheck) {
      isValid = false;
      errors.passwordCheck = 'Passwords have to match.';
    }

    if (!isValid) {
      this.setState({ errors });
    }
    return isValid;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    if (this.validate()) {
      this.props.resetPassword(this.props.reset.token, this.state.password);
    }
  }

  render() {
    const { token, success, error, isLoading } = this.props.reset;
    if (!token || success || error) {
      return (<div className="forms activated" style={{ top: '30%' }}>
        <form onSubmit={e => e.preventDefault()}>
          {
            success ?
              <h4>Password has been changed successfully.</h4>
              :
              <p>The token is invalid or has expired.</p>
          }
          <p>You will be redirected to login page in 5 seconds.</p>
          <RaisedButton
            label="Back to Main Page"
            primary={Boolean(true)}
            labelColor="#FFFFFF"
            onClick={() => {
              clearTimeout(this.timeout);
              this.props.push('/');
              this.props.setPage(1);
            }}
          />
        </form>
      </div>);
    }

    return (<div className="forms">
      <form onSubmit={this.handleSubmit}>
        <h3>
          <MdArrowBack className="back" onClick={() => this.props.setPage(0)} />
          Reset Your Password
        </h3>
        <div>
          <TextField
            type="password"
            hintText="New Password"
            floatingLabelText="New Password"
            errorText={this.state.errors.password}
            value={this.state.password}
            onChange={e => this.handleChange('password', e.target.value)}
            fullWidth={Boolean(true)}
          />
          <TextField
            type="password"
            hintText="Type the password again"
            floatingLabelText="Type the password again"
            errorText={this.state.errors.passwordCheck}
            value={this.state.passwordCheck}
            fullWidth={Boolean(true)}
            onChange={e => this.handleChange('passwordCheck', e.target.value)}
          />
          {!isLoading && <RaisedButton
            label="Reset Password"
            backgroundColor="#1565C0"
            labelColor="#FFFFFF"
            style={{ marginRight: '10px', marginTop: '10px' }}
            onClick={this.handleSubmit}
          />}
          {
            isLoading && <CircularProgress
              size={25}
              thickness={2}
              color="#aaa"
              style={{ marginTop: '15px' }}
            />
          }
        </div>
      </form>
    </div>);
  }
}
