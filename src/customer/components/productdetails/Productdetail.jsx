import { useState } from "react";

import { Grid, LinearProgress, Rating } from "@mui/material";
import { laptopData } from "../../../data/laptopdata";
import Ratingcard from "./Ratingcard";
import Cardsection from "../cardsection/Cardsection";
import { useNavigate } from "react-router-dom";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],

  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: ["1 year warranty", "24h return policy", "trusted brands"],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Productdetails() {
  const navigate = useNavigate();
  const handlecart = ()=>{
    navigate("/cart")
  }
  return (  
    <div className="bg-white">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-4 px-4 pt-1">
          {/* Image gallery */}
          <div className=" flex flex-col item-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src="https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2023/09/christin-hume-hcfwew744z4-unsplash-muo.jpg?q=50&fit=contain&w=1140&h=&dpr=1.5"
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center "
              />
            </div>
            <div className="flex flex-wrap space-x-5  justify-center lg:w-[30rem]  sm:w-[20rem] ">
              {product.images.map((i) => (
                <div className=" max-w-[5rem] max-h-[5rem] mt-4">
                  <img
                    src={i.src}
                    alt="img"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
          {/* Product info */}
          <div className="lg:col-span-1 max-auto max-w-2xl px-4 pb-16 sm:px-6 ">
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                laptop i5
              </h1>
              <h3 className="text-1xl font-semibold tracking-tight text-gray-700 sm:text-2xl p-y-3 p-x-3">
                brande
              </h3>
            </div>
            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <div className="flex align-center justify-start m-y-1 space-x-5">
                <p className="text-2xl font-bold tracking-tight  sm:text-3xl ">
                  $120
                </p>
                <p className="text-2xl font-bold tracking-tight text-gray-600 sm:text-3xl  line-through ">
                  $150
                </p>

                <p className=" text-2xl font-semibold text-green-600">
                  30% off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <h3 className="sr-only">Reviews</h3>
                <div className="flex items-center">
                  <Rating name="read-only" value={3} readOnly />
                  <p className="sr-only">{reviews.average} out of 5 stars</p>
                </div>
              </div>

              {/* product about */}
              <div className="flex align-center justify-center flex-col mt-10">
                <p className="text-1xl font-bold">
                  Brand: <span className="font-semibold">demo text</span>{" "}
                </p>
                <p className="text-1xl font-bold">
                  color: <span className="font-semibold">demo text</span>{" "}
                </p>
                <p className="text-1xl font-bold">
                  size: <span className="font-semibold">demo text</span>{" "}
                </p>
                <p className="text-1xl font-bold">
                  camera:<span className="font-semibold">demo text</span>{" "}
                </p>
                <p className="text-1xl font-bold">
                  memory : <span className="font-semibold">demo text</span>{" "}
                  <span className="mx-3 font-normal">34gb</span>{" "}
                </p>
                <p className="text-1xl font-bold">
                  software: <span className="font-semibold">demo text</span>
                </p>
              </div>
              <form className="mt-10">
                <button
                onClick={handlecart}
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to Cart
                </button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {product.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* people rating */}
        <h1 className="flex align-center justify-start px-[6rem]  font-bold">
          {" "}
          People's Rating
        </h1>
        <section className="grid xl:grid-cols-2   sm:grid-cols-1 grid-row-2 gap-[2rem]   text-white">
          <div className="flex align-center justify-center p-6 ">
            <Ratingcard />
          </div>
          <div></div>
        </section>
        {/* similar Products */}
        <section className="pt-10">
          <h1 className="font-bold pb-10">Similar Products</h1>
          <div className="flex flex-wrap justify-center space-y-10 space-x-5">
            {laptopData.map((item) => (
              <Cardsection product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
