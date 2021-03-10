import React from 'react';
import InsertClient from './serviceStatus/InsertClient'
import InsertDocument from './serviceStatus/InsertDocument'
import InsertOrder from './serviceStatus/InsertOrder'
import InsertProduct from './serviceStatus/InsertProduct'
import InsertThirdParty from './serviceStatus/InsertThirdParty'
import ReadingBalanceSheet from './serviceStatus/ReadingBalanceSheet'
import ConsultProductStock from './serviceStatus/ConsultProductStock'
import ReadingThirdParty from './serviceStatus/ReadingThirdParty'

function ChangePetition(props){
    const listJson =  props.listJson.info
    return(
        <div>

        {(
            () => {
                switch(listJson.id_service){
                    case '1':
                        return <InsertClient list={ listJson } changePetition={ props.changePetition }/>
                    case '2':
                        return <InsertDocument list={ listJson } changePetition={ props.changePetition }/>
                    case '3':
                        return <InsertOrder list={ listJson } changePetition={ props.changePetition }/>
                    case '4':
                        return <InsertProduct list={ listJson } changePetition={ props.changePetition }/>
                    case '5':
                        return <InsertThirdParty list={ listJson } changePetition={ props.changePetition }/>
                    case '6':
                        return <ReadingBalanceSheet list={ listJson } changePetition={ props.changePetition }/>
                    case '7':
                        return <ConsultProductStock list={ listJson } changePetition={ props.changePetition }/>
                    case '8':
                        return <ReadingThirdParty list={ listJson } changePetition={ props.changePetition }/>
                    default:
                        return null;
                }
            })
        ()}        
        </div>            
    )
}

export default ChangePetition