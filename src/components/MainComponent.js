import React, {Component} from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent'
import DishDetail from './DishDetailComponent';
import Header from './HeaderComponent';
import Contact from './ContactComponent';
import Footer from './FooterComponent';
import About from './AboutComponent';
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {postComment, fetchDishes,fetchComments,fetchPromos, fetchLeaders, postFeedback} from  '../redux/ActionCreators'; 
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapDispatchProps = dispatch => ({
  postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  postFeedback: (firstname, lastname, telnum, email, agree, contactType, message, date) => dispatch(postFeedback(firstname, lastname, telnum, email, agree, contactType, message, date)),
  fetchDishes: () => {dispatch(fetchDishes())},
  resetFeedbackForm: () =>{dispatch(actions.reset('feedback'))},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  fetchLeaders: () => {dispatch(fetchLeaders())}
});
const mappropsToProps = state =>{
  return{
    dishes:state.dishes,
    comments:state.comments,
    promotions:state.promotions,
    leaders: state.leaders
  }
}

class Main extends Component {

 constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();

  }
  

  render(){

    const DishWithId=({match}) =>{
      return(
        <DishDetail 
        dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
        isLoading={this.props.dishes.isLoading}
        errMess={this.props.dishes.errMess}
        comments={this.props.comments.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}
        commentsErrMess={this.props.comments.errMess}
        postComment={this.props.postComment}>
        </DishDetail>
      )
    };

    const HomePage =() =>{
      return(
        <Home
        dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
        dishesLoading = {this.props.dishes.isLoading}
        dishesErrMess = {this.props.dishes.errMess}
        promotion={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]}
        promoLoading = {this.props.promotions.isLoading}
        promoErrMess = {this.props.promotions.errMess}
        leader={this.props.leaders.leaders.filter((leader)=>leader.featured)[0]} 
        leadersLoading ={this.props.leaders.isLoading}
        leadersErrMess = {this.props.leaders.errMess}
        ></Home>
      )
    }

  return (
    <div>
      <Header></Header>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={HomePage}></Route>
              <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}></Menu>}></Route>
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback} />}></Route>
              <Route path='/menu/:dishId' component={DishWithId}></Route>
              <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}></About>}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      <Footer></Footer>
    </div>
  );
}
}

export default withRouter(connect(mappropsToProps, mapDispatchProps)(Main));
