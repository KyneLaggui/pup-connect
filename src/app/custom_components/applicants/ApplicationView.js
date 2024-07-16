import { dummyUser } from "@/app/constants";
import { dummyResume } from "@assets/index";
import { useState } from "react";

const EmployeeProfile = () => {
  const [userData, setUserData] = useState({
    firstName: dummyUser.firstName,
    middleName: dummyUser.middleName,
    lastName: dummyUser.lastName,
    birthDate: dummyUser.birthDate,
    gender: dummyUser.gender,
    email: dummyUser.email,
    phone: dummyUser.phone,
    region: dummyUser.region,
    province: dummyUser.province,
    city: dummyUser.city,
    barangay: dummyUser.barangay,
    address: dummyUser.address,
    socialLinks: dummyUser.socialLinks,
  });

  return (
    <div className="max-w-[760px] px-4 pt-8 pb-12 space-y-6">
      <div>
        <h1 className="mb-2 text-lg font-semibold">Basic Information</h1>
        <table className="table-fixed w-full border-separate border-spacing-y-2">
          <tbody>
            <tr>
              <td className="w-[140px] text-muted-foreground">First Name:</td>
              <td>
                <p>{userData.firstName}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Middle Name:</td>
              <td>
                <p>{userData.middleName}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Last Name:</td>
              <td>
                <p>{userData.lastName}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Birthdate:</td>
              <td>
                <p>{userData.birthDate}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Gender:</td>
              <td>
                <p>{userData.gender}</p>
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
                <p>{userData.email}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Phone:</td>
              <td>
                <p>{userData.phone}</p>
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
                <p>{userData.region}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Province:</td>
              <td>
                <p>{userData.province}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">City:</td>
              <td>
                <p>{userData.city}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Barangay:</td>
              <td>
                <p>{userData.barangay}</p>
              </td>
            </tr>
            <tr>
              <td className="text-muted-foreground">Street:</td>
              <td>
                <p>{userData.address}</p>
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
          src={dummyResume}
          className="w-full h-[400px] rounded-lg border mb-6"
        ></iframe>
      </div>
      <div>
        <h1 className="mb-2 text-lg font-semibold">Cover Letter</h1>
        <p className="mb-6">
          Ad quis proident officia id ex commodo dolore commodo qui proident id.
          Eiusmod cupidatat amet laboris nisi est officia eu Lorem nisi aute.
          Aliquip id tempor dolor enim incididunt consectetur cillum excepteur
          officia.
        </p>
      </div>

      <div>
        <h1 className="mb-2 text-lg font-semibold">Social Links</h1>
        <ol className="list-disc">
          {dummyUser.socialLinks.map((link, index) => (
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

export default EmployeeProfile;
