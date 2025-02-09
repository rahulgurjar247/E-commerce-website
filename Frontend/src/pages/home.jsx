import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Home = () => {
    const [products, setProducts] = useState([]);
    const [userId, setUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const user_id = localStorage.getItem('user_id');
        if(user_id){
            setUserId(user_id);
        }
    },[])
    useEffect(() => {
        
        axios.get(`http://localhost:5000/api/get_product?userId=${userId}`)
            .then(response => setProducts(response.data))
            .catch(error => console.error(error));
    }, [userId]);

    const handleBuy = (productId) => {
        const token = localStorage.getItem('authToken');
        if (!token) {
            navigate("/signin")
            return;
        }
        axios.post(`http://localhost:5000/api/buy_product/${userId}/${productId}`, { productId }, { headers: { Authorization: `Bearer ${token}` } }).then(response => {
            console.log(response.data);
        })
    };
    console.log(products)

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div
                        onClick={() => navigate(`/product/${product._id}/${userId}`)}
                        key={product._id}
                        className="bg-white shadow-md rounded-lg overflow-hidden transform transition duration-300 hover:scale-105"
                    >
                        <div className="p-4">
                            <img
                                src={product.image ? product.image : "https://placehold.co/1280x720"}
                                className="w-full h-40" />
                            <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                            <p className="text-gray-600 mt-2">{product.description}</p>
                            <p className="text-lg font-bold text-gray-900 mt-4">Price: ${product.price}</p>
                            {
                                product.isBuyer ?
                                    <button
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"

                                    >review</button> :
                                    <button
                                        onClick={() => handleBuy(product._id)}
                                        className="mt-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
                                    >
                                        Buy Now
                                    </button>
                            }
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
};