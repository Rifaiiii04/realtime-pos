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
import { ROLE_LIST } from "@/constants/auth-constant";
import { Preview } from "@/types/general";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export default function FormUser<T extends FieldValues>({
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
          <DialogTitle>{type}</DialogTitle>
          <DialogDescription>
            {type === "Create"
              ? "Register a new User"
              : "Make changes user Here"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className="space-y-4">
          <FormInput
            form={form}
            name={"name" as Path<T>}
            label="Name"
            placeholder="Insert Your Name"
          />
          {type === "Create" && (
            <FormInput
              form={form}
              name={"email" as Path<T>}
              label="Email"
              placeholder="Insert Email Here"
              type="email"
            />
          )}
          <FormImage
            form={form}
            name={"avatar_url" as Path<T>}
            label="Avatar"
            preview={preview}
            setPreview={setPreview}
          />
          <FormSelect
            form={form}
            name={"role" as Path<T>}
            label="Role"
            selectItem={ROLE_LIST}
          />
          {type === "Create" && (
            <FormInput
              form={form}
              name={"password" as Path<T>}
              label="Password"
              placeholder="******"
              type="password"
            />
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button variant="outline" type="submit">
              {isLoading ? <Loader2 className="animate-spin" /> : type}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
