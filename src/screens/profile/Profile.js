import React ,{Component} from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

function getModalStyle() {
    const top = 50 ;
    const left = 50 ;  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
const styles = theme => ({
    paper: {
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: '20px'
    },

    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
      },
      gridList: {
        width: '95%',
        height: 750,
        cursor: 'pointer',
        overflow:'hidden'
      },
  });



class Profile extends Component{

    constructor(){
        super();
        this.state={
            endpoint1: [],
            endpoint2: [],
            count: 0,
            follows:0,
            followed:0,
            modelOpen: false,
            usernameRequired: 'dispNone',
            name: "",
            full_name:"",
            open: false,
            postContent:{}
        }
    }

    UNSAFE_componentWillMount(){
        let data1 = null;
        let xhr1 = new XMLHttpRequest();
        let that = this;
        xhr1.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {     
                let list = JSON.parse(this.responseText).data;        
                for(let i in list){
                    list[i].likeIcon = "dispBlock";
                    list[i].likedIcon = "dispNone";
                    list[i].commentContent = [];
                    list[i].clear = ""
                }
                that.setState({
                    endpoint1 : list 
                });
                that.setState({
                    postList : list
                });
            }
        });
        if(sessionStorage.getItem("access-token")!==null){
        xhr1.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token="+sessionStorage.getItem('access-token'));
        xhr1.send(data1);
        }

        let data2 = null;
        let xhr2 = new XMLHttpRequest();
        xhr2.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {   
                that.setState({
                    endpoint2 : JSON.parse(this.responseText).data,
                    count : JSON.parse(this.responseText).data.counts.media,
                    follows : JSON.parse(this.responseText).data.counts.follows,
                    followed : JSON.parse(this.responseText).data.counts.followed_by,
                    full_name: JSON.parse(this.responseText).data.full_name,
                });
            }
        });
        if(sessionStorage.getItem("access-token")!==null){
        xhr2.open("GET", "https://api.instagram.com/v1/users/self/?access_token="+sessionStorage.getItem('access-token'));
        xhr2.send(data2);
        }
    }

    editModalOpenHander = () => {
        this.setState({ 
            modelOpen: true,
            usernameRequired : 'dispNone',
            name : ""
        });
    }

    editModalCloseHander = () => {
        this.setState({ modelOpen: false });
    }

    inputNameChangeHandler = (e) => {
        this.setState({ name: e.target.value });
    }

    editNameHandler = () => {
        this.state.name === "" ? this.setState({ usernameRequired: "dispBlock" }) : this.setState({ full_name: this.state.name, modelOpen: false })
    }

    postModalOpenHandler = (id) => {
        this.setState({ open: true });
        let currentState = this.state;
        currentState.postContent = this.state.endpoint1.filter((post) => {
            return post.id === id
        })[0];
        console.log(this.state.postContent);
    }

    postModalCloseHandler = () => {
        this.setState({ open: false });
    }

    render(){
        const { classes } = this.props;
        return(
            <div>
                { sessionStorage.getItem("access-token")!==null ?
                <div>
                    <Header heading="true" history={this.props.history} pic={this.state.endpoint2.profile_picture} />
                    <div className="profile-container">
                        <div className="profile-header">
                            <div className="header-image">
                                <img src ={this.state.endpoint2.profile_picture} alt={this.state.endpoint2.username} style={{borderRadius:"50%"}}/>
                            </div>
                            <div className="profile-header-content1">
                                <div >
                                    <Typography variant="h5" component="h1">
                                        {this.state.endpoint2.username}
                                    </Typography>
                                </div>
                                <div className="profile-header-content2">
                                    <Typography variant="body1" component="h1" style={{marginRight:"80px"}}>
                                        Posts: {this.state.count}
                                    </Typography>
                                    <Typography variant="body1" component="h1" style={{marginRight:"80px"}}>
                                        Follows: {this.state.follows}
                                    </Typography>
                                    <Typography variant="body1" component="h1">
                                        Followed By: {this.state.followed}
                                    </Typography>
                                </div>
                                <div className="profile-header-content3">
                                    <Typography variant="h6" component="h1" style={{marginRight:"20px"}}>
                                        {this.state.full_name}
                                    </Typography>
                                    <Fab color="secondary" aria-label="edit" onClick={this.editModalOpenHander}>
                                        <EditIcon />
                                    </Fab>
                                </div>
                            </div>
                            <Modal open={this.state.modelOpen} onClose={this.editModalCloseHander} 
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description" >
                                <div style={getModalStyle()} className={classes.paper}>
                                <Typography variant="h5" component="h1" style={{marginBottom:'25px'}}>
                                    Edit
                                </Typography>
                                <FormControl required>
                                    <InputLabel htmlFor="name">Full Name</InputLabel>
                                    <Input id="name" type="text" name={this.state.name} onChange={this.inputNameChangeHandler} />
                                    <FormHelperText className={this.state.usernameRequired}>
                                        <span className="red">required</span>
                                    </FormHelperText>
                                </FormControl>
                                <br/><br/><br/>
                                <Button variant="contained" color="primary" onClick={this.editNameHandler}>Update</Button>
                                </div>
                            </Modal>
                        </div>
                        <div className="body-content">
                            <div className={classes.root}>
                                <GridList cellHeight={400} className={classes.gridList} cols={3}>
                                    {this.state.endpoint1.map(post => (
                                    <GridListTile key={"grid"+ post.id} onClick={()=>this.postModalOpenHandler(post.id)}>
                                        <img src={post.images.standard_resolution.url} alt={post.user.full_name} />
                                    </GridListTile>
                                    ))}
                                </GridList>
                            </div>
                            <Modal open={this.state.open} onClose={this.postModalCloseHandler} 
                                aria-labelledby="simple-modal-title"
                                aria-describedby="simple-modal-description" >
                                <div style={getModalStyle()} className={classes.paper}>
                                        
                                </div>
                            </Modal>
                        </div>
                    </div>
                </div>
                : this.props.history.push('/') }
            </div>
        );
    }
}

export default withStyles(styles)(Profile);