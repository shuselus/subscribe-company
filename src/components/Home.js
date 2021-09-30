import { useCallback } from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import ActionButton from './ActionButton'
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// import { faUser } from "@fortawesome/free-solid-svg-icons"


const HomeContainer = styled.div`
    padding: 40px 30px;
    width: 50%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: var(--primary-bg-color);
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
`;
const HeaderTxt = styled.h1`
    font-weight: var(--h1-heavy);
    color: var(--primary-h1-color);
    font-size: 2.7em;
    text-align: left;
    margin: 0 0 1.25rem 0;
    overflow-wrap: break-word;
`;
const BodyContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-buttom: 30px;
    height: 100%;
`;
const BodyTxt = styled.p`
    color: var(--primart-txt-color);
    font-size: 1.4em;
    text-align: left;
    margin: 0 0 1.25rem 0;
    line-height: 1.25em;
    overflow-wrap: break-word;
`;
const UserListContainer = styled.ul`
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    height: inherit;
    list-style: none;
    font-size: 1.4em;
    margin: 0 0 1.30rem 0;
    line-height: 1.30em;

`;
const UserListItem = styled.li`
    padding-left: 1.4em;
    &:before{
        font-family: FontAwesome;
        display: inline-block;
        margin-left: -1.4em; 
        width: 1.4em;
        content: ${(props) => String.fromCharCode(props.icon, 16)};
        color: var(--primart-txt-color);
    }
`;

const Home = ({selectedCompany, selectedUsers}) => {
    const history = useHistory();
    
    const renderText = () => {
        if(selectedUsers && selectedUsers?.length){
            return (
                <>
                    <HeaderTxt className="HeaderTxt">
                    {
                        `Subscribed!`
                    }
                    </HeaderTxt>
                    <BodyContainer className="BodyContainer">
                    <BodyTxt className="BodyTxt">
                      <strong>Selectet Organization:</strong> {selectedCompany.name}
                    </BodyTxt>
                    <UserListContainer className="UserListContainer">
                        <strong>Selectet users:</strong>
                    {
                        
                        selectedUsers.map(user => 
                            <UserListItem icon={'f007'} key={user.id}>
                               {`${user.firstName} ${user.lastName}`}
                            </UserListItem>
                        )
                    }
                    </UserListContainer>
                    </BodyContainer>
                    
                </>
            )
        }else{
            return (
                <>
                    <HeaderTxt className="HeaderTxt">
                    {
                        `Welcome to The Subscription-Based Businesses:
                            Most Popular Companies & Types in 2021`
                    }
                    </HeaderTxt>
                    <BodyTxt className="BodyTxt">
                    {
                        `A subscription company is a business that sells their products
                        on a scheduled time basis. The products that subscription businesses sell are 
                        usually consumables or licensed products that can only be used for a finite 
                        amount of time. By pressing the button below you will go to the Organizations
                        page.`
                    }
                    </BodyTxt>
                </>
            )
        }
    }
    return (
        <HomeContainer className="HomeContainer">
            {
              renderText()
            }
            {
                !(selectedUsers && selectedUsers?.length) &&
                <ActionButton label={"SUBSCRIPTION PAGE"} style={{fontSize: '1.5em'}}  handler={()=>{history.push('/organizations')}}/> 
            }
           
        </HomeContainer>
    )
}


export default Home
