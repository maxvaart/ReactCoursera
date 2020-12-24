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
  

  render(){

    const DishWithId=({match}) =>{
      return(
        <DishDetail 
        dish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
        comments={this.props.comments.filter((comment)=> comment.dishId === parseInt(match.params.dishId,10))}>
        </DishDetail>
      )
    };

    const HomePage =() =>{
      return(
        <Home
        dish={this.props.dishes.filter((dish)=> dish.featured)[0]}
        promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
        leader={this.props.leaders.filter((leader)=>leader.featured)[0]} 
        ></Home>
      )
    }

  return (
    <div>
      <Header></Header>
      <Switch>
        <Route path="/home" component={HomePage}></Route>
        <Route exact path="/menu" component={()=><Menu dishes={this.props.dishes}></Menu>}></Route>
        <Route exact path="/contactus" component={Contact}></Route>
        <Route path='/menu/:dishId' component={DishWithId}></Route>
        <Route exact path='/aboutus' component={()=><About leaders={this.props.leaders}></About>}></Route>
        <Redirect to="/home"></Redirect>
      </Switch>
      <Footer></Footer>
    </div>
  );
}
}

export default withRouter(connect(mappropsToProps)(Main));
