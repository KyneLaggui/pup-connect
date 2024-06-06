// Changelog.js

import { dummyChangelog } from "../constants";

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

const Changelog = () => {
  return (
    <div>
      {dummyChangelog.map((changelog, index) => (
        <div className="group flex mb-6" key={index}>
          <div className="w-[200px]">
            <p className="">{formatDate(changelog.date)}</p>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="px-[8px] py-[2px] bg-primary rounded-sm">
                <p className="text-sm font-semibold text-background tracking-wide">
                  {changelog.version}
                </p>
              </div>
              <p className="text-lg font-semibold">{changelog.title}</p>
            </div>
            <ol className="list-disc text-muted-foreground group-hover:text-foreground transition-colors ease-in-out">
              {changelog.changes.map((change, index) => (
                <li key={index} className="ml-8">
                  {change}
                </li>
              ))}
            </ol>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Changelog;
