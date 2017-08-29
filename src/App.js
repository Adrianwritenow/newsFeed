import React, {Component} from 'react';
import './App.css';
import Loader from './loader';
import Feed from './feed';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomFeed: [],
      feed: [],
      loader: <Loader/>,
      selection: 'the-next-web'
    }
    this.randomizer = this.randomizer.bind(this);
    this.selectSource = this.selectSource.bind(this);
  }

  randomizer() {
    // We want to render a set of six random news headlines from the API data.
    // We can simply use Math.floor() to create a random set of healines, but
    // one side effect is that we get duplicates. Therefore, we use the method below to
    // remove duplicates.
    let newsFeed = this.state.feed;
    let tmp = newsFeed.slice(newsFeed);
    let randomArray = [];
    // We use a for loop to iterate over the length of the array six time.
    // Then we grab a random news headline in each iteration, removing duplicates.
    for (let i = 0; i < 6; i++) {
      let index = Math.floor(Math.random() * tmp.length);
      let removed = tmp.splice(index, 1);
      // Since we are only removing one element
      randomArray.push(removed[0]);
    }
    // Set state. When the button is clicked, set the state for randomFeed and the loader.
    this.setState({
      randomFeed: randomArray,
      loader: ''
    })
  }

  //SPECIFY-LIFECYCLE-HOOK() {
  componentDidMount(){
    this.fetchArticles(this.state.selection);

  // Set your API URL with the API key.

}
fetchArticles(theSource){
  this.setState({
    loader:<Loader />,
    randomFeed:[]

  })
  let url = `https://newsapi.org/v1/articles?source=${theSource}&apiKey=c310c6d7d2d545e9b7a7a1c3843bc6ba`
  // We use regex to extra website name.
  let extract = url.match(/source=\=*(.*?)\s*&/).pop();
  // We set site name to state.
  this.setState({site: extract})
  // Fetch data from API
  fetch(url).then((response) => {
    return response.json()
  }).then((data) => {
    let articles = data.articles;
    this.setState({feed: articles},this.randomizer)
  });
}
selectSource(event){
  this.setState({
    selection:event.target.value
  })
  this.fetchArticles(event.target.value);
}

render() {
  return (
    <div className="App row">
      <div className="col-md-12 hd">
      <select onChange={this.selectSource}>
        <option value="the-next-web"> The Next Web</option>
        <option value="techradar"> Tech Radar</option>
        <option value="hacker-news">Hacker News</option>
      </select>
        <h1 className="hd-title">{this.state.selection}</h1>
        <h2 className="hd-sub">News Randomizer</h2>
      </div>
      <Feed handleClick={this.randomizer} feed={this.state.randomFeed}/>
      {/* Your code here*/}
    </div>
  );
}
}

export default App;
