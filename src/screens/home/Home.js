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
            endpoint2: [],
            likeIcon: "dispBlock",
            likedIcon: "dispNone",
            comment: "",
            postList: [],
        }
    }

    UNSAFE_componentWillMount(){
        let data1 = null;
        let xhr1 = new XMLHttpRequest();
        let that = this;
        xhr1.addEventListener("readystatechange", function () {
            if(this.readyState === 4){     
                let list = JSON.parse(this.responseText).data;        
                for(let i in list){
                    //adding key-value pairs in the object so that every post has a unique like and comment section
                    list[i].likeIcon = "dispBlock";
                    list[i].likedIcon = "dispNone";
                    list[i].commentContent = [];
                    list[i].clear = ""
                    list[i].date = new Date(parseInt(list[i].created_time) * 1000);
                }
                //storing the endpoint response in state arrays
                that.setState({
                    endpoint1: list,
                    postList: list
                });
            }
        });
        //if access token is not equal to null call the instagram api
        if(sessionStorage.getItem("access-token") !== null){
        xhr1.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token="+sessionStorage.getItem('access-token'));
        xhr1.send(data1);
        }

        let data2 = null;
        let xhr2 = new XMLHttpRequest();
        xhr2.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {   
                that.setState({
                    //storing the endpoint response in state array
                    endpoint2: JSON.parse(this.responseText).data
                });
            }
        });
        //if access token is not equal to null call the instagram api
        if(sessionStorage.getItem("access-token") !== null){
        xhr2.open("GET", "https://api.instagram.com/v1/users/self/?access_token="+sessionStorage.getItem('access-token'));
        xhr2.send(data2);
        }
    }

    //function to add a like to a post
    likeClickHandler = (id) => {
        let postList = this.state.endpoint1;
        postList.forEach(function(post){
            // if the post id equal to the liked post id then display the likedIcon, hide the likeIcon, and increment like count by 1  
            if(post.id === id){
                post.likes.count += 1;
                post.likeIcon = "dispNone";
                post.likedIcon = "dispBlock";
                this.setState({
                    likeIcon: "dispNone",
                    likedIcon: "dispBlock"
                });
            }
        }, this);
    }

    //function to unlike a post
    likedClickHandler = (id) => {
        let postList = this.state.endpoint1;
        postList.forEach(function(post){
            // if the post id equal to the liked post id then display the likeIcon, hide the likedIcon, and decrement like count by 1  
            if(post.id === id){
                post.likes.count -= 1;
                post.likeIcon = "dispBlock";
                post.likedIcon = "dispNone";
                this.setState({
                    likeIcon: "dispBlock", 
                    likedIcon: "dispNone"
                });
            }
        }, this);
    }

    //function to handle the comment change
    commentChangeHandler = (e, id) => {
        this.setState({ comment: e.target.value });
        let postList=this.state.endpoint1;
            postList.forEach(function(post){
                if(post.id === id){
                    post.clear = e.target.value;
                }
            }, this);
    }

    //funtion to add a comment
    addCommentHandler = (id) => {
        if(this.state.comment === ""){
            alert("Cannot add Empty comment");
        }
        else{
            let postList=this.state.endpoint1;
            postList.forEach(function(post){
                //if the post id is equal to the commented post id, then add the comment in the commentContent array 
                if(post.id === id){
                    post.commentContent.push(this.state.comment);
                    this.setState({ comment: "" });
                    post.clear = ""
                }
            }, this);
        }
    }

    //function to get the filtered post from the Header component
    myCallback = (filteredPost) => {
        this.setState({ endpoint1: filteredPost });
    }

    render(){
        return(
            <div>
                {/* display the contents only if the user is logged in */}
                {sessionStorage.getItem("access-token") !== null ?
                <div>
                    <Header more="true" list={this.state.postList} callbackFromHome={this.myCallback} 
                    pic={this.state.endpoint2.profile_picture} history={this.props.history}  />
                    <div className="container">
                        {this.state.endpoint1.map(post => (
                        <Card className="cards-layout" key={"post" + post.id}>
                            <div className="posts">
                                <div className="card-header">
                                    <CardHeader 
                                        avatar={
                                        <Avatar aria-label="recipe" className="avatar">
                                            <img src ={post.user.profile_picture} alt={post.username} className="img"/>
                                        </Avatar>
                                        }
                                        title={post.user.username}
                                        subheader={(post.date.getMonth()+1)+"/"+post.date.getDate()+"/"+post.date.getFullYear()+" "
                                                    +post.date.getHours()+":"+post.date.getMinutes()+":"+post.date.getSeconds()} />
                                </div>
                                <CardContent>
                                    <div className="media">    
                                        <CardMedia style={{height: post.images.standard_resolution.height, width: post.images.standard_resolution.width}}
                                                        image={post.images.standard_resolution.url}/> 
                                    </div>     
                                    <hr/>
                                     {/* display a string in the caption till it reaches #(hashtags) */}
                                    <Typography variant="body1" component="p">
                                        {post.caption.text.slice(0, post.caption.text.search('#'))}
                                    </Typography>
                                    {/* display the hashtags in the tags array */}
                                    <Typography variant="body2" component="p" className="hastag">
                                        {post.tags.map((value,key) => {
                                        return <span key={"tag" + key} style={{marginRight: 5}}> #{value} </span> 
                                        })}
                                    </Typography> 
                                    <div className="likes">
                                        <div className={post.likeIcon} onClick={() => this.likeClickHandler(post.id)}>
                                            <FavoriteBorderIcon/>
                                        </div>
                                        <div className={post.likedIcon}>
                                            <FavoriteIcon style={{color: "red"}} onClick={() => this.likedClickHandler(post.id)}/>
                                        </div>
                                        <span style={{marginLeft: 10, marginBottom: 8}}>
                                            {
                                            post.likes.count < 2 ? <div>{post.likes.count} like </div> : <div> {post.likes.count} likes </div>
                                            }
                                        </span>
                                    </div>
                                    {/* display the comments in the commentContent array */}
                                    <div className="comments-section">
                                        {post.commentContent.map((value,key) => {
                                            return <span key={"comment" + key}>
                                            <span style={{fontWeight: "bold"}}>{post.user.username}: </span>{value}</span> 
                                        })}
                                    </div> 
                                    <br/>
                                    <div className="comments">
                                        <FormControl className="control">
                                            <InputLabel htmlFor="comment">Add a comment</InputLabel>
                                            <Input comment={this.state.comment} onChange={(e) => this.commentChangeHandler(e, post.id)} value={post.clear} />
                                        </FormControl>
                                        <Button variant="contained" color="primary" style={{marginLeft :20}} onClick={() => this.addCommentHandler(post.id)}>
                                            ADD
                                        </Button>
                                    </div>
                                </CardContent>
                            </div>   
                        </Card>
                        ))}
                    </div>
                </div>
                : this.props.history.push('/') }
            </div>
        );
    }
}

export default Home;