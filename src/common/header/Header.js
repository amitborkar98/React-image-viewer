import React ,{Component} from 'react';
import './Header.css';
import Input from '@material-ui/core/Input';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({

      search: {
        position: 'relative',
        backgroundColor:'#c0c0c0',
        borderRadius: 4,
        marginLeft: 0,
        width: '300',
        float: 'right'
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

class Header extends Component{
     
    inputChangeHandler = (e) => {
        let newList=[];        
        for(let i in this.props.list){
            if(this.props.list[i].caption.text.slice(0,this.props.list[i].caption.text.search('#')).search(e.target.value) > -1){
                newList.push(this.props.list[i]);
           }
        }
        this.props.callbackFromHome(newList);
    }
    
    render(){
        const { classes } = this.props;
        return(
            <div>
                <header className="app-header">
                    <span className="logo">Image Viewer</span>
                    {this.props.more === "true" ?
                        <div>
                            <div className="pro-pic">   
                                <IconButton size="medium" style={{backgroundColor:"yellow"}} >
                                   
                                </IconButton>
                            </div> 
                            
                           {/*} <Menu
                                id="simple-menu"
                                keepMounted

                                onClose={handleClose}
                            >
                                <MenuItem >Profile</MenuItem>
                                <MenuItem>My account</MenuItem>
                                <MenuItem >Logout</MenuItem>
                            </Menu>*/}

                            
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
                        </div>
                     : ""}
                </header>
            </div>
        )
    }
}

export default withStyles(styles)(Header);
