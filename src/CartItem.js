import React from 'react';

// class CartItem extends React.Component{ // we are inheriting our class CartItem from class called Component from React
//     constructor(){
//         super(); // calls the constructor of Component class
//         // this.state={ // state is an object that contains local data of our component, it is a plain js object
//         //     price:999,
//         //     title:'AppPhone',
//         //     qty:1,
//         //     img:''
//         // }
//     }
//     // increaseQuantity=() =>{
//     //     console.log(this.state);
//     //     // one way of using by passing object s first argument in setState
//     //     // this.setState({
//     //     //     qty:this.state.qty + 1
//     //     // });
//     //     // another way by passing function as first argument to setState. React passes the previous State to function 
//     //     this.setState((prevState)=>{
//     //         return {
//     //             qty : prevState.qty + 1
//     //         }
//     //     });

//     // }

//     // decreaseQuantity=()=>{
//     //     const {qty} = this.state;
//     //     if(qty ===0){
//     //         return 
//     //     }
//     //     this.setState((prevState)=>{
//     //         return {
//     //             qty: prevState.qty - 1
//     //         }
//     //     });

//     // }
//     render(){ //for a class component to  be react component , we need to give this method render() which returns JSX which is bascially the UI for that component
//         const { price, title,qty} = this.props.product ; // object destructring
//         console.log(this.props);
//         const {product,onIncreaseQuantity,onDecreaseQuantity} = this.props;
//         return (
            
//             <div className="cart-item">
//                 <div className="left-block">
//                      <img style={styles.image} alt=""/>
//                 </div>
//                 <div className="right-block">
//                     <div style={{fontSize:25}}>{title}</div>
//                     <div style={{color:'grey'}}>Rs {price}</div>
//                     <div style={{color:'grey'}}>Qty: {qty}</div>
//                     <div className="cart-item-actions">
//                         {/* Buttons */}
//                         <img alt="increase" className="action-icons" src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
//                         onClick={()=>this.props.onIncreaseQuantity(product)}/>
//                         <img alt="decrease" className="action-icons" src="https://cdn-icons-png.flaticon.com/128/1828/1828906.png" onClick={()=>onDecreaseQuantity(this.props.product)}/>
//                         <img alt="delete" className="action-icons" src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png"
//                         onClick={()=>this.props.onDeleteProduct(product.id)}/>
//                     </div>
//                 </div>

//             </div>
//         )
//     }

// }


const CartItem = (props)=>{ // function way of declaring component
    const { price, title,qty} = props.product ; // object destructring
    const {product,onIncreaseQuantity,onDecreaseQuantity} = props;
    return (
            
            <div className="cart-item">
                <div className="left-block">
                     <img style={styles.image} src={product.img} alt=""/>
                </div>
                <div className="right-block">
                    <div style={{fontSize:25}}>{title}</div>
                    <div style={{color:'grey'}}>Rs {price}</div>
                    <div style={{color:'grey'}}>Qty: {qty}</div>
                    <div className="cart-item-actions">
                        {/* Buttons */}
                        <img alt="increase" className="action-icons" src="https://cdn-icons-png.flaticon.com/128/992/992651.png"
                        onClick={()=>props.onIncreaseQuantity(product)}/>
                        <img alt="decrease" className="action-icons" src="https://cdn-icons-png.flaticon.com/128/1828/1828906.png" onClick={()=>onDecreaseQuantity(props.product)}/>
                        <img alt="delete" className="action-icons" src="https://cdn-icons-png.flaticon.com/128/3405/3405244.png"
                        onClick={()=>props.onDeleteProduct(product.id)}/>
                    </div>
                </div>

            </div>
        )
}
const styles ={ // we are using objects to style our components since we cant css here  directly
    image :{
        height:110,
        width:110,
        borderRadius:4,
        background:'grey'
    }
}

export default CartItem;
