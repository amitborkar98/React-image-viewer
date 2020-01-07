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
    render(){
        return(
            <div>
                <Header id={this.props.match.params.id} more="true"/>

                <div className="container">
                    
                    <Card className="cards-layout">
                        <div className="posts">
                            <div className="card-header">
                                <CardHeader 
                                    avatar={
                                    <Avatar aria-label="recipe" className="avatar">
                                        R
                                    </Avatar>
                                    }
                                    title="username"
                                    subheader="September 14, 2016"
                                />
                            </div>
                            <CardContent>
                                Post1 
                                <CardMedia
                                    className="media"
                                    image="../../assests/"
                                    title="Paella dish"
                                />      
                                <hr/>
                                <Typography variant="body1" component="p">
                                    Add 1 cup of frozen peas along with the mussels, if you like.
                                </Typography>
                                <Typography variant="body2" component="p" className="hastag">
                                    #football
                                </Typography> 
                                <br/>    
                                <div className="likes">
                                    <FavoriteIcon/>
                                    <FavoriteBorderIcon/><span>7 Likes</span>
                                </div>
                                <br/>
                                <Typography variant="body2" component="p" >
                                    new added
                                </Typography> 
                                <br/>
                                <div className="comments">
                                    <FormControl className="control">
                                        <InputLabel htmlFor="movieName">Add a comment</InputLabel>
                                        <Input id="movieName" />
                                    </FormControl>
                                    <Button variant="contained" color="primary" >
                                        ADD
                                    </Button>
                                </div>
                            </CardContent>
                        </div>   
                    </Card>
                    

                    <Card className="cards-layout">
                        <div className="posts">
                            <div className="card-header">
                                <CardHeader 
                                    avatar={
                                    <Avatar aria-label="recipe" className="avatar">
                                        R
                                    </Avatar>
                                    }
                                    title="username"
                                    subheader="September 14, 2016"
                                />
                            </div>
                            <CardContent>
                                Post1 
                                <CardMedia
                                    className="media"
                                    image="../../assests/"
                                    title="Paella dish"
                                />      
                                <hr/>
                                <Typography variant="body1" component="p">
                                    Add 1 cup of frozen peas along with the mussels, if you like.
                                </Typography>
                                <Typography variant="body2" component="p" className="hastag">
                                    #football
                                </Typography> 
                                <br/>    
                                <div className="likes">
                                    <FavoriteIcon/>
                                    <FavoriteBorderIcon/><span>7 Likes</span>
                                </div>
                                <br/>
                                <Typography variant="body2" component="p" >
                                    new added
                                </Typography> 
                                <br/>
                                <div className="comments">
                                    <FormControl className="control">
                                        <InputLabel htmlFor="movieName">Add a comment</InputLabel>
                                        <Input id="movieName" />
                                    </FormControl>
                                    <Button variant="contained" color="primary" >
                                        ADD
                                    </Button>
                                </div>
                            </CardContent>
                        </div>   
                    </Card>
                    
                </div>
            </div>
        );
    }
}

export default Home;