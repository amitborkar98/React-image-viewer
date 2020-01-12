import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';

class Home extends Component{

    constructor(){
        super();
        this.state={
            endpoint1: [],
            likeIcon: "dispBlock",
            likedIcon: "dispNone",
            comment: "",
            postList: []
        }
    }

    UNSAFE_componentWillMount(){
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {     
                let list = JSON.parse(this.responseText).data;        
                for(let i in list){
                    list[i].likeIcon="dispBlock";
                    list[i].likedIcon = "dispNone";
                    list[i].commentContent= [];
                    list[i].date = new Date(parseInt(list[i].created_time) * 1000);
                }
                that.setState({
                    endpoint1 : list 
                });
                that.setState({
                    postList : list
                });
                //console.log(that.state.endpoint1);
            }
        });
        xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token="+sessionStorage.getItem('access-token'));
        xhr.send(data);
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
                    this.setState({comment: ""});
                }
            }, this);
        }
    }

    myCallback = (filteredPost) => {
        this.setState({endpoint1: filteredPost});
    }

    render(){
        return(
            <div>
                <Header more="true" list={this.state.postList} callbackFromHome={this.myCallback}/>
                <div className="container">
                    {this.state.endpoint1.map(post => (
                    <Card className="cards-layout" key={"post" + post.id}>
                        <div className="posts">
                            <div className="card-header">
                                <CardHeader 
                                    avatar={
                                    <Avatar aria-label="recipe" className="avatar">
                                      <img src ={post.user.profile_picture} alt={post.username}/>
                                    </Avatar>
                                    }
                                    title={post.user.username}
                                    subheader={(post.date.getMonth()+1)+"/"+post.date.getDate()+"/"+post.date.getFullYear()+" "
                                                +post.date.getHours()+":"+post.date.getMinutes()+":"+post.date.getSeconds()} 
                                />
                            </div>
                            <CardContent>
                                <div className="media">    
                                    <CardMedia style={{height: post.images.standard_resolution.height , 
                                                        width: post.images.standard_resolution.width,
                                                    }}
                                                    image={post.images.standard_resolution.url}
                                    /> 
                                </div>     
                                <hr/>
                                <Typography variant="body1" component="p">
                                    { post.caption.text.slice(0,post.caption.text.search('#')) }
                                </Typography>
                                <Typography variant="body2" component="p" className="hastag">
                                    { post.tags.map((value,key) => {
                                       return <span key={"tag" + key} style={{marginRight:5}}>#{value} </span> 
                                    })}
                                </Typography> 
                                <div className="likes">
                                    <div className={post.likeIcon} onClick={() => this.likeClickHandler(post.id)}>
                                        <FavoriteBorderIcon />
                                    </div>
                                    <div className={post.likedIcon}>
                                        <FavoriteIcon style={{color:"red"}} onClick={() => this.likedClickHandler(post.id)}/>
                                    </div>
                                    <span style={{marginLeft:10, marginBottom:8}}>
                                        {
                                        post.likes.count < 2 ? <div>{parseInt(post.likes.count)} like </div> :
                                        <div>{parseInt(post.likes.count)} likes</div>
                                        }
                                    </span>
                                </div>
                                <div className="comments-section">
                                    { post.commentContent.map((value,key) => {
                                        return <span key={"comment" + key}>
                                        <span style={{fontWeight:"bold"}}>{post.user.username}: </span>{value}</span> 
                                    })}
                                </div> 
                                <br/>
                                <div className="comments">
                                    <FormControl className="control">
                                        <InputLabel htmlFor="movieName">Add a comment</InputLabel>
                                        <Input comment={this.state.comment} onChange={this.commentChangeHandler} />
                                    </FormControl>
                                    <Button variant="contained" color="primary" style={{marginLeft:20}} onClick={() => this.addCommentHandler(post.id)}>
                                        ADD
                                    </Button>
                                </div>
                            </CardContent>
                        </div>   
                    </Card>
                    ))}

                </div>
            </div>
        );
    }
}

export default Home;