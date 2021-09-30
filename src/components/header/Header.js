import Logo from './Logo'
import NavBar from './navbar/NavBar'
import styled from 'styled-components'
import {ReactComponent as CheckpointLogo} from '../../svgs/checkpoint-logo.svg';
import {ReactComponent as IbmLogo} from '../../svgs/ibm-logo.svg';
import {ReactComponent as IntelLogo} from '../../svgs/intel-logo.svg';

const HeaderContainer = styled.header`
    width: 100%;
    min-height: 100px;
    position: relative;
    padding: 0 1.5rem;
    display: fixed;
    top: 0;
    z-index: 3;
    color: var(--secondary-txt-color);
    margin: 0 auto;
    background-color: var(--header-bg-color);
    font-family: Roboto;
    box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
`;
const InnerContainer = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    .centered{
        display: flex;
        align-items: center;
        justify-content: center;
        margin: auto;
        width: 50%;
        height: inherit;
    }
    .radio__input {
        input {
          opacity: 0;
          width: 0;
          height: 0;
        }
      }
`;
const Title = styled.h2`
   font-size: 1.6em;
   font-family: Roboto;
`;

const Header = ({selectedCompany}) => {

    if(!selectedCompany) return(null);
    if(selectedCompany && Object.entries(selectedCompany).length === 0) return(null);

    const getLogo = () => {
        switch(selectedCompany.name){
           case "IBM":
               return <IbmLogo />;
            case "Intel":
                return <IntelLogo />;
            case "Check Point":
                return <CheckpointLogo />;
            default :
                return <Logo iconName={selectedCompany.name}/>
        }
        
    }

    return (
        <HeaderContainer>
            <InnerContainer>
            {
                getLogo()
            }                 
            {
                selectedCompany && 
                <div className="centered">  
                     
                    <Title>{selectedCompany.name}</Title>
                    <NavBar />
                </div>
                
            }           
               
            </InnerContainer>
           
        </HeaderContainer>
    )
}


export default Header
