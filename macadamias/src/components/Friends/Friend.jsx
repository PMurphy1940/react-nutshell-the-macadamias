import React, { Component } from "react";
import call from "../../modules/APIManager";
import FriendCard from "./FriendCard";

export default class Friend extends Component {
    constructor() {
        super();
        this.state = {
            friends:"",
            friendCards:[]
        }
    }
    componentDidMount(){
        call.getFriends()
        .then(res=>{
            console.log(res)
            this.setState(prevState=>{
                return {
                    ...prevState, 
                    friends: res,
                    friendCards: res.map(friend=><FriendCard friend={friend.user} key={friend.id}/>)
                }
            })
        })
    }


    render(){
        return (
            <>
            <h1>Test</h1>
           <div> {this.state.friendCards}</div>
            </>
        )
    }
}