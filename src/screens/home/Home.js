import React ,{Component} from 'react';
import Header from '../../common/header/Header';

class Home extends Component{
    render(){
        return(
            <div>
                <Header id={this.props.match.params.id} more="true"/>
            </div>
        );
    }
}

export default Home;