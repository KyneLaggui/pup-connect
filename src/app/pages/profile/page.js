import React from "react";
import ApplicantOnlyPage from '@/app/layouts/ApplicantOnlyPage'
import VerificationCheck from '@/app/layouts/VerificationCheck'

const Profile = () => {

  return (
    <ApplicantOnlyPage>
      <VerificationCheck>
      <div>
        Profile
      </div>
      </VerificationCheck>
    </ApplicantOnlyPage>
  )

};

export default Profile;
