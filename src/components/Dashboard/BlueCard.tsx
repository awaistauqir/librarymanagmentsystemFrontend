import React from "react";
interface Props {
  children: React.ReactNode;
}
const BlueCard = (props: Props) => {
  return (
    <div className="bg-blue-500 rounded-lg px-8 py-6 w-full hover:bg-blue-600 hover:scale-105 hover:shadow-xl transition-all">
      {props.children}
    </div>
  );
};

export default BlueCard;
