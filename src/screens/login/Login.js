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
            loginPasswordRequired: "dispNone",
            loginPassword: ""
        }
    }
    render(){
        return(
            <div>
                <Header/>
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
                                <Input id="username" />
                                <FormHelperText className={this.state.usernameRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            <br /><br />
                            <FormControl required >
                                <InputLabel type="password" htmlFor="password">Password</InputLabel>
                                <Input id="password" />
                                <FormHelperText className={this.state.loginPasswordRequired}>
                                    <span className="red">required</span>
                                </FormHelperText>
                            </FormControl>
                            </div>
                            <br /><br />
                            <Button variant="contained" color="primary" >LOGIN</Button>
                        </CardContent>   
                    </div>
                </Card>
                </div>
            </div>
        )
    }
}

export default Login;