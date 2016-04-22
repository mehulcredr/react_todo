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
    return (
      <div className="commentList">
        Hello, world! I am a CommentList.
 		<Comment author="Pete Hunt">This is one comment</Comment>
        <Comment author="Jordan Walke">This is *another* comment</Comment>        
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
  render: function() {
    return (
      <div className="commentBox">
      	<h1>Comments</h1>
      	<CommentList/>
      	<CommentForm/>
      </div>
    );
  }
});

ReactDOM.render(
  <CommentBox />,
  document.getElementById('content')
);









