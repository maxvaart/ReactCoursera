import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText} from 'reactstrap';

    function RenderDish({dish}){
        if(dish != null){
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            )
        } else{
            return(
            <div></div>
            )
        }
    }

    function RenderCardComments({dish}){
        if(dish != null){
            const comments = dish.comments.map(
                (comment) => {
                return(
                <div key={comment.id} className="mt-4 mb-4">
                    <p>{comment.comment}</p>
                    <p><em>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</em></p>
                </div>
                )})
          
            return (
                <div className="col-12 col-md-5 m-1">
                    <h1>Comments</h1>
                    {comments}
                </div>
                )
        } else{
            return(
            <div></div>
            )
        }
    }
    const DishDetail = (props) =>{
        return (    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <RenderDish dish={props.dish}></RenderDish>
                            </div>
                            <RenderCardComments dish={props.dish}></RenderCardComments>
                        </div>
                    </div>
            );
    }

export default DishDetail; 