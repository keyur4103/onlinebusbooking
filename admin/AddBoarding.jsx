import React from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
function AddBoarding() {
  const { register, handleSubmit, reset } = useForm();
  const { busid } = useParams();

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_LIVE_SERVER}/api/addboarding/${busid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add boarding point");
      }
      reset();
      toast.success("Boarding point added successfully");
    } catch (error) {
      console.error("Error adding boarding point:", error);
      toast.error("Failed to add boarding point");
    }
  };

  return (
    <div className="row centered-form" style={{ marginTop: "5%" }}>
      <div className="col-lg-8 col-sm-8 col-md-2 col-sm-offset-2 col-md-offset-2">
        <h2>Add Boarding Point</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <span style={{ fontWeight: "bold" }}>Boarding Time</span>
            <input
              {...register("boardingtime", {
                required: "Please enter boarding time.",
              })}
              type="text"
              className="form-control input-sm floatlabel"
              placeholder="DD/MM/YYYY Format"
            />
          </div>
          <div>
            <span style={{ fontWeight: "bold" }}>Boarding Place</span>
            <input
              {...register("boardingplace", {
                required: "Please enter boarding place.",
              })}
              type="text"
              className="form-control input-sm floatlabel"
            />
          </div>
          <div className="col-xs-6 col-sm-6 col-md-6">
            <div className="form-group">
              <button
                type="submit"
                className="btn btn-info"
                style={{ width: "auto", marginTop: "20px" }}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddBoarding;
