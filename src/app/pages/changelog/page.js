import Changelog from "../../custom_components/Changelog";

const ChangelogPage = () => {
  return (
    <div className="flex">
      <div className="w-full flex justify-center container-sidebar">
        <h1 className="text-2xl font-semibold tracking-tight">ChangelogPage</h1>
        <p className="text-md font-medium text-muted-foreground mb-4">
          View all the changes made to the system here.
        </p>

        <Changelog />
      </div>
    </div>
  );
};

export default ChangelogPage;
