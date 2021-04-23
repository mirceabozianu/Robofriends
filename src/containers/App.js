import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { robots } from '../robots';
 

class App extends Component{
    constructor() {
        super()
        this.state = {
            robots: [],
            searchField: ''
        }
    }

    componentDidMount() {
        fetch('https://gist.githubusercontent.com/rubenCodeforges/ef1f0ce6a055bbb985c0848d8b0c04d5/raw/f91e3d0d2a6d14233fb8fd70c893821effbac5a6/users.json')
        .then(response => response.json())
        .then(users => this.setState({ robots: users }));
    }

    onSearchChange = (event) => {
        this.setState({searchField : event.target.value})        
    }

    render() {
        const filteredRobots = this.state.robots.filter(robot => {
            return robot.name.toLowerCase().includes(this.state.searchField.toLowerCase())
        });

        if(this.state.robots.length === 0) {
            return <h1>Loading</h1>
        } else {
            return(
                <div className='tc'>
                    <h1 className= 'f1'>RoboFriends</h1>
                    <SearchBox searchChange={this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundry>
                            <CardList robots = {filteredRobots}/>
                        </ErrorBoundry>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;
