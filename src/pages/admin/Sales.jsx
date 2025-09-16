import React from "react";
import { SubHeader } from "../../components/SubHeader";
import AdminNav from "./AdminNav";

export default function Sales() {
  return (
    <>
      <SubHeader />
      <AdminNav activeTab="sales" />

      <div className="max-w-[1100px] mx-auto bg-white p-10 text-center">
        <h2 className="text-xl font-bold mb-6 border-b pb-2">매출</h2>
        <p className="text-gray-600 text-lg mt-20">
          아직 준비중인 페이지입니다.
        </p>
      </div>
    </>
  );
}
