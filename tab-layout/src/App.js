import React , {Component} from 'react';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import './App.css';
import Article from './Article.js';

var keyCode = '62af48ddf5cd43d8a78320b81eb67c41';
var key = '?apiKey='+keyCode;

class App extends Component {
  constructor(props) {
    super(props);
    this.state={
      activeKey:'sports',
      sportsArticles:[],
      entertainmentArticles:[],
    }
  }

  loadHeadlinesByCategory = (category) => {
    var articlesURL = 'https://newsapi.org/v2/top-headlines'+key+'&country=nz&category='+category;
    fetch(articlesURL)
      .then(res=>res.json())
      .then((data)=>{
        var articles = data.articles;
        
        if(category=='sports'){
          this.setState({sportsArticles:articles})
        }
        if(category=='entertainment'){
          this.setState({entertainmentArticles:articles})
        }
      })
  }

  componentDidMount(){
    this.loadHeadlinesByCategory('sports');
    this.loadHeadlinesByCategory('entertainment');
  }
  

  handleTabSelect = (key, e) => {
    this.setState({activeKey:key})
  }

  handleSearchSubmitClick = (e) => {
    e.preventDefault();
    this.setState({activeKey:'search'})
  }
  render(){
      return (
        <div className="container">
          <Tab.Container activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
       
            <div className="row tab-top">
              
              <Nav variant="pills" className="col-7">
                <Nav.Item>
                  <Nav.Link eventKey="sports">Sports</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="entertainment">Entertainment</Nav.Link>
                </Nav.Item>
              </Nav>

              <form className="col-5">
                <div class="form-row align-items-center justify-content-end">
                  <div class="col-auto">
                    <input type="text" className="form-control mb-2 search-input" placeholder="Enter keywords"/>
                  </div>
                  
                  <div class="col-auto">
                    <button onClick={this.handleSearchSubmitClick} type="submit" className="btn btn-primary mb-2 search-submit">Search</button>
                  </div>
                </div>
              </form>
            </div>

            
            <Tab.Content>
              <Tab.Pane className="tab-pane" eventKey="sports">
                <h1>Sports</h1>

                <div className="articles">
                  
                  {this.state.sportsArticles.map((article) => {
                    var articleProps = {
                      ...article,
                      key:Math.random()
                    }
                    return (<Article {...articleProps}/>)
                  } 
                  )}

                </div>
              </Tab.Pane>

              <Tab.Pane className="tab-pane" eventKey="entertainment">
                <h1>Entertainment</h1>

                <div className="articles">
                  
                  {this.state.entertainmentArticles.map((article) => {
                    var articleProps = {
                      ...article,
                      key:Math.random()
                    }
                    return (<Article {...articleProps}/>)
                  } 
                  )}

                </div>
              </Tab.Pane>

              <Tab.Pane className="tab-pane" eventKey="search">
                <h1>Search Results</h1>

                <div className="article">
                  <h5>Apple is giving out a special iPhone that can lead to a $1 million reward</h5>
                  <p><span class="badge badge-primary">Phonearena.com</span></p>
                </div>
                
              </Tab.Pane>

            </Tab.Content>
          
          </Tab.Container>
        </div>
    );
  }
}

export default App;
