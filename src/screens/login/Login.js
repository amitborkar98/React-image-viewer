import React ,{Component} from 'react';
import Header from "../../common/header/Header";
import '../../common/header/Header.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import './Login.css';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';

class Login extends Component{
    constructor() {
        super();
        this.state = {
            usernameRequired: "dispNone",
            username: "",
            passwordRequired: "dispNone",
            password: "",
            incorrect: "dispNone"
        }
    }

    usernameChangeHandler = (e) => {
        this.setState({ username: e.target.value });
    }

    passwordChangeHandler = (e) => {
        this.setState({ password: e.target.value });
    }

    loginClickHandler = () => {
        this.state.username === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ usernameRequired: "dispNone" });
        this.state.password === "" ? this.setState({ passwordRequired: "dispBlock" }) : this.setState({ passwordRequired: "dispNone" });
        let password = "password";
        let username = "username";
        let token = "8661035776.d0fcd39.39f63ab2f88d4f9c92b0862729ee2784";

        this.state.password === password && this.state.username === username ? this.props.history.push('home/') : this.state.username === "" || this.state.password === "" ? this.setState({ incorrect: "dispNone" }) : this.setState({ incorrect: "dispBlock" });
        
    }

    render(){
        return(
            <div>
                <Header/>
                <div className="main">
                    <div className="card">
                        <Card >
                            <div className="content">
                                <CardContent >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        LOGIN
                                    </Typography>
                                    <br />
                                    <div className="input">
                                    <FormControl required>
                                        <InputLabel htmlFor="username">Username</InputLabel>
                                        <Input id="username"  username={this.state.username} onChange={this.usernameChangeHandler}/>
                                        <FormHelperText className={this.state.usernameRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                    </FormControl>
                                    <br /><br />
                                    <FormControl required >
                                        <InputLabel  htmlFor="password">Password</InputLabel>
                                        <Input id="password" type="password" password={this.state.password} onChange={this.passwordChangeHandler}/>
                                        <FormHelperText className={this.state.passwordRequired}>
                                            <span className="red">required</span>
                                        </FormHelperText>
                                        <br/>
                                        <FormHelperText className={this.state.incorrect}>
                                            <span className="red">Incorrect username and/or password</span>
                                        </FormHelperText>
                                    </FormControl>
                                    </div>
                                    <br /><br />
                                    <Button variant="contained" color="primary" onClick={this.loginClickHandler}>LOGIN</Button>
                                </CardContent>   
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;