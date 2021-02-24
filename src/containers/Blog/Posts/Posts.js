import React, { Component } from 'react';
import axios from '../../../axios'; //importing and using the axios instance we created
import { Route } from 'react-router-dom';

// import {Link} from 'react-router-dom';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount () {
        console.log(this.props);
        axios.get('/posts')
            .then(response => {
                const posts = response.data.slice(0,4); // in the console we can see (from the console.log underneath) that: the .data 
                // property is available in the 'response' object and the data property holds an array of posts
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Max'
                    }
            })
                this.setState ({posts: updatedPosts}); 
                // console.log(response);
            }) // 'then' is a method which takes a function as the input and it will get excecuted when the promise resolves meaning once the data from the back end is there
            .catch(error => { // the catch method catches error
                // this.setState({error: true})
            });
    }

    postSelectedHandler = (id) => {
        this.props.history.push({pathname: '/posts/' + id});
        // αλλος τροπος: this.props.history.push( '/posts/' + id);
    }
    
    render() {
        let posts = <p style={{textAlign: 'center'}}>Something went wrong</p>
        if (!this.state.error) {
            posts = this.state.posts.map( post => {
                return (
                    // <Link to={'/posts/' + post.id} key={post.id /*the key property should always be property to the outmost element in the loop (loop?) */}>
                        <Post
                            key={post.id}
                            title={post.title}
                            author={post.author}
                            clicked={() => this.postSelectedHandler(post.id)} /> 
                    // </Link> 
                );
            });
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </div>
            
        );
    }
}

export default Posts;