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
            endpoint1: []
        }

    }

    UNSAFE_componentWillMount(){
        let data = null;
        let xhr = new XMLHttpRequest();
        let that = this;
        xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {   
                   
                that.setState({
                    endpoint1 : JSON.parse(this.responseText).data
                });
                console.log(that.state.endpoint1);
            }
        });
        xhr.open("GET", "https://api.instagram.com/v1/users/self/media/recent/?access_token="+sessionStorage.getItem('access-token'));
        xhr.send(data);

    }

    render(){
        return(
            <div>
                <Header id={this.props.match.params.id} more="true"/>

                <div className="container">
                    {this.state.endpoint1.map(post => (
                    <Card className="cards-layout" key={"post" + post.id}>
                        <div className="posts">
                            <div className="card-header">
                                <CardHeader 
                                    avatar={
                                    <Avatar aria-label="recipe" className="avatar">
                                      <img  src ={post.user.profile_picture} alt="g"/>
                                    </Avatar>
                                    }
                                    title={post.user.username}
                                    subheader={post.created_time}
                                />
                            </div>
                            <CardContent>
                                <div className="media">    
                                    <CardMedia style={{height: post.images.standard_resolution.height , 
                                                        width: post.images.standard_resolution.width}}
                                        image={post.images.standard_resolution.url}
                                    /> 
                                </div>     
                                <hr/>
                                <Typography variant="body1" component="p">
                                    {post.caption.text}
                                </Typography>
                                <Typography variant="body2" component="p" className="hastag">
                                    #{post.tags[0]}<br/>#{post.tags[1]}
                                </Typography> 
                                <br/>    
                                <div className="likes">
                                    <FavoriteIcon/>
                                    <FavoriteBorderIcon/>
                                    <span>
                                        {post.likes.count} Likes
                                    </span>
                                </div>
                                <Typography variant="body2" component="p" >
                                    
                                </Typography> 
                                <br/>
                                <div className="comments">
                                    <FormControl className="control">
                                        <InputLabel htmlFor="movieName">Add a comment</InputLabel>
                                        <Input />
                                    </FormControl>
                                    <Button variant="contained" color="primary" style={{marginLeft:20}}>
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