import React from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';

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

    function RenderCardComments({comments}){
        if(comments != null){
            const commentsMap = comments.map(
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
                    {commentsMap}
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
                            <Breadcrumb>
                                <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr></hr>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 col-md-5 m-1">
                                <RenderDish dish={props.dish}></RenderDish>
                            </div>
                            <RenderCardComments comments={props.comments}></RenderCardComments>
                        </div>
                    </div>
            );
    }

export default DishDetail; 