import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Menus from '../components/Menu'
import Status from './Status'
import General from './General'
import GeneralServices from './GeneralServices'
import Perfil from './Perfil'
import Statistic from './Statistics/Statistic'

function Base(){     
    return(  
        <React.Fragment>
            <Menus/>                 
            <Switch>           
                <Route path='/home/status/:code' component={Status} exact/>                                                
                <Route path='/home/perfil' component={Perfil} exact/>                
                <Route path='/home/services/:type' component={GeneralServices}/>                                               
                <Route path='/home/statistic' component={Statistic}/>                                               
                
                <Route path='/' component={ General } /> 
            </Switch>                                
        </React.Fragment>            
                                
    )
}

export default Base