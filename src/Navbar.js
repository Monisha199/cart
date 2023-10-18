import React from 'react';

const Navbar =(props)=>{ // this is function component , React will pass props as default argument in every function component 
        return (
            <div style={styles.nav}>
                <div style={styles.cartIconContainer}>
                    <img style={styles.cartIcon} src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png" alt="cart-icon"/>
                    <span style={styles.cartCount}>{props.count}</span>
                </div>
            </div>
        )
}

const styles ={ // we are using objects to style our components since we cant css here  directly
    cartIcon :{
        height:32,
        marginRight:20
    },
    nav:{
        height:70,
        background:"#4267b2",
        display:"flex",
        justifyContent:"flex-end",
        alignItems:"center"
    },
    cartIconContainer:{
        position:'relative'
    },
    cartCount:{
        background:"yellow",
        borderRadius:"50%",
        padding:"4px 8px",
        position:"absolute",
        right:0,
        top:0
    }


}


export default Navbar;
