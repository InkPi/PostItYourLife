//rails generate react:component postItsContainer: https://www.webascender.com/blog/rails-react-forms-validations-real-time-updates/
//https://reactjs.org/docs/fragments.html
//not sure if called .posts
var PostItsContainer = createReactClass({

  render: function(props) {
    return (
      <div>
      <table>
        {props.posts.map(item => (
        <React.Fragment key={post.id}>
          <tr>
            <td>{post.title}</td>
            <td>{post.content}</td>
          </tr>
        </React.Fragment>
        ))}
      </table>
      </div>
    );
};
})
