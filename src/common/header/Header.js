import React ,{Component} from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
      search: {
        position: 'relative',
        backgroundColor:'#c0c0c0',
        borderRadius: '4px',
        marginLeft: 0,
        width: '300px',
        float: 'right',
        marginTop: '17px'
      },
      searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      },
      inputRoot: {
        color: 'inherit',
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
      },
});

const StyledMenu = withStyles({
    paper: {
      border: '4px',
      backgroundColor:'#ededed',
    },
  })(props => (
    <Menu
      elevation={0}
      getContentAnchorEl={null}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      {...props}
    />
  ));

  const StyledMenuItem = withStyles(theme => ({
    root: {
      
    },
  }))(MenuItem);
  
class Header extends Component{
     
    constructor(){
        super();
        this.state={
            type: null,
        }
    }

    inputChangeHandler = (e) => {
        let newList=[];        
        for(let i in this.props.list){
            if(this.props.list[i].caption.text.slice(0,this.props.list[i].caption.text.search('#')).search(e.target.value) > -1){
                newList.push(this.props.list[i]);
           }
        }
        this.props.callbackFromHome(newList);
    }
    
    openHandler = (e) => {
        this.setState({ type: e.currentTarget });
    }
    
    closeHandler = () => {
        this.setState({ type: null });
    }
    
    accountHandler = () => {
        this.props.history.push('/profile');
    }

    logoutHandler = () => {
        sessionStorage.removeItem("access-token");  
        this.props.history.push('/');
    }

    logoHandler = () => {
        this.props.history.push('/home');
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                <header className="app-header">
                    <span className="logo" style={ this.props.heading === "true" ? {cursor:"pointer"} : null} onClick={this.props.heading === "true" ? this.logoHandler : null} >Image Viewer</span>
                    {this.props.more === "true" || this.props.heading === "true" ?
                        <div>
                            
                            { this.props.heading === "true" || this.props.more === "true" ? 
                            <div className="pro-pic">   
                                <IconButton  onClick={this.openHandler} className="icon" >
                                    <img src={this.props.pic} alt="profile" className="profile-image"></img> 
                                </IconButton>  
                            </div> 
                            : "" }

                            { this.props.heading === "true" || this.props.more === "true" ? 
                            <StyledMenu
                                id="customized-menu"
                                anchorEl={this.state.type}
                                keepMounted
                                open={Boolean(this.state.type)}
                                onClose={this.closeHandler}
                            >
                                { this.props.heading === "true" || this.props.more === "true" ? 
                                <div>
                                    { this.props.more === "true" ? 
                                    <div>
                                        <StyledMenuItem>
                                            <ListItemText primary="My Account" onClick={this.accountHandler}/> 
                                        </StyledMenuItem>
                                    <hr style={{marginLeft:15,marginRight:15}}/>
                                    </div>
                                    : "" }
                                    <StyledMenuItem>
                                        <ListItemText primary="Logout" onClick={this.logoutHandler} />
                                    </StyledMenuItem>
                                </div>
                                : "" }
                            </StyledMenu>
                            : "" }

                            {this.props.more === "true" ?
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <Input disableUnderline={true}
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    inputProps={{ 'aria-label': 'search' }}
                                    onChange={this.inputChangeHandler}
                                />
                            </div>
                            : "" }

                        </div>
                     : ""}
                </header>
            </div>
        )
    }
}

export default withStyles(styles)(Header);
