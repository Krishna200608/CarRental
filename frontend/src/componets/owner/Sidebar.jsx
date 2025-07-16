import React, { useState } from "react";
import { assets, ownerMenuLinks } from "../../../assets/assets";
import { NavLink, useLocation } from "react-router-dom";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Sidebar = () => {
  const { user, axios, fetchUser } = useAppContext();
  const location = useLocation();
  const [image, setImage] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  const updateImage = async () => {
    if (!image) return;
    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append("image", image);

      const { data } = await axios.post("/api/owner/update-image", formData);
      if (data.success) {
        await fetchUser();            // refresh user data
        toast.success(data.message);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative min-h-screen md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-borderColor text-sm">
      <div className="group relative">
        <label htmlFor="image">
          <img
            className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0"
            }
            alt="Profile"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />
          <div className="absolute hidden inset-0 bg-black/10 rounded-full group-hover:flex items-center justify-center cursor-pointer">
            <img src={assets.edit_icon} alt="Edit" />
          </div>
        </label>
      </div>

      {image && (
        <button
          onClick={updateImage}
          disabled={isSaving}
          className={`absolute top-0 right-0 flex items-center gap-1 p-2 ${
            isSaving
              ? "bg-gray-300 text-gray-600 cursor-not-allowed"
              : "bg-primary/10 text-primary hover:bg-primary/20"
          } rounded`}
        >
          {isSaving ? "Saving…" : "Save"}
          {!isSaving && <img src={assets.check_icon} width={13} alt="OK" />}
        </button>
      )}

      <p className="mt-2 text-base max-md:hidden">{user?.name}</p>

      <div className="w-full">
        {ownerMenuLinks.map((link, idx) => (
          <NavLink
            key={idx}
            to={link.path}
            className={`relative flex items-center gap-2 w-full py-3 pl-4 first:mt-6 ${
              link.path === location.pathname
                ? "bg-primary/10 text-primary"
                : "text-gray-600"
            }`}
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt={link.name}
            />
            <span className="max-md:hidden">{link.name}</span>
            {link.path === location.pathname && (
              <div className="absolute right-0 h-8 w-1.5 rounded-l bg-primary" />
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
