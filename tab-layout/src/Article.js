import React , {Component} from 'react';
import './App.css'

class Article extends Component {
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div className="article">
                <h5>{this.props.title}</h5>
                <h9>{this.props.url}</h9>
                <p><span class="badge badge-primary">{this.props.source.name}</span></p>
            </div>
        )
    }
}

export default Article;