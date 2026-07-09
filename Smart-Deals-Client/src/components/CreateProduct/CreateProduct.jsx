import { useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const CATEGORIES = [
  "Electronics",
  "Musical Instruments",
  "Furniture",
  "Vehicles",
  "Fashion",
  "Books",
  "Sports & Outdoors",
  "Other",
];

const CreateProduct = () => {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);
  if(loading){
    return <h3>Loading</h3>;
  }
  if(!user){
    navigate('/login')
  }
  const {displayName, email, photoURL} = user;
  console.log(displayName, email, photoURL);
  const AxiosInstance = useAxiosSecure();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const product = {
      title: formData.get("title"),
      category: formData.get("category"),
      price_min: Number(formData.get("price_min")),
      price_max: formData.get("price_max")
        ? Number(formData.get("price_max"))
        : Number(formData.get("price_min")),
      condition: formData.get("condition"),
      usage: formData.get("usage"),
      image: formData.get("image"),
      seller_name: formData.get("seller_name"),
      email: formData.get("email"),
      seller_contact: formData.get("seller_contact"),
      seller_image: formData.get("seller_image"),
      location: formData.get("location"),
      description: formData.get("description"),
      status: "pending",
      created_at: new Date().toISOString(),
    };

    AxiosInstance.post('/products', product)
      .then(data => console.log("Data after Insertion: ", data.data));
   

    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="link link-hover text-sm block text-center mb-3">
          ← Return to Home
        </a>

        <h3 className="text-3xl font-extrabold text-center mb-8">
          <span className="text-slate-900">Create </span>
          <span className="text-primary">A Product</span>
        </h3>

        <form
          onSubmit={handleSubmit}
          className="border-2 border-dashed border-primary/40 rounded-2xl p-8 space-y-5 bg-base-100"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Title</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. Yamaha Fz Guitar for Sale"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Category</span>
              </label>
              <select
                name="category"
                defaultValue=""
                className="select select-bordered w-full"
                required
              >
                <option value="" disabled>
                  Select a Category
                </option>
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Min Price You want to Sale ($)</span>
              </label>
              <input
                type="number"
                name="price_min"
                placeholder="e.g. 18.5"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Max Price You want to Sale ($)</span>
              </label>
              <input
                type="number"
                name="price_max"
                placeholder="Optional (default = Min Price)"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Product Condition</span>
              </label>
              <div className="flex items-center gap-6 h-12">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    value="new"
                    className="radio radio-primary radio-sm"
                    defaultChecked
                  />
                  <span>Brand New</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="condition"
                    value="used"
                    className="radio radio-primary radio-sm"
                  />
                  <span>Used</span>
                </label>
              </div>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Product Usage time</span>
              </label>
              <input
                type="text"
                name="usage"
                placeholder="e.g. 1 year 3 month"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Your Product Image URL</span>
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://..."
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Seller Name</span>
              </label>
              <input
                type="text"
                name="seller_name"
                defaultValue={displayName}
                placeholder="e.g. Artisan Roasters"
                className="input input-bordered w-full"
                required
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Seller Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="leli31955@nrlord.com"
                defaultValue={email}
                className="input input-bordered w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Seller Contact</span>
              </label>
              <input
                type="text"
                name="seller_contact"
                placeholder="e.g. +1-555-1234"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text font-semibold">Seller Image URL</span>
              </label>
              <input
                type="url"
                name="seller_image"
                defaultValue={photoURL}
                placeholder="https://..."
                className="input input-bordered w-full"
              />
            </div>
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <input
              type="text"
              name="location"
              placeholder="City, Country"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Simple Description about your Product</span>
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="e.g. I bought this product 3 month ago. did not used more than 1/2 time. actually learning guitar is so tough...."
              className="textarea textarea-bordered w-full resize-none"
            />
          </div>

          <button
            type="submit"
            className="btn w-full text-white bg-linear-to-r from-violet-600 to-purple-400 hover:from-violet-700 hover:to-purple-500 border-none"
          >
            Create A Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateProduct;