import React from "react";
import "../../styles/Department.css"
import Dental from "../../images/images/Dental.jpg"

const departments = [
  { name: "Cardiology", image: Dental },
  { name: "Neurology", image:  Dental },
  { name: "Pediatrics", image:  Dental },
  { name: "Orthopedics", image:  Dental },
  { name: "Dermatology", image:  Dental },
  { name: "Radiology", image:  Dental },
];


const Department = () => {
  return (
    <section className="department-section">
      <div className="dept-header">
        <span className="dept-badge">Our Departments</span>
        <h2>
          Explore <span>Medical Specialties</span>
        </h2>
        <p>
          Dedicated departments delivering world-class healthcare with
          precision, compassion, and advanced technology.
        </p>
      </div>

      <div className="dept-carousel-wrapper">
        <div className="dept-carousel">
          {departments.concat(departments).map((dept, index) => (
            // duplicate array for seamless infinite scroll
            <div key={index} className="dept-card">
              <div className="dept-image">
                <img src={dept.image} alt={dept.name} />
              </div>
              <h3>{dept.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Department;
