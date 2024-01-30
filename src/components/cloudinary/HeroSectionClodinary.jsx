
import axios from "axios";

const HeroSectionUpload = async (file) => {
  const data = new FormData();
  // console.log("this is data",data);
  data.append("file", file);
  console.log(file);
  data.append("upload_preset", "HeroSectionImage");

  try {
    const res = await axios.post("https://api.cloudinary.com/v1_1/dcn1l8mmq/upload", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    
    if (res.status === 200) {
      console.log("Upload successful:", res.data.url);
      return res.data.url;
    } else {
      console.error("Upload failed. Response:", res);
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("Error uploading file:", error);
    if (error.response) {
      console.error("Response data:", error.response.data);
    }
    throw error;
  }
  
  
};

export default HeroSectionUpload;