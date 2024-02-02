'use client';

import { 
  HiPaperAirplane, 
  HiPhoto
} from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { 
  FieldValues, 
  SubmitHandler, 
  useForm 
} from "react-hook-form";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import useConversation from "@/app/hooks/useConversation";

// ... (your imports)

const Form = () => {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: '',
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setValue('message', '', { shouldValidate: true });
      await axios.post('/api/messages', {
        ...data,
        conversationId: conversationId,
      });
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  const handleUpload = async (result: any) => {
    try {
      await axios.post('/api/messages', {
        image: result.info.secure_url,
        conversationId: conversationId,
      });
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <div className="py-4 px-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <CldUploadButton options={{ maxFiles: 1 }} onUpload={handleUpload} uploadPreset="ifdsospk">
        <HiPhoto size={30} className="text-sky-500" />
      </CldUploadButton>
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
        {/* ... (rest of your form code) */}
      </form>
    </div>
  );
};

export default Form;
