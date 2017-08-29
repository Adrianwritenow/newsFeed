import React, {Component} from 'react';


class Feed extends Component {

  render() {
    // Receive state from parent component via props.
    // let feed = RECEIVE STATE FROM PARENT
    let feed = this.props.feed;
    let renderFeed = feed.map((article) => {
      // The API returns a blank img placeholder if there is no image.
      // We will change that to an actual image for a more polished finish.
      let imgUrl;
      if (article.urlToImage === 'http://assets1.ignimgs.com/2015/05/27/contentplaceholderpng-967b4c.png') {
        imgUrl = '../images/IGN_Entertainment_Logo.svg.png';
        console.log('hi')
      } else {
        imgUrl = article.urlToImage;
      }
      // Set variables for each article property.
      let author = article.author,
        description = article.description,
        title = article.title,
        url = article.url,
        // Since no property from the article object is suitable as a string, we create a random string for each.
        key = Math.random().toString(36).substring(7);
      return (
        <div key={key} className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img className="" src={imgUrl} alt={description}/>
            <div className="caption">
              <p className="lead truncate">{title}</p>
              <hr className="divider"/>
              <p className="text-center truncate">{description}</p>
              <span className="text-center pull-left">{author || 'IGN'}</span>
              <a href={url} className="btn btn-danger" target="_blank">Read more!</a>
            </div>
          </div>
        </div>
      )
    });
    return (
      <div className="col-md-10 col-md-offset-1">
        <button className="btn btn-danger" onClick={this.props.handleClick}>Click me!</button>
        <hr className="divider"/>
        <div className="col-md-12">
          <div className="row">
            {this.props.loader}
            { renderFeed }
          </div>
        </div>
      </div>
    )
  }
}

export default Feed;
