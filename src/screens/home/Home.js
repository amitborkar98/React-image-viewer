import React ,{Component} from 'react';
import Header from '../../common/header/Header';
import './Home.css';


class Home extends Component{
    render(){
        return(
            <div>
                <Header id={this.props.match.params.id} more="true"/>

                <div className="container">
                    
                </div>

            </div>
        );
    }
}

export default Home;