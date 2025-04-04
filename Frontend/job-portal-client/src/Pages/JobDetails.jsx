import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const JobDetails = () => {
  const { id } = useParams();
  const [job, setJob] = useState([]);
  useEffect(() => {
    fetch(`https://job-portal-2-ygd6.onrender.com/all-jobs/${id}`)
      .then((res) => res.json())
      .then((data) => setJob(data));
  }, []);

  const handleApply = async () => {
    const { value: url } = await Swal.fire({
      input: "url",
      inputLabel: "URL address",
      inputPlaceholder: "Enter the URL",
    });
    if (url) {
      Swal.fire(`Entered URL: ${url}`);
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="py-24 mt-3 bg-[#FAFAFA] rounded flex items-center justify-center">
        <div>
          <h2 className="text-3xl text-blue font-medium mb-1 text-center">
            Job Details Page
          </h2>
          <p className="text-sm text-center">
            <a href="/">Home</a> / Single Job
          </p>
        </div>
      </div>
      <div className="py-12">
        <h2 className="py-2">Job ID: {id}</h2>
        <div className="py-2">
          <h1>{job.jobTitle}</h1>
          <h4 className="text-black/70 text-sm">{job.description}</h4>
        </div>

        <h4 className="font-bold py-2">Job type: {job.employmentType}</h4>

        <button className="bg-blue px-8 py-2 text-white" onClick={handleApply}>
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
