import React from "react";

const Final = () => {
  return (
    <div className="flex flex-col items-center text-center">
      <div>
        <h1 className="text-xl font-semibold text-primary mb-1">
          Registration Complete
        </h1>
        <p className="text-sm font-medium text-muted-foreground tracking-wide">
          Click the confirm button to proceed to sign in.
        </p>
      </div>
      <img
        className="w-1/2 h-1/2 mt-4"
        src="https://static.vecteezy.com/system/resources/previews/014/069/956/original/birthday-party-confetti-3d-illustration-png.png"
      />
    </div>
  );
};

export default Final;
