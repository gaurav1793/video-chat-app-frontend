import { ADD_PEER,REMOVE_PEER, RESET } from "../Actions/peerActions";

export type PeerState = Record<string,{stream:MediaStream}>;   


type peerAction ={
    type: typeof ADD_PEER,
    payload:{peerId:string , stream:MediaStream}
} | {
    type:typeof REMOVE_PEER,
    payload :{peerId:string}
} | {
    type: typeof RESET
}


export const peerReducer =(state:PeerState, action :peerAction )=>{
    switch(action.type){
        case "ADD_PEER":
            return {
                ...state,
                [action.payload.peerId]:{
                    stream: action.payload.stream
                }
            }
        case "REMOVE_PEER":
            console.log("before delte",state);
            console.log("trying to delete peerId:", action.payload.peerId);
            const newState = Object.fromEntries(
            Object.entries(state).filter(([key]) => key !== action.payload.peerId)
            );

            console.log("newstate after delete",newState);
            return newState;
        case "RESET":
            return {};
        default:
            return {...state};
    }
}