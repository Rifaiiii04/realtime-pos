import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { createOrder } from "../action";
import { Table } from "@/validations/table-validation";
import { OrderForm, orderFormSchema } from "@/validations/order-validation";
import {
  INITIAL_ORDER,
  INITIAL_ORDER_STATE,
  STATUS_CREATE_ORDER,
} from "@/constants/order-constant";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import FormInput from "@/components/common/forn-input";
import FormSelect from "@/components/common/form-select";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

export default function DialogCreateOrder({
  tables,
}: {
  tables: Table[] | undefined | null;
}) {
  const form = useForm<OrderForm>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: INITIAL_ORDER,
  });

  const [createOrderState, createOrderAction, isPendingCreateOrder] =
    useActionState(createOrder, INITIAL_ORDER_STATE);

  const onSubmit = form.handleSubmit(async (data) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    startTransition(() => {
      createOrderAction(formData);
    });
  });

  useEffect(() => {
    if (createOrderState?.status === "error") {
      toast.error("Create Order Failed", {
        description: createOrderState.errors?._form?.[0],
      });
    }
    if (createOrderState?.status === "success") {
      toast.success("Create Order Success");
      form.reset();
      document.querySelector<HTMLButtonElement>('[data-state="open"]')?.click();
    }
  }, [createOrderState]);

  const sortedTables = [...(tables ?? [])].sort((a, b) => {
    if (a.status === "available" && b.status !== "available") return -1;
    if (a.status !== "available" && b.status === "available") return 1;

    return a.name.localeCompare(b.name);
  });

  return (
    <DialogContent className="sm:max-w-106.25">
      <Form {...form}>
        <DialogHeader>
          <DialogTitle>Create Order</DialogTitle>
          <DialogDescription>Add a New Order from Customer</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit} className=" max-h-[90vh] overflow-y-auto">
          <div className="space-y-4">
            <FormInput
              form={form}
              name="customer_name"
              label="Customer Name"
              placeholder="Insert Customer name here"
            />
            <FormSelect
              form={form}
              name="table_id"
              label="Table"
              selectItem={sortedTables.map((table: Table) => ({
                value: `${table.id}`,
                label: `${table.name} - ${table.status} (${table.capacity})`,
                disabled: table.status !== "available",
              }))}
            />
            <FormSelect
              form={form}
              name="status"
              label="Status"
              selectItem={STATUS_CREATE_ORDER}
            />
          </div>
          <DialogFooter className="mt-5">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {isPendingCreateOrder ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Create"
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}
