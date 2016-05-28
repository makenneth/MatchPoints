import React from 'react';
import Form from '../mixins/Form';
import UserStore from '../stores/userStore';
import UserActions from '../actions/userActions';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
    }

    static propTypes = {
      username: React.PropTypes.string,
      csrf: React.PropTypes.string,
      password: React.PropTypes.string,
      _handleSubmit: React.PropTypes.func,
      _updateField: React.PropTypes.func,
      organization: React.PropTypes.string,
    }

    csrf() {
        if (this.props.csrf){
          return <input type="hidden" name="_csrf" value={this.props.csrf} />;
        } else {
          return "";
        }
    }
    render() {
        return <div className="forms">
          <form onSubmit={this.props._handleSubmit.bind(null, UserActions.signUp) }>
            <h3>Sign Up</h3>
            { this.csrf() }
            <div>
          		<label for="organization">Organization</label>
          		<input type="text" id="organization" value={this.props.organization}
                    onChange={this.props._updateField.bind(null, "organization")}
                    required/>
             </div>
             <div>
          		<label for="username">Username</label>
          		<input type="text" id="username" value={this.props.username}
                    onChange={this.props._updateField.bind(null, "username")}
                    required/>
            </div>
            <div>
          		<label for="password">Password</label>
          		<input type="password" id="password" value={this.props.password}
                    onChange={this.props._updateField.bind(null, "password")}
                    required/>
            </div>
            <input type="submit" value="Sign Up"/>
        	</form>
        </div>;
    }
}
let initialState = {
          organization: "",
          username: "",
          password: "",
          _csrf: ""
        };

SignUp = Form(SignUp, initialState, UserStore, UserActions);
export default SignUp;