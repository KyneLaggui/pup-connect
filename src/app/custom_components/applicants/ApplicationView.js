import { dummyUser } from "@/app/constants";
import { dummyResume } from "@assets/index";
import { useState, useEffect } from "react";

const ApplicationView = ({ data }) => {
  const [currentData, setCurrentData] = useState({
    id: "",
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    birthDate: null,
    applicationDate: null,
    gender: "",
    phoneNumber: "",
    socialLinks: [],
    coverLetter: "",
    additionalNotes: "",
    region: "",
    cityOrProvince: "",
    streetAddress: "",
    resume: null,
    updateUI: null
  });

  useEffect(() => {
    if (data) {
      setCurrentData({
        id: data.id,
        firstName: data.firstName,
        middleName: data.middleName,
        lastName: data.lastName,
        email: data.email,
        birthDate: data.birthDate,
        applicationDate: data.applicationDate,
        gender: data.gender,
        phoneNumber: data.phoneNumber,
        socialLinks: data.socialLinks,
        coverLetter: data.coverLetter,
        additionalNotes: data.additionalNotes,
        resume: data.resume,
        region: data.region,
        cityOrProvince: data.cityOrProvince,
        streetAddress: data.streetAddress,
        updateUI: data.updateUI
      })
    }
  }, [data])

  return (
    <div className="max-w-[760px] px-4 pt-8 pb-12 space-y-6">
      <div>
        <h1 className="mb-2 text-lg font-semibold">Basic Information</h1>
        <table className="table-fixed w-full border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td className="w-[140px] text-muted-foreground">First Name:</td>
              <td>
                <p>{currentData.firstName}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Middle Name:</td>
              <td>
                <p>{currentData.middleName}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Last Name:</td>
              <td>
                <p>{currentData.lastName}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Birthdate:</td>
              <td>
                <p>{currentData.birthDate}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Gender:</td>
              <td>
                <p>{currentData.gender}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div>
        <h1 className="mb-2 text-lg font-semibold">Contact Information</h1>
        <table className="table-fixed w-full mb-6 border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td className="w-[140px] text-muted-foreground">Email:</td>
              <td>
                <p>{currentData.email}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Phone:</td>
              <td>
                <p>{currentData.phoneNumber}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="mb-2 text-lg font-semibold">Address</h1>
        <table className="table-fixed w-full mb-6 border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td className="w-[140px] text-muted-foreground">Region:</td>
              <td>
                <p>{currentData.region}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">City/Province:</td>
              <td>
                <p>{currentData.cityOrProvince}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Street Address:</td>
              <td>
                <p>{currentData.streetAddress}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h1 className="mb-2 text-lg font-semibold">
          Resume or Curriculum Vitae
        </h1>
        <iframe
          src={currentData.resume}
          className="w-full h-[400px] rounded-lg border mb-6"
        ></iframe>
      </div>
      <div>
        <h1 className="mb-2 text-lg font-semibold">Cover Letter</h1>
        <p className="mb-6">
          {currentData.coverLetter}
        </p>
      </div>

      <div>
        <h1 className="mb-2 text-lg font-semibold">Social Links</h1>
        <ol className="list-disc">
          {currentData.socialLinks && currentData.socialLinks.map((link, index) => (
            <li key={index} className="ml-6 mb-1">
              <a
                className="text-primary underline"
                href={link}
                target="_blank"
                rel="noreferrer"
              >
                {link}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default ApplicationView;
