import FormImage from "@/components/common/form-image";
import FormSelect from "@/components/common/form-select";
import FormInput from "@/components/common/forn-input";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { AVAILABILITY_LIST, ROLE_LIST } from "@/constants/auth-constant";
import { CATEGORY_LIST } from "@/constants/menu-constant";
import { Preview } from "@/types/general";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export default function FormMenu<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
  preview,
  setPreview,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
  preview?: Preview;
  setPreview?: (preview: Preview) => void;
}) {
  return (
    <DialogContent className="sm:max-w-106.25">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>{type} Menu</DialogTitle>
          <DialogDescription>
            {type === "Create" ? "Add a new Menu" : "Make changes Menu Here"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className=" max-h-[90vh] overflow-y-auto">
          <div className="space-y-4">
            <FormInput
              form={form}
              name={"name" as Path<T>}
              label="Name"
              placeholder="Insert name here"
            />
            <FormInput
              form={form}
              name={"description" as Path<T>}
              label="Description"
              placeholder="Insert Description"
              type="textarea"
            />
            <FormSelect
              form={form}
              name={"category" as Path<T>}
              label="Category"
              selectItem={CATEGORY_LIST}
            />
            <FormInput
              form={form}
              name={"price" as Path<T>}
              label="Price"
              placeholder="Insert Price here"
              type="number"
            />
            <FormInput
              form={form}
              name={"discount" as Path<T>}
              label="Discount"
              placeholder="Insert Discount here"
              type="number"
            />
            <FormImage
              form={form}
              name={"image_url" as Path<T>}
              label="Image"
              preview={preview}
              setPreview={setPreview}
            />
            <FormSelect
              form={form}
              name={"is_available" as Path<T>}
              label="Availability"
              selectItem={AVAILABILITY_LIST}
            />
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : type}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
