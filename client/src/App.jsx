import React from 'react';
import { BrowserRouter as Router,Redirect,Route,Switch } from 'react-router-dom';
import { Container } from 'react-bulma-components';
import Blog from './view/Blog'
import Form from './view/Form'
import Login from './view/Login'
import Register from './view/Register'
import 'react-bulma-components/dist/react-bulma-components.min.css';
import 'antd/dist/antd.css';
import 'moment/locale/es-us'

//import NotFound from './view/NotFound'

function App() {

    return(  
        <Container fluid >
            <Router>
                <Switch>
                    <Route path='/login' component={Login}/>
                    <Route path='/home' component={Blog}/>                     
                    <Route path='/test' component={Form} />
                    <Route path='/register' component={Register} />                        
                    <Redirect from="/" to="login"/>
                </Switch>
            </Router>  
        </Container>                                                                                                                              
    )    
}

export default App;
