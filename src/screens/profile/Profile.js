import React ,{Component} from 'react';
import './Profile.css';
import Header from '../../common/header/Header';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';

class Profile extends Component{

    constructor(){
        super();
        this.state={
            endpoint1: [],
            endpoint2: [],
            count: 0,
            follows:0,
            followed:0
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
                console.log(list);
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
                });
            }
        });
        if(sessionStorage.getItem("access-token")!==null){
        xhr2.open("GET", "https://api.instagram.com/v1/users/self/?access_token="+sessionStorage.getItem('access-token'));
        xhr2.send(data2);
        }
    }

    render(){
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
                                        {this.state.endpoint2.full_name}
                                    </Typography>
                                    <Fab color="secondary" aria-label="edit">
                                        <EditIcon />
                                    </Fab>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : this.props.history.push('/') }
            </div>
        );
    }
}

export default Profile;