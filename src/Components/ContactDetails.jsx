import React from "react";

const ContactDetails = () => {
  return (
    <div className="w-[50%]">
        <h2 className="mb-[30px] mt-[80px]">Kontakt-Daten</h2>
      <form className="" action="">
        <div className="flex flex-col">
          <label className="text-sm mb-[8px]">Surname *</label>
          <input className="border-field" type="text" name="" />

          <label className="text-sm mb-[8px]">House no. *</label>
          <input className="border-field" type="text" name="" />

          <div className="flex gap-[12px]">
            <div className="flex flex-col w-[50%]">
              <label className="text-sm mb-[8px]">Postcode *</label>
              <input className="border-field" type="text" name="" />
            </div>

            <div className="flex flex-col w-[50%]">
              <label className="text-sm mb-[8px]">Location *</label>
              <input className="border-field" type="text" name="" />
            </div>
          </div>
            <h2 className="mt-[36px] mb-[22px]">Zusätzliche Informationen</h2>
          <div className="flex gap-[12px]">
            <div className="flex flex-col w-[50%]">
              <label className="text-sm mb-[8px]">Email doctor *</label>
              <input className="border-field" type="text" name="" />
            </div>

            <div className="flex flex-col w-[50%]">
              <label className="text-sm mb-[8px]">More email</label>
              <input className="border-field" type="text" name="" />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactDetails;
