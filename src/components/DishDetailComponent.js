import React, { useState , Component } from 'react';
import {Card, CardImg, CardBody, CardTitle, CardText,Breadcrumb,BreadcrumbItem,Button,Modal,ModalBody,ModalHeader,ModalFooter,Row,Col,Label} from 'reactstrap';
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);


const CommentForm =(props) =>{
    const handleSubmit=(values)=>{
        props.postComment(props.dishId, values.rating, values.author, values.comment);
        toggle();
    }
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);
        return(
            <div>
                <Button outline color="secondary" onClick={toggle}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader toggle={toggle}><strong>Submit Comment</strong></ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={handleSubmit}>
                            <Row className="form-group">
                                <Col md={{size:12}}>
                                    <Label htmlFor="rating"><strong>Rating</strong></Label>
                                    <Control.select model=".rating" name="rating" className="form-control" md={2}>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:12}}>
                                    <Label htmlFor="author"><strong>Your Name</strong></Label>
                                    <Control.text model=".author" name="author" className="form-control" md={2} placeholder="Your Name" validators={{required,maxLength: maxLength(15),minLength: minLength(2)}}/>
                                    <Errors className="text-danger" model=".author" show="touched" messages={{required:'Required', minLength:'Must be greater than 2 caracters', maxLength:'Must be 15 caracters or less'}}></Errors>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:12}}>
                                    <Label htmlFor="comment"><strong>Comment</strong></Label>
                                    <Control.textarea model=".comment" name="comment" className="form-control" md={2} rows="6"/>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={{size:12}}>
                                    <Button color="primary">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
                
        )
}

function RenderDish({dish}){
    if(dish != null){
        return (
            <FadeTransform in transformProps={{exitTransform: 'scale(0.5) translateY(-50%)'}}>
                <Card>
                    <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}></CardImg>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </FadeTransform>
        )
    }
}

function RenderCardComments({comments, postComment, dishId}){
    if(comments != null){
        const commentsMap = comments.map(
            (comment) => {
            return(
            
                <Fade in>
                    <div key={comment.id} className="mt-4 mb-4">
                        <p>{comment.comment}</p>
                        <p><em>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</em></p>
                    </div>
                </Fade>
            
            )})
        
        return (
            <div className="col-12 col-md-5 m-1">
                <h1>Comments</h1>
                <Stagger in>
                    {commentsMap}
                </Stagger>
                <CommentForm dishId={dishId} postComment={postComment}></CommentForm>
            </div>
            )
    } else{
        return(
        <div></div>
        )
    }
}

const DishDetail = (props) =>{
    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        )
    }   else if (props.errMess){
        return(
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        )
    }  else {
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
                        <RenderCardComments comments={props.comments} postComment={props.postComment} dishId={props.dish.id}></RenderCardComments>
                        
                    </div>
                    
                </div>
        )}
}

export default DishDetail; 