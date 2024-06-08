"use client"

import React from "react";
import ApplicantOnlyPage from "@/app/layouts/ApplicantOnlyPage";
import VerificationCheck from "@/app/layouts/VerificationCheck";
import FormProfile from "../../custom_components/FormProfile";
import JobApplied from "../../custom_components/JobApplied";

const Profile = () => {
  return (
    <ApplicantOnlyPage>
        <div className="flex">
          <div className="w-full flex justify-center container-sidebar">
            <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
            <p className="text-md font-medium text-muted-foreground mb-4">
              View and edit your credentials here.
            </p>

            <div className="flex gap-4">
              <FormProfile />
              <JobApplied />
            </div>
          </div>
        </div>
    </ApplicantOnlyPage>
  );
};

export default Profile;
