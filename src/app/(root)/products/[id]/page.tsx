import ProductDetails from "@/components/ProductsSection/ProductDetails"
const Product = {
    name:'firstProduct',
    comments: [{user:'john',text:'hi best product'},{user:'rehan',text:'hi best product of all time'}],
    images :['https://swiftthreadproducts.s3.eu-north-1.amazonaws.com/products/1740398982784-cfsbwp-hoodies.jpg',
      'https://swiftthreadproducts.s3.eu-north-1.amazonaws.com/products/1740398984548-6vi6om-login_kids.jpg'],
    discountedPrice:524,
    originalPrice:1000,
    starDistribution:[100,276,6727,762,29]
}
const relatedProducts = [{
    name:'Jogers',
    price:1099,
    image:'https://swiftthreadproducts.s3.eu-north-1.amazonaws.com/products/1740398982784-cfsbwp-hoodies.jpg'
},
{
    name:'Jeans',
    price:1099,
    image:'https://swiftthreadproducts.s3.eu-north-1.amazonaws.com/products/1740398984548-6vi6om-login_kids.jpg'
}]
export default function ProductPage(){
    return (
        <ProductDetails product={Product} relatedProducts={relatedProducts}/>
    )
}