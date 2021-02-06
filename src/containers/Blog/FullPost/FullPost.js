import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
    
    state = {
        loadedPost: null
    }
    
    // Lecture's solution 
     componentDidMount () { 
         console.log(this.props)
         if (this.props.match.params.id ) {
                 if ( !this.state.LoadedPost || (this.state.loadedPost &&  this.state.loadedPost.id !== this.props.id) ) {
                    // axios.get('http://jsonplaceholder.typicode.com/posts/' + this.props.match.params.id)
                    axios.get('/posts/' + this.props.match.params.id) 
                     .then(response => {
                         this.setState({loadedPost: response.data});
                     }  );
                 } 
         }
     }
    
    
    // Q&A Solution  

    // componentDidUpdate (prevProps) {
    //     console.log(this.props)
    //     if (prevProps.id !== this.props.id) {
    //         axios.get('/posts/' + this.props.id)
    //             .then(response => {
    //                 this.setState({loadedPost: response.data});
    //             }  );
    //     }
    // }

    deletePostHandler = () => {
        axios.delete('/posts/' + this.props.id)
            .then(response => {
                console.log(response);
            });
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if (this.props.id) { // if the id isn't initialized, it's value is null which is treated as false in 'if' check 
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if (this.state.loadedPost) { 
            post = ( 
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>

            );
        } 
        return post;
    }
}

export default FullPost;