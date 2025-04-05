import React from "react";
import ReactMarkdown from "react-markdown";

interface GroupDescriptionProps {
  description: string;
}

const GroupDescription: React.FC<GroupDescriptionProps> = ({ description }) => {
  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <ReactMarkdown>{description}</ReactMarkdown>
    </div>
  );
};

export default GroupDescription;