
// Comment
var Comment = React.createClass({
	render: function() {
		return (
			<div className="comment" >
				<h4 className="commentAuthor" >{this.props.author}</h4>
				{this.props.children}
			</div>
		);
	}
});


// Comment Form
var CommentForm = React.createClass({
	getInitialState: function() {
		return { author: '', text: '' };
	},
	handleAuthorChange: function(e) {
		this.setState({ author: e.target.value });
	},
	handleTextChange: function(e) {
		this.setState({ text: e.target.value });
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var author = this.state.author.trim();
		var text = this.state.text.trim();
		console.log("MT", author, text);
		this.props.onCommentSubmit({author: author, text: text});
		this.setState({ author: '', text: '' });
	},
	render: function() {
    	return (
      	<form className="commentForm" onSubmit={this.handleSubmit} >
        	<input type="text" placeholder="Your name" value={this.state.author} onChange={this.handleAuthorChange} />
        	<input type="text" placeholder="Say something" value={this.state.text} onChange={this.handleTextChange} />
        	<input type="submit" value="Submit" />
      	</form>
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

  handleCommentSubmit: function(comment) {
	$.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
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
      	<CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    );
  }

});

ReactDOM.render(
  <CommentBox url="http://localhost:2000/comments/" pollInterval={2000} />,
  document.getElementById('content')
);









