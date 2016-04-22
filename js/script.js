
// Comment
var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment" >
				<h2 className="commentAuthor" >{this.props.author}</h2>
				{this.props.children}
			</div>
		);
	}
});


// Comment List
var CommentList = React.createClass({
  render: function() {
	var commentNodes = this.props.data.map(function(comment) {
		return (
			<Comment author={comment.author} key={comment.id} >
				{comment.text}
			</Comment>
		)
	}); 
	 	
    return (
      <div className="commentList">
      	{commentNodes}
      </div>
    );
  }
});


// Comment Form
var CommentForm = React.createClass({
  render: function() {
    return (
      <div className="commentForm">
        Hello, world! I am a CommentForm.
      </div>
    );
  }
});


// Comment Box
var CommentBox = React.createClass({
  getInitialState: function() {  	
  	return {data: []};
  },
  componentDidMount: function() {
  	this.loadCommentsFromServer();
	setInterval(this.loadCommentsFromServer, this.props.pollInterval);  	
  },
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
        console.log(data);
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },  
  render: function() {
    return (
      <div className="commentBox">
      	<h1>Comments</h1>
      	<CommentList data={this.state.data} />
      	<CommentForm/>
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox url="http://localhost:2000/comments/" pollInterval={2000} />,
  document.getElementById('content')
);









