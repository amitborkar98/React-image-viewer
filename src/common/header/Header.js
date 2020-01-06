import React ,{Component} from 'react';
import './Header.css';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';



class Header extends Component{
    render(){
        return(
            <div>
                <header className="app-header">
                    <span className="logo">Image Viewer</span>
                    {this.props.more === "true" ?
                   <div>
                   <div className="pro-pic">
                        <IconButton/>
                    </div> 
                    <div className="search-box">
                    <InputBase className="a" placeholder="Search…"> 
                        <Input  />
                    </InputBase>
                    </div></div>
                     : ""}
                </header>
            </div>
        )
    }
}

export default Header;
