// import React, { useContext, useState } from 'react'
// import Title from '../components/Title'
// import CartTotal from '../components/CartTotal'
// import { assets } from '../assets/frontend_assets/assets'
// import { ShopContext } from '../context/ShopContext';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// function PlaceOrder() {
//   const [method,setMethod] = useState('cod');
//   const {navigate,backendUrl,token,cartItems,setCartitems,getCartAmount,delivery_fee,products} = useContext(ShopContext)
//   const [formData,setFormData] = useState({
//     firstName:'',
//     lastName:'',
//     email:'',
//     street:'',
//     city:'',
//     state:'',
//     zipcode:'',
//     country:'',
//     phone:''
//   })
//   const onchangeHandler = (event)=>{
//     const { name, value } = event.target;
//     setFormData(data => ({...data,[name]:value}))
//   }

//   const initPay = (order)=>{
//   const options = {
//     key:import.meta.env.VITE_RAZORPAY_KEY_ID,
//     amount:order.amount,
//     currency:order.currency,
//     name:'Order Payment',
//     description:'Order Payment',
//     order_id:order.id,
//     receipt:order.receipt,
//     handler:async(response)=>{
//     try{
//       const {data} = await axios.post(backendUrl+'/api/order/verifyRazorpay',response,{headers:{token}})
//       if(data.success){
//         navigate('/orders')
//         setCartitems({})
//       }
//     }catch(error){
//        console.log(error)
//        toast.error(error)
//     }
//   }
//   }
//   const rzp = new window.Razorpay(options)
//   rzp.open()
//   }
//   const onSubmitHandler = async (event)=>{
//     event.preventDefault()
//     try{
//      let orderItems = []
//      for(const items in cartItems){
//       for(const item in cartItems[items]){
//         if(cartItems[items][item]>0){
//           const itemInfo = structuredClone(products.find(product => product._id === items))
//           if(itemInfo){
//             itemInfo.size = item
//             itemInfo.quantity = cartItems[items][item]
//             orderItems.push(itemInfo)
//           }
//         }
//       }
//      }
//      let orderData = {
//       address:formData,
//       items:orderItems,
//       amount:getCartAmount()+ delivery_fee
//      }
//      switch(method){
//       case 'cod':{
//         const response = await axios.post(backendUrl + '/api/order/place', orderData, {
//           headers: { token }})
//         if(response.data.success){
//           setCartitems({})
//           navigate('/orders')
//         }else{
//           toast.error(response.data.message)
//         }    
//         break;
//       }
//       case 'stripe':
//        const responseStripe = await axios.post(backendUrl+'/api/order/stripe',orderData,{headers:{token}})
//        if(responseStripe.data.success){
//         const {session_url} = responseStripe.data
//         window.location.replace(session_url)
//        }else{
//         toast.error(responseStripe.data.message)
//        }
//         break;
//         case 'razorpay':
//         const responseRazorpay = await axios.post(backendUrl+'/api/order/razorpay',orderData,{headers:{token}})
//         if(responseRazorpay.data.success){
//           initPay(responseRazorpay.data.order)

//         }



//           break;

//       default:
//         break;  
//     }
//     }catch(error){

//     }
//   }
//   return (
//     <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
//     {/* left side */}
//     <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
//      <div className='text-xl sm:text-2xl my-3'>
//       <Title text1={'DELIVERY'} text2={'INFORMATION'}/>
//      </div>
//      <div className='flex gap-3'>
//       <input required onChange={onchangeHandler} name='firstName' value={formData.firstName}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name'/>
//       <input required onChange={onchangeHandler} name='lastName' value={formData.lastName} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name'/>
//      </div>
//      <input required onChange={onchangeHandler} name='email' value={formData.email} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email'/>
//      <input required onChange={onchangeHandler} name='street' value={formData.street} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street'/>
//      <div className='flex gap-3'>
//       <input required onChange={onchangeHandler} name='city' value={formData.city}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City'/>
//       <input required onChange={onchangeHandler} name='state' value={formData.state}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State'/>
//      </div>
//      <div className='flex gap-3'>
//       <input required onChange={onchangeHandler} name='zipcode' value={formData.zipcode}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode'/>
//       <input required onChange={onchangeHandler} name='country' value={formData.country}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country'/>
//      </div>
//      <input required onChange={onchangeHandler} name='phone' value={formData.phone}  className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Phone'/>
//     </div>
//     {/* Right side */}
//     <div className='mt-8'>
//    <div className='mt-8 min-w-80'>
//    <CartTotal/>
//    </div>
//     <div className='mt-12'>
//       <Title text1={'PAYMENT'} text2={'METHOD'}/>
//       {/* payment Method Selection */}
//       <div className='flex gap-3 flex-col lg:flex-row'>
//   <div onClick ={()=>setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//     <p className={`w-3.5 h-3.5 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
//     <img className='h-5 mx-4' src={assets.stripe_logo}/>
//   </div>

//   <div onClick ={()=>setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//     <p className={`w-3.5 h-3.5 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
//     <img className='h-5 mx-4' src={assets.razorpay_logo}/>
//   </div>

//   <div onClick ={()=>setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
//     <p className={`w-3.5 h-3.5 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
//     <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
//   </div>
// </div>
// <div className='w-full text-end mt-8'>
//    <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
//     </div>
//     </div>
//     </div>
//     </form>
//   )
// }

// export default PlaceOrder

import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import CartTotal from '../components/CartTotal'
import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

function PlaceOrder() {
  const [method, setMethod] = useState('cod');
  const {
    navigate,
    backendUrl,
    token,
    cartItems,
    setCartItems,
    getCartAmount,
    delivery_fee,
    products
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onchangeHandler = (event) => {
    const { name, value } = event.target;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(
            `${backendUrl}/api/order/verifyRazorpay`,
            response,
            { headers: { token } }
          );
          if (data.success) {
            navigate('/orders');
            setCartItems({});
          }
        } catch (error) {
          console.log(error);
          toast.error("Payment verification failed");
        }
      }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      let orderItems = [];

      for (const itemId in cartItems) {
        const product = products.find(p => p._id === itemId);
        if (!product) {
          toast.error('Product not found for cart item!');
          continue;
        }

        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(product);
            itemInfo.size = size;
            itemInfo.quantity = cartItems[itemId][size];
            orderItems.push(itemInfo);
          }
        }
      }

      if (orderItems.length === 0) {
        toast.error("Your cart is empty. Please Add time in cart!");
        return;
      }

      const orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        case 'cod': {
          const response = await axios.post(`${backendUrl}/api/order/place`, orderData, {
            headers: { token }
          });
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case 'stripe': {
          const response = await axios.post(`${backendUrl}/api/order/stripe`, orderData, {
            headers: { token }
          });
          if (response.data.success) {
            window.location.replace(response.data.session_url);
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        case 'razorpay': {
          const response = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, {
            headers: { token }
          });
          if (response.data.success) {
            initPay(response.data.order);
          } else {
            toast.error(response.data.message);
          }
          break;
        }

        default:
          toast.error("Select a valid payment method.");
      }

    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while placing the order.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
      {/* Left Side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        <div className='flex gap-3'>
          <input required name='firstName' value={formData.firstName} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='First name' />
          <input required name='lastName' value={formData.lastName} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Last name' />
        </div>

        <input required name='email' value={formData.email} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='email' placeholder='Email' />
        <input required name='street' value={formData.street} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Street' />

        <div className='flex gap-3'>
          <input required name='city' value={formData.city} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='City' />
          <input required name='state' value={formData.state} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='State' />
        </div>

        <div className='flex gap-3'>
          <input required name='zipcode' value={formData.zipcode} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='number' placeholder='Zipcode' />
          <input required name='country' value={formData.country} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Country' />
        </div>

        <input required name='phone' value={formData.phone} onChange={onchangeHandler} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type='text' placeholder='Phone' />
      </div>

      {/* Right Side */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal />
        </div>

        <div className='mt-12'>
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          <div className='flex gap-3 flex-col lg:flex-row'>
            <div onClick={() => setMethod('stripe')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-3.5 h-3.5 rounded-full ${method === 'stripe' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} />
            </div>

            <div onClick={() => setMethod('razorpay')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-3.5 h-3.5 rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
              <img className='h-5 mx-4' src={assets.razorpay_logo} />
            </div>

            <div onClick={() => setMethod('cod')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>
              <p className={`w-3.5 h-3.5 rounded-full ${method === 'cod' ? 'bg-green-400' : ''}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
          </div>

          <div className='w-full text-end mt-8'>
            <button
              type='submit'
              className='bg-black text-white px-16 py-3 text-sm disabled:opacity-60'
              disabled={products.length === 0}
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default PlaceOrder;
