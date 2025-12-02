import React, { useState } from "react";
import uploadArea from "C:/Users/kaush/OneDrive/Desktop/Folders/coding/GreatStack/Admin/admin/src/assets/forever-assets/assets/admin_assets/upload_area.png";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { toast } from "react-toastify";

const Add = ({token}) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Top Wear");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name",name);
      formData.append("description",description);
      formData.append("category",category);
      formData.append("subCategory",subCategory);
      formData.append("price",price);
      formData.append("bestSeller",bestSeller);
      formData.append("sizes",JSON.stringify(sizes));

      image1 && formData.append("image1",image1);
      image2 && formData.append("image2",image2);
      image3 && formData.append("image3",image3);
      image4 && formData.append("image4",image4);

      const response = await axios.post(backendUrl+"/api/product/add",formData,{headers:{token}});
      console.log(response.data);
      if(response.data.success){
          toast.success(response.data.message);
          setName('');
          setDescription('');
          setPrice('');
          setBestSeller(false);
          setCategory("MEN");
          setSubCategory("Top Wear");
          setSizes([]);

          setImage1(false);
          setImage2(false);
          setImage3(false);
          setImage4(false);
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  }

  return (
    <form className="flex flex-col w-full items-start gap-3" onSubmit={onSubmitHandler}>
      <div>
        <p className="mb-2">Uplaod Image</p>
        <div className="flex gap-2 ">
          <label htmlFor="image1">
            <img
              className="w-20 cursor-pointer"
              src={!image1 ? uploadArea : URL.createObjectURL(image1)}
              alt="Upload image"
            />
            <input
              onChange={(e) => {
                setImage1(e.target.files[0]);
              }}
              type="file"
              name=""
              id="image1"
              hidden
            />
          </label>
          <label htmlFor="image2">
            <img
              className="w-20 cursor-pointer"
              src={!image2 ? uploadArea : URL.createObjectURL(image2)}
              alt="Upload image"
            />
            <input
              onChange={(e) => {
                setImage2(e.target.files[0]);
              }}
              type="file"
              name=""
              id="image2"
              hidden
            />
          </label>
          <label htmlFor="image3">
            <img
              className="w-20 cursor-pointer"
              src={!image3 ? uploadArea : URL.createObjectURL(image3)}
              alt="Upload image"
            />
            <input
              onChange={(e) => {
                setImage3(e.target.files[0]);
              }}
              type="file"
              name=""
              id="image3"
              hidden
            />
          </label>
          <label htmlFor="image4">
            <img
              className="w-20 cursor-pointer"
              src={!image4 ? uploadArea : URL.createObjectURL(image4)}
              alt="Upload image"
            />
            <input
              onChange={(e) => {
                setImage4(e.target.files[0]);
              }}
              type="file"
              name=""
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>
      <div className="w-full">
        <p className="mb-2">Product Name</p>
        <input
          type="text"
          required
          placeholder="Type here"
          className="w-full max-w-[500px] px-3 py-2"
          onChange={(e) => {
            setName(e.target.value);
          }}
          value={name}
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Description</p>
        <textarea
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          value={description}
          type="text"
          required
          placeholder="Write content here"
          className="w-full max-w-[500px] px-3 py-2"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 ">
        <div>
          <p className="mb-2">Product Category</p>
          <select
            name=""
            id=""
            className="w-full px-3 py-2"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Sub Category</p>
          <select
            name=""
            id=""
            className="w-full px-3 py-2"
            onChange={(e) => {
              setSubCategory(e.target.value);
            }}
          >
            <option value="Top Wear">Top Wear</option>
            <option value="Bottom Wear">Bottom Wear</option>
            <option value="Winter Wear">Winter Wear</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            value={price}
            type="Number"
            placeholder="25"
            className="w-full px- py-2 sm:w-[120px] "
          />
        </div>
      </div>
      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3 ">
          <div
            onClick={() => {
              console.log(sizes);
              setSizes((prev) => {
                return prev.includes("S")
                  ? prev.filter((item) => item !== "S")
                  : [...prev, "S"];
              });
            }}
          >
            <p
              className={`${
                sizes.includes("S") ? "bg-pink-300" : "bg-slate-300"
              } px-3 py-1 cursor-pointer rounded-sm`}
            >
              S
            </p>
          </div>
          <div
            onClick={() => {
              console.log(sizes);
              setSizes((prev) => {
                return prev.includes("M")
                  ? prev.filter((item) => item !== "M")
                  : [...prev, "M"];
              });
            }}
          >
            <p
              className={`${
                sizes.includes("M") ? "bg-pink-300" : "bg-slate-300"
              } px-3 py-1 cursor-pointer rounded-sm`}
            >
              M
            </p>
          </div>
          <div
            onClick={() => {
              console.log(sizes);
              setSizes((prev) => {
                return prev.includes("L")
                  ? prev.filter((item) => item !== "L")
                  : [...prev, "L"];
              });
            }}
          >
            <p
              className={`${
                sizes.includes("L") ? "bg-pink-300" : "bg-slate-300"
              } px-3 py-1 cursor-pointer rounded-sm`}
            >
              L
            </p>
          </div>
          <div
            onClick={() => {
              console.log(sizes);
              setSizes((prev) => {
                return prev.includes("XL")
                  ? prev.filter((item) => item !== "XL")
                  : [...prev, "XL"];
              });
            }}
          >
            <p
              className={`${
                sizes.includes("XL") ? "bg-pink-300" : "bg-slate-300"
              } px-3 py-1 cursor-pointer rounded-sm`}
            >
              XL
            </p>
          </div>
          <div
            onClick={() => {
              console.log(sizes);
              setSizes((prev) => {
                return prev.includes("XXL")
                  ? prev.filter((item) => item !== "XXL")
                  : [...prev, "XXL"];
              });
            }}
          >
            <p
              className={`${
                sizes.includes("XXL") ? "bg-pink-300" : "bg-slate-300"
              } px-3 py-1 cursor-pointer rounded-sm`}
            >
              XXL
            </p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" onChange={()=>{setBestSeller(prev => !prev)}} checked={bestSeller}/>
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>
      <button
        type="submit"
        className="w-28 py-4 mt-4 bg-black text-white cursor-pointer rounded-md"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
