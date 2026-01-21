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
import { STATUS_TABLE_LIST } from "@/constants/table-constant";
import { Loader2 } from "lucide-react";
import { FormEvent } from "react";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export default function FormTable<T extends FieldValues>({
  form,
  onSubmit,
  isLoading,
  type,
}: {
  form: UseFormReturn<T>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  type: "Create" | "Update";
}) {
  return (
    <DialogContent className="sm:max-w-106.25">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>{type} Table</DialogTitle>
          <DialogDescription>
            {type === "Create" ? "Add a new Table" : "Make changes Table Here"}
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
            <FormInput
              form={form}
              name={"capacity" as Path<T>}
              label="Capacity"
              placeholder="Insert Capacity here"
              type="number"
            />
            <FormSelect
              form={form}
              name={"status" as Path<T>}
              label="Status"
              selectItem={STATUS_TABLE_LIST}
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
