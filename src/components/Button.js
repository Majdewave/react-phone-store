import styled from 'styled-components';

export const ButtonContainer = styled.button`
text-transform:capitalize;
font-size:1.4rem;
background: transparent;
border:0.05rem solid var(--mainYellow);
color:${props=>(props.cart? "var(--mainYellow)":"(--lightBlue)")};
border-radius:0.5rem;
border-color:${props=>(props.cart? "var(--mainYellow)":"(--lightBlue)")};   // passing props 
padding: 0.2rem 0.5rem;
cursor:pointer;
margin: 0.2rem 0.5rem 0.2rem  0;
transition: all 0.5s ease-ion-out;
&:hover{
    background:${props=>(props.cart? "var(--mainYellow)":"(--lightBlue)")};
    color:var(--mainBlue);
}
&:focus{
    outLine:none;
}
`
