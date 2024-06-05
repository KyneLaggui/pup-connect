import React from "react";
import FormCompany from "../../custom_components/FormCompany";
import ApplicantOnlyPage from "@/app/layouts/ApplicantOnlyPage";

const Page = async () => {
  return (
    <ApplicantOnlyPage>
      <div className="mt-20">
        <FormCompany />
      </div>
    </ApplicantOnlyPage>
  );
};

export default Page;
