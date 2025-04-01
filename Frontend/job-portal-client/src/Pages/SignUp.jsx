import React from "react";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  return (
    <div className="max-w-screen-2xl container lg:px-24 px-4 mx-auto">
      <div className="bg-[#FAFAFA] py-8 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            {/* 1st row */}
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/2 w-full mx-auto">
                <label className="block mb-2 text-lg">Name</label>
                <input
                  type="text"
                  placeholder="enter your name..."
                  {...register("name")}
                  className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none border rounded sm:text-sm sm:leading-6"
                />
                
              </div>
            </div>

            {/* 2nd row */}
            <div className="flex flex-col lg:flex-row items-center justify-between mt-5">
              <div className="lg:w-1/2 w-full mx-auto">
                <label className="block mb-2 text-lg">Email</label>
                <input
                  type="text"
                  placeholder="enter your email..."
                  {...register("email")}
                  className="block border rounded w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* 3rd row */}
            <div className="lg:w-1/2 w-full mt-5 mx-auto">
              <label className="block mb-2 text-lg">Phone</label>
              <input
                type="tel"
                placeholder="(000) 000-0000"
                {...register("phoneNo")}
                className="block border rounded w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>

            {/* 4th row */}
            <div className="lg:w-1/2 w-full mt-5 mx-auto">
              <label className="block mb-2 text-lg">Address</label>
              <input
                type="text"
                placeholder="enter your address..."
                {...register("address")}
                className="block border w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <input
            type="submit"
            className="block mx-auto mt-8 bg-blue text-white font-semibold px-8 rounded cursor-pointer py-2"
          />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
