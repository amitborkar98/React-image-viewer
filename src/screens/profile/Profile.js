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
import Avatar from '@material-ui/core/Avatar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

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
            follows: 0,
            followed: 0,
            modelOpen: false,
            nameRequired: 'dispNone',
            name: "",
            full_name:"",
            open: false,
            postContent: [],
            url : "",
            picture: "",
            username : "",
            caption : "",
            tags : [],
            likeIcon: "",
            likedIcon: "",
            likesCount:0,
            id:"",
            commentContent: [],
            comment:""
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
                }
                that.setState({
                    endpoint1 : list 
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
        this.state.name === "" ? this.setState({ nameRequired: "dispBlock" }) : this.setState({ full_name: this.state.name, modelOpen: false })
    }

    postModalOpenHandler = (id) => {
        this.setState({ open: true });
        let currentState = this.state;
        currentState.postContent = this.state.endpoint1.filter((post) => {
            return post.id === id
        })[0];
        this.setState({ 
            url : this.state.postContent.images.standard_resolution.url ,
            username : this.state.postContent.user.username ,
            picture : this.state.postContent.user.profile_picture,
            caption : this.state.postContent.caption.text,
            tags: this.state.postContent.tags,
            likeIcon : this.state.postContent.likeIcon,
            likedIcon : this.state.postContent.likedIcon,
            likesCount : this.state.postContent.likes.count,
            id : this.state.postContent.id,
            commentContent : this.state.postContent.commentContent
        });
    }

    postModalCloseHandler = () => {
        this.setState({ open: false });
    }
    
    likeClickHandler=(id)=>{
        let postList = this.state.endpoint1;
        postList.forEach(function(post){
            if(post.id === id){
                post.likes.count += 1;
                post.likeIcon = "dispNone";
                post.likedIcon = "dispBlock";
                this.setState({likeIcon: "dispNone"});
                this.setState({likedIcon: "dispBlock"});
                this.setState({ likesCount: post.likes.count })
            }
        }, this);
    }

    likedClickHandler=(id)=>{
        let postList = this.state.endpoint1;
        postList.forEach(function(post){
            if(post.id === id){
                post.likes.count -= 1;
                post.likeIcon = "dispBlock";
                post.likedIcon = "dispNone";
                this.setState({likeIcon: "dispBlock"});
                this.setState({likedIcon: "dispNone"});
                this.setState({ likesCount: post.likes.count })
            }
        }, this);
    }

    commentChangeHandler = (e) => {
        this.setState({ comment : e.target.value });
    }

    addCommentHandler = (id) =>{
        if(this.state.comment === ""){
            alert("Cannot add Empty comment");
        }
        else{
            let postList=this.state.endpoint1;
            postList.forEach(function(post){
                if(post.id === id){
                    post.commentContent.push(this.state.comment);
                    this.setState({ 
                        comment: "" ,
                        commentContent : post.commentContent
                    });     
                }
            }, this);
        }
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
                                <div>
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
                                    <FormHelperText className={this.state.nameRequired}>
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
                                    <div className="post-modal-container">
                                        <div style={{marginRight:"10px"}}>
                                            <img  src={this.state.url} alt="s" height="90%"  width="100%" ></img>
                                        </div>
                                        <div>
                                            <div className="post-modal-header">
                                                <Avatar aria-label="recipe" className="avatar">
                                                    <img src ={this.state.picture} alt={this.state.username} className="post-modal-avatar-img" />
                                                </Avatar>
                                                <Typography variant="body1" component="p" style={{marginLeft:"20px"}}>
                                                    {this.state.username}
                                                </Typography>
                                            </div>
                                            <hr/>
                                            <Typography variant="body1" component="p">
                                                { this.state.caption.slice(0,this.state.caption.search('#')) }
                                            </Typography>
                                            <Typography variant="body2" component="p" className="post-modal-hastag">
                                                {this.state.tags.map((value,key) => {
                                                    return <span key={"tag" + key} style={{marginRight:5}}>#{value} </span> 
                                                })}
                                            </Typography> 
                                            <div className="post-modal-comments-section">
                                                { this.state.commentContent.map((value,key) => {
                                                    return <span key={"comment" + key}>
                                                    <span style={{fontWeight:"bold"}}>{this.state.username}: </span>{value}</span> 
                                                })}
                                            </div> 
                                            <div className="post-modal-likes">
                                                <div className={this.state.likeIcon} onClick={() => this.likeClickHandler(this.state.id)}>
                                                    <FavoriteBorderIcon />
                                                </div>
                                                <div className={this.state.likedIcon}>
                                                    <FavoriteIcon style={{color:"red"}} onClick={() => this.likedClickHandler(this.state.id)}/>
                                                </div>
                                                <span style={{marginLeft:10, marginBottom:8}}>
                                                    {
                                                    this.state.likesCount < 2 ? <div>{this.state.likesCount} like </div> :
                                                    <div>{this.state.likesCount} likes</div>
                                                    }
                                                </span>  
                                            </div>
                                            <div className="post-modal-comments">
                                                <FormControl className="post-modal-control">
                                                    <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                                    <Input comment={this.state.comment} onChange={this.commentChangeHandler} value={this.state.comment} />
                                                </FormControl>
                                                <Button variant="contained" color="primary" style={{marginLeft:20}} onClick={() => this.addCommentHandler(this.state.id)}>
                                                    ADD
                                                </Button>
                                            </div>
                                        </div>
                                    </div>   
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