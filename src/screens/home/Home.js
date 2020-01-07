import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';



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
                                    title="Username"
                                    subheader="September 14, 2016"
                                    />
                            </div>
                            <CardContent>
                                Post1             
                            </CardContent>
                        </div>   
                    </Card>
                    
                </div>

            </div>
        );
    }
}

export default Home;