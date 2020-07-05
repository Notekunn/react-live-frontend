import React from "react";
import Comment from "./Comment";
export default function Comments({ comments }) {
    return (
        <div className="comments">
            {comments.slice(0, 8).map(comment => <Comment {...comment} />)}
        </div>
    );
}
