import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProductDetail = () => {
    const { id } = useParams(); 
    const [product, setProduct] = useState(null);
    const [review, setReview] = useState("");
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get_product/${id}`)
            .then(response => {
                setProduct(response.data.data);
                setReviews(response.data.data.reviews);
            })

            .catch(error => console.error(error));
    }, [id]);
    console.log(product)

    const handleReviewSubmit = async () => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            alert("Please sign in to add a review");
            return;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/add_review/${id}`,
                {
                    comment : review,
                    userId : localStorage.getItem('user_id')
                 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setReviews([...reviews, response.data.review]); 
            setReview(""); // Clear input
        } catch (error) {
            console.error("Error submitting review:", error);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow-md">
                <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-bold mt-4">Price: ${product.price}</p>

                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
                    <ul>
                        {reviews.map((r, index) => (
                            <li key={index} className="border-b py-2">
                                {r?.comment}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="mt-6">
                    <textarea
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder="Add your review..."
                        className="w-full border rounded p-2"
                    ></textarea>
                    <button
                        onClick={handleReviewSubmit}
                        className="mt-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
                    >
                        Submit Review
                    </button>
                </div>
            </div>
        </div>
    );
};
