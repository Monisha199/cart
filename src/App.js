import React  from "react";
import Cart from "./Cart";
import Navbar from "./Navbar";
import firebase from 'firebase/app';
import 'firebase/firestore';


class App extends React.Component {
  constructor(){
    super(); // calls the constructor of Component class
    this.state={ // state is an object that contains local data of our component, it is a plain js object
        products:[],
        loading:true
      //   {
      //     price:999,
      //     title:'Mobile',
      //     qty:1,
      //     img:'https://tse1.mm.bing.net/th?id=OIP.096zwC7tmk5AL7O2v90rXwHaIq&pid=Api&rs=1&c=1&qlt=95&w=95&h=111',
      //     id:1
      // },
      // {
      //     price:9990,
      //     title:'Laptop',
      //     qty:2,
      //     img:'https://tse1.mm.bing.net/th?id=OIP.IkNRj-lUe_0zfd_DIan1YQHaEj&pid=Api&rs=1&c=1&qlt=95&w=182&h=112',
      //     id:2
      // }
        
    }
    this.db  = firebase.firestore();
}

componentDidMount(){
  // firebase
  //   .firestore()
  //   .collection('products')
  //   .get()
  //   .then((snapshot)=>{ // gives snapshot of the databse at that particular time 
  //     // console.log("snapshot",snapshot);
  //     snapshot.docs.map((doc)=>{
  //       console.log(doc.data());
  //     })

  //     const products = snapshot.docs.map((doc)=>{
  //       const data = doc.data();
  //       data['id']=doc.id;
  //       console.log("after adding id", data);
  //       return data;
  //     })

  //     this.setState({
  //       products:products,
  //       loading:false
  //     })
  //   })
  firebase
    .firestore()
    .collection('products')
    // .where('price','>' ,999)
    // .where('title','==','laptop')
    .orderBy('price','desc')
    .onSnapshot( // onsnapshot is a function that keeps listening to any changes made to collection in firebase DB
    (snapshot)=>{ // gives snapshot of the databse at that particular time 
          // console.log("snapshot",snapshot);
          snapshot.docs.map((doc)=>{
            console.log(doc.data());
          })
    
          const products = snapshot.docs.map((doc)=>{
            const data = doc.data();
            data['id']=doc.id;
            console.log("after adding id", data);
            return data;
          })
    
          this.setState({
            products:products,
            loading:false
          })
        })
  }

handleIncreaseQuantity=(product_selected)=>{
    console.log("this is to increase quantity",product_selected);
    const {products} = this.state;
    const index = products.indexOf(product_selected);

    // products[index].qty +=1; //without using firebase db 
    // this.setState({products:products})

    const docRef = this.db.collection('products').doc(products[index].id);
    docRef.update({
      qty:products[index].qty+1
    }).then(()=>{
      console.log("Updated document ")
    }).catch((err)=>{
      console.log("could not update product",err);
})
}

handleDecreaseQuantity=(product_selected)=>{
    console.log("i will decrease quantity",product_selected)
    const {products} = this.state;
    const index = products.indexOf(product_selected);
    console.log("index", index);
    // if(products[index].qty>0){ // donw without using firebase db
    //     products[index].qty -=1
    //     this.setState({products:products})
    // }
    const docRef = this.db.collection('products').doc(products[index].id);
    if (products[index].qty>0){
      docRef.update({
        qty: products[index].qty -1
      })
    }

}

handleDeleteProduct =(id) =>{
    const {products} = this.state;
    // const items = products.filter((item)=>{return item.id !== id}); //return the array of products whose id is not equal to the id passed
    // this.setState({
    //     products:items
    // })
    const docRef = this.db.collection('products').doc(id);
    docRef.delete().then(()=>{
      console.log("deleted");
    })
}

getCartCount =()=>{
    const {products} = this.state;
    let count=0;
    products.forEach((product)=>{count+=product.qty})
    return count;
}

getCartTotal =()=>{
  const {products} = this.state;
  let total=0;
  products.map((product)=>{
    total += product.qty*product.price
    return ;
  })
  return total;
}

addProduct =()=>{
  this.db.collection('products')
  .add({
    img:"",
    price:900,
    qty:3,
    title:"washing machine"
  }).then((docRef)=>{ // docRef is the referrence to the object that is added 
      console.log("product added ",docRef);
  }).catch((err)=>{
    console.log("error in adding the product ", err)
  })

}

render(){
    const {products, loading} = this.state;
    
    return (
      <div className="App">
        <Navbar count={this.getCartCount()}/>
        <button onClick={this.addProduct} style={{padding:20}}>Add a product</button>
        <Cart products={products} onIncreaseQuantity={this.handleIncreaseQuantity} onDecreaseQuantity={this.handleDecreaseQuantity} 
        onDeleteProduct={this.handleDeleteProduct}/>
        {loading && <h1>loading products..</h1>}
        <div style ={{fontSize:20}}>
          Total:{this.getCartTotal()}
        </div>
      </div>
    );
  }
}

export default App;


// 651566ae8b1e44b33d3c246b