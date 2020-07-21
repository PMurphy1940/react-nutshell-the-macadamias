import React, { Component } from "react";
import call from "../../modules/APIManager";
import FriendCard from "./FriendCard";
import "./friends.css";

export default class Friend extends Component {
    constructor() {
        super();
        this.state = {
            friends:"",
            friendCards:[]
        }
    }
    componentDidMount(){
       this.getFriendsArray()
    }
    deleteFriend = async (id) =>{
        await call.deleteFriend(id).catch(err=>console.log(err)).then(()=>{
            this.getFriendsArray();
        })
    }
   async getFriendsArray(){
       await call.getFriends()
        .then(res=>{
            console.log(res)
            this.setState(prevState=>{
                return {
                    ...prevState, 
                    friends: res,
                    friendCards: res.map(friend=><FriendCard friend={friend.user} id={friend.id} key={friend.id} deleteFriend={this.deleteFriend}/>)
                }
            })
        })
        .catch(err=>console.log(err))
    }


    render(){
        return (
            <>
            <div className="flex-wrapper">
        {this.state.friendCards}
        </div>
            </>
        )
    }
}