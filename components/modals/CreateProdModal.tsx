"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Field, Formik, useFormikContext } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { HTMLInputTypeAttribute, useRef, useState } from "react";
import { Checkbox } from "../ui/checkbox";
import * as Yup from "yup";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { SupaClient } from "../../utils/supabase";
import { useSession } from "next-auth/react";

const Intialvalues = {
  title: "",
  budget: 0,
  number_of_days: 0,
  release_date: Date.now(),
  restrictions: "",
  geners: "",
  payment_provided: true,
  address: "",
};

const Schema = Yup.object().shape({
  title: Yup.string()
    .matches(/^[Aa-zZ0-9\s]+$/i, { message: "Enter valid title" })
    .required(),
  budget: Yup.number().required().moreThan(0),
  number_of_days: Yup.number().required().moreThan(0),
  release_date: Yup.date()
    .required()
    .min(new Date(), "Choose date in future!")
    .typeError("Invalid date"),
  restrictions: Yup.string().optional(),
  geners: Yup.string()
    .required()
    .matches(/^[Aa-zA,\s]+$/i, {
      message:
        "Geners must be devided with `,` for example `Comedy, Horror, Drama`",
    }),
  payment_provided: Yup.boolean(),
  address: Yup.string()
    .matches(/^[Aa-zZ0-9\s]+$/i, { message: "Enter valid adress" })
    .required(),
});

export default function CreateProdModal() {
  const router = useRouter();
  const [prevImageUrl, setPrevImageUrl] = useState<null | string>();
  const [imageBlob, setImageBlob] = useState<null | File>();
  const [isUploading, setIsUploading] = useState(false);
  const posterRef = useRef<HTMLInputElement | null>();
  const user = useSession().data?.user;

  const onSubmitProduction = async (values: typeof Intialvalues) => {
    setIsUploading(true);
    try {
      const prodRecord = await SupaClient.from("productionProfiles")
        .insert({
          address: values.address,
          budget: values.budget,
          no_of_shooting_days: values.number_of_days,
          payment_provided: values.payment_provided,
          poster: "",
          release_date: values.release_date.toString(),
          restrictions: values.restrictions,
          title: values.title,
          artistsId: user?.id,
          gener_on_prod: values.geners.split(",").map((gener) => gener.trim()),
        })
        .select("id")
        .single();

      if (imageBlob && prodRecord.data) {
        const posterResponse = await SupaClient.storage
          .from("posters")
          .upload(`/p/${prodRecord.data.id}`, imageBlob, { upsert: true });
        const posterPath = posterResponse.data?.path;
        await SupaClient.from("productionProfiles")
          .update({
            poster: posterPath,
          })
          .eq("id", prodRecord.data.id);
      }
    } catch (e) {}
    setIsUploading(false);
  };

  return (
    <div className="px-10 bg-white">
      <div className="sticky w-full flex items-center gap-4 py-5">
        <Button
          onClick={() => {
            router.back();
          }}
          variant={"ghost"}
          className="rounded-full p-1 h-10 w-10 hover:bg-indigo-100 hover:text-primary"
        >
          <AiOutlineArrowLeft className="text-xl" />
        </Button>
        <div className="flex flex-col gap-2">
          <h3 className="text-xl">New Production</h3>
          <p className="text-sm text-slate-500">
           {"Create your production here and make available to Talent's"}
          </p>
        </div>
      </div>
      <div className="bg-white">
        <div className="flex flex-col gap-4 py-4 h-full">
          <div
            onClick={() => posterRef.current?.click()}
            className="w-full h-[280px] relative overflow-hidden rounded-sm cursor-pointer"
          >
            <Image
              alt="Production Poster"
              src={prevImageUrl ?? "/poster.jpg"}
              fill
            />
            <input
              type="file"
              hidden
              onChange={(e) => {
                if (e?.target?.files?.[0]) {
                  const reader = new FileReader();

                  reader.readAsDataURL(e.target.files[0]);

                  reader.onloadend = (e) => {
                    setPrevImageUrl(reader.result as string);
                  };

                  setImageBlob(e.target.files[0]);
                }
              }}
              ref={(ref) => (posterRef.current = ref)}
            />
          </div>
          <div className="w-full flex flex-col gap-4">
            <Formik
              validationSchema={Schema}
              initialValues={Intialvalues}
              onSubmit={async (vlues) => {
                await onSubmitProduction(vlues);
              }}
            >
              {({
                values,
                handleSubmit,
                isSubmitting,
                isValidating,
                errors,
                touched,
                ...props
              }) => (
                <>
                  <div className="flex flex-col gap-2">
                    <Label>Title</Label>
                    <Field name="title" as={Input} {...props} />
                    {touched.title && errors.title && (
                      <span className="text-xs text-red-500">
                        {errors.title}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <div className="flex flex-col gap-2 w-full">
                      <Label>Budget</Label>
                      <Field
                        name="budget"
                        type={"number"}
                        as={Input}
                        {...props}
                      />
                      {touched.budget && errors.budget && (
                        <span className="text-xs text-red-500">
                          {errors.budget}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Label>Number Of Shooting Days</Label>
                      <Field
                        name="number_of_days"
                        type={"number"}
                        as={Input}
                        {...props}
                      />
                      {touched.number_of_days && errors.number_of_days && (
                        <span className="text-xs text-red-500">
                          {errors.number_of_days}
                        </span>
                      )}
                    </div>
                    <div className="flex flex-col gap-2 w-full">
                      <Label>Release Date</Label>
                      <Field
                        name="release_date"
                        type={"date"}
                        as={Input}
                        {...props}
                      />
                      {touched.release_date && errors.release_date && (
                        <span className="text-xs text-red-500">
                          {errors.release_date}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label>Shooting Location</Label>
                    <Field name="address" type={"text"} as={Input} {...props} />
                    {touched.address && errors.address && (
                      <span className="text-xs text-red-500">
                        {errors.address}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Any Restrictions ?</Label>
                    <Field
                      name="restrictions"
                      type={"text"}
                      as={Input}
                      {...props}
                    />
                    {touched.restrictions && errors.restrictions && (
                      <span className="text-xs text-red-500">
                        {errors.restrictions}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label>Geners</Label>
                    <Field name="geners" type={"text"} as={Input} {...props} />
                    {touched.geners && errors.geners && (
                      <span className="text-xs text-red-500">
                        {errors.geners}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Label>Is payment provided ?</Label>
                    <Checkbox name="geners" {...props} />
                  </div>
                  <div className="flex justify-end gap-3">
                    <Button
                      size={"lg"}
                      onClick={() => router.back()}
                      variant={"outline"}
                    >
                      Cancel
                    </Button>
                    <Button
                      disabled={isUploading}
                      onClick={() => handleSubmit()}
                      size={"lg"}
                      type="submit"
                    >
                      {isUploading ? "Posting..." : "Post"}
                    </Button>
                  </div>
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
