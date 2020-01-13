import React ,{Component} from 'react';
import './Profile.css';
import Header from '../../common/header/Header';

class Profile extends Component{

    constructor(){
        super();
        this.state={
            endpoint1: [],
            endpoint2: []
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
                    endpoint2 : JSON.parse(this.responseText).data
                });
                console.log(that.state.endpoint2);
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
                <Header/>
                Profile Page
            </div>
        );
    }
}

export default Profile;