import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount () {
        // if unauth => this.props.history.replace('/posts/'); // το anauth ειναι μια υποτιθεμενη μεταβλητη
        console.log(this.props);
    }

    postDataHandler = () => {
        const data = {
            title: this.state.title,
            content: this.state.content,
            author: this.state.author
        }
        axios.post('/posts/', data)
            .then (response => {
                console.log( response );
                 this.props.history.push('/posts'); // pushes the page onto the stack, οπότε πατώντας το "πίσω" κουμπί του browser επιστρέφουμε στο NewPost, σε αντίθεση με τις από κάτω επιλογές που το NewPost αντικαθίσταται 
                 // this.props.history.replace('/posts'); // ίδια λειτουργία με το <Redirect>
                // this.setState({submitted: true}); // using <Redirect /> replaces the current page on the stack, it doesn't push a new one
            })
    }
    // a post request needs 2 arguments. The first is the url and the second is the data we want to send
    // the second argument is going to be stringified automatically by axios, basically turn it into json data

    render () {
        let redirect = null;
        if (this.state.submitted) {
            redirect = <Redirect to='/posts/' />
        }
        return (
            
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;