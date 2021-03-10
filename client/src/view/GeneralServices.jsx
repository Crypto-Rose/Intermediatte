import React, { useEffect, useState } from 'react';
import { Typography,Layout  } from 'antd';
import { Route, Switch } from 'react-router-dom';
import MenuLateral from '../components/MenuLateral'
import ThirdPartyService from '../components/service/ThirdParty'
import BalanceSheetService from '../components/service/BalanceSheet'
import ClientService from '../components/service/Client'
import DocumentService from '../components/service/Document'
import OrderService from '../components/service/Order'
import ProductService from '../components/service/Product'
import ProductStockService from '../components/service/ProductStock'
import UiThirdPartyService from '../components/service/UiThirdParty'
import ThirdPartyConsult from '../components/serviceConsult/ThirdParty'
import BalanceSheetConsult from '../components/serviceConsult/BalanceSheet'
import ClientConsult from '../components/serviceConsult/Client'
import DocumentConsult from '../components/serviceConsult/Document'
import OrderConsult from '../components/serviceConsult/Order'
import ProductConsult from '../components/serviceConsult/Product'
import ProductStockConsult from '../components/serviceConsult/ProductStock'
import UiThirdPartyConsult from '../components/serviceConsult/UiThirdParty'
import url from '../components/url'
import Axios from 'axios';
const { Title } = Typography;
const {  Content,Sider,Footer } = Layout;

function GeneralServices(props){

    const [codeService, SetCodeService] = useState('')
    const [titleService, SetTitleService] = useState([])
    const [titleSecondService, SetTitleSecondService] = useState("Recuerda que para empezar debes escoger si necesitas un servicio o una consulta")

    useEffect(() => {       
        SetCodeService(url.serviceCode(props.match.params.type))
        Axios.get(url.general+"/get/service")
        .then(response =>{
            SetTitleService(response.data)
        })
        .catch(err => {
            console.log(err)
        })        
    },[props]) 

    const changeTitleSecond = (text) => {
        SetTitleSecondService(text)
    }
    return(        
        <Layout>
            <Sider                                                                                    
                style={{                                                         
                    height: '100vh',
                    position: 'fixed',
                    left: 0,                
                }}
                collapsed={true}                
            >
                <MenuLateral codeService={codeService} changeTitleSecond={ changeTitleSecond }/>
            </Sider>  
            <Layout className="site-layout" style={{ marginLeft: 100 }}>                    
                <Content
                    style={{ margin: '24px 0px 0 24px', overflow: 'initial' }}
                >
                    <div className="site-layout-background">
                        {   titleService.filter((a) =>{return a.code === codeService }).map((d,key) =>                       
                            <Title level={3} key={key} style={{textAlign:'center'}}>Bienvenido al servicio de { d.title }</Title> 
                        )}
                        <Title level={5} style={{textAlign:'center'}}>{ titleSecondService }</Title>
                        
                        <Switch>  
                            <Route path='/home/services/client/service' component={ClientService } /> 
                            <Route path='/home/services/document/service' component={DocumentService} />               
                            <Route path='/home/services/order/service' component={OrderService} /> 
                            <Route path='/home/services/product/service' component={ProductService} /> 
                            <Route path='/home/services/iu/thirdParty/service' component={UiThirdPartyService} /> 
                            <Route path='/home/services/balanceSheet/service' component={BalanceSheetService} /> 
                            <Route path='/home/services/productStock/service' component={ProductStockService} /> 
                            <Route path='/home/services/thirdParty/service' component={ThirdPartyService} /> 

                            <Route path='/home/services/client/consult' component={ClientConsult } /> 
                            <Route path='/home/services/document/consult' component={DocumentConsult} />               
                            <Route path='/home/services/order/consult' component={OrderConsult} /> 
                            <Route path='/home/services/product/consult' component={ProductConsult} /> 
                            <Route path='/home/services/iu/thirdParty/consult' component={UiThirdPartyConsult} /> 
                            <Route path='/home/services/balanceSheet/consult' component={BalanceSheetConsult} /> 
                            <Route path='/home/services/productStock/consult' component={ProductStockConsult} /> 
                            <Route path='/home/services/thirdParty/consult' component={ThirdPartyConsult} />       
                        </Switch>   
                    </div>                      
                </Content>
                <Footer style={{ textAlign: 'center' }}>Name by Rosa Morales</Footer> 
            </Layout>    
                
        </Layout>                                          
    )
}

export default GeneralServices